import LoginPage from "@/components/organisms/LoginPage";
import { vals } from "@/constants/val";
import { notFound } from "next/navigation";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) => {
  const sp = await searchParams;
  const resolvedVal = await vals();

  if (sp.key !== resolvedVal.adminSecretKey) {
    return notFound();
  }

  return <LoginPage />;
};

export default page;
