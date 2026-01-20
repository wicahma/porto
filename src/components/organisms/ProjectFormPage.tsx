"use client";

import ProjectForm from "@/components/molecules/forms/ProjectForm";
import { useProjectFormHooks } from "@/hooks/pages/project-form.hook";

const ProjectFormPageContent = () => {
  const hooks = useProjectFormHooks();
  return (
    <ProjectForm
      data={hooks.data}
      state={hooks.state}
      handlers={hooks.handlers}
    />
  );
};

export default ProjectFormPageContent;
