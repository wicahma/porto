"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/inputs/select";
import { Badge } from "@/components/atoms/chips/badge";
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
import { RenderIf, handleTernary } from "@/utils/helper/render-if";
import { useExperienceFormHooks } from "@/hooks/pages/experience-form.hook";

const ExperienceFormPageContent = () => {
  const hooks = useExperienceFormHooks();

  const { collapsedJobs, company, jobs, location, tags } = hooks.data;
  const { isEdit, isLoading, setCompany, setLocation, setTags } = hooks.state;
  const {
    addJob,
    removeJob,
    updateJob,
    toggleCollapse,
    handleSubmit,
    createExperience,
    updateExperience,
  } = hooks.handlers;

  if (isLoading && isEdit) {
    return (
      <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
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
              {handleTernary(!!isEdit, "Edit Experience", "Add Experience")}
            </h1>
            <p className="text-neutral-400">
              {handleTernary(
                !!isEdit,
                "Update work experience with multiple positions",
                "Add a new work experience with multiple positions",
              )}
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
                  className="bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Position
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobs.map((job, index) => (
                <Card
                  key={`${job.id}${index}`}
                  className="border-neutral-700 bg-neutral-800/30"
                >
                  <CardHeader
                    className="cursor-pointer hover:bg-neutral-800/50 transition-colors"
                    onClick={() => toggleCollapse(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <RenderIf condition={collapsedJobs[index]}>
                          <ChevronDown className="h-5 w-5 text-neutral-400" />
                        </RenderIf>
                        <RenderIf condition={!collapsedJobs[index]}>
                          <ChevronUp className="h-5 w-5 text-neutral-400" />
                        </RenderIf>
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
                                job.is_current,
                              )}`}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <RenderIf condition={job.is_current}>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Current
                          </Badge>
                        </RenderIf>

                        <RenderIf condition={jobs.length > 1}>
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
                        </RenderIf>
                      </div>
                    </div>
                  </CardHeader>

                  <RenderIf condition={!collapsedJobs[index]}>
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

                      <div className="space-y-2">
                        <Label className="text-neutral-200">Competency *</Label>
                        <Textarea
                          value={job.competency}
                          onChange={(e) =>
                            updateJob(index, "competency", e.target.value)
                          }
                          required
                          className="bg-neutral-800 border-neutral-700 text-white"
                          placeholder="List the key skills and competencies... (separated by commas)"
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
                  </RenderIf>
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
              className="bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
              disabled={
                createExperience.isPending || updateExperience.isPending
              }
            >
              <Save className="mr-2 h-4 w-4" />
              {handleTernary(
                createExperience.isPending || updateExperience.isPending,
                "Saving...",
                undefined,
              )}
              {handleTernary(
                Boolean(
                  (!createExperience.isPending &&
                    !updateExperience.isPending) ||
                  isEdit,
                ),
                "Update Experience",
                "Create Experience",
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceFormPageContent;
