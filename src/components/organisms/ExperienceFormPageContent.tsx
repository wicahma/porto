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
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { formatDateRange } from "@/utils/helper/date.utils";
import toast from "react-hot-toast";
import { CreateExperienceInput } from "@/interface/entities/experience.interface";

interface JobFormData {
  id?: string;
  position: string;
  employment_type: string;
  description: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
}

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
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");

  const [jobs, setJobs] = useState<JobFormData[]>([
    {
      position: "",
      employment_type: "Full-time",
      description: "",
      start_date: "",
      end_date: "",
      is_current: false,
    },
  ]);

  const [collapsedJobs, setCollapsedJobs] = useState<boolean[]>([false]);

  useEffect(() => {
    if (existingExperience) {
      setCompany(existingExperience.company);
      setLocation(existingExperience.location);
      setTags((existingExperience?.tags ?? []).join(", "));

      if ((existingExperience?.jobs ?? []).length > 0) {
        const loadedJobs = (existingExperience?.jobs ?? []).map((job) => ({
          id: job.id,
          position: job.position,
          employment_type: job.employment_type,
          description: job.description,
          start_date: job.start_date,
          end_date: job.end_date || "",
          is_current: job.is_current,
        }));
        setJobs(loadedJobs);
      }
    }
  }, [existingExperience]);

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        position: "",
        employment_type: "Full-time",
        description: "",
        start_date: "",
        end_date: "",
        is_current: false,
      },
    ]);
  };

  const removeJob = (index: number) => {
    if (jobs.length > 1) {
      setJobs(jobs.filter((_, i) => i !== index));
      setCollapsedJobs(collapsedJobs.filter((_, i) => i !== index));
    } else {
      toast.error("At least one job position is required");
    }
  };

  const updateJob = (
    index: number,
    field: keyof JobFormData,
    value: string | boolean
  ) => {
    const updatedJobs = [...jobs];
    updatedJobs[index] = { ...updatedJobs[index], [field]: value };
    setJobs(updatedJobs);
  };

  const toggleCollapse = (index: number) => {
    const updated = [...collapsedJobs];
    updated[index] = !updated[index];
    setCollapsedJobs(updated);
  };

  const validateForm = (): boolean => {
    if (!company.trim()) {
      toast.error("Company name is required");
      return false;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return false;
    }

    if (jobs.length === 0) {
      toast.error("At least one job position is required");
      return false;
    }

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      if (!job.position.trim()) {
        toast.error(`Position ${i + 1}: Position title is required`);
        return false;
      }
      if (!job.description.trim()) {
        toast.error(`Position ${i + 1}: Description is required`);
        return false;
      }
      if (!job.start_date) {
        toast.error(`Position ${i + 1}: Start date is required`);
        return false;
      }
      if (!job.is_current && !job.end_date) {
        toast.error(
          `Position ${i + 1}: End date is required (or mark as current)`
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const experienceData: CreateExperienceInput = {
      company,
      location,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      jobs: jobs.map((job) => ({
        position: job.position,
        employment_type: job.employment_type,
        description: job.description,
        start_date: job.start_date,
        end_date: job.is_current ? null : (job.end_date ?? null),
        is_current: job.is_current,
        created_at: null,
        updated_at: null,
        experience_id: "",
        competency: [],
      })),
    };

    try {
      if (isEdit && experienceId) {
        await updateExperience.mutateAsync({
          id: experienceId,
          ...experienceData,
        });
        toast.success("Experience updated successfully!");
      } else {
        await createExperience.mutateAsync(experienceData);
        toast.success("Experience created successfully!");
      }
      router.push("/admin/experiences");
    } catch (error) {
      toast.error("Failed to save experience");
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
                ? "Update work experience with multiple positions"
                : "Add a new work experience with multiple positions"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Company Information</CardTitle>
              <CardDescription className="text-neutral-400">
                Basic information about the company
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-neutral-200">
                  Company Name *
                </Label>
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="e.g., Google, Microsoft, Startup Inc"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-neutral-200">
                  Location *
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  placeholder="e.g., Jakarta, Indonesia"
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
                  placeholder="React, TypeScript, Next.js, Node.js"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Job Positions</CardTitle>
                  <CardDescription className="text-neutral-400">
                    Add all positions you held at this company
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  onClick={addJob}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Position
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobs.map((job, index) => (
                <Card
                  key={index}
                  className="border-neutral-700 bg-neutral-800/30"
                >
                  <CardHeader
                    className="cursor-pointer hover:bg-neutral-800/50 transition-colors"
                    onClick={() => toggleCollapse(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {collapsedJobs[index] ? (
                          <ChevronDown className="h-5 w-5 text-neutral-400" />
                        ) : (
                          <ChevronUp className="h-5 w-5 text-neutral-400" />
                        )}
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg">
                            {job.position || `Position ${index + 1}`}
                          </CardTitle>
                          <CardDescription className="text-neutral-400 text-sm">
                            {job.employment_type}
                            {job.start_date &&
                              ` • ${formatDateRange(
                                job.start_date,
                                job.end_date,
                                job.is_current
                              )}`}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.is_current && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Current
                          </Badge>
                        )}
                        {jobs.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeJob(index);
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {!collapsedJobs[index] && (
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label className="text-neutral-200">
                          Position Title *
                        </Label>
                        <Input
                          value={job.position}
                          onChange={(e) =>
                            updateJob(index, "position", e.target.value)
                          }
                          required
                          className="bg-neutral-800 border-neutral-700 text-white"
                          placeholder="e.g., Senior Software Engineer"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-neutral-200">
                          Employment Type *
                        </Label>
                        <Select
                          value={job.employment_type}
                          onValueChange={(value) =>
                            updateJob(index, "employment_type", value)
                          }
                        >
                          <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-800 border-neutral-700">
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                            <SelectItem value="Internship">
                              Internship
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-neutral-200">
                          Description *
                        </Label>
                        <Textarea
                          value={job.description}
                          onChange={(e) =>
                            updateJob(index, "description", e.target.value)
                          }
                          required
                          className="bg-neutral-800 border-neutral-700 text-white"
                          placeholder="Describe your role and responsibilities..."
                          rows={5}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-neutral-200">
                            Start Date *
                          </Label>
                          <Input
                            type="date"
                            value={job.start_date}
                            onChange={(e) =>
                              updateJob(index, "start_date", e.target.value)
                            }
                            required
                            className="bg-neutral-800 border-neutral-700 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-neutral-200">End Date</Label>
                          <Input
                            type="date"
                            value={job.end_date || ""}
                            onChange={(e) =>
                              updateJob(index, "end_date", e.target.value)
                            }
                            disabled={job.is_current}
                            className="bg-neutral-800 border-neutral-700 text-white disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`current-${index}`}
                          checked={job.is_current}
                          onChange={(e) =>
                            updateJob(index, "is_current", e.target.checked)
                          }
                          className="h-4 w-4 rounded border-neutral-700 bg-neutral-800 text-teal-600"
                        />
                        <Label
                          htmlFor={`current-${index}`}
                          className="text-neutral-200 cursor-pointer"
                        >
                          I currently work in this position
                        </Label>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
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
                  : "Create Experience"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceFormPageContent;
