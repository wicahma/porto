import { apiGetExperienceById } from "@/lib/api/experience.api";
import ExperienceDetailView, {
  ExperienceDetailData,
} from "@/components/organisms/ExperienceDetailView";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ExperiencePageProps {
  params: Promise<{ id: string }>;
}

const isExperiencePayload = (
  value: unknown,
): value is ExperienceDetailData =>
  typeof value === "object" &&
  value !== null &&
  "company" in value &&
  typeof value.company === "string";

async function loadExperience(id: string): Promise<ExperienceDetailData | null> {
  try {
    const result = await apiGetExperienceById(id);
    if (result.status === "error") return null;
    return isExperiencePayload(result.data) ? result.data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { id } = await params;
  const experience = await loadExperience(id);

  if (!experience) return { title: "Experience" };

  const company = experience.company ?? "Experience";
  const role = experience.jobs?.[0]?.position;

  return {
    title: role ? `${role} at ${company}` : company,
    description:
      experience.jobs?.[0]?.description ??
      `Positions and contributions at ${company}.`,
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { id } = await params;
  const experience = await loadExperience(id);

  if (!experience) {
    notFound();
  }

  return <ExperienceDetailView experience={experience} id={id} />;
}
