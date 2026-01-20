import { Badge } from "@/components/atoms/chips/badge";
import { Button } from "@/components/atoms/buttons/button";
import { TableCell, TableRow } from "@/components/atoms/table";
import Link from "next/link";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { RenderIf } from "@/utils/helper/render-if";
import { ProjectTableRow } from "@/interface/pages/projects-page.interface";

interface ProjectTableRowProps {
  project: ProjectTableRow;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProjectRow: React.FC<ProjectTableRowProps> = ({
  project,
  onEdit,
  onDelete,
}) => (
  <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
    <TableCell className="font-medium text-white">{project.title}</TableCell>
    <TableCell>
      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
        {project.year}
      </Badge>
    </TableCell>
    <TableCell className="text-neutral-400">
      <RenderIf condition={!!project.tags && project.tags.length > 0}>
        <>
          {project.tags.slice(0, 2).join(", ")}
          <RenderIf condition={project.tags.length > 2}>
            {` +${project.tags.length - 2}`}
          </RenderIf>
        </>
      </RenderIf>
    </TableCell>
    <TableCell>
      <RenderIf condition={!!project.link}>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
        </a>
      </RenderIf>
      <RenderIf condition={!project.link}>
        <span className="text-neutral-600">-</span>
      </RenderIf>
    </TableCell>
    <TableCell className="text-right">
      <div className="flex items-center justify-end gap-2">
        <Link href={`/admin/projects/${project.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-400 hover:text-white"
            onClick={() => onEdit(project.id)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
);
