import { Experience } from "@/interface/entities/experience.interface";

export interface ExperiencesPageHook {
  data: {
    experiences: Experience[];
    count: number;
    isLoading: boolean;
    deleteId: string | null;
  };
  handlers: {
    setDeleteId: (id: string | null) => void;
    handleDelete: () => Promise<void>;
  };
}
