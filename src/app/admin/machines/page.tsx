import type { Metadata } from "next";
import Link from "next/link";
import { getMachines } from "~/data/machines";
import { AdminLogin } from "../admin-login";
import { checkAdminAuth } from "../login-actions";
import {
  buttonStyles,
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
        <Link href="/admin/machines/new" className={buttonStyles()}>
          + Add machine
        </Link>
      </div>

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
                <TableHead>IPDB</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell className="pl-6 font-medium">
                    {machine.name}
                  </TableCell>
                  <TableCell>{machine.manufacturer}</TableCell>
                  <TableCell className="tabular-nums">{machine.year}</TableCell>
                  <TableCell className="tabular-nums">
                    {machine.rating}
                  </TableCell>
                  <TableCell>
                    <a
                      href={machine.ipdbUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-(color:--muted-foreground)"
                    >
                      #{machine.ipdbId}
                    </a>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Link
                      href={`/admin/machines/${machine.id}`}
                      className={buttonStyles({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      Edit
                    </Link>
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
