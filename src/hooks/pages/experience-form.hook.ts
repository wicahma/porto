import {
  useCreateExperience,
  useExperience,
  useUpdateExperience,
} from "@/hooks/queries/experience.wrapper";
import {
  CreateExperienceInput,
  JobFormData,
} from "@/interface/entities/experience.interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useExperienceFormHooks = () => {
  const router = useRouter();
  const params = useParams();
  const isEdit = params?.id && params.id !== "new";
  const experienceId = isEdit ? (params.id as string) : null;

  const { data: rawExperience, isLoading } = useExperience(experienceId || "");
  const existingExperience = rawExperience as any;
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();

  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");

  const [jobs, setJobs] = useState<JobFormData[]>([
    {
      position: "",
      employment_type: "Full-time",
      description: "",
      competency: "",
      start_date: "",
      end_date: "",
      is_current: false,
    },
  ]);

  const [collapsedJobs, setCollapsedJobs] = useState<boolean[]>([false]);

  useEffect(() => {
    if (existingExperience) {
      setCompany(existingExperience.company);
      setLocation(existingExperience.location);
      setTags((existingExperience?.tags ?? []).join(", "));

      if ((existingExperience?.jobs ?? []).length > 0) {
        const loadedJobs = ((existingExperience?.jobs ?? []) as any[]).map(
          (job: any) => ({
            id: job.id,
            position: job.position,
            employment_type: job.employment_type,
            competency: job.competency.join(", "),
            description: job.description,
            start_date: job.start_date,
            end_date: job.end_date || "",
            is_current: job.is_current,
          }),
        );
        setJobs(loadedJobs);
      }
    }
  }, [existingExperience]);

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        position: "",
        employment_type: "Full-time",
        description: "",
        competency: "",
        start_date: "",
        end_date: "",
        is_current: false,
      },
    ]);
  };

  const removeJob = (index: number) => {
    if (jobs.length > 1) {
      setJobs(jobs.filter((_, i) => i !== index));
      setCollapsedJobs(collapsedJobs.filter((_, i) => i !== index));
    } else {
      toast.error("At least one job position is required");
    }
  };

  const updateJob = (
    index: number,
    field: keyof JobFormData,
    value: string | boolean,
  ) => {
    const updatedJobs = [...jobs];
    updatedJobs[index] = { ...updatedJobs[index], [field]: value };
    setJobs(updatedJobs);
  };

  const toggleCollapse = (index: number) => {
    const updated = [...collapsedJobs];
    updated[index] = !updated[index];
    setCollapsedJobs(updated);
  };

  const validateForm = (): boolean => {
    if (!company.trim()) {
      toast.error("Company name is required");
      return false;
    }

    if (!location.trim()) {
      toast.error("Location is required");
      return false;
    }

    if (jobs.length === 0) {
      toast.error("At least one job position is required");
      return false;
    }

    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      if (!job.position.trim()) {
        toast.error(`Position ${i + 1}: Position title is required`);
        return false;
      }
      if (!job.description.trim()) {
        toast.error(`Position ${i + 1}: Description is required`);
        return false;
      }
      if (!job.start_date) {
        toast.error(`Position ${i + 1}: Start date is required`);
        return false;
      }
      if (!job.is_current && !job.end_date) {
        toast.error(
          `Position ${i + 1}: End date is required (or mark as current)`,
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const experienceData: CreateExperienceInput = {
      company,
      location,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      jobs: jobs.map((job) => ({
        position: job.position,
        employment_type: job.employment_type,
        description: job.description,
        start_date: job.start_date,
        end_date: job.is_current ? null : (job.end_date ?? null),
        is_current: job.is_current,
        created_at: null,
        updated_at: null,
        experience_id: "",
        competency: job.competency
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      })),
    };

    try {
      if (isEdit && experienceId) {
        await updateExperience.mutateAsync({
          id: experienceId,
          ...experienceData,
        });
        toast.success("Experience updated successfully!");
      } else {
        await createExperience.mutateAsync(experienceData);
        toast.success("Experience created successfully!");
      }
      router.push("/admin/experiences");
    } catch {
      toast.error("Failed to save experience");
    }
  };

  return {
    data: {
      company,
      location,
      tags,
      jobs,
      collapsedJobs,
    },
    state: {
      setCompany,
      setLocation,
      setTags,
      setCollapsedJobs,
      isEdit,
      isLoading,
    },
    handlers: {
      createExperience,
      updateExperience,
      handleSubmit,
      validateForm,
      toggleCollapse,
      updateJob,
      removeJob,
      addJob,
    },
  };
};
