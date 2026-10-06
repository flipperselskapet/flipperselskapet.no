import type { ReactNode } from "react";
import { Footer, Link } from "~/components/saw";
import { AdminLink } from "./admin-link";

export function XmasFooter({ children }: { children?: ReactNode }) {
  return (
    <Footer>
      <p className="font-type text-lg text-saw-blood-light">Questions?</p>
      <p>
        Contact us on <Link href="/slack">Slack</Link>
      </p>
      {children}
      <div>
        <AdminLink />
      </div>
    </Footer>
  );
}
