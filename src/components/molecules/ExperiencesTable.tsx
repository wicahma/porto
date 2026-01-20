import { Badge } from "@/components/atoms/chips/badge";
import { Button } from "@/components/atoms/buttons/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { getNewestJob, formatDateRange } from "@/utils/helper/date.utils";
import RenderIf from "@/utils/helper/render-if";
import { Experience } from "@/interface/entities/experience.interface";

interface ExperiencesTableProps {
  experiences: Experience[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ExperiencesTable = ({
  experiences,
  onEdit,
  onDelete,
}: ExperiencesTableProps) => (
  <Table>
    <TableHeader>
      <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
        <TableHead className="text-neutral-300">Position</TableHead>
        <TableHead className="text-neutral-300">Company</TableHead>
        <TableHead className="text-neutral-300">Type</TableHead>
        <TableHead className="text-neutral-300">Period</TableHead>
        <TableHead className="text-neutral-300 text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {experiences.map((experience) => {
        const newestJob = getNewestJob((experience as any)?.jobs || []);
        return (
          <TableRow
            key={experience.id}
            className="border-neutral-800 hover:bg-neutral-800/50"
          >
            <TableCell className="font-medium text-white">
              {newestJob.position}
            </TableCell>
            <TableCell className="text-neutral-400">
              {experience.company}
            </TableCell>
            <TableCell>
              <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                {newestJob.employment_type}
              </Badge>
            </TableCell>
            <TableCell className="text-neutral-400">
              {formatDateRange(
                newestJob.start_date,
                newestJob.end_date ?? undefined,
                newestJob.is_current,
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Link href={`/admin/experiences/${experience.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-neutral-400 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                  onClick={() => onDelete(experience.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
