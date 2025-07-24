import { useState, useEffect } from 'react';

interface CommentFormProps {
  postId: string;
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  timestamp: Date;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ author?: string; content?: string }>({});

  // Load comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${postId}`);
    if (storedComments) {
      const parsedComments = JSON.parse(storedComments).map((comment: any) => ({
        ...comment,
        timestamp: new Date(comment.timestamp)
      }));
      // Sort comments chronologically (oldest first)
      parsedComments.sort((a: Comment, b: Comment) => a.timestamp.getTime() - b.timestamp.getTime());
      setComments(parsedComments);
    }
  }, [postId]);

  // Form validation
  const validateForm = () => {
    const newErrors: { author?: string; content?: string } = {};
    
    if (!author.trim()) {
      newErrors.author = 'Name is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Comment content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Create new comment
    const newComment: Comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      postId,
      author: author.trim(),
      content: content.trim(),
      timestamp: new Date()
    };

    // Add comment to state (display immediately)
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    // Persist to localStorage
    localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));

    // Reset form
    setAuthor('');
    setContent('');
    setErrors({});
    setIsSubmitting(false);
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      {/* Comments Section Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-2">
          Comments ({comments.length})
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
          {/* Author Name Field */}
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
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-md'
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
        {comments.length === 0 ? (
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
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Author Name */}
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {comment.author}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {formatTimestamp(comment.timestamp)}
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