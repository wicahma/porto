"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArticleFormState,
  ArticleFormHandlers,
  ArticleFormData,
  UseArticleFormHooks,
} from "@/interface/molecules/article-form";
import {
  useArticle,
  useCreateArticle,
  useUpdateArticle,
} from "../queries/article.wrapper";
import { apiUploadFile, apiDeleteFiles } from "@/lib/api/storage.api";
import {
  collectStorageKeys,
  getStorageFileUrl,
  isStorageKey,
} from "@/utils/helper/storage";
import toast from "react-hot-toast";

export const useArticleFormPage = (): UseArticleFormHooks => {
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
      setCategory(existingArticle.category);
      setImage(existingArticle.image);
      setTags(existingArticle?.tags?.join(", ") || "");
      setReadTime(existingArticle.read_time);
      setMetaTitle(existingArticle.meta_title || "");
      setMetaDescription(existingArticle.meta_description || "");
      setMetaKeywords(existingArticle.meta_keywords?.join(", ") || "");
      setOgImage(existingArticle.og_image || "");

      // Content is stored as an S3 key once uploaded. Load the real HTML so the
      // editor never shows (and re-saves) the raw key, which would destroy it.
      const raw = existingArticle.content || "";
      if (isStorageKey(raw)) {
        let cancelled = false;
        fetch(getStorageFileUrl(raw))
          .then((res) => (res.ok ? res.text() : ""))
          .then((html) => {
            if (cancelled) return;
            if (html) setContent(html);
            else {
              // Keep the key so the stored HTML is never overwritten with junk.
              setContent(raw);
              toast.error("Could not load article content");
            }
          })
          .catch(() => {
            if (cancelled) return;
            setContent(raw);
            toast.error("Could not load article content");
          });
        return () => {
          cancelled = true;
        };
      }
      setContent(raw);
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
      const previousKeys = isEdit
        ? collectStorageKeys(
            existingArticle?.image,
            existingArticle?.content,
            existingArticle?.og_image,
          )
        : [];

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

      // Replaced uploads are now unreferenced: remove them so files don't pile up.
      const stale = previousKeys.filter(
        (key) =>
          key !== updatedImagePath &&
          key !== updatedContentPath &&
          key !== (ogImage || updatedImagePath),
      );
      if (stale.length) await apiDeleteFiles(stale).catch(() => {});

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
