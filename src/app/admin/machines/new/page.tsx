import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Add machine",
};

export default async function NewMachinePage() {
  if (!(await checkAdminAuth())) {
    return <AdminLogin />;
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
          <CardTitle>Add machine</CardTitle>
          <CardDescription>
            The machine shows up on the public machines page straight away.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MachineForm />
        </CardContent>
      </Card>
    </div>
  );
}
