import ProjectIcon from "@/assets/svg/project-icon";
import { useProjects } from "@/hooks/queries/project.wrapper";
import { RenderIf } from "@/utils/helper/render-if";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export const SimpleProjectList = () => {
  const router = useRouter();
  const { data, isLoading } = useProjects(1, 6);
  const projects = (data as any)?.projects || [];

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/project")}
        className="flex items-center justify-between w-full group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <ProjectIcon className="w-7 h-7" />
          <h3 className="text-2xl font-bold group-hover:text-[#02C380] transition-colors">
            Featured Projects
          </h3>
        </div>
        <span className="text-xs font-semibold text-neutral-500 group-hover:text-neutral-300 transition-colors">
          View all →
        </span>
      </button>

      <RenderIf condition={isLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-neutral-900/60 border border-neutral-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </RenderIf>

      <RenderIf condition={!isLoading && projects.length > 0}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj: any) => (
            <div
              key={proj.id}
              onClick={() => router.push("/project")}
              className="p-5 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-lg group-hover:text-[#02C380] transition-colors line-clamp-1">
                    {proj.title}
                  </h4>
                  <div className="flex items-center gap-2 shrink-0">
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-neutral-400 hover:text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-neutral-400 text-sm mt-2 line-clamp-2">
                  {proj.description}
                </p>
              </div>

              {proj.tags && proj.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {proj.tags.slice(0, 4).map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-800 text-neutral-300 border border-neutral-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </RenderIf>
    </div>
  );
};

export default SimpleProjectList;
