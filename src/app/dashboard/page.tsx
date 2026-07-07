import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectGenerator } from "@/components/dashboard/project-generator";
import { ProjectList } from "@/components/dashboard/project-list";
import { OpenSeaProPanel } from "@/components/dashboard/opensea-pro-panel";
import { PreviewPanel } from "@/components/dashboard/preview-panel";
import { hasValidClerkConfig } from "@/lib/clerk";

export default async function DashboardPage() {
  if (hasValidClerkConfig()) {
    const session = await auth();
    if (!session.userId) {
      redirect("/");
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] px-6 py-8">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/20 bg-slate-200/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-200/40 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
      </div>
      <div className="mx-auto mt-5 grid w-full max-w-6xl gap-6 lg:grid-cols-2">
        <ProjectGenerator />
        <ProjectList />
      </div>
      <div className="mx-auto mt-6 w-full max-w-6xl">
        <OpenSeaProPanel />
      </div>
      <div className="mx-auto mt-6 w-full max-w-6xl">
        <PreviewPanel />
      </div>
    </main>
  );
}
