"use client";
import New from "@/assets/svg/new";
import { useColorWipeNavigation } from "@/components/atoms/ColorWipeTransition";
import { initialBlogPosts } from "@/constants/dummies/blog-page";
import { TBlogPost } from "@/interface/app/blog";
import { cn } from "@/utils/helper/cn";
import { m, useInView } from "motion/react";
import { useRef } from "react";

const BlogArticle = ({ post, index }: { post: TBlogPost; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { navigateWithTransition } = useColorWipeNavigation();

  const handleClick = () => {
    navigateWithTransition(`/blog/${post.id}`, {
      colors: ["#fb923c", "#1A1A1A", "#111111", "#fb923c"],
      direction: "left",
    });
  };

  return (
    <m.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      onClick={handleClick}
      className="group relative py-8 md:py-12 cursor-pointer"
    >
      {/* Divider line */}
      <m.div
        className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent w-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
      />

      {/* Content */}
      <div className="relative">
        {/* Header with badges and meta */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {post.isNew && (
            <m.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              className="flex items-center gap-1"
            >
              <New className="shrink-0" />
            </m.div>
          )}
          <m.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-xs md:text-sm font-bold px-3 md:px-4 py-1 md:py-1.5 bg-orange-400/10 text-orange-400 rounded-full uppercase tracking-wider"
          >
            {post.category}
          </m.span>
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="flex items-center gap-2 text-xs md:text-sm text-neutral-600"
          >
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </m.div>
        </div>

        {/* Title with hover effect - word by word animation */}
        <h3
          className={cn(
            "text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight flex flex-wrap gap-x-3"
          )}
        >
          {post.title.split(" ").map((word: string, wordIdx: number) => (
            <m.span
              key={wordIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                delay: index * 0.1 + 0.4 + wordIdx * 0.05,
                duration: 0.4,
              }}
              className="text-white group-hover:text-orange-400 transition-all duration-300 group-hover:translate-x-1"
            >
              {word}
            </m.span>
          ))}
        </h3>

        {/* Excerpt */}
        <m.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="text-neutral-500 text-base md:text-lg leading-relaxed mb-6 max-w-3xl group-hover:text-neutral-400 transition-colors duration-300"
        >
          {post.excerpt}
        </m.p>

        {/* Tags */}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.6 }}
          className="flex gap-2 flex-wrap"
        >
          {post.tags.map((tag: string, idx: number) => (
            <m.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: index * 0.1 + 0.6 + idx * 0.05 }}
              whileHover={{ scale: 1.1, color: "rgb(251, 146, 60)" }}
              className="text-xs px-3 py-1 text-neutral-600 hover:text-orange-400 transition-colors duration-200 cursor-pointer"
            >
              #{tag}
            </m.span>
          ))}
        </m.div>

        <m.div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:h-24 transition-all duration-300" />
      </div>
    </m.article>
  );
};

const RightCard = () => {
  return (
    <div className="relative">
      {initialBlogPosts.map((post, index) => (
        <BlogArticle key={post.id} post={post} index={index} />
      ))}

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="h-20 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none"
      />
    </div>
  );
};

export default RightCard;
