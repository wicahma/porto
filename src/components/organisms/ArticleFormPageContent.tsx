"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useArticle,
  useCreateArticle,
  useUpdateArticle,
} from "@/hooks/queries/article.wrapper";
import { ArticleService } from "@/services/article.service";
import { ArrowLeft, Save } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WysiwygEditor from "./WysiwygEditor";

const ArticleFormPageContent = () => {
  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== "new";
  const articleId = isEdit ? (params.id as string) : null;

  const { data: existingArticle, isLoading } = useArticle(articleId || "");
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [readTime, setReadTime] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [ogImage, setOgImage] = useState("");

  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title);
      setSlug(existingArticle.slug);
      setExcerpt(existingArticle.excerpt || "");
      setContent(existingArticle.content);
      setCategory(existingArticle.category);
      setImage(existingArticle.image);
      setTags(existingArticle?.tags?.join(", ") || "");
      setReadTime(existingArticle.read_time);
      setMetaTitle(existingArticle.meta_title || "");
      setMetaDescription(existingArticle.meta_description || "");
      setMetaKeywords(existingArticle.meta_keywords?.join(", ") || "");
      setOgImage(existingArticle.og_image || "");
    }
  }, [existingArticle]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEdit) {
      const generatedSlug = ArticleService.generateSlug(value);
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const articleData = {
      title,
      slug,
      excerpt,
      content,
      category,
      image,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      read_time: readTime,
      meta_title: metaTitle || title,
      meta_description: metaDescription || excerpt,
      meta_keywords: metaKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      og_image: ogImage || image,
    };

    try {
      if (isEdit && articleId) {
        await updateArticle.mutateAsync({ id: articleId, ...articleData });
      } else {
        await createArticle.mutateAsync(articleData);
      }
      router.push("/admin/articles");
    } catch (error) {
      console.error("Failed to save article:", error);
    }
  };

  if (isLoading && isEdit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles">
            <Button
              variant="ghost"
              className="text-neutral-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white">
              {isEdit ? "Edit Article" : "Create Article"}
            </h1>
            <p className="text-neutral-400">
              {isEdit ? "Update your article" : "Write a new article"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="bg-neutral-800 border-neutral-700">
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-neutral-700"
              >
                Content
              </TabsTrigger>
              <TabsTrigger
                value="seo"
                className="data-[state=active]:bg-neutral-700"
              >
                SEO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-neutral-400">
                    Article title, slug, and metadata
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-neutral-200">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder="Enter article title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-neutral-200">
                      Slug *{" "}
                      <span className="text-neutral-500 text-sm">
                        (URL-friendly)
                      </span>
                    </Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                      className="bg-neutral-800 border-neutral-700 text-white font-mono"
                      placeholder="article-slug"
                    />
                    <p className="text-xs text-neutral-500">
                      Preview: /article/{slug || "your-slug"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt" className="text-neutral-200">
                      Excerpt
                    </Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder="Short description for previews"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-neutral-200">
                        Category *
                      </Label>
                      <Input
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="bg-neutral-800 border-neutral-700 text-white"
                        placeholder="Tech, Design, AI, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="readTime" className="text-neutral-200">
                        Read Time *
                      </Label>
                      <Input
                        id="readTime"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                        required
                        className="bg-neutral-800 border-neutral-700 text-white"
                        placeholder="5 min read"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-neutral-200">
                      Featured Image URL *
                    </Label>
                    <Input
                      id="image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-neutral-200">
                      Tags{" "}
                      <span className="text-neutral-500 text-sm">
                        (comma-separated)
                      </span>
                    </Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder="nextjs, react, typescript"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">Content *</CardTitle>
                  <CardDescription className="text-neutral-400">
                    Write your article content using the rich text editor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WysiwygEditor
                    value={content}
                    onChange={setContent}
                    placeholder="Start writing your article..."
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">SEO Metadata</CardTitle>
                  <CardDescription className="text-neutral-400">
                    Optimize your article for search engines and social media
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle" className="text-neutral-200">
                      Meta Title{" "}
                      <span className="text-neutral-500 text-sm">
                        (defaults to title)
                      </span>
                    </Label>
                    <Input
                      id="metaTitle"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder={title || "SEO-optimized title"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="metaDescription"
                      className="text-neutral-200"
                    >
                      Meta Description{" "}
                      <span className="text-neutral-500 text-sm">
                        (defaults to excerpt)
                      </span>
                    </Label>
                    <Textarea
                      id="metaDescription"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder={excerpt || "SEO-optimized description"}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaKeywords" className="text-neutral-200">
                      Meta Keywords{" "}
                      <span className="text-neutral-500 text-sm">
                        (comma-separated)
                      </span>
                    </Label>
                    <Input
                      id="metaKeywords"
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ogImage" className="text-neutral-200">
                      Open Graph Image{" "}
                      <span className="text-neutral-500 text-sm">
                        (defaults to featured image)
                      </span>
                    </Label>
                    <Input
                      id="ogImage"
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      className="bg-neutral-800 border-neutral-700 text-white"
                      placeholder={image || "https://example.com/og-image.jpg"}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 pt-6">
            <Link href="/admin/articles">
              <Button
                variant="outline"
                type="button"
                className="border-neutral-700 text-neutral-300"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
              disabled={createArticle.isPending || updateArticle.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {createArticle.isPending || updateArticle.isPending
                ? "Saving..."
                : isEdit
                  ? "Update Article"
                  : "Create Article"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleFormPageContent;
