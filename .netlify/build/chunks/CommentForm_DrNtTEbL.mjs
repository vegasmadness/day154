import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from './supabase_8aLQgMSH.mjs';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';

const authStore = atom({
  user: null,
  session: null,
  loading: true
});

function CommentForm({ postId }) {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const auth = useStore(authStore);
  const isAuthenticated = auth.user !== null;
  useEffect(() => {
    fetchComments();
  }, [postId]);
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("comments").select("*").eq("post_id", postId).eq("is_approved", true).order("created_at", { ascending: true });
      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!isAuthenticated) {
      if (!author.trim()) {
        newErrors.author = "Name is required";
      }
      if (!email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!content.trim()) {
      newErrors.content = "Comment content is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const commentData = {
        post_id: postId,
        content: content.trim(),
        author_id: isAuthenticated ? auth.user?.id : null,
        author_name: isAuthenticated ? auth.user?.user_metadata?.full_name || auth.user?.email : author.trim(),
        author_email: isAuthenticated ? auth.user?.email : email.trim(),
        is_approved: false
        // Comments require admin approval
      };
      const { data, error } = await supabase.from("comments").insert([commentData]).select().single();
      if (error) {
        console.error("Error submitting comment:", error);
        alert("Failed to submit comment. Please try again.");
        return;
      }
      if (data) {
        setComments((prev) => [...prev, data]);
      }
      setAuthor("");
      setEmail("");
      setContent("");
      setErrors({});
      alert("Comment submitted successfully! It will appear after admin approval.");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const getAuthorDisplayName = (comment) => {
    return comment.author_name || "Anonymous";
  };
  const getAuthorInitial = (comment) => {
    const name = comment.author_name || "Anonymous";
    return name.charAt(0).toUpperCase();
  };
  return /* @__PURE__ */ jsxs("div", { className: "mt-12 border-t border-gray-200 pt-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-heading font-semibold text-gray-900 mb-2", children: [
        "Comments (",
        isLoading ? "..." : comments.length,
        ")"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Share your thoughts about this post" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mb-8 bg-gray-50 rounded-lg p-6", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-heading font-medium text-gray-900 mb-4", children: "Leave a Comment" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        isAuthenticated && /* @__PURE__ */ jsx("div", { className: "bg-green-50 border border-green-200 rounded-md p-3 mb-4", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-green-800", children: [
          "✓ Signed in as ",
          /* @__PURE__ */ jsx("strong", { children: auth.user?.user_metadata?.full_name || auth.user?.email })
        ] }) }),
        !isAuthenticated && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "author", className: "block text-sm font-medium text-gray-700 mb-1", children: "Your Name *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "author",
              value: author,
              onChange: (e) => setAuthor(e.target.value),
              className: `
                  w-full px-3 py-2 border rounded-md shadow-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  transition-colors duration-200
                  ${errors.author ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"}
                `,
              placeholder: "Enter your name",
              disabled: isSubmitting
            }
          ),
          errors.author && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", role: "alert", children: errors.author })
        ] }),
        !isAuthenticated && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Your Email *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              id: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: `
                  w-full px-3 py-2 border rounded-md shadow-sm text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  transition-colors duration-200
                  ${errors.email ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"}
                `,
              placeholder: "Enter your email",
              disabled: isSubmitting
            }
          ),
          errors.email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", role: "alert", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "content", className: "block text-sm font-medium text-gray-700 mb-1", children: "Your Comment *" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "content",
              rows: 4,
              value: content,
              onChange: (e) => setContent(e.target.value),
              className: `
                w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 resize-vertical
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                transition-colors duration-200
                ${errors.content ? "border-red-300 bg-red-50" : "border-gray-300 bg-white"}
              `,
              placeholder: "Share your thoughts...",
              disabled: isSubmitting
            }
          ),
          errors.content && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", role: "alert", children: errors.content })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: `
                px-6 py-2 rounded-md font-medium text-sm transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isSubmitting ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"}
              `,
            children: isSubmitting ? "Posting..." : "Post Comment"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: isLoading ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-gray-500", children: [
      /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "Loading comments..." })
    ] }) : comments.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-gray-500", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          className: "mx-auto h-12 w-12 text-gray-300 mb-4",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 1.5,
              d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium", children: "No comments yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Be the first to share your thoughts!" })
    ] }) : comments.map((comment) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white font-medium text-sm", children: getAuthorInitial(comment) }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h5", { className: "font-medium text-gray-900", children: [
                getAuthorDisplayName(comment),
                comment.author_id && /* @__PURE__ */ jsx("span", { className: "ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800", children: "Verified" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: formatTimestamp(comment.created_at) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "prose prose-sm max-w-none", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed whitespace-pre-wrap", children: comment.content }) })
        ]
      },
      comment.id
    )) })
  ] });
}

export { CommentForm as C };
