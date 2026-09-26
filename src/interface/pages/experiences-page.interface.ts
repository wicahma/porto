import { Experience } from "@/interface/entities/experience.interface";

export interface ExperiencesPageHook {
  data: {
    experiences: Experience[];
    count: number;
    page: number;
    totalPages: number;
    isLoading: boolean;
    deleteId: string | null;
  };
  handlers: {
    setDeleteId: (id: string | null) => void;
    setPage: (page: number) => void;
    handleDelete: () => Promise<void>;
  };
}
