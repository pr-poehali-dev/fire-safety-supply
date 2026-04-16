import Icon from "@/components/ui/icon";

interface NavItem {
  id: string;
  label: string;
}

interface NavbarProps {
  navItems: NavItem[];
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function Navbar({ navItems, activeSection, menuOpen, setMenuOpen, scrollTo }: NavbarProps) {
  return (
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
  );
}
