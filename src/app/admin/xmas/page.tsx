import { isNull } from "drizzle-orm";
import type { Metadata } from "next";
import { db } from "~/db";
import { registrations } from "~/db/schema";
import { AdminLogin } from "../admin-login";
import { checkAdminAuth } from "../login-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import { AdminRegistrationRow } from "./registration-row";

export const metadata: Metadata = {
  title: "XMAS registrations",
  description: "Manage tournament registrations",
};

export default async function AdminPage() {
  // Check if user is authenticated
  const isAuthenticated = await checkAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Fetch all registrations (excluding soft-deleted ones)
  const allRegistrations = await db
    .select()
    .from(registrations)
    .where(isNull(registrations.deletedAt))
    .orderBy(registrations.createdAt);

  const stats = [
    { label: "Total", value: allRegistrations.length },
    {
      label: "Verified",
      value: allRegistrations.filter((r) => r.verifiedAt).length,
    },
    { label: "Paid", value: allRegistrations.filter((r) => r.paidAt).length },
    {
      label: "Pending",
      value: allRegistrations.filter((r) => !r.verifiedAt || !r.paidAt).length,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          XMAS registrations
        </h1>
        <p className="text-sm text-(color:--muted-foreground)">
          XMAS Matchplay Open 2026
        </p>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
          <CardDescription>
            Verify players, track payments and fix IFPA numbers.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-2">
          {allRegistrations.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="font-medium">No registrations yet</p>
              <p className="text-sm text-(color:--muted-foreground)">
                Registrations will appear here once players sign up
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-6">Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>IFPA</TableHead>
                  <TableHead>Tournaments</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allRegistrations.map((registration) => (
                  <AdminRegistrationRow
                    key={registration.id}
                    registration={registration}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <p className="text-center text-sm">
        <a
          href="/xmas"
          className="text-(color:--muted-foreground) underline hover:text-(color:--foreground)"
        >
          ← Back to tournament information
        </a>
      </p>
    </div>
  );
}
