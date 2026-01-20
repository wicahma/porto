import {
  useCreateProject,
  useProject,
  useUpdateProject,
} from "@/hooks/queries/project.wrapper";
import { ProjectFormData } from "@/interface/pages/project-form.interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProjectFormHooks = () => {
  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== "new";
  const projectId = isEdit ? (params.id as string) : null;

  const { data: existingProject, isLoading } = useProject(projectId || "");
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
    const projectData: ProjectFormData = {
      title,
      description,
      problem,
      solution,
      image,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      year,
      link: link || undefined,
    };
    try {
      if (isEdit && projectId) {
        await updateProject.mutateAsync({ id: projectId, ...projectData });
        toast.success("Project updated successfully!");
      } else {
        await createProject.mutateAsync(projectData);
        toast.success("Project created successfully!");
      }
      router.push("/admin/projects");
    } catch (error) {
      toast.error("Failed to save project");
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
    },
    handlers: {
      createProject,
      updateProject,
      handleSubmit,
      validateForm,
    },
  };
};
