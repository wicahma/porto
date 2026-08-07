"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { apiUploadFile } from "@/lib/api/storage.api";
import toast from "react-hot-toast";

export const useArticleFormHooks = (): UseArticleFormHooks => {
  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== "new";
  const articleId = isEdit ? (params.id as string) : null;

  const { data: existingArticle, isLoading } = useArticle(
    articleId || "",
  ) as any;
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
      const generatedSlug = generateSlug(value);
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
        const result = (await createArticle.mutateAsync(articleData)) as any;
        savedArticleId = result?.data?.id || null;
      }

      // After successful database save, upload files if any
      let updatedImagePath = image;
      let updatedContentPath = content;

      if (imageFile && savedArticleId) {
        toast.loading("Uploading image...");
        const uploadResult = await apiUploadFile("images", imageFile);

        if (uploadResult.data?.path) {
          updatedImagePath = uploadResult.data.path;
        } else {
          toast.error("Failed to upload image");
        }
      }

      // Upload HTML content to storage
      if (content && savedArticleId) {
        toast.loading("Saving content...");
        const htmlBlob = new Blob([content], { type: "text/html" });
        const htmlFile = new File(
          [htmlBlob],
          `article_${savedArticleId}_content.html`,
          { type: "text/html" },
        );
        const htmlUploadResult = await apiUploadFile("articles", htmlFile);

        if (htmlUploadResult.data?.path) {
          updatedContentPath = htmlUploadResult.data.path;
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

function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
      .replace(/^-|-$/g, "") || "untitled"
  );
}
