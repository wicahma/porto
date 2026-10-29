"use client";
import { Chat } from "@/assets/svg/chat";
import { Download } from "@/assets/svg/download";
import ButtonBig from "@/components/atoms/buttons/ButtonBig";
import { vals } from "@/constants/val";
import { useExperiences } from "@/hooks/queries/experience.wrapper";
import { useProjects } from "@/hooks/queries/project.wrapper";
import { cn } from "@/utils/helper/cn";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonsLeft = ({
  simpleView = false,
}: Readonly<{
  simpleView?: boolean;
}>) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: experiencesData } = useExperiences(1, 100);
  const { data: projectsData } = useProjects(1, 100);

  const handleDownloadCV = async () => {
    try {
      setIsGenerating(true);

      const experiences = (experiencesData as any)?.experiences || [];
      const projects = (projectsData as any)?.projects || [];

      const { pdf } = await import("@react-pdf/renderer");
      const CVDocument = (await import("@/components/molecules/pdf/CVDocument"))
        .default;

      const blob = await pdf(
        <CVDocument experiences={experiences} projects={projects} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Teguh_Dwi_Cahya_Kusuma_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("CV downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate CV. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRedirectToEmail = async () => {
    window.open(`mailto:${(await vals()).email}`, "_blank");
  };

  if (simpleView) {
    return (
      <div className="flex items-center gap-4 mt-6">
        <button
          type="button"
          onClick={handleRedirectToEmail}
          className="cursor-pointer bg-[#FF3714] hover:bg-[#ff4e2e] text-white flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
        >
          <Chat className="w-5 h-4" />
          <span>Open to discuss</span>
        </button>
        <button
          type="button"
          onClick={handleDownloadCV}
          disabled={isGenerating}
          className="cursor-pointer bg-[#191919] hover:bg-[#252525] border border-neutral-700/60 text-white flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
        >
          <Download className="w-4 h-4" />
          <span>{isGenerating ? "Generating..." : "Download CV"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="md:px-3.5 mt-5 gap-2 flex justify-between">
      <ButtonBig
        onClick={handleRedirectToEmail}
        className="hoverable bg-red-600 flex gap-3 justify-center items-center"
      >
        <Chat className="md:w-7 md:h-7 w-5 h-5" /> Open to discuss
      </ButtonBig>
      <ButtonBig
        className="hoverable bg-[#222222]"
        onClick={handleDownloadCV}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Download CV"}
      </ButtonBig>
    </div>
  );
};

export default ButtonsLeft;
