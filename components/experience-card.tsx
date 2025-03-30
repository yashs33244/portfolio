import { Badge } from "@/components/ui/badge"
import type { Experience } from "@/lib/types"

interface ExperienceCardProps {
  experience: Experience
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
        <div>
          <h3 className="text-xl font-semibold">{experience.role}</h3>
          <p className="text-primary">{experience.company}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {experience.startDate} - {experience.endDate}
        </div>
      </div>

      <p className="text-muted-foreground mb-4">{experience.description}</p>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Responsibilities:</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          {experience.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium mb-2">Technologies:</h4>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

