import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface AuthShellProps {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}


const AuthShell = ({ eyebrow, title, description, children, footer }: AuthShellProps) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,0,102,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.16),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent_25%)]" />
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="hidden lg:block"
        >
          <div className="space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              {eyebrow}
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white xl:text-5xl">
                {title}
              </h1>
              <p className="max-w-lg text-sm leading-7 text-white/72 xl:text-base">{description}</p>
            </div>

            {/* Intentionally minimal feature area for portfolio auth pages. */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="w-full"
        >
          <Card className="overflow-hidden border-white/10 bg-black/40 text-white shadow-[0_24px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="border-b border-white/10 bg-white/5 px-6 py-5 sm:px-8">
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary lg:hidden">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                {eyebrow}
              </Badge>
              <div className="mt-4 lg:mt-0">
                <p className="text-xs uppercase tracking-[0.28em] text-primary/90">{eyebrow}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{description}</p>
              </div>
            </div>

            <div className="px-6 py-6 sm:px-8">{children}</div>

            {footer ? <div className="border-t border-white/10 px-6 py-5 sm:px-8">{footer}</div> : null}
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default AuthShell
