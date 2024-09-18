import { SVGProps } from "react";

export default function Skills() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              My Tech Stack
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I'm proficient in the MERN stack and other modern web
              technologies.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <CodepenIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">React</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <CodepenIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">React Native</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <NetworkIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">Node.js</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <XIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">Express</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <DatabaseIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">MongoDB</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <TypeIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">TypeScript</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <ForwardIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">Next.js</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <WindIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">Tailwind CSS</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
              <GitGraphIcon className="w-8 h-8 text-primary" />
            </div>
            <span className="text-sm font-medium">Git</span>
          </div>
        </div>
      </div>
    </section>
  );
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
  );
}

function DatabaseIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
  );
}

function ForwardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polyline points="15 17 20 12 15 7" />
      <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
    </svg>
  );
}

function GitGraphIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <circle cx="5" cy="6" r="3" />
      <path d="M5 9v6" />
      <circle cx="5" cy="18" r="3" />
      <path d="M12 3v18" />
      <circle cx="19" cy="6" r="3" />
      <path d="M16 15.7A9 9 0 0 0 19 9" />
    </svg>
  );
}

function NetworkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
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
  );
}

function WindIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
