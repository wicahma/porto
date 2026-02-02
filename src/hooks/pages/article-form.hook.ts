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
import {
  uploadFileToStorage,
  uploadHtmlToStorage,
} from "@/lib/bucket/storage.service";
import toast from "react-hot-toast";

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

  // File upload states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

    setIsUploading(true);

    try {
      // First, save the article to the database
      const articleData = {
        title,
        slug,
        excerpt,
        content,
        category,
        image, // Temporary, will be updated after upload
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

      let savedArticleId = articleId;

      if (isEdit && articleId) {
        await updateArticle.mutateAsync({ id: articleId, ...articleData });
      } else {
        const result = await createArticle.mutateAsync(articleData);
        savedArticleId = result?.id || null;
      }

      // After successful database save, upload files if any
      let updatedImagePath = image;
      let updatedContentPath = content;

      if (imageFile && savedArticleId) {
        toast.loading("Uploading image...");
        const uploadResult = await uploadFileToStorage(
          imageFile,
          "images",
          `article_${savedArticleId}`,
        );

        console.log("Image upload result:", uploadResult);

        if (uploadResult.success && uploadResult.filePath) {
          updatedImagePath = uploadResult.filePath;
        } else {
          toast.error("Failed to upload image");
        }
      }

      // Upload HTML content to storage
      if (content && savedArticleId) {
        toast.loading("Saving content...");
        const htmlUploadResult = await uploadHtmlToStorage(
          content,
          `article_${savedArticleId}_content`,
          "articles",
        );
        console.log("HTML upload result:", htmlUploadResult);

        if (htmlUploadResult.success && htmlUploadResult.filePath) {
          updatedContentPath = htmlUploadResult.filePath;
        } else {
          toast.error("Failed to save content");
        }
      }

      // Update article with file paths if files were uploaded
      if (
        (imageFile || content) &&
        savedArticleId &&
        (updatedImagePath !== image || updatedContentPath !== content)
      ) {
        await updateArticle.mutateAsync({
          id: savedArticleId,
          ...articleData,
          image: updatedImagePath,
          content: updatedContentPath,
        });
      }

      toast.dismiss();
      toast.success(isEdit ? "Article updated!" : "Article created!");
      router.push("/admin/articles");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to save article");
      console.error("Failed to save article:", error);
    } finally {
      setIsUploading(false);
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
    imageFile,
    setImageFile,
    isUploading,
  };

  const handlers: ArticleFormHandlers = {
    handleTitleChange,
    handleSubmit,
    createArticle,
    updateArticle,
  };

  return { data, state, handlers };
};
