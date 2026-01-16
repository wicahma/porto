"use client";
import FolderIcon from "@/assets/svg/folder";
import ProjectIcon from "@/assets/svg/project-icon";
import { useProjectCount } from "@/hooks/queries/useProjects";
import { useNavigationStore } from "@/store/navigationStore";

const ProjectCard = () => {
  const setPage = useNavigationStore((state) => state.setPage);
  const { data: count, isLoading } = useProjectCount();

  const handleSetPage = () => {
    setPage("project");
  };

  return (
    <button onClick={handleSetPage} className="cursor-pointer w-full">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3 items-center">
          <ProjectIcon className="aspect-square" />
          <h3 className="text-3xl font-semibold">What i’ve build</h3>
        </div>
        <div className="text-neutral-500 font-semibold text-sm">
          {isLoading ? (
            <div className="h-4 w-20 bg-neutral-800 animate-pulse rounded" />
          ) : (
            <p>{count || 0} projects</p>
          )}
        </div>
      </div>
      <FolderIcon />
    </button>
  );
};

export default ProjectCard;
