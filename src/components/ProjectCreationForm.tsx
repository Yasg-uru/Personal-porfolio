// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { X, Plus, Upload } from 'lucide-react'
// import { ProjectFormValues, projectSchema } from "@/pages/projects/createproject/schema"

// export function ProjectCreationForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const form = useForm<ProjectFormValues>({
//     resolver: zodResolver(projectSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       categories: [],
//       tags: [],
//       overview: "",
//       objectives: [],
//       features: [],
//       technologies: [],
//       difficultyLevel: "Intermediate",
//       targetAudience: "",
//       estimatedCompletionTime: "",
//       teamMembers: [],
//       liveDemo: "",
//       repository: "",
//       deploymentPlatform: "",
//       documents: [],
//       challenges: [],
//       learnings: [],
//       accessibilityFeatures: [],
//       isUnderMaintenance: false,
//       maintenanceMessage: "",
//       gallery: [],
//       videos: [],
//     },
//   })

//   async function onSubmit(data: ProjectFormValues) {
//     // setIsSubmitting(true)
//     // try {
//     //   const formData = new FormData()
//     //   Object.entries(data).forEach(([key, value]) => {
//     //     if (Array.isArray(value)) {
//     //       if (key === "gallery" || key === "videos") {
//     //         value.forEach((item, index) => {
//     //           if ('title' in item) {
//     //             formData.append(`${key}[${index}][title]`, item.title)
//     //           }
//     //           formData.append(`${key}[${index}][file]`, item.file)
//     //         })
//     //       } else {
//     //         value.forEach((item, index) => {
//     //           if (typeof item === "object" && item !== null) {
//     //             Object.entries(item).forEach(([subKey, subValue]) => {
//     //               formData.append(`${key}[${index}][${subKey}]`, subValue as string)
//     //             })
//     //           } else {
//     //             formData.append(`${key}[]`, item as string)
//     //           }
//     //         })
//     //       }
//     //     } else if (typeof value === "boolean") {
//     //       formData.append(key, value ? "true" : "false")
//     //     } else if (value !== null && value !== undefined) {
//     //       formData.append(key, value as string)
//     //     }
//     //   })

//     //   const response = await fetch("http://localhost:8000/project/create", {
//     //     method: "POST",
//     //     body: formData,
//     //   })

//     //   if (!response.ok) {
//     //     throw new Error("Failed to create project")
//     //   }

//     //   const result = await response.json()
//     //   console.log("Project created successfully:", result)
//     //   // Handle success (e.g., show a success message, redirect, etc.)
//     // } catch (error) {
//     //   console.error("Error creating project:", error)
//     //   // Handle error (e.g., show an error message)
//     // } finally {
//     //   setIsSubmitting(false)
//     // }
//   }

