import { experiences } from "@/constants/dummies/experience-page";
import { notFound } from "next/navigation";
import ExperienceDetail from "@/components/organisms/ExperienceDetail";

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id,
  }));
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experienceData = experiences.find((exp) => exp.id === id);

  if (!experienceData) {
    notFound();
  }

  return <ExperienceDetail experience={experienceData} />;
}
