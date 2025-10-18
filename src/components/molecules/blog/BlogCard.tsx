"use client";
import { TBlogPost } from "@/interface/app/blog";
import { cn } from "@/utils/helper/cn";
import { m } from "motion/react";
import React from "react";

interface IBlogCardProps {
  post: TBlogPost;
  isHovered: boolean;
}

const BlogCard: React.FC<IBlogCardProps> = ({ post, isHovered }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "relative p-8 rounded-2xl border transition-all duration-300",
        isHovered
          ? "bg-neutral-800 border-orange-400 shadow-2xl shadow-orange-400/20"
          : "bg-neutral-900 border-neutral-700"
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <m.span
          className="text-sm font-semibold px-4 py-1.5 bg-orange-400 text-neutral-900 rounded-full"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        >
          {post.category}
        </m.span>
        {post.isNew && (
          <m.span
            className="text-sm font-semibold px-4 py-1.5 bg-red-600 text-white rounded-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          >
            NEW
          </m.span>
        )}
      </div>

      <h3
        className={cn(
          "text-3xl font-bold mb-4 transition-colors",
          isHovered ? "text-orange-400" : "text-white"
        )}
      >
        {post.title}
      </h3>

      <p className="text-neutral-400 text-lg leading-relaxed mb-6">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {post.tags.map((tag, idx) => (
          <m.span
            key={idx}
            className="text-xs px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-full text-neutral-400"
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(251, 146, 60)",
              color: "rgb(251, 146, 60)",
            }}
          >
            {tag}
          </m.span>
        ))}
      </div>

      {isHovered && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/10 to-transparent pointer-events-none"
        />
      )}
    </m.div>
  );
};

export default BlogCard;