//   return (
//     <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
//       <div className="container mx-auto max-w-3xl">
//         <Card>
//           <CardHeader>
//             <CardTitle>Create New Project</CardTitle>
//             <CardDescription>Add a new project to your portfolio</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <Tabs defaultValue="basic" className="w-full">
//                   <TabsList className="grid w-full grid-cols-4">
//                     <TabsTrigger value="basic">Basic Info</TabsTrigger>
//                     <TabsTrigger value="details">Details</TabsTrigger>
//                     <TabsTrigger value="team">Team & Links</TabsTrigger>
//                     <TabsTrigger value="media">Media</TabsTrigger>
//                   </TabsList>
//                   <TabsContent value="basic" className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="title"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Project Title</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter project title" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="description"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Description</FormLabel>
//                           <FormControl>
//                             <Textarea placeholder="Enter project description" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="categories"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Categories</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Add categories (comma-separated)"
//                               onKeyDown={(e) => {
//                                 if (e.key === "Enter" || e.key === ",") {
//                                   e.preventDefault()
//                                   const value = e.currentTarget.value.trim()
//                                   if (value && !field.value.includes(value)) {
//                                     field.onChange([...field.value, value])
//                                     e.currentTarget.value = ""
//                                   }
//                                 }
//                               }}
//                             />
//                           </FormControl>
//                           <div className="flex flex-wrap gap-2 mt-2">
//                             {field.value.map((category, index) => (
//                               <Badge key={index} variant="secondary">
//                                 {category}
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   className="ml-2 h-auto p-0"
//                                   onClick={() => {
//                                     const newCategories = [...field.value]
//                                     newCategories.splice(index, 1)
//                                     field.onChange(newCategories)
//                                   }}
//                                 >
//                                   <X className="h-3 w-3" />
//                                 </Button>
//                               </Badge>
//                             ))}
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="tags"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Tags</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Add tags (comma-separated)"
//                               onKeyDown={(e) => {
//                                 if (e.key === "Enter" || e.key === ",") {
//                                   e.preventDefault()
//                                   const value = e.currentTarget.value.trim()
//                                   if (value && !field.value.includes(value)) {
//                                     field.onChange([...field.value, value])
//                                     e.currentTarget.value = ""
//                                   }
//                                 }
//                               }}
//                             />
//                           </FormControl>
//                           <div className="flex flex-wrap gap-2 mt-2">
//                             {field.value.map((tag, index) => (
//                               <Badge key={index} variant="outline">
//                                 {tag}
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   className="ml-2 h-auto p-0"
//                                   onClick={() => {
//                                     const newTags = [...field.value]
//                                     newTags.splice(index, 1)
//                                     field.onChange(newTags)
//                                   }}
//                                 >
//                                   <X className="h-3 w-3" />
//                                 </Button>
//                               </Badge>
//                             ))}
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </TabsContent>
//                   <TabsContent value="details" className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="overview"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Overview</FormLabel>
//                           <FormControl>
//                             <Textarea placeholder="Enter project overview" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="objectives"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Objectives</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Add objectives (press Enter to add)"
//                               onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                   e.preventDefault()
//                                   const value = e.currentTarget.value.trim()
//                                   if (value && !field.value.includes(value)) {
//                                     field.onChange([...field.value, value])
//                                     e.currentTarget.value = ""
//                                   }
//                                 }
//                               }}
//                             />
//                           </FormControl>
//                           <ul className="list-disc pl-5 mt-2 space-y-1">
//                             {field.value.map((objective, index) => (
//                               <li key={index} className="flex items-center justify-between">
//                                 <span>{objective}</span>
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => {
//                                     const newObjectives = [...field.value]
//                                     newObjectives.splice(index, 1)
//                                     field.onChange(newObjectives)
//                                   }}
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               </li>
//                             ))}
//                           </ul>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="features"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Features</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Add features (press Enter to add)"
//                               onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                   e.preventDefault()
//                                   const value = e.currentTarget.value.trim()
//                                   if (value && !field.value.includes(value)) {
//                                     field.onChange([...field.value, value])
//                                     e.currentTarget.value = ""
//                                   }
//                                 }
//                               }}
//                             />
//                           </FormControl>
//                           <ul className="list-disc pl-5 mt-2 space-y-1">
//                             {field.value.map((feature, index) => (
//                               <li key={index} className="flex items-center justify-between">
//                                 <span>{feature}</span>
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => {
//                                     const newFeatures = [...field.value]
//                                     newFeatures.splice(index, 1)
//                                     field.onChange(newFeatures)
//                                   }}
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               </li>
//                             ))}
//                           </ul>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="technologies"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Technologies</FormLabel>FormItem>
//                           <FormLabel>Technologies</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Add technologies (press Enter to add)"
//                               onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                   e.preventDefault()
//                                   const value = e.currentTarget.value.trim()
//                                   if (value && !field.value.includes(value)) {
//                                     field.onChange([...field.value, value])
//                                     e.currentTarget.value = ""
//                                   }
//                                 }
//                               }}
//                             />
//                           </FormControl>
//                           <div className="flex flex-wrap gap-2 mt-2">
//                             {field.value.map((tech, index) => (
//                               <Badge key={index} variant="secondary">
//                                 {tech}
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   className="ml-2 h-auto p-0"
//                                   onClick={() => {
//                                     const newTechnologies = [...field.value]
//                                     newTechnologies.splice(index, 1)
//                                     field.onChange(newTechnologies)
//                                   }}
//                                 >
//                                   <X className="h-3 w-3" />
//                                 </Button>
//                               </Badge>
//                             ))}
//                           </div>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="difficultyLevel"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Difficulty Level</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select difficulty level" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="Beginner">Beginner</SelectItem>
//                               <SelectItem value="Intermediate">Intermediate</SelectItem>
//                               <SelectItem value="Advanced">Advanced</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="targetAudience"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Target Audience</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Enter target audience" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="estimatedCompletionTime"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Estimated Completion Time</FormLabel>
//                           <FormControl>
//                             <Input placeholder="e.g., 2 weeks, 3 months" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </TabsContent>
//                   <TabsContent value="team" className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="teamMembers"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Team Members</FormLabel>
//                           <div className="space-y-2">
//                             {field.value.map((member, index) => (
//                               <div key={index} className="flex items-center space-x-2">
//                                 <Input
//                                   placeholder="Name"
//                                   value={member.name}
//                                   onChange={(e) => {
//                                     const newMembers = [...field.value]
//                                     newMembers[index].name = e.target.value
//                                     field.onChange(newMembers)
//                                   }}
//                                 />
//                                 <Input
//                                   placeholder="Role"
//                                   value={member.role}
//                                   onChange={(e) => {
//                                     const newMembers = [...field.value]
//                                     newMembers[index].role = e.target.value
//                                     field.onChange(newMembers)
//                                   }}
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => {
//                                     const newMembers = [...field.value]
//                                     newMembers.splice(index, 1)
//                                     field.onChange(newMembers)
//                                   }}
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               </div>
//                             ))}
//                           </div>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             size="sm"
//                             className="mt-2"
//                             onClick={() => {
//                               field.onChange([...field.value, { name: "", role: "" }])
//                             }}
//                           >
//                             <Plus className="h-4 w-4 mr-2" /> Add Team Member
//                           </Button>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="liveDemo"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Live Demo URL</FormLabel>
//                           <FormControl>
//                             <Input placeholder="https://example.com" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="repository"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Repository URL</FormLabel>
//                           <FormControl>
//                             <Input placeholder="https://github.com/username/repo" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="deploymentPlatform"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Deployment Platform</FormLabel>
//                           <FormControl>
//                             <Input placeholder="e.g., Vercel, Netlify" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </TabsContent>
//                   <TabsContent value="media" className="space-y-4">
//                     <FormField
//                       control={form.control}
//                       name="gallery"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Gallery Images</FormLabel>
//                           <FormControl>
//                             <div className="grid grid-cols-2 gap-4">
//                               {field.value.map((image, index) => (
//                                 <div key={index} className="relative">
//                                   <img
//                                     src={URL.createObjectURL(image.file)}
//                                     alt={image.title}
//                                     className="w-full h-32 object-cover rounded-md"
//                                   />
//                                   <Button
//                                     type="button"
//                                     variant="destructive"
//                                     size="sm"
//                                     className="absolute top-2 right-2"
//                                     onClick={() => {
//                                       const newGallery = [...field.value]
//                                       newGallery.splice(index, 1)
//                                       field.onChange(newGallery)
//                                     }}
//                                   >
//                                     <X className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               ))}
//                               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
//                                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                   <Upload className="h-6 w-6 text-gray-400" />
//                                   <p className="mt-2 text-sm text-gray-500">Click to upload</p>
//                                 </div>
//                                 <input
//                                   type="file"
//                                   className="hidden"
//                                   accept="image/*"
//                                   onChange={(e) => {
//                                     if (e.target.files && e.target.files[0]) {
//                                       const file = e.target.files[0]
//                                       field.onChange([...field.value, { title: file.name, file }])
//                                     }
//                                   }}
//                                 />
//                               </label>
//                             </div>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="videos"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Videos</FormLabel>
//                           <FormControl>
//                             <div className="space-y-2">
//                               {field.value.map((video, index) => (
//                                 <div key={index} className="flex items-center space-x-2">
//                                   <Input
//                                     value={video.title}
//                                     onChange={(e) => {
//                                       const newVideos = [...field.value]
//                                       newVideos[index].title = e.target.value
//                                       field.onChange(newVideos)
//                                     }}
//                                     placeholder="Video title"
//                                   />
//                                   <span className="truncate flex-1">{video.file.name}</span>
//                                   <Button
//                                     type="button"
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => {
//                                       const newVideos = [...field.value]
//                                       newVideos.splice(index, 1)
//                                       field.onChange(newVideos)
//                                     }}
//                                   >
//                                     <X className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               ))}
//                             </div>
//                             <label className="flex items-center justify-center w-full h-12 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 mt-2">
//                               <Upload className="h-4 w-4 mr-2 text-gray-400" />
//                               <span className="text-sm text-gray-500">Upload video</span>
//                               <input
//                                 type="file"
//                                 className="hidden"
//                                 accept="video/*"
//                                 onChange={(e) => {
//                                   if (e.target.files && e.target.files[0]) {
//                                     const file = e.target.files[0]
//                                     field.onChange([...field.value, { title: file.name, file }])
//                                   }
//                                 }}
//                               />
//                             </label>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="documents"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Documents</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Add document links (press Enter to add)"
//                               onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                   e.preventDefault()
//                                   const value = e.currentTarget.value.trim()
//                                   if (value && !field.value.includes(value)) {
//                                     field.onChange([...field.value, value])
//                                     e.currentTarget.value = ""
//                                   }
//                                 }
//                               }}
//                             />
//                           </FormControl>
//                           <ul className="list-disc pl-5 mt-2 space-y-1">
//                             {field.value.map((doc, index) => (
//                               <li key={index} className="flex items-center justify-between">
//                                 <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                                   {doc}
//                                 </a>
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => {
//                                     const newDocs = [...field.value]
//                                     newDocs.splice(index, 1)
//                                     field.onChange(newDocs)
//                                   }}
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               </li>
//                             ))}
//                           </ul>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </TabsContent>
//                 </Tabs>
//                 <FormField
//                   control={form.control}
//                   name="challenges"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Challenges</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Add challenges (press Enter to add)"
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                               e.preventDefault()
//                               const value = e.currentTarget.value.trim()
//                               if (value && !field.value.includes(value)) {
//                                 field.onChange([...field.value, value])
//                                 e.currentTarget.value = ""
//                               }
//                             }
//                           }}
//                         />
//                       </FormControl>
//                       <ul className="list-disc pl-5 mt-2 space-y-1">
//                         {field.value.map((challenge, index) => (
//                           <li key={index} className="flex items-center justify-between">
//                             <span>{challenge}</span>
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => {
//                                 const newChallenges = [...field.value]
//                                 newChallenges.splice(index, 1)
//                                 field.onChange(newChallenges)
//                               }}
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </li>
//                         ))}
//                       </ul>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="learnings"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Learnings</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Add learnings (press Enter to add)"
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                               e.preventDefault()
//                               const value = e.currentTarget.value.trim()
//                               if (value && !field.value.includes(value)) {
//                                 field.onChange([...field.value, value])
//                                 e.currentTarget.value = ""
//                               }
//                             }
//                           }}
//                         />
//                       </FormControl>
//                       <ul className="list-disc pl-5 mt-2 space-y-1">
//                         {field.value.map((learning, index) => (
//                           <li key={index} className="flex items-center justify-between">
//                             <span>{learning}</span>
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => {
//                                 const newLearnings = [...field.value]
//                                 newLearnings.splice(index, 1)
//                                 field.onChange(newLearnings)
//                               }}
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </li>
//                         ))}
//                       </ul>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="accessibilityFeatures"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Accessibility Features</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Add accessibility features (press Enter to add)"
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                               e.preventDefault()
//                               const value = e.currentTarget.value.trim()
//                               if (value && !field.value.includes(value)) {
//                                 field.onChange([...field.value, value])
//                                 e.currentTarget.value = ""
//                               }
//                             }
//                           }}
//                         />
//                       </FormControl>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {field.value.map((feature, index) => (
//                           <Badge key={index} variant="secondary">
//                             {feature}
//                             <Button
//                               type="button"
//                               variant="ghost"
//                               size="sm"
//                               className="ml-2 h-auto p-0"
//                               onClick={() => {
//                                 const newFeatures = [...field.value]
//                                 newFeatures.splice(index, 1)
//                                 field.onChange(newFeatures)
//                               }}
//                             >
//                               <X className="h-3 w-3" />
//                             </Button>
//                           </Badge>
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="isUnderMaintenance"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                       <div className="space-y-0.5">
//                         <FormLabel className="text-base">Under Maintenance</FormLabel>
//                         <FormDescription>
//                           Set this project as currently under maintenance
//                         </FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="maintenanceMessage"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Maintenance Message</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Enter maintenance message"
//                           {...field}
//                           disabled={!form.watch("isUnderMaintenance")}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" disabled={isSubmitting}>
//                   {isSubmitting ? "Creating..." : "Create Project"}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </ScrollArea>
//   )
// }

