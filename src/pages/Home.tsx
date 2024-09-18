
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import YashChoudhary from "../assets/my_images/yash_choudhary.jpg";
import Projects from "./projects";
import Skills from "./Skills";

export default function HomePage() {
  return (
    <div className="dark flex min-h-[100dvh] flex-col bg-black text-white">
      
      <main className="flex-1">
        <section className="container mx-auto grid gap-8 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Yash Choudhary
            </h1>
            <h2 className="text-2xl font-semibold text-gray-400 sm:text-3xl">
              Full Stack Developer
            </h2>
            <p className="text-gray-400 md:text-xl">
            I'm a passionate full stack developer specializing in building modern, scalable, and responsive web applications using the MERN stack (MongoDB, Express, React, Node.js). I focus on creating seamless user experiences and robust backend systems, ensuring performance, security, and scalability at every step.
            </p>
          </div>
          <img
            src={YashChoudhary}
            width="400"
            height="400"
            alt="John Doe"
            className="mx-auto rounded-full object-cover"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
          />
        </section>
       <Projects/>
        <section className="container mx-auto grid gap-12 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <Skills/>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white">Contact</h2>
            <form className="space-y-4">
              <Input
                type="text"
                placeholder="Name"
                className="w-full rounded-md border border-input bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Input
                type="email"
                placeholder="Email"
                className="w-full rounded-md border border-input bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Textarea
                placeholder="Message"
                className="w-full rounded-md border border-input bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 py-6 text-center text-sm text-gray-400">
        <p>&copy; 2024 Yash Choudhary. All rights reserved.</p>
      </footer>
    </div>
  );
}





