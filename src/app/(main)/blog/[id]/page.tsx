import BlogDetail from "@/components/organisms/BlogDetail";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const page: React.FC<PageProps> = async ({ params }) => {
  const resolvedParams = await params;
  return <BlogDetail id={resolvedParams.id} />;
};

export default page;
