import {
  useCreateProject,
  useProject,
  useUpdateProject,
} from "@/hooks/queries/project.wrapper";
import { ProjectFormData } from "@/interface/pages/project-form.interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiUploadFile } from "@/lib/api/storage.api";

export const useProjectFormHooks = () => {
  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== "new";
  const projectId = isEdit ? (params.id as string) : null;

  const { data: existingProject, isLoading } = useProject(
    projectId || "",
  ) as any;
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [year, setYear] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (existingProject) {
      setTitle(existingProject.title);
      setDescription(existingProject.description);
      setProblem(existingProject.problem || "");
      setSolution(existingProject.solution || "");
      setImage(existingProject.image);
      setTags(existingProject?.tags?.join(", ") || "");
      setYear(existingProject.year);
      setLink(existingProject.link || "");
    }
  }, [existingProject]);

  const validateForm = (): boolean => {
    if (!title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!year.trim()) {
      toast.error("Year is required");
      return false;
    }
    if (!image.trim()) {
      toast.error("Image URL is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsUploading(true);

    try {
      const projectData: ProjectFormData = {
        title,
        description,
        problem,
        solution,
        image, // Temporary, will be updated after upload
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        year,
        link: link || undefined,
      };

      let savedProjectId = projectId;

      if (isEdit && projectId) {
        await updateProject.mutateAsync({ id: projectId, ...projectData });
      } else {
        const result = (await createProject.mutateAsync(projectData)) as any;
        savedProjectId = result?.data?.id || null;
      }

      // After successful database save, upload image if any
      let updatedImagePath = image;

      if (imageFile && savedProjectId) {
        toast.loading("Uploading image...");
        const uploadResult = await apiUploadFile("images", imageFile);

        if (uploadResult.data?.path) {
          updatedImagePath = uploadResult.data.path;
        } else {
          toast.error("Failed to upload image");
        }
      }

      // Update project with file path if file was uploaded
      if (imageFile && savedProjectId && updatedImagePath !== image) {
        await updateProject.mutateAsync({
          id: savedProjectId,
          ...projectData,
          image: updatedImagePath,
        });
      }

      toast.dismiss();
      toast.success(
        isEdit
          ? "Project updated successfully!"
          : "Project created successfully!",
      );
      router.push("/admin/projects");
    } catch (error) {
      console.error("Failed to save project:", error);
      toast.dismiss();
      toast.error("Failed to save project");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    data: {
      title,
      description,
      problem,
      solution,
      image,
      tags,
      year,
      link,
    },
    state: {
      setTitle,
      setDescription,
      setProblem,
      setSolution,
      setImage,
      setTags,
      setYear,
      setLink,
      isEdit,
      isLoading,
      imageFile,
      setImageFile,
      isUploading,
    },
    handlers: {
      createProject,
      updateProject,
      handleSubmit,
      validateForm,
    },
  };
};
