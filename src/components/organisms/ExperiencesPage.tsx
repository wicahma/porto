"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/cards/card";
import { Button } from "@/components/atoms/buttons/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/popups/dialog";
import RenderIf from "@/utils/helper/render-if";
import { ExperiencesTable } from "@/components/molecules/ExperiencesTable";
import { useExperiencesPageHook } from "@/hooks/pages/experiences-page.hook";

const ExperiencesPageContent = () => {
  const {
    data: { experiences, count, isLoading, deleteId },
    handlers: { setDeleteId, handleDelete },
  } = useExperiencesPageHook();

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Experiences</h1>
            <p className="text-neutral-400">Manage your work experience</p>
          </div>
          <Link href="/admin/experiences/new">
            <Button className="bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </Link>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">All Experiences</CardTitle>
            <CardDescription className="text-neutral-400">
              {count} experiences total
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RenderIf condition={isLoading}>
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </RenderIf>
            <RenderIf condition={!isLoading && experiences.length > 0}>
              <ExperiencesTable
                experiences={experiences}
                onEdit={() => {}}
                onDelete={setDeleteId}
              />
            </RenderIf>
            <RenderIf condition={!isLoading && experiences.length === 0}>
              <div className="text-center py-12">
                <p className="text-neutral-400 mb-4">No experiences yet</p>
                <Link href="/admin/experiences/new">
                  <Button className="bg-linear-to-r from-teal-600 to-cyan-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Experience
                  </Button>
                </Link>
              </div>
            </RenderIf>
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
                // You may want to add a loading state from the hook if needed
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ExperiencesPageContent;
