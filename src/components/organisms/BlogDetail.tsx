"use client";
import BlogContentRenderer from "@/components/molecules/blog/BlogContentRenderer";
import OtherArticles from "@/components/molecules/blog/OtherArticles";
import { initialBlogPosts } from "@/constants/dummies/blog-page";
import { m } from "motion/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface BlogDetailProps {
  id: string;
}

const BlogDetail: FC<BlogDetailProps> = ({ id }) => {
  const router = useRouter();
  const post = initialBlogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <button
          onClick={() => router.push("/blog")}
          className="text-orange-400 hover:underline"
        >
          ← Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 pt-8"
      >
        <button
          onClick={() => router.push("/blog")}
          className="group flex items-center gap-2 text-neutral-500 hover:text-orange-400 transition-colors mb-8"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </button>
      </m.div>

      {/* Main Container */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Header Section */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              {/* Meta Info */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                {post.isNew && (
                  <span className="text-xs font-bold px-3 py-1 bg-red-600 text-white rounded-full">
                    NEW
                  </span>
                )}
                <span className="text-xs font-bold px-3 py-1 bg-orange-400/10 text-orange-400 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight flex flex-wrap gap-x-3">
                {post.title.split(" ").map((word: string, wordIdx: number) => (
                  <m.span
                    key={wordIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + wordIdx * 0.05,
                      duration: 0.4,
                    }}
                    className="text-white"
                  >
                    {word}
                  </m.span>
                ))}
              </h1>

              {/* Excerpt */}
              <m.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-neutral-400 leading-relaxed mb-8"
              >
                {post.excerpt}
              </m.p>

              {/* Author & Tags */}
              <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-neutral-800">
                {post.author && (
                  <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {post.author.name}
                      </p>
                      <p className="text-sm text-neutral-500">Author</p>
                    </div>
                  </m.div>
                )}

                <div className="flex-1" />

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-2 flex-wrap"
                >
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 text-neutral-500 hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </m.div>
              </div>
            </m.div>

            {/* Content */}
            <article className="prose prose-invert max-w-none mb-20">
              {post.content ? (
                post.content.map((content, index) => (
                  <BlogContentRenderer
                    key={index}
                    content={content}
                    index={index}
                  />
                ))
              ) : (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-center py-20"
                >
                  <p className="text-neutral-500 text-lg">
                    Content is being prepared...
                  </p>
                </m.div>
              )}
            </article>

            {/* Related Tags */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="border-t border-neutral-800 pt-8 pb-20"
            >
              <h3 className="text-xl font-bold mb-4">Related Topics</h3>
              <div className="flex gap-3 flex-wrap">
                {post.tags.map((tag, idx) => (
                  <m.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-orange-400 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </m.button>
                ))}
              </div>
            </m.div>
          </div>

          {/* Sidebar - Other Articles */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <OtherArticles
              articles={initialBlogPosts}
              currentArticleId={post.id}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
