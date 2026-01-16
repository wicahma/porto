"use client";
import { Chat } from "@/assets/svg/chat";
import ButtonBig from "@/components/atoms/ButtonBig";
import { useExperiences } from "@/hooks/queries/useExperiences";
import { useProjects } from "@/hooks/queries/useProjects";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonsLeft = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: experiencesData } = useExperiences(1, 100);
  const { data: projectsData } = useProjects(1, 100);

  const handleDownloadCV = async () => {
    try {
      setIsGenerating(true);

      const experiences = experiencesData?.data || [];
      const projects = projectsData?.data || [];

      // Dynamically import to avoid server-side issues with react-pdf
      const { pdf } = await import("@react-pdf/renderer");
      const CVDocument = (await import("@/components/pdf/CVDocument")).default;

      const blob = await pdf(
        <CVDocument experiences={experiences} projects={projects} />
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
      console.error("Failed to generate CV:", error);
      toast.error("Failed to generate CV. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="px-3.5 flex justify-between mt-5">
      <ButtonBig className="hoverable bg-red-600 flex gap-3 justify-center">
        <Chat /> Open to discuss
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
