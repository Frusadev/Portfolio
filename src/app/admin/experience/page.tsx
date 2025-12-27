import { getExperience, deleteExperience } from "@/app/actions/portfolio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

export default async function AdminExperiencePage() {
  const experience = await getExperience();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Experience</h1>
        <Link href="/admin/experience/new">
          <Button>Add Experience</Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experience.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No experience found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              experience.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="font-medium">{exp.company}</TableCell>
                  <TableCell>{exp.position}</TableCell>
                  <TableCell>
                    {new Date(exp.startDate).toLocaleDateString()} -{" "}
                    {exp.current
                      ? "Present"
                      : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <div className="flex justify-end items-center gap-2">
                      <Link href={`/admin/experience/${exp.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteExperience(exp.id);
                        }}
                      >
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
