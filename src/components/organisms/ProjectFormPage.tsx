"use client";

import ProjectForm from "@/components/molecules/forms/ProjectForm";
import { useProjectFormPage } from "@/hooks/pages/use-project-form-page";

const ProjectFormPageContent = () => {
  const hooks = useProjectFormPage();
  return (
    <ProjectForm
      data={hooks.data}
      state={hooks.state}
      handlers={hooks.handlers}
    />
  );
};

export default ProjectFormPageContent;
