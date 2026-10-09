import type { Metadata } from "next";
import { getMachines } from "~/data/machines";
import { AdminLogin } from "../admin-login";
import { checkAdminAuth } from "../login-actions";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";

export const metadata: Metadata = {
  title: "Machines",
};

export default async function AdminMachinesPage() {
  if (!(await checkAdminAuth())) {
    return <AdminLogin />;
  }

  const machines = await getMachines();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Machines</h1>
          <p className="text-sm text-(color:--muted-foreground)">
            {machines.length} machines in the collection
          </p>
        </div>
        <Button disabled title="Needs a machines table in the database first">
          + Add machine
        </Button>
      </div>

      <p className="rounded-md border border-(color:--border) bg-(color:--muted)/50 px-4 py-3 text-sm text-(color:--muted-foreground)">
        Read-only for now: adding and editing machines is not built yet.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Collection</CardTitle>
          <CardDescription>
            Ratings and IDs come from the Internet Pinball Database.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Name</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>IPDB rating</TableHead>
                <TableHead className="pr-6">IPDB</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.ipdbId}>
                  <TableCell className="pl-6 font-medium">
                    {machine.name}
                  </TableCell>
                  <TableCell>{machine.manufacturer}</TableCell>
                  <TableCell className="tabular-nums">{machine.year}</TableCell>
                  <TableCell className="tabular-nums">
                    {machine.rating}
                  </TableCell>
                  <TableCell className="pr-6">
                    <a
                      href={machine.ipdbUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-(color:--muted-foreground)"
                    >
                      #{machine.ipdbId}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
