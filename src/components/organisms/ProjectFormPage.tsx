"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useProject,
  useCreateProject,
  useUpdateProject,
} from "@/hooks/queries/project.wrapper";
import { Button } from "@/components/atoms/buttons/button";
import { Input } from "@/components/atoms/inputs/input";
import { Label } from "@/components/atoms/inputs/label";
import { Textarea } from "@/components/atoms/inputs/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/cards/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const ProjectFormPageContent = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
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
      } else {
        await createProject.mutateAsync(projectData);
      }
      router.push("/admin/projects");
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  if (isLoading && isEdit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
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
              {isEdit ? "Edit Project" : "Create Project"}
            </h1>
            <p className="text-neutral-400">
              {isEdit
                ? "Update your project"
                : "Add a new project to your portfolio"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
              <CardDescription className="text-neutral-400">
                Project title, description, and metadata
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
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Enter project title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-neutral-200">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Brief description of the project"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-neutral-200">
                    Year *
                  </Label>
                  <Input
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="bg-neutral-800 border-neutral-700 text-white"
                    placeholder="2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link" className="text-neutral-200">
                    Project Link
                  </Label>
                  <Input
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-neutral-200">
                  Image URL *
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
                  placeholder="Next.js, TypeScript, Tailwind"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Project Details</CardTitle>
              <CardDescription className="text-neutral-400">
                Problem statement and solution description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problem" className="text-neutral-200">
                  The Problem
                </Label>
                <Textarea
                  id="problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Describe the problem this project solves"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solution" className="text-neutral-200">
                  The Solution
                </Label>
                <Textarea
                  id="solution"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Describe how this project solves the problem"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/admin/projects">
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
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              disabled={createProject.isPending || updateProject.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {createProject.isPending || updateProject.isPending
                ? "Saving..."
                : isEdit
                  ? "Update Project"
                  : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormPageContent;
