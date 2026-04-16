import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/498f0023-14bf-4b21-ade4-edf425fe86d4/files/e45f90a1-d078-4c02-b0c3-e61832afb334.jpg";

const ADVANTAGES = [
  { num: "500+", label: "Объектов оснащено" },
  { num: "12", label: "Лет на рынке" },
  { num: "1000+", label: "Позиций в каталоге" },
  { num: "100%", label: "Сертифицированная продукция" },
];

interface HeroSectionProps {
  heroLoaded: boolean;
  scrollTo: (id: string) => void;
}

export default function HeroSection({ heroLoaded, scrollTo }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Противопожарное оборудование" className="w-full h-full object-cover" style={{ opacity: 0.2 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.98) 0%, rgba(13,13,13,0.7) 50%, rgba(13,13,13,0.95) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(234,88,12,0.07) 0%, transparent 60%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-36 w-full">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8 border"
            style={{
              borderColor: "rgba(234,88,12,0.4)",
              backgroundColor: "rgba(234,88,12,0.1)",
              color: "var(--fire-orange)",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Великий Новгород и область
          </div>

          <h1
            className="font-heading text-5xl md:text-7xl font-bold leading-none mb-6 tracking-tight"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <span className="block text-white">ЗАЩИТА</span>
            <span className="block text-white">ОТ ОГНЯ —</span>
            <span className="block" style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              НАШ ПРИОРИТЕТ
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-xl"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}
          >
            Продажа и поставка современного противопожарного оборудования. Вся продукция сертифицирована и имеет паспорта.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
            }}
          >
            <button
              onClick={() => scrollTo("catalog")}
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded font-heading font-semibold text-white text-base tracking-wide transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #ea580c, #dc2626)", boxShadow: "0 0 30px rgba(234,88,12,0.4)" }}
            >
              <Icon name="Package" size={18} />
              Смотреть каталог
            </button>
            <button
              onClick={() => scrollTo("contacts")}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded font-heading font-semibold text-white text-base tracking-wide border transition-all duration-300 hover:border-orange-500 hover:text-orange-400"
              style={{ borderColor: "var(--dark-border)", backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <Icon name="ClipboardCheck" size={18} />
              Бесплатный аудит
            </button>
          </div>

          <div
            className="flex flex-wrap gap-10 mt-16 pt-10 border-t"
            style={{
              borderColor: "var(--dark-border)",
              opacity: heroLoaded ? 1 : 0,
              transition: "opacity 0.7s ease 0.7s",
            }}
          >
            {ADVANTAGES.map((adv) => (
              <div key={adv.num}>
                <div className="font-heading text-3xl font-bold" style={{ color: "var(--fire-orange)" }}>{adv.num}</div>
                <div className="text-sm text-gray-500 mt-1">{adv.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs font-medium tracking-widest uppercase">Листайте вниз</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>
    </section>
  );
}
