import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "~/db";
import { machines } from "~/db/schema";
import { AdminLogin } from "../../admin-login";
import { checkAdminAuth } from "../../login-actions";
import {
  buttonStyles,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui";
import { MachineForm } from "../machine-form";

export const metadata: Metadata = {
  title: "Edit machine",
};

export default async function EditMachinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await checkAdminAuth())) {
    return <AdminLogin />;
  }

  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id)) {
    notFound();
  }

  const [machine] = await db
    .select()
    .from(machines)
    .where(eq(machines.id, id))
    .limit(1);

  if (!machine) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/machines"
        className={buttonStyles({ variant: "ghost", size: "sm" })}
      >
        ← Machines
      </Link>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>{machine.name}</CardTitle>
          <CardDescription>
            Changes show up on the public machines page straight away.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MachineForm
            machine={{
              id: machine.id,
              name: machine.name,
              manufacturer: machine.manufacturer,
              year: machine.year,
              ipdbId: machine.ipdbId,
              // Only show a custom link; the standard one follows the ID
              ipdbUrl:
                machine.ipdbUrl ===
                `https://www.ipdb.org/machine.cgi?id=${machine.ipdbId}`
                  ? ""
                  : machine.ipdbUrl,
              ipdbRating: machine.ipdbRating,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
