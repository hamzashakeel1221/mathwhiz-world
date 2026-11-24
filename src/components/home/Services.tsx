import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icon } from "@/components/ui/Icon";
import type { ServiceData } from "@/lib/defaults";

const tints = ["from-teal-400 to-teal-600", "from-sun-400 to-brandorange-500", "from-sky-400 to-navy-500", "from-brandorange-400 to-rose-500"];

export function Services({ services }: { services: ServiceData[] }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="What's included"
          title={<>Everything your child needs to <span className="text-gradient">excel in maths</span></>}
          subtitle="Personalised online maths tutoring for students who want to understand, improve and achieve."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <StaggerItem key={s.title}>
              <SpotlightCard className="h-full p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tints[i % tints.length]} shadow-lg`}>
                  <Icon name={s.icon} className="h-6 w-6 text-navy-950" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
