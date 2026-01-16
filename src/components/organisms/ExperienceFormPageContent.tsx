"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useExperience,
  useCreateExperience,
  useUpdateExperience,
} from "@/hooks/queries/useExperiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const ExperienceFormPageContent = () => {
  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== "new";
  const experienceId = isEdit ? (params.id as string) : null;

  const { data: existingExperience, isLoading } = useExperience(
    experienceId || ""
  );
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [employmentType, setEmploymentType] = useState("FULL TIME");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    if (existingExperience) {
      setCompany(existingExperience.company);
      setPosition(existingExperience.position);
      setEmploymentType(existingExperience.employment_type);
      setDescription(existingExperience.description);
      setTags(existingExperience.tags.join(", "));
      setStartDate(existingExperience.start_date);
      setEndDate(existingExperience.end_date || "");
      setIsCurrent(existingExperience.is_current);
    }
  }, [existingExperience]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const experienceData = {
      company,
      position,
      employment_type: employmentType,
      description,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      start_date: startDate,
      end_date: isCurrent ? undefined : endDate,
      is_current: isCurrent,
    };

    try {
      if (isEdit && experienceId) {
        await updateExperience.mutateAsync({
          id: experienceId,
          ...experienceData,
        });
      } else {
        await createExperience.mutateAsync(experienceData);
      }
      router.push("/admin/experiences");
    } catch (error) {
      console.error("Failed to save experience:", error);
    }
  };

  if (isLoading && isEdit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/experiences">
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
              {isEdit ? "Edit Experience" : "Add Experience"}
            </h1>
            <p className="text-neutral-400">
              {isEdit
                ? "Update your work experience"
                : "Add a new work experience"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
              <CardDescription className="text-neutral-400">
                Company, position, and employment details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-neutral-200">
                  Company *
                </Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-neutral-200">
                  Position *
                </Label>
                <Input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Job title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType" className="text-neutral-200">
                  Employment Type *
                </Label>
                <Select
                  value={employmentType}
                  onValueChange={setEmploymentType}
                >
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700">
                    <SelectItem value="FULL TIME">Full Time</SelectItem>
                    <SelectItem value="PART TIME">Part Time</SelectItem>
                    <SelectItem value="CONTRACT">Contract</SelectItem>
                    <SelectItem value="FREELANCE">Freelance</SelectItem>
                    <SelectItem value="INTERNSHIP">Internship</SelectItem>
                  </SelectContent>
                </Select>
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
                  placeholder="Describe your role and responsibilities"
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-neutral-200">
                  Technologies/Skills{" "}
                  <span className="text-neutral-500 text-sm">
                    (comma-separated)
                  </span>
                </Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="Next.js, React, TypeScript"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Employment Period</CardTitle>
              <CardDescription className="text-neutral-400">
                Start and end dates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-neutral-200">
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="2024"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isCurrent"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-teal-600"
                />
                <Label
                  htmlFor="isCurrent"
                  className="text-neutral-200 cursor-pointer"
                >
                  I currently work here
                </Label>
              </div>

              {!isCurrent && (
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-neutral-200">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                    placeholder="2025"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/admin/experiences">
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
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
              disabled={
                createExperience.isPending || updateExperience.isPending
              }
            >
              <Save className="mr-2 h-4 w-4" />
              {createExperience.isPending || updateExperience.isPending
                ? "Saving..."
                : isEdit
                ? "Update Experience"
                : "Add Experience"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceFormPageContent;
