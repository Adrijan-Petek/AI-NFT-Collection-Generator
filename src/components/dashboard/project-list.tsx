"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

type Project = {
  id: string;
  name: string;
  status: string;
  size: number;
  updatedAt: string;
};

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  async function refresh() {
    const response = await fetch("/api/projects");
    const data = await response.json();
    setProjects(data.projects ?? []);
  }

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();
      if (mounted) {
        setProjects(data.projects ?? []);
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  async function removeProject(id: string) {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function duplicateProject(id: string) {
    await fetch(`/api/projects/${id}/duplicate`, { method: "POST" });
    await refresh();
  }

  async function continueProject(id: string) {
    await fetch(`/api/projects/${id}/continue`, { method: "POST" });
    await refresh();
  }

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Projects</h2>
        <Button variant="secondary" onClick={refresh}>Refresh</Button>
      </div>
      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="rounded-xl border border-white/20 bg-black/30 p-4 text-white">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{project.name}</p>
                <p className="text-sm text-slate-300">
                  {project.size} NFTs • {project.status}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => continueProject(project.id)}>Continue</Button>
                <Button variant="secondary" onClick={() => duplicateProject(project.id)}>Duplicate</Button>
                <Button onClick={() => removeProject(project.id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 ? <p className="text-slate-300">No projects yet.</p> : null}
      </div>
    </GlassCard>
  );
}
