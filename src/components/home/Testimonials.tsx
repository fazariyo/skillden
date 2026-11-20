import { MapPin, Quote, Star } from "lucide-react";
import { testimonials } from "@/content/home";
import AutoCarousel from "@/components/effects/AutoCarousel";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-mist/10 overflow-hidden w-full max-w-[100vw]">
      <div className="container mx-auto max-w-7xl mb-16 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="reveal text-base font-bold uppercase tracking-widest text-steel mb-4">Testimonials</h2>
            <h3 className="reveal text-4xl md:text-6xl font-bold text-navy">
              Trusted by the <br /> <span className="text-slate">Industry Leaders.</span>
            </h3>
          </div>
          <p className="reveal text-slate max-w-md text-lg font-medium">
            What UK business owners say about working with their SkillDen assistant.
          </p>
        </div>
      </div>

      <div className="carousel-container relative">
        <AutoCarousel
          id="testimonial-track"
          mode="interactive"
          className="flex w-max gap-6 px-6 cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {[0, 1, 2].flatMap((copy) =>
            testimonials.map((t) => (
              <div
                key={`${copy}-${t.name}`}
                aria-hidden={copy !== 1 || undefined}
                className="testimonial-card flex-shrink-0 w-[350px] md:w-[450px] bg-white border border-navy/5 p-8 rounded-3xl relative flex flex-col"
              >
                <Quote aria-hidden="true" className="absolute top-6 right-8 w-12 h-12 text-navy/5" />
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} aria-hidden="true" className="w-4 h-4 fill-steel text-steel" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium mb-8 text-navy leading-relaxed italic">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="p-4 rounded-full bg-steel text-white font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold text-navy leading-tight">{t.name}</h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-slate/80">
                      <span className="flex items-center gap-1">
                        <MapPin aria-hidden="true" className="w-3.5 h-3.5" />
                        {t.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )),
          )}
        </AutoCarousel>
      </div>
    </section>
  );
}
