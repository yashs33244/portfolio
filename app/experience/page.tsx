import ExperienceCard from "@/components/experience-card"
import SkillsDetailed from "@/components/skills-detailed"
import { experiences } from "@/lib/data"

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Experience & Skills</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Work Experience</h2>
        <div className="space-y-6">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>

      <SkillsDetailed />
    </div>
  )
}

