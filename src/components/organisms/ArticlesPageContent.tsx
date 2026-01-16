"use client";

import { useArticles, useDeleteArticle } from "@/hooks/queries/useArticles";
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
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
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

const ArticlesPageContent = () => {
  const { data, isLoading } = useArticles(1, 100);
  const deleteArticle = useDeleteArticle();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteArticle.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Articles</h1>
            <p className="text-neutral-400">Manage your blog articles</p>
          </div>
          <Link href="/admin/articles/new">
            <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Article
            </Button>
          </Link>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">All Articles</CardTitle>
            <CardDescription className="text-neutral-400">
              {data?.count ?? 0} articles total
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : data?.data && data.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
                    <TableHead className="text-neutral-300">Title</TableHead>
                    <TableHead className="text-neutral-300">Category</TableHead>
                    <TableHead className="text-neutral-300">Slug</TableHead>
                    <TableHead className="text-neutral-300">Created</TableHead>
                    <TableHead className="text-neutral-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((article) => (
                    <TableRow
                      key={article.id}
                      className="border-neutral-800 hover:bg-neutral-800/50"
                    >
                      <TableCell className="font-medium text-white">
                        {article.title}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                          {article.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-neutral-400 font-mono text-sm">
                        /{article.slug}
                      </TableCell>
                      <TableCell className="text-neutral-400">
                        {new Date(article.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/article/${article.slug}`}
                            target="_blank"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-neutral-400 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/articles/${article.id}`}>
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
                            onClick={() => setDeleteId(article.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="text-neutral-400 mb-4">No articles yet</p>
                <Link href="/admin/articles/new">
                  <Button className="bg-gradient-to-r from-pink-600 to-rose-600">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Article
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent className="bg-neutral-900 border-neutral-800">
            <DialogHeader>
              <DialogTitle className="text-white">Delete Article</DialogTitle>
              <DialogDescription className="text-neutral-400">
                Are you sure you want to delete this article? This action cannot
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
                disabled={deleteArticle.isPending}
              >
                {deleteArticle.isPending ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ArticlesPageContent;
