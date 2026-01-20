import { Button } from "@/components/atoms/buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/cards/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/popups/dialog";
import { RenderIf, handleTernary } from "@/utils/helper/render-if";
import { useProjectsPageHooks } from "@/hooks/pages/projects-page.hook";
import { ProjectRow } from "@/components/molecules/tables/ProjectRow";

const ProjectsPageContent = () => {
  const hooks = useProjectsPageHooks();
  const { projects, count, isLoading, deleteId } = hooks.data;
  const { setDeleteId } = hooks.state;
  const { handleDelete, deleteProject } = hooks.handlers;

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
            <p className="text-neutral-400">Manage your portfolio projects</p>
          </div>
          <Link href="/admin/projects/new">
            <Button className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </Link>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">All Projects</CardTitle>
            <CardDescription className="text-neutral-400">
              {count} projects total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RenderIf condition={isLoading}>
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </RenderIf>
            <RenderIf condition={!isLoading && projects.length > 0}>
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
                  {projects.map((project) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      onEdit={() => setDeleteId(null)}
                      onDelete={setDeleteId}
                    />
                  ))}
                </TableBody>
              </Table>
            </RenderIf>
            <RenderIf condition={!isLoading && projects.length === 0}>
              <div className="text-center py-12">
                <p className="text-neutral-400 mb-4">No projects yet</p>
                <Link href="/admin/projects/new">
                  <Button className="bg-linear-to-r from-purple-600 to-indigo-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Project
                  </Button>
                </Link>
              </div>
            </RenderIf>
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
                {handleTernary(
                  deleteProject.isPending,
                  "Deleting...",
                  "Delete",
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectsPageContent;
