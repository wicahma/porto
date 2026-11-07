import Breadcrumb from "@/components/molecules/header/Breadcrumb";
import Infographic from "@/components/molecules/header/Infograpnic";
import SimpleProjectPage from "@/components/organisms/SimpleProjectPage";

export default function ProjectPage() {
  return (
    <div className="w-full min-h-screen pb-16">
      <div className="mb-6 flex flex-col-reverse gap-3 border-b border-neutral-800/60 pb-4">
        <Breadcrumb />
        <Infographic showToggle={false} />
      </div>
      <div className="relative">
        <SimpleProjectPage />
      </div>
    </div>
  );
}
