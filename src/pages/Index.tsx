import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/498f0023-14bf-4b21-ade4-edf425fe86d4/files/e45f90a1-d078-4c02-b0c3-e61832afb334.jpg";
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

const ADVANTAGES = [
  { num: "500+", label: "Объектов оснащено" },
  { num: "12", label: "Лет на рынке" },
  { num: "1000+", label: "Позиций в каталоге" },
  { num: "100%", label: "Сертифицированная продукция" },
];

function useInView(threshold = 0.1) {
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

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О компании" },
    { id: "docs", label: "Документы" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--dark-bg)", color: "#f5f5f5" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: "rgba(13,13,13,0.95)", backdropFilter: "blur(20px)", borderColor: "var(--dark-border)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ea580c, #dc2626)" }}>
              <Icon name="Flame" size={16} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-heading text-white text-sm font-semibold leading-none tracking-wide">ПОЖАРНАЯ ЛИГА</div>
              <div className="text-xs leading-none mt-0.5" style={{ color: "var(--fire-orange)" }}>ПСК</div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 text-sm font-medium rounded transition-all duration-200 font-heading tracking-wide"
                style={{ color: activeSection === item.id ? "var(--fire-orange)" : "#9ca3af" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a href="tel:+78162000000" className="hidden md:flex items-center gap-2 px-4 py-2 rounded font-heading text-sm font-semibold text-white transition-all duration-200 hover:opacity-80" style={{ background: "linear-gradient(135deg, #ea580c, #c2410c)" }}>
            <Icon name="Phone" size={14} />
            8 (8162) 00-00-00
          </a>

          <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-6 py-4 space-y-1" style={{ borderColor: "var(--dark-border)", backgroundColor: "var(--dark-bg)" }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left px-3 py-2.5 rounded font-heading tracking-wide text-sm text-gray-300">
                {item.label}
              </button>
            ))}
            <a href="tel:+78162000000" className="flex items-center gap-2 mt-3 px-3 py-2.5 rounded font-heading text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #ea580c, #c2410c)" }}>
              <Icon name="Phone" size={14} />
              8 (8162) 00-00-00
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
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

      {/* CONTACTS */}
      <AnimSection id="contacts" className="py-24 px-6" style={{ backgroundColor: "rgba(20,20,20,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-medium tracking-widest uppercase mb-3 font-heading" style={{ color: "var(--fire-orange)" }}>— Связаться с нами</div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">КОНТАКТЫ</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "Phone", title: "Телефон", lines: ["8 (8162) 00-00-00", "8 (800) 000-00-00"], sub: "Звонок бесплатный", href: "tel:+78162000000" },
              { icon: "MapPin", title: "Адрес", lines: ["Великий Новгород,", "ул. Примерная, д. 1"], sub: "Пн–Пт: 9:00–18:00", href: "#" },
              { icon: "Mail", title: "Email", lines: ["info@pozhar-liga.ru"], sub: "Ответим в течение часа", href: "mailto:info@pozhar-liga.ru" },
            ].map(card => (
              <a
                key={card.title}
                href={card.href}
                className="group block p-8 rounded-xl border transition-all duration-300 hover:border-orange-600 hover:-translate-y-1"
                style={{ backgroundColor: "var(--dark-card)", borderColor: "var(--dark-border)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(234,88,12,0.15)", border: "1px solid rgba(234,88,12,0.2)" }}>
                  <Icon name={card.icon} size={22} style={{ color: "var(--fire-orange)" }} />
                </div>
                <div className="font-heading text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--fire-orange)" }}>{card.title}</div>
                {card.lines.map(l => <div key={l} className="font-heading text-xl font-semibold text-white leading-snug">{l}</div>)}
                <div className="mt-2 text-sm text-gray-500">{card.sub}</div>
              </a>
            ))}
          </div>

          <div className="p-8 rounded-2xl border" style={{ backgroundColor: "var(--dark-card)", borderColor: "var(--dark-border)" }}>
            <div className="font-heading text-2xl font-bold text-white mb-1">Оставить заявку</div>
            <p className="text-gray-400 text-sm mb-6">Проконсультируем, рассчитаем стоимость и организуем доставку</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Ваше имя" className="px-4 py-3 rounded-lg text-white text-sm outline-none border focus:border-orange-500 transition-colors font-body" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "var(--dark-border)" }} />
              <input type="tel" placeholder="Ваш телефон" className="px-4 py-3 rounded-lg text-white text-sm outline-none border focus:border-orange-500 transition-colors font-body" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "var(--dark-border)" }} />
              <textarea placeholder="Опишите ваш запрос..." rows={4} className="sm:col-span-2 px-4 py-3 rounded-lg text-white text-sm outline-none border focus:border-orange-500 transition-colors resize-none font-body" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "var(--dark-border)" }} />
              <div className="sm:col-span-2">
                <button className="px-10 py-3.5 rounded font-heading font-semibold text-white tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-2" style={{ background: "linear-gradient(135deg, #ea580c, #dc2626)", boxShadow: "0 0 25px rgba(234,88,12,0.3)" }}>
                  <Icon name="Send" size={16} />
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* FOOTER */}
      <footer className="border-t py-10 px-6" style={{ borderColor: "var(--dark-border)", backgroundColor: "var(--dark-bg)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ea580c, #dc2626)" }}>
              <Icon name="Flame" size={16} className="text-white" />
            </div>
            <div>
              <div className="font-heading text-white text-sm font-semibold">ПСК «ПОЖАРНАЯ ЛИГА»</div>
              <div className="text-xs text-gray-600">Великий Новгород и область</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="hover:text-gray-300 transition-colors font-heading tracking-wide">{item.label}</button>
            ))}
          </div>
          <div className="text-xs text-gray-600">© 2024 ПСК «Пожарная Лига»</div>
        </div>
      </footer>
    </div>
  );
}