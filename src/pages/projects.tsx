import { Link } from "react-router-dom";


import { Card, CardContent } from "@/components/ui/card";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import TrackMyExpense from "@/assets/TrackMyExpense.png"
import Procoders from "@/assets/my_images/Procoders.png"
export default function Projects() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="text-muted-foreground mt-2 max-w-[700px]">
                These are some of my most recent and notable projects.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <Card>
                <img
                  src={Procoders}
                  width={600}
                  height={400}
                  alt="Project 1"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Procoders
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    Procoders is an innovative online learning platform offering
                    comprehensive courses for all skill levels. It features
                    interactive learning experiences, real-time progress
                    tracking, and a supportive community. With secure payments
                    via Razorpay and advanced search and filter functions,
                    Procoders is designed to help learners achieve their goals
                    efficiently and effectively.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <a
                    target="_blank"
                      href="https://procoders-frontend.vercel.app/"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </a>
                    <a
                    target="_blank"
                      href="https://github.com/Yasg-uru/Procoders"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Project 2"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Virtual Wardrobe Organizer
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    The Virtual Wardrobe Organizer is an advanced full-stack
                    application designed to help users manage their clothing and
                    outfit choices efficiently. It features a detailed wear
                    tracking system, recommendations based on weather and
                    material, and advanced notifications for low stock items.
                    Built with a microservices architecture, it integrates
                    seamlessly with a robust backend and a responsive front end.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <a
                    target="_blank"
                      href="https://virtual-wardrobe-frontend.vercel.app/"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </a>
                    <a
                    target="_blank"
                      href="https://github.com/Yasg-uru/WardrobeX"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  src={TrackMyExpense}
                  width={600}
                  height={400}
                  alt="Project 3"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    TrackMyExpense
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                  TrackMyExpense is an advanced expense management tool designed to streamline your financial tracking. It features comprehensive expense categorization, real-time analytics, and customizable reports. The application uses a microservices architecture to ensure scalability and efficiency, with a focus on user-friendly interfaces and seamless integration with various financial platforms.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <a
                      href="https://expense-manager-frontend-nine.vercel.app/"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </a>
                    <a
                      href="https://github.com/Yasg-uru/TrackMyExpenses"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                All Projects
              </h2>
              <p className="text-muted-foreground mt-2 max-w-[700px]">
                Here are all the other projects I've worked on.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <Card>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Project 4"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Project 4
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    A brief description of the fourth project.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </Link>
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Project 5"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Project 5
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    A brief description of the fifth project.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </Link>
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Project 6"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Project 6
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    A brief description of the sixth project.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </Link>
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Project 7"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Project 7
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    A brief description of the seventh project.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </Link>
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Project 8"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Project 8
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    A brief description of the eighth project.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </Link>
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="Project 9"
                  className="rounded-t-lg object-cover w-full h-48 sm:h-56 lg:h-64"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Project 9
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">
                    A brief description of the ninth project.
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Live Site
                    </Link>
                    <Link
                      to="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background px-4 md:px-6 py-4 border-t">
        <div className="container mx-auto flex items-" />
      </footer>
    </div>
  );
}

function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}



