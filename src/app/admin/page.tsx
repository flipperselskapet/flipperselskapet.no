import { isNull } from "drizzle-orm";
import Link from "next/link";
import { machines } from "~/data/machines";
import { db } from "~/db";
import { registrations } from "~/db/schema";
import { AdminLogin } from "./admin-login";
import { checkAdminAuth } from "./login-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui";

export default async function AdminOverviewPage() {
  if (!(await checkAdminAuth())) {
    return <AdminLogin />;
  }

  const active = await db
    .select()
    .from(registrations)
    .where(isNull(registrations.deletedAt));
  const verified = active.filter((r) => r.verifiedAt).length;
  const unpaid = active.filter((r) => !r.paidAt).length;

  const sections = [
    {
      href: "/admin/xmas",
      title: "XMAS registrations",
      description: "Verify players, track payments and fix IFPA numbers.",
      stat: `${active.length} registered · ${verified} verified · ${unpaid} unpaid`,
    },
    {
      href: "/admin/machines",
      title: "Machines",
      description: "The pinball machines in the club's collection.",
      stat: `${machines.length} machines`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="text-sm text-(color:--muted-foreground)">
          Manage flipperselskapet.no
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="group">
            <Card className="h-full transition-colors group-hover:bg-(color:--muted)/50">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm tabular-nums">{section.stat}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
