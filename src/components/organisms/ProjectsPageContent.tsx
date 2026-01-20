"use client";

import { useProjects, useDeleteProject } from "@/hooks/queries/project.wrapper";
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
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
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

const ProjectsPageContent = () => {
  const { data, isLoading } = useProjects(1, 100);
  const deleteProject = useDeleteProject();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProject.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
            <p className="text-neutral-400">Manage your portfolio projects</p>
          </div>
          <Link href="/admin/projects/new">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </Link>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">All Projects</CardTitle>
            <CardDescription className="text-neutral-400">
              {data?.count ?? 0} projects total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {!isLoading && data?.data && data.data.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                    <TableHead className="text-neutral-300">Title</TableHead>
                    <TableHead className="text-neutral-300">Year</TableHead>
                    <TableHead className="text-neutral-300">Tags</TableHead>
                    <TableHead className="text-neutral-300">Link</TableHead>
                    <TableHead className="text-neutral-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((project) => (
                    <TableRow
                      key={project.id}
                      className="border-neutral-800 hover:bg-neutral-800/50"
                    >
                      <TableCell className="font-medium text-white">
                        {project.title}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {project.year}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-neutral-400">
                        {project.tags && project.tags.length > 0 && (
                          <>
                            {project.tags.slice(0, 2).join(", ")}
                            {project.tags.length > 2 &&
                              ` +${project.tags.length - 2}`}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-neutral-600">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/projects/${project.id}`}>
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
                            onClick={() => setDeleteId(project.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {!isLoading && (!data?.data || data.data.length === 0) && (
              <div className="text-center py-12">
                <p className="text-neutral-400 mb-4">No projects yet</p>
                <Link href="/admin/projects/new">
                  <Button className="bg-linear-to-r from-purple-600 to-indigo-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Project
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent className="bg-neutral-900 border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-white">Delete Project</DialogTitle>
              <DialogDescription className="text-neutral-400">
                Are you sure you want to delete this project? This action cannot
                be undone.
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
                disabled={deleteProject.isPending}
              >
                {deleteProject.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectsPageContent;
