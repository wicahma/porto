"use client";

import {
  useExperiences,
  useDeleteExperience,
} from "@/hooks/queries/experience.wrapper";
import { getNewestJob, formatDateRange } from "@/utils/helper/date.utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ExperiencesPageContent = () => {
  const { data, isLoading } = useExperiences(1, 100);
  const deleteExperience = useDeleteExperience();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteExperience.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Experiences</h1>
            <p className="text-neutral-400">Manage your work experience</p>
          </div>
          <Link href="/admin/experiences/new">
            <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </Link>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">All Experiences</CardTitle>
            <CardDescription className="text-neutral-400">
              {data?.count ?? 0} experiences total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {data?.data && data.data.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                        <TableHead className="text-neutral-300">
                          Position
                        </TableHead>
                        <TableHead className="text-neutral-300">
                          Company
                        </TableHead>
                        <TableHead className="text-neutral-300">Type</TableHead>
                        <TableHead className="text-neutral-300">
                          Period
                        </TableHead>
                        <TableHead className="text-neutral-300 text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.data.map((experience) => {
                        const newestJob = getNewestJob(
                          (experience as any)?.jobs || [],
                        );
                        return (
                          <TableRow
                            key={experience.id}
                            className="border-neutral-800 hover:bg-neutral-800/50"
                          >
                            <TableCell className="font-medium text-white">
                              {newestJob.position}
                            </TableCell>
                            <TableCell className="text-neutral-400">
                              {experience.company}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                                {newestJob.employment_type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-neutral-400">
                              {formatDateRange(
                                newestJob.start_date,
                                newestJob.end_date ?? undefined,
                                newestJob.is_current,
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/admin/experiences/${experience.id}`}
                                >
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-neutral-400 hover:text-white"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                                  onClick={() => setDeleteId(experience.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-neutral-400 mb-4">No experiences yet</p>
                    <Link href="/admin/experiences/new">
                      <Button className="bg-linear-to-r from-teal-600 to-cyan-600">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Experience
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent className="bg-neutral-900 border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                Delete Experience
              </DialogTitle>
              <DialogDescription className="text-neutral-400">
                Are you sure you want to delete this experience? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteId(null)}
                className="border-neutral-700 text-neutral-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
                disabled={deleteExperience.isPending}
              >
                {deleteExperience.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ExperiencesPageContent;
