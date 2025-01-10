interface User {
    _id: string;
    username :string ;
    email: string;
    profileUrl: string;
  }
  
  interface Like {
    userId: User;
    timestamp: string; // Date as string (ISO format)
    _id: string;
  }
  
  interface Reply {
    _id: string;
    userId: User;
    comment: string;
    timestamp: string; // Date as string (ISO format)
    likes: Like[];
  }
  
  interface EditHistory {
    comment: string;
    editedAt: string; // Date as string (ISO format)
    _id: string;
  }
  
  export interface Comment {
    _id: string;
    userId: User;
    comment: string;
    timestamp: string; // Date as string (ISO format)
    likes: Like[];
    dislikes: Like[];
    replies: Reply[];
    edited: {
      isEdited: boolean;
      editHistory: EditHistory[];
    };
    createdAt: string; // Date as string (ISO format)
    updatedAt: string; // Date as string (ISO format)
    __v: number;
  }
  
  interface Video {
    _id: string;
    title: string;
    url: string;
  }
  
  interface GalleryImage {
    _id: string;
    title: string;
    url: string;
  }
  
  export interface ProjectDetails {
    _id: string;
    title: string;
    description: string;
    categories: string[];
    tags: string[];
    overview: string;
    features: string[];
    technologies: string[];
    difficultyLevel: string;
    targetAudience: string[];
    estimatedCompletionTime: string;
    teamMembers: any[]; // You can replace this with a more specific type if needed
    liveDemo: string;
    repository: string;
    deploymentPlatform: string;
    gallery: GalleryImage[];
    videos: Video[];
    documents: any[]; // Replace with actual type if you have document structure
    challenges: any[]; // Replace with actual type if challenges are structured
    learnings: string[];
    accessibilityFeatures: string[];
    isUnderMaintenance: boolean;
    maintenanceMessage: string;
    likes: Like[];
    comments: Comment[];
    createdAt: string; // Date as string (ISO format)
    updatedAt: string; // Date as string (ISO format)
  }
  

  
  
  