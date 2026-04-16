import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_EMAIL_URL = "https://functions.poehali.dev/c0baf944-e379-4c19-a4a8-8f11880b7370";

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

interface ContactsSectionProps {
  navItems: { id: string; label: string }[];
  scrollTo: (id: string) => void;
}

export default function ContactsSection({ navItems, scrollTo }: ContactsSectionProps) {
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!formName.trim() || !formPhone.trim()) return;
    setFormStatus("loading");
    try {
      await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, phone: formPhone, message: formMessage }),
      });
      setFormStatus("success");
      setFormName("");
      setFormPhone("");
      setFormMessage("");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
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

            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(234,88,12,0.15)", border: "2px solid rgba(234,88,12,0.4)" }}>
                  <Icon name="CheckCircle" size={32} style={{ color: "var(--fire-orange)" }} />
                </div>
                <div className="text-center">
                  <div className="font-heading text-xl font-bold text-white mb-1">Заявка отправлена!</div>
                  <p className="text-gray-400 text-sm">Мы свяжемся с вами в ближайшее время</p>
                </div>
                <button onClick={() => setFormStatus("idle")} className="text-sm font-heading tracking-wide" style={{ color: "var(--fire-orange)" }}>
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="px-4 py-3 rounded-lg text-white text-sm outline-none border focus:border-orange-500 transition-colors font-body"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "var(--dark-border)" }}
                />
                <input
                  type="tel"
                  placeholder="Ваш телефон *"
                  value={formPhone}
                  onChange={e => setFormPhone(e.target.value)}
                  className="px-4 py-3 rounded-lg text-white text-sm outline-none border focus:border-orange-500 transition-colors font-body"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "var(--dark-border)" }}
                />
                <textarea
                  placeholder="Опишите ваш запрос..."
                  rows={4}
                  value={formMessage}
                  onChange={e => setFormMessage(e.target.value)}
                  className="sm:col-span-2 px-4 py-3 rounded-lg text-white text-sm outline-none border focus:border-orange-500 transition-colors resize-none font-body"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "var(--dark-border)" }}
                />
                <div className="sm:col-span-2 flex items-center gap-4 flex-wrap">
                  <button
                    onClick={handleSubmit}
                    disabled={formStatus === "loading" || !formName.trim() || !formPhone.trim()}
                    className="px-10 py-3.5 rounded font-heading font-semibold text-white tracking-wide transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ background: "linear-gradient(135deg, #ea580c, #dc2626)", boxShadow: "0 0 25px rgba(234,88,12,0.3)" }}
                  >
                    <Icon name={formStatus === "loading" ? "Loader" : "Send"} size={16} className={formStatus === "loading" ? "animate-spin" : ""} />
                    {formStatus === "loading" ? "Отправляем..." : "Отправить заявку"}
                  </button>
                  {formStatus === "error" && (
                    <span className="text-sm text-red-400">Ошибка отправки. Позвоните нам напрямую.</span>
                  )}
                </div>
              </div>
            )}
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
    </>
  );
}
