
import { Severity, ScanResult } from './VibecheckTypes';

export const GITHUB_REPO = "https://github.com/tapsuns5/VibeCheck-Scanner";

export const SCAN_DATA: ScanResult[] = [
  {
    severity: Severity.HIGH,
    rule: "next-api-auth-guard",
    file: "app/api/embed-proxy/route.ts",
    fix: "Call your auth guard early (e.g., getServerSession, auth(), currentUser()) and enforce role/tenant checks before DB access."
  },
  {
    severity: Severity.HIGH,
    rule: "next-api-auth-guard",
    file: "app/api/admin/delete-user/route.ts",
    fix: "Call your auth guard early (e.g., getServerSession, auth(), currentUser()) and enforce role/tenant checks before DB access."
  },
  {
    severity: Severity.HIGH,
    rule: "next-api-auth-guard",
    file: "app/api/auth/check-session/route.ts",
    fix: "Call your auth guard early (e.g., getServerSession, auth(), currentUser()) and enforce role/tenant checks before DB access."
  },
  {
    severity: Severity.LOW,
    rule: "next-api-auth-guard",
    file: "app/api/docs/public-export/[slug]/route.ts",
    fix: "Add a lightweight protection mechanism: validate an API key header, verify a webhook signature, or require a session token (even if the route is 'public')."
  },
  {
    severity: Severity.MEDIUM,
    rule: "next-middleware-matcher-coverage",
    file: "middleware.ts",
    fix: "Review export const config.matcher and ensure protected route prefixes are included (or document why they are not)."
  },
  {
    severity: Severity.LOW,
    rule: "next-async-waterfall",
    file: "app/scripts/delete-user.ts",
    line: 28,
    column: 4,
    snippet: "28 |     await tx.task.deleteMany({ where: { userId } })",
    fix: "If these operations are independent, you may parallelize with Promise.all(), but confirm transactional ordering is safe."
  },
  {
    severity: Severity.MEDIUM,
    rule: "next-async-waterfall",
    file: "app/services/calendarClientService.ts",
    line: 172,
    column: 27,
    snippet: "172 |     const eventsResponse = await fetch(`/api/calendar/linked-events?docId=${encodeURIComponent(noteId)}`);",
    fix: "If independent: const [a, b] = await Promise.all([f(), g()]);"
  },
  {
    severity: Severity.MEDIUM,
    rule: "prisma-missing-tenant-filter",
    file: "app/api/users/workspace/route.ts",
    line: 37,
    column: 33,
    snippet: "37 |     const workspaceUsers = await prisma.user.findMany({",
    fix: "Ensure where includes org/user scoping and validate access (RLS or app-layer auth)."
  },
  {
    severity: Severity.MEDIUM,
    rule: "prisma-write-tenant-boundary",
    file: "app/api/auth/auth.config.ts",
    line: 304,
    column: 29,
    snippet: "304 |         const dbUser = await prisma.user.update({",
    fix: "Ensure where includes org/user scoping and validate access (RLS or app-layer auth)."
  }
];
