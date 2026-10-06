import type { ReactNode } from "react";
import { Apron, Link } from "~/components/em";
import { AdminLink } from "./admin-link";

export function XmasFooter({ children }: { children?: ReactNode }) {
  return (
    <Apron>
      <p className="font-label font-bold uppercase tracking-[0.2em] text-em-red">
        Questions?
      </p>
      <p>
        Contact us on <Link href="/slack">Slack</Link>
      </p>
      {children}
      <div>
        <AdminLink />
      </div>
    </Apron>
  );
}
