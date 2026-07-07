import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
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
    <main className="min-h-screen bg-[#030712] px-6 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
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
