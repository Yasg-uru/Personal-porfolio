import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
}

export function SkillCard({ name, icon, description }: SkillCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="h-full bg-black text-white">
        <CardContent className="flex flex-col items-center p-6">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-sm text-center text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
