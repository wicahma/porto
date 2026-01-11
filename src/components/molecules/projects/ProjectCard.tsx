import FolderIcon from "@/assets/svg/folder";
import ProjectIcon from "@/assets/svg/project-icon";

const ProjectCard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3 items-center">
          <ProjectIcon className="aspect-square" />
          <h3 className="text-3xl font-semibold">What i’ve build</h3>
        </div>
        <p className="text-neutral-500 font-semibold text-sm">21 projects</p>
      </div>
      <FolderIcon />
    </div>
  );
};

export default ProjectCard;
