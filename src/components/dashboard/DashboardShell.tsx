'use client';

import { usePathname } from 'next/navigation';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardTopbar } from './DashboardTopbar';
import { resolveDashboardSearchPlaceholder } from './dashboardModules';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchPlaceholder = resolveDashboardSearchPlaceholder(pathname);

  // Determine if topbar should be hidden (requested for settings page)
  const hideTopbar = pathname === '/dashboard/settings';

  return (
    <div className="min-h-screen bg-app-bg">
      <div className="grid min-h-screen lg:grid-cols-[18rem_minmax(0,1fr)]">
        <DashboardSidebar currentPath={pathname ?? '/dashboard'} />

        <div className="min-w-0">
          {!hideTopbar && <DashboardTopbar searchPlaceholder={searchPlaceholder} />}
          <main className={!hideTopbar ? "px-5 py-5 lg:px-8 lg:py-7" : ""}>{children}</main>
        </div>
      </div>
    </div>
  );
}
