import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const AUDIT_IMG = "https://cdn.poehali.dev/projects/498f0023-14bf-4b21-ade4-edf425fe86d4/files/a35556b2-032e-404c-a1fd-92297423f066.jpg";

const CATALOG_ITEMS = [
  { icon: "Flame", name: "Огнетушители", desc: "Порошковые, углекислотные, воздушно-пенные. Все типы и объёмы.", count: "120+ моделей" },
  { icon: "Wifi", name: "Пожарная сигнализация", desc: "Адресные и безадресные системы обнаружения и оповещения.", count: "85+ решений" },
  { icon: "Droplets", name: "Системы пожаротушения", desc: "Спринклерные, дренчерные, газовые и порошковые установки.", count: "60+ систем" },
  { icon: "Wind", name: "Дымоудаление", desc: "Вентиляторы дымоудаления, клапаны, системы противодымной защиты.", count: "40+ видов" },
  { icon: "ShieldCheck", name: "Средства защиты", desc: "Самоспасатели, противогазы, защитные костюмы и снаряжение.", count: "200+ позиций" },
  { icon: "LayoutGrid", name: "Пожарные шкафы и щиты", desc: "Пожарные шкафы, рукава, стволы, щиты с инвентарём.", count: "50+ видов" },
];

const DOCS = [
  { name: "Сертификаты соответствия", icon: "Award" },
  { name: "Паспорта на оборудование", icon: "FileText" },
  { name: "Руководства по эксплуатации", icon: "BookOpen" },
  { name: "Протоколы испытаний", icon: "ClipboardCheck" },
  { name: "Лицензии и разрешения", icon: "BadgeCheck" },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function AnimSection({ id, children, className = "", style = {} }: { id?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "opacity 0.7s ease, transform 0.7s ease",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </section>
  );
}

interface CatalogAboutDocsProps {
  scrollTo: (id: string) => void;
}

export default function CatalogAboutDocs({ scrollTo }: CatalogAboutDocsProps) {
  return (
    <>
      {/* CATALOG */}
      <AnimSection id="catalog" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <div>
              <div className="text-xs font-medium tracking-widest uppercase mb-3 font-heading" style={{ color: "var(--fire-orange)" }}>— Наша продукция</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">КАТАЛОГ<br />ОБОРУДОВАНИЯ</h2>
            </div>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              Более 1000 позиций сертифицированного противопожарного оборудования от ведущих производителей.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATALOG_ITEMS.map((item) => (
              <div
                key={item.name}
                className="group relative p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:border-orange-600 hover:-translate-y-1"
                style={{ backgroundColor: "var(--dark-card)", borderColor: "var(--dark-border)" }}
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(234,88,12,0.05), transparent)" }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: "rgba(234,88,12,0.15)", border: "1px solid rgba(234,88,12,0.2)" }}>
                      <Icon name={item.icon} size={22} style={{ color: "var(--fire-orange)" }} />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded" style={{ color: "var(--fire-orange)", backgroundColor: "rgba(234,88,12,0.1)" }}>{item.count}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2 tracking-wide">{item.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 font-heading tracking-wide" style={{ color: "var(--fire-orange)" }}>
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => scrollTo("contacts")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded font-heading font-semibold text-white tracking-wide border transition-all duration-300 hover:border-orange-500"
              style={{ borderColor: "var(--dark-border)", backgroundColor: "var(--dark-card)" }}
            >
              <Icon name="MessageCircle" size={18} />
              Запросить полный каталог
            </button>
          </div>
        </div>
      </AnimSection>

      {/* ABOUT */}
      <AnimSection id="about" className="py-24 px-6" style={{ backgroundColor: "rgba(20,20,20,0.7)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-medium tracking-widest uppercase mb-3 font-heading" style={{ color: "var(--fire-orange)" }}>— О компании</div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
                ПСК<br />«ПОЖАРНАЯ ЛИГА»
              </h2>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>Мы осуществляем <span className="text-white font-medium">продажу и поставку современного противопожарного оборудования</span> в Великом Новгороде и Новгородской области.</p>
                <p>Вся представленная продукция <span className="text-white font-medium">сертифицирована, имеет паспорта и руководства по эксплуатации.</span> Проконсультируем по техническим характеристикам и поможем с подбором.</p>
                <p>Предлагаем <span className="text-white font-medium">бесплатный пожарный аудит</span> — узнайте, насколько ваш объект соответствует требованиям пожарной безопасности.</p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { icon: "Award", text: "Сертифицированная продукция" },
                  { icon: "Truck", text: "Доставка по области" },
                  { icon: "Headphones", text: "Техническая консультация" },
                  { icon: "ClipboardCheck", text: "Бесплатный аудит объекта" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: "var(--dark-card)", border: "1px solid var(--dark-border)" }}>
                    <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(234,88,12,0.15)" }}>
                      <Icon name={item.icon} size={16} style={{ color: "var(--fire-orange)" }} />
                    </div>
                    <span className="text-sm text-gray-300 leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 60px rgba(234,88,12,0.12)" }}>
                <img src={AUDIT_IMG} alt="Пожарный аудит" className="w-full h-[480px] object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(13,13,13,0.85) 100%)" }} />
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl border backdrop-blur-sm" style={{ backgroundColor: "rgba(13,13,13,0.85)", borderColor: "rgba(234,88,12,0.3)" }}>
                  <div className="font-heading text-white font-semibold mb-1">Бесплатный пожарный аудит</div>
                  <div className="text-sm text-gray-400 mb-3">Проверим соответствие вашего объекта нормам пожарной безопасности</div>
                  <button onClick={() => scrollTo("contacts")} className="text-sm font-medium font-heading tracking-wide flex items-center gap-1" style={{ color: "var(--fire-orange)" }}>
                    Записаться на аудит <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* DOCS */}
      <AnimSection id="docs" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-medium tracking-widest uppercase mb-3 font-heading" style={{ color: "var(--fire-orange)" }}>— Документация</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">ДОКУМЕНТЫ</h2>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">Вся продукция имеет необходимую документацию. Запросите нужные документы по телефону или через форму обратной связи.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {DOCS.map((doc) => (
              <div
                key={doc.name}
                className="group flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-300 hover:border-orange-600 hover:-translate-y-1 cursor-pointer"
                style={{ backgroundColor: "var(--dark-card)", borderColor: "var(--dark-border)" }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(234,88,12,0.12)", border: "1px solid rgba(234,88,12,0.2)" }}>
                  <Icon name={doc.icon} size={26} style={{ color: "var(--fire-orange)" }} />
                </div>
                <span className="text-sm font-medium text-gray-400 leading-snug group-hover:text-white transition-colors">{doc.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 rounded-2xl border text-center" style={{ backgroundColor: "rgba(234,88,12,0.04)", borderColor: "rgba(234,88,12,0.2)" }}>
            <div className="font-heading text-xl font-semibold text-white mb-2">Нужен конкретный документ?</div>
            <p className="text-gray-400 text-sm mb-6">Запросите паспорта, сертификаты или руководства по эксплуатации на любую позицию</p>
            <button onClick={() => scrollTo("contacts")} className="inline-flex items-center gap-2 px-6 py-3 rounded font-heading font-semibold text-white text-sm tracking-wide transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #ea580c, #dc2626)" }}>
              <Icon name="Send" size={16} />
              Запросить документы
            </button>
          </div>
        </div>
      </AnimSection>
    </>
  );
}
