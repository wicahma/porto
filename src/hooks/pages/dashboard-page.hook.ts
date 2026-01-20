import { useArticleCount } from "@/hooks/queries/article.wrapper";
import { useProjectCount } from "@/hooks/queries/project.wrapper";
import { useExperienceCount } from "@/hooks/queries/experience.wrapper";
import { useRouter } from "next/navigation";
import {
  DashboardMetric,
  DashboardQuickAction,
} from "@/interface/pages/dashboard.interface";
import { FileText, Briefcase, Award, Plus } from "lucide-react";

export const useDashboardPage = () => {
  const router = useRouter();
  const { data: articleCount, isLoading: loadingArticles } = useArticleCount();
  const { data: projectCount, isLoading: loadingProjects } = useProjectCount();
  const { data: experienceCount, isLoading: loadingExperiences } =
    useExperienceCount();

  const metrics: DashboardMetric[] = [
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

  const quickActions: DashboardQuickAction[] = [
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

  return {
    router,
    metrics,
    quickActions,
  };
};
