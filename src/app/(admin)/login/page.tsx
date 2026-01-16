import LoginPage from "@/components/organisms/LoginPage";
import { env } from "@/constants/env";
import { notFound } from "next/navigation";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) => {
  const sp = await searchParams;

  if (sp.key !== env.adminSecretKey) {
    return notFound();
  }

  return <LoginPage />;
};

export default page;
