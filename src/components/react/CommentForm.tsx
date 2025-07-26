import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useStore } from '@nanostores/react';
import { authStore } from '../../stores/auth';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface CommentFormProps {
  postId: string;
}

interface Comment {
  id: string;
  post_id: string;
  author_id: string | null;
  author_name: string | null;
  author_email: string | null;
  content: string;
  is_approved: boolean;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<{ author?: string; email?: string; content?: string }>({});
  const [realtimeChannel, setRealtimeChannel] = useState<RealtimeChannel | null>(null);
  
  // Get current auth state
  const auth = useStore(authStore);
  const isAuthenticated = auth.user !== null;

  // Load comments from Supabase on component mount and set up real-time subscription
  useEffect(() => {
    fetchComments();
    
    // Set up real-time subscription for comment changes
    const setupRealtimeSubscription = () => {
      const channel = supabase
        .channel(`comments-${postId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'comments',
            filter: `post_id=eq.${postId}`
          },
          (payload) => {
            console.log('Real-time comment change detected:', payload);
            
            // Refresh comments when any comment change occurs
            fetchComments();
          }
        )
        .subscribe();
      
      setRealtimeChannel(channel);
    };
    
    setupRealtimeSubscription();
    
    // Cleanup subscription on unmount
    return () => {
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
      }
    };
  }, [postId]);

  // Fetch comments from Supabase
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors: { author?: string; email?: string; content?: string } = {};
    
    // For anonymous users, require name and email
    if (!isAuthenticated) {
      if (!author.trim()) {
        newErrors.author = 'Name is required';
      }
      
      if (!email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (!content.trim()) {
      newErrors.content = 'Comment content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare comment data
      const commentData = {
        post_id: postId,
        content: content.trim(),
        author_id: isAuthenticated ? auth.user?.id : null,
        author_name: isAuthenticated ? auth.user?.user_metadata?.full_name || auth.user?.email : author.trim(),
        author_email: isAuthenticated ? auth.user?.email : email.trim(),
        is_approved: false, // Comments require admin approval
      };

      // Insert comment into Supabase
      const { data, error } = await supabase
        .from('comments')
        .insert([commentData])
        .select()
        .single();

      if (error) {
        console.error('Error submitting comment:', error);
        alert('Failed to submit comment. Please try again.');
        return;
      }

      // Reset form
      setAuthor('');
      setEmail('');
      setContent('');
      setErrors({});
      
      // Show success message
      alert('Comment submitted successfully! It will appear after admin approval.');
      
      // Note: Real-time subscription will automatically update the comments list
      
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get display name for comment author
  const getAuthorDisplayName = (comment: Comment) => {
    return comment.author_name || 'Anonymous';
  };

  // Get author initial for avatar
  const getAuthorInitial = (comment: Comment) => {
    const name = comment.author_name || 'Anonymous';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      {/* Comments Section Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-2">
          Comments ({isLoading ? '...' : comments.length})
        </h3>
        <p className="text-gray-600">
          Share your thoughts about this post
        </p>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-heading font-medium text-gray-900 mb-4">
          Leave a Comment
        </h4>
        
        <div className="space-y-4">
          {/* Show auth status */}
          {isAuthenticated && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
              <p className="text-sm text-green-800">
                ✓ Signed in as <strong>{auth.user?.user_metadata?.full_name || auth.user?.email}</strong>
              </p>
            </div>
          )}
          
          {/* Author Name Field - Only for anonymous users */}
          {!isAuthenticated && (
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  transition-colors duration-200
                  ${errors.author ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                `}
                placeholder="Enter your name"
                disabled={isSubmitting}
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.author}
                </p>
              )}
            </div>
          )}

          {/* Email Field - Only for anonymous users */}
          {!isAuthenticated && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  transition-colors duration-200
                  ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
                `}
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          )}

          {/* Comment Content Field */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Your Comment *
            </label>
            <textarea
              id="content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`
                w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 resize-vertical
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                transition-colors duration-200
                ${errors.content ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
              `}
              placeholder="Share your thoughts..."
              disabled={isSubmitting}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.content}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-6 py-2 rounded-md font-medium text-sm transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                }
              `}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </form>

      {/* Comments Display */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-lg font-medium">No comments yet</p>
            <p className="text-sm">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {/* Author Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {getAuthorInitial(comment)}
                    </span>
                  </div>
                  
                  {/* Author Name */}
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {getAuthorDisplayName(comment)}
                      {comment.author_id && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      )}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {formatTimestamp(comment.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comment Content */}
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}