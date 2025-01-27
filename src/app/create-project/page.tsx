import { ProjectCreationForm } from "@/components/ProjectCreationForm"

export default function CreateProjectPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      <ProjectCreationForm />
    </div>
  )
}

