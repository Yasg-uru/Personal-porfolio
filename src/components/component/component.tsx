
import {Link} from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

export function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="#" className="flex items-center justify-center" >
          <CodeIcon className="h-6 w-6" />
          <span className="sr-only">John Doe's Portfolio</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4" >
            About
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Skills
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Portfolio
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4" >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Hi, I'm John Doe</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I'm a full-stack developer with a passion for building beautiful and functional web applications. I
                specialize in React, Node.js, and cloud technologies.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  
                >
                  View Portfolio
                </Link>
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  
                >
                  Contact Me
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I have a wide range of skills and experience in the full-stack development process, from front-end to
                back-end and cloud infrastructure.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4">
                <CodepenIcon className="h-8 w-8" />
                <h3 className="text-lg font-bold">React</h3>
                <p className="text-sm text-muted-foreground">
                  Proficient in building modern, responsive web applications using React.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4">
                <CodepenIcon className="h-8 w-8" />
                <h3 className="text-lg font-bold">Node.js</h3>
                <p className="text-sm text-muted-foreground">
                  Experienced in building scalable and efficient back-end applications with Node.js.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4">
                <CloudIcon className="h-8 w-8" />
                <h3 className="text-lg font-bold">AWS</h3>
                <p className="text-sm text-muted-foreground">
                  Proficient in deploying and managing applications on AWS cloud infrastructure.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4">
                <TypeIcon className="h-8 w-8" />
                <h3 className="text-lg font-bold">TypeScript</h3>
                <p className="text-sm text-muted-foreground">
                  Experienced in using TypeScript to write more robust and maintainable code.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Portfolio</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out some of the projects I've worked on and the technologies I've used.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project 1</CardTitle>
                  <CardDescription>
                    A full-stack web application built with React, Node.js, and MongoDB.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="/placeholder.svg"
                    width="400"
                    height="225"
                    alt="Project 1"
                    className="mx-auto aspect-video overflow-hidden rounded-lg object-cover"
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <CodepenIcon className="h-4 w-4" />
                    <CodepenIcon className="h-4 w-4" />
                    <DatabaseIcon className="h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project 2</CardTitle>
                  <CardDescription>
                    A serverless web application built with Next.js and deployed on AWS.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="/placeholder.svg"
                    width="400"
                    height="225"
                    alt="Project 2"
                    className="mx-auto aspect-video overflow-hidden rounded-lg object-cover"
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <CodepenIcon className="h-4 w-4" />
                    <CloudIcon className="h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project 3</CardTitle>
                  <CardDescription>
                    A mobile app built with React Native and deployed on the App Store and Google Play.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="/placeholder.svg"
                    width="400"
                    height="225"
                    alt="Project 3"
                    className="mx-auto aspect-video overflow-hidden rounded-lg object-cover"
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <AppleIcon className="h-4 w-4" />
                    <AppleIcon className="h-4 w-4" />
                    <PlayIcon className="h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project 4</CardTitle>
                  <CardDescription>
                    A real-time chat application built with Socket.IO and deployed on Heroku.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src="/placeholder.svg"
                    width="400"
                    height="225"
                    alt="Project 4"
                    className="mx-auto aspect-video overflow-hidden rounded-lg object-cover"
                  />
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <ServerIcon className="h-4 w-4" />
                    <GithubIcon className="h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as
                soon as possible.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2">
                <Input type="text" placeholder="Name" className="max-w-lg flex-1" />
                <Input type="email" placeholder="Email" className="max-w-lg flex-1" />
                <Textarea placeholder="Message" className="max-w-lg flex-1" />
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 John Doe. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4" >
            Privacy Policy
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4" >
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function AppleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  )
}


function CloudIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}


function CodeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


function CodepenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" x2="12" y1="22" y2="15.5" />
      <polyline points="22 8.5 12 15.5 2 8.5" />
      <polyline points="2 15.5 12 8.5 22 15.5" />
      <line x1="12" x2="12" y1="2" y2="8.5" />
    </svg>
  )
}


function DatabaseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
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
  )
}


function PlayIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}


function ServerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  )
}


function TypeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  )
}
