import * as z from "zod"

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  overview: z.string().min(20, "Overview must be at least 20 characters long"),
  objectives: z.array(z.string()).min(1, "Add at least one objective"),
  features: z.array(z.string()).min(1, "Add at least one feature"),
  technologies: z.array(z.string()).min(1, "Add at least one technology"),
  difficultyLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  targetAudience: z.string().min(5, "Target audience must be at least 5 characters long"),
  estimatedCompletionTime: z.string().min(1, "Estimated completion time is required"),
  teamMembers: z.array(z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    role: z.string().min(2, "Role must be at least 2 characters long"),
  })),
  liveDemo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repository: z.string().url("Must be a valid URL"),
  deploymentPlatform: z.string().min(2, "Deployment platform must be at least 2 characters long"),
  documents: z.array(z.string()).optional(),
  challenges: z.array(z.string()).min(1, "Add at least one challenge"),
  learnings: z.array(z.string()).min(1, "Add at least one learning"),
  accessibilityFeatures: z.array(z.string()).optional(),
  isUnderMaintenance: z.boolean(),
  maintenanceMessage: z.string().optional(),
  gallery: z.array(z.object({
    title: z.string(),
    file: z.instanceof(File),
  })).optional(),
  videos: z.array(z.object({
    title: z.string(),
    file: z.instanceof(File),
  })).optional(),
})

export type ProjectFormValues = z.infer<typeof projectSchema>

