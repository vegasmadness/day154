import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from './supabase_8aLQgMSH.mjs';

function LikeButton({ postId, initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function loadLikeState() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: statsData, error: statsError } = await supabase.rpc("get_post_stats", { post_uuid: postId });
        if (statsError) {
          console.error("Error fetching post stats:", statsError);
          setLikes(initialLikes);
        } else if (statsData && statsData.length > 0) {
          setLikes(statsData[0].like_count);
        } else {
          setLikes(initialLikes);
        }
        if (user) {
          const { data: hasLikedData, error: hasLikedError } = await supabase.rpc("user_has_liked_post", {
            post_uuid: postId,
            user_uuid: user.id
          });
          if (hasLikedError) {
            console.error("Error checking like status:", hasLikedError);
            setHasLiked(false);
          } else {
            setHasLiked(hasLikedData || false);
          }
        } else {
          const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
          setHasLiked(likedPosts[postId] === true);
        }
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading like state:", error);
        setLikes(initialLikes);
        setIsLoaded(true);
      }
    }
    loadLikeState();
  }, [postId, initialLikes]);
  const handleLike = async () => {
    if (hasLiked || isAnimating) return;
    try {
      setIsAnimating(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: toggleResult, error: toggleError } = await supabase.rpc("toggle_post_like", { post_uuid: postId });
        if (toggleError) {
          console.error("Error toggling like:", toggleError);
          setIsAnimating(false);
          return;
        }
        if (toggleResult) {
          setLikes((prev) => prev + 1);
          setHasLiked(true);
        } else {
          setLikes((prev) => Math.max(0, prev - 1));
          setHasLiked(false);
        }
      } else {
        const { error: insertError } = await supabase.from("likes").insert({
          post_id: postId,
          user_id: null,
          ip_address: null
          // Could be populated server-side if needed
        });
        if (insertError) {
          console.error("Error inserting anonymous like:", insertError);
          setIsAnimating(false);
          return;
        }
        setLikes((prev) => prev + 1);
        setHasLiked(true);
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        likedPosts[postId] = true;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      }
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    } catch (error) {
      console.error("Error handling like:", error);
      setIsAnimating(false);
    }
  };
  if (!isLoaded) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-gray-100 text-gray-400", children: [
      /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 animate-spin", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }),
      /* @__PURE__ */ jsx("span", { children: "Loading..." })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleLike,
      disabled: hasLiked,
      className: `
          group relative flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm
          transition-all duration-300 ease-out overflow-visible
          ${hasLiked ? "bg-white text-primary-600 border-2 border-primary-500 shadow-lg cursor-default" : "bg-white text-gray-600 border-2 border-gray-200 hover:border-primary-300 hover:text-primary-600 hover:shadow-md cursor-pointer"}
          ${isAnimating ? "scale-105" : "scale-100"}
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        `,
      "aria-label": hasLiked ? "Post liked" : "Like this post",
      children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            className: `
            w-5 h-5 transition-all duration-300 ease-out relative z-10
            ${hasLiked ? "text-primary-500" : "text-gray-400 group-hover:text-primary-500"}
            ${isAnimating ? "animate-pulse scale-125" : "scale-100"}
          `,
            fill: hasLiked ? "currentColor" : "none",
            stroke: "currentColor",
            strokeWidth: hasLiked ? 0 : 2,
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `
            font-medium transition-all duration-300 relative z-10
            ${hasLiked ? "text-primary-600" : "text-gray-600 group-hover:text-primary-600"}
            ${isAnimating ? "scale-110" : "scale-100"}
          `,
            children: likes
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `
            transition-colors duration-300 relative z-10 whitespace-nowrap font-medium
            ${hasLiked ? "text-primary-600" : "text-gray-600 group-hover:text-primary-600"}
          `,
            style: {
              minWidth: "40px",
              display: "inline-block"
            },
            children: hasLiked ? "Liked" : "Like"
          }
        ),
        isAnimating && /* @__PURE__ */ jsx("div", { className: "absolute -inset-4 pointer-events-none", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-primary-400 rounded-full animate-ping opacity-60",
            style: {
              transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-24px)`,
              animationDelay: `${i * 75}ms`,
              animationDuration: "500ms",
              zIndex: 0
            }
          },
          i
        )) })
      ]
    }
  ) });
}

export { LikeButton as L };
