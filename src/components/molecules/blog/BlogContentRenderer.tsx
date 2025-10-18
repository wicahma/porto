"use client";
import { TBlogContent } from "@/interface/app/blog";
import { m } from "motion/react";
import Image from "next/image";
import { FC } from "react";

interface BlogContentRendererProps {
  content: TBlogContent;
  index: number;
}

const BlogContentRenderer: FC<BlogContentRendererProps> = ({
  content,
  index,
}) => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  switch (content.type) {
    case "heading":
      return (
        <m.h2
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-white"
        >
          {content.content as string}
        </m.h2>
      );

    case "paragraph":
      return (
        <m.p
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="text-neutral-400 leading-relaxed mb-6 text-lg"
        >
          {content.content as string}
        </m.p>
      );

    case "code":
      return (
        <m.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="relative group">
            <div className="absolute top-3 right-3 text-xs text-neutral-500 bg-neutral-800 px-3 py-1 rounded">
              {content.language || "code"}
            </div>
            <pre className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 overflow-x-auto">
              <code className="text-sm text-neutral-300 font-mono">
                {content.content as string}
              </code>
            </pre>
          </div>
        </m.div>
      );

    case "quote":
      return (
        <m.blockquote
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="border-l-4 border-orange-400 pl-6 py-4 mb-6 italic text-neutral-300 bg-orange-400/5 rounded-r-lg"
        >
          {content.content as string}
        </m.blockquote>
      );

    case "list":
      return (
        <m.ul
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="list-none space-y-3 mb-6"
        >
          {(content.content as string[]).map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-neutral-400">
              <span className="text-orange-400 mt-1.5 text-xl">•</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </m.ul>
      );

    case "image":
      return (
        <m.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 rounded-xl overflow-hidden"
        >
          <Image
            src={content.content as string}
            width={100}
            height={100}
            alt={content.alt || "Blog image"}
            className="w-full h-auto"
          />
        </m.div>
      );

    default:
      return null;
  }
};

export default BlogContentRenderer;
