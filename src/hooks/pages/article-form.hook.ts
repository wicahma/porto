"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArticleService } from "@/services/article.service";
import {
  ArticleFormState,
  ArticleFormHandlers,
  ArticleFormData,
  UseArticleFormHooks,
} from "@/interface/article-form.interface";
import {
  useArticle,
  useCreateArticle,
  useUpdateArticle,
} from "../queries/article.wrapper";

export const useArticleFormHooks = (): UseArticleFormHooks => {
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
      // handle error (could set error state)
      // eslint-disable-next-line no-console
      console.error("Failed to save article:", error);
    }
  };

  const data: ArticleFormData = {
    title,
    slug,
    excerpt,
    content,
    category,
    image,
    tags,
    readTime,
    metaTitle,
    metaDescription,
    metaKeywords,
    ogImage,
  };

  const state: ArticleFormState = {
    isEdit: Boolean(isEdit),
    isLoading,
    setTitle,
    setSlug,
    setExcerpt,
    setContent,
    setCategory,
    setImage,
    setTags,
    setReadTime,
    setMetaTitle,
    setMetaDescription,
    setMetaKeywords,
    setOgImage,
  };

  const handlers: ArticleFormHandlers = {
    handleTitleChange,
    handleSubmit,
    createArticle,
    updateArticle,
  };

  return { data, state, handlers };
};
