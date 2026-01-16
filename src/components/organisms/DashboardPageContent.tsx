"use client";

import { useArticleCount } from "@/hooks/queries/useArticles";
import { useProjectCount } from "@/hooks/queries/useProjects";
import { useExperienceCount } from "@/hooks/queries/useExperiences";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Award, Plus, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashboardPageContent = () => {
  const router = useRouter();
  const { data: articleCount, isLoading: loadingArticles } = useArticleCount();
  const { data: projectCount, isLoading: loadingProjects } = useProjectCount();
  const { data: experienceCount, isLoading: loadingExperiences } =
    useExperienceCount();

  const metrics = [
    {
      title: "Total Articles",
      value: articleCount ?? 0,
      icon: FileText,
      gradient: "from-pink-500 to-rose-500",
      href: "/admin/articles",
      loading: loadingArticles,
    },
    {
      title: "Total Projects",
      value: projectCount ?? 0,
      icon: Briefcase,
      gradient: "from-purple-500 to-indigo-500",
      href: "/admin/projects",
      loading: loadingProjects,
    },
    {
      title: "Total Experiences",
      value: experienceCount ?? 0,
      icon: Award,
      gradient: "from-teal-500 to-cyan-500",
      href: "/admin/experiences",
      loading: loadingExperiences,
    },
  ];

  const quickActions = [
    {
      label: "Create Article",
      href: "/admin/articles/new",
      icon: Plus,
      color: "from-pink-600 to-rose-600",
    },
    {
      label: "Create Project",
      href: "/admin/projects/new",
      icon: Plus,
      color: "from-purple-600 to-indigo-600",
    },
    {
      label: "Create Experience",
      href: "/admin/experiences/new",
      icon: Plus,
      color: "from-teal-600 to-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-neutral-400">
            Welcome back! Here's your content overview.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card
                key={metric.title}
                className="border-neutral-800 bg-neutral-900/50 backdrop-blur hover:bg-neutral-900/70 transition-all cursor-pointer group"
                onClick={() => router.push(metric.href)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-400">
                    {metric.title}
                  </CardTitle>
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${metric.gradient}`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {metric.loading ? (
                      <div className="h-9 w-16 bg-neutral-800 animate-pulse rounded" />
                    ) : (
                      metric.value
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 group-hover:text-neutral-400 transition-colors">
                    Click to view all
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href}>
                  <Button
                    className={`w-full h-24 bg-gradient-to-r ${action.color} hover:opacity-90 transition-opacity text-white font-semibold text-lg`}
                  >
                    <Icon className="mr-2 h-5 w-5" />
                    {action.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <Card className="border-neutral-800 bg-neutral-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">Manage Content</CardTitle>
            <CardDescription className="text-neutral-400">
              View and manage all your content
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/admin/articles">
              <Button
                variant="outline"
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Articles
              </Button>
            </Link>
            <Link href="/admin/projects">
              <Button
                variant="outline"
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Projects
              </Button>
            </Link>
            <Link href="/admin/experiences">
              <Button
                variant="outline"
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Experiences
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPageContent;
