"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/cards/card";
import { Button } from "@/components/atoms/buttons/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useDashboardPage } from "@/hooks/pages/use-dashboard-page";
import { RenderIf } from "@/utils/helper/render-if";

const DashboardPage = () => {
  const { router, metrics, quickActions } = useDashboardPage();

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8">
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
                    className={`p-2 rounded-lg bg-linear-to-br ${metric.gradient}`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    <RenderIf condition={metric.loading}>
                      <div className="h-9 w-16 bg-neutral-800 animate-pulse rounded" />
                    </RenderIf>
                    <RenderIf condition={!metric.loading}>
                      {metric.value}
                    </RenderIf>
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
                    className={`w-full h-24 bg-linear-to-r ${action.color} hover:opacity-90 transition-opacity text-white font-semibold text-lg`}
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

export default DashboardPage;
