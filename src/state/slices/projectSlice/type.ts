import { ProjectDetails } from "./details";

export interface InitialState {
  isLoading: boolean;
  projects: Project[];
  projectDetails: ProjectDetails | null;
  realTimeLoading:boolean;
  
}
export interface TeamMember {
  name: string;
  role: string;
  email: string;
  linkedIn: string;
  github: string;
}

export interface Task {
  title: string;
  description: string;
  assignee: string; // Use a string to represent ObjectId
  status: string;
  priority: string;
  dueDate: Date;
  completedAt: Date | null;
}

export interface Timeline {
  phase: string;
  startDate: Date;
  endDate: Date;
  description: string;
  status: string;
}

export interface Milestone {
  title: string;
  description: string;
  dueDate: Date;
  isAchieved: boolean;
}

export interface DeploymentDetails {
  lastDeployed: Date;
  status: string;
  logs: string[];
}

export interface DocumentFile {
  name: string;
  url: string;
  uploadedAt: Date;
}

export interface Like {
  userId: string; // Use a string to represent ObjectId
  timestamp: Date;
}

export interface Reply {
  userId: string; // Use a string to represent ObjectId
  comment: string;
  timestamp: Date;
  likes: Like[];
  _id: string;
}

export interface EditHistory {
  comment: string;
  editedAt: Date;
}

export interface Comment {
  _id: string;
  userId: string; // Use a string to represent ObjectId
  comment: string;
  timestamp: Date;
  likes: Like[];
  dislikes: Like[];
  replies: Reply[];
  edited: {
    isEdited: boolean;
    editHistory: EditHistory[];
  };
  pinned: boolean;
  mentions: string[]; // Use an array of strings for ObjectIds
}

export interface Changelog {
  version: string;
  description: string;
  releaseDate: Date;
}

export interface Analytics {
  views: number;
  likes: number;
  downloads: number;
  userInteractions: {
    userId: string; // Use a string to represent ObjectId
    action: string;
    timestamp: Date;
  }[];
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  overview: string;
  objectives: string;
  features: string[];
  technologies: string[];
  difficultyLevel: string;
  targetAudience: string[];
  estimatedCompletionTime: string;
  teamMembers: TeamMember[];
  tasks: Task[];
  timeline: Timeline[];
  milestones: Milestone[];
  liveDemo: string;
  repository: string;
  deploymentPlatform: string;
  deploymentDetails: DeploymentDetails;
  gallery: { title: string; url: string }[];
  videos: { title: string; url: string }[];
  documents: DocumentFile[];
  likes: Like[];
  comments: Comment[];
  documentation: string;
  apiDocs: string;
  changelog: Changelog[];
  analytics: Analytics;
  challenges: string[];
  learnings: string[];
  accessibilityFeatures: string[];
  pricingModel: string;
  price: number;
  currency: string;
  status: string;
  visibility: string;
  seo: SEO;
  isUnderMaintenance: boolean;
  maintenanceMessage: string;
  createdAt: Date;
  updatedAt: Date;
}
