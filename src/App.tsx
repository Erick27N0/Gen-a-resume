import { useState } from "react";
import { 
  FileDown, 
  Palette, 
  Type, 
  FileText, 
  RotateCcw, 
  Trash2, 
  Sparkles,
  Layers,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { CVData, CVTheme, CVFont, CVLayout } from "./types";
import { demoCVData, defaultEmptyCVData } from "./data";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";

// 4 Professional color themes (Nouvance primary colors included)
export const CV_THEMES: CVTheme[] = [
  {
    id: "navy",
    name: "Bleu Nuit",
    primaryColor: "#132B63", // Bleu Nuit Nouvance
    primaryBg: "#132B630F",
    textAccent: "text-[#132B63]"
  },
  {
    id: "purple",
    name: "Violet Nouvance",
    primaryColor: "#7B3FF2", // Violet Nouvance
    primaryBg: "#7B3FF20F",
    textAccent: "text-[#7B3FF2]"
  },
  {
    id: "forest",
    name: "Vert Forêt",
    primaryColor: "#0F5132",
    primaryBg: "#0F51320F",
    textAccent: "text-[#0F5132]"
  },
  {
    id: "anthracite",
    name: "Gris Anthracite",
    primaryColor: "#334155",
    primaryBg: "#3341550F",
    textAccent: "text-[#334155]"
  }
];

export default function App() {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      summary: ""
    },
    experiences: [],
    educations: [],
    skills: [],
    languages: []
  });

  const [activeThemeId, setActiveThemeId] = useState<string>("navy");
  const [activeFont, setActiveFont] = useState<CVFont>("sans");
  const [activeLayout, setActiveLayout] = useState<CVLayout>("sidebar-right");
  const [notification, setNotification] = useState<string | null>(null);

  // Find active theme
  const currentTheme = CV_THEMES.find((t) => t.id === activeThemeId) || CV_THEMES[0];

  const handleFillDemoData = () => {
    setCvData(demoCVData);
    showNotification("Données de démonstration importées avec succès !");
  };

  const handleClearData = () => {
    if (window.confirm("Êtes-vous sûr de vouloir effacer tout le contenu ?")) {
      setCvData(defaultEmptyCVData);
      showNotification("Le formulaire a été vidé.");
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* HEADER BAR (Hides during Print) */}
      <header className="no-print bg-white border-b border-slate-100 sticky top-0 z-50 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo / Branding */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#132B63] flex items-center justify-center rounded-[8px] text-white">
              <FileText size={18} />
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wide text-nouvance-blue block">Nouvance IA</span>
              <h1 className="text-base font-bold text-slate-800 leading-none">Générateur de CV en ligne</h1>
            </div>
          </div>

          {/* Quick Global Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleFillDemoData}
              className="inline-flex items-center gap-1.5 bg-nouvance-purple/10 hover:bg-nouvance-purple/20 text-nouvance-purple text-xs font-semibold py-2 px-3 rounded-[8px] transition-colors cursor-pointer"
            >
              <Sparkles size={14} />
              Remplir de démo
            </button>
            <button
              onClick={handleClearData}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium py-2 px-3 rounded-[8px] transition-colors cursor-pointer"
              title="Vider le formulaire"
            >
              <RotateCcw size={14} />
              Vider
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-[#132B63] hover:bg-[#1f3f88] text-white text-xs font-bold py-2 px-4 rounded-[8px] transition-colors cursor-pointer"
            >
              <FileDown size={14} />
              Télécharger en PDF
            </button>
          </div>
        </div>
      </header>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className="no-print fixed top-16 right-4 sm:right-6 bg-slate-900 text-white text-xs py-2.5 px-4 rounded-[8px] shadow-lg flex items-center gap-2 z-50 animate-fadeIn border border-slate-800">
          <CheckCircle size={14} className="text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* WORKSPACE AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* LEFT COLUMN: FORM PANEL (6 Cols) */}
        <div className="no-print lg:col-span-5 space-y-6">
          {/* Welcome Intro Card */}
          <div className="bg-white border border-slate-100 rounded-[8px] p-4 space-y-3 shadow-xs">
            <div className="flex items-start gap-2.5 text-slate-600">
              <div className="p-1 bg-[#132B63]/5 rounded-md text-nouvance-blue mt-0.5">
                <HelpCircle size={14} />
              </div>
              <p className="text-xs leading-relaxed">
                Remplissez vos coordonnées, vos expériences et formations dans les formulaires ci-dessous. Le document de droite se mettra à jour en temps réel à chaque touche.
              </p>
            </div>
          </div>

          {/* Configuration Toolbar */}
          <div className="bg-white border border-slate-100 rounded-[8px] p-4 space-y-4">
            <h3 className="text-xs font-bold text-nouvance-blue uppercase tracking-wider flex items-center gap-2">
              <Palette size={14} className="text-nouvance-purple" />
              Personnalisation
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Theme Color Picker */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] font-semibold text-slate-500">Palette de couleurs</span>
                  <div className="flex items-center gap-2">
                    {CV_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setActiveThemeId(theme.id)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                          activeThemeId === theme.id ? "border-[#132B63]" : "border-transparent hover:scale-105"
                        }`}
                        title={theme.name}
                      >
                        <span 
                          className="w-5 h-5 rounded-full block shadow-xs" 
                          style={{ backgroundColor: theme.primaryColor }} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Selector */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] font-semibold text-slate-500">Style typographique</span>
                  <div className="flex bg-slate-100 p-0.5 rounded-[8px] w-fit">
                    <button
                      onClick={() => setActiveFont("sans")}
                      className={`px-3 py-1 text-[11px] font-medium rounded-[6px] cursor-pointer transition-colors ${
                        activeFont === "sans" 
                          ? "bg-white text-slate-800 shadow-xs" 
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Sans-Serif (Inter)
                    </button>
                    <button
                      onClick={() => setActiveFont("serif")}
                      className={`px-3 py-1 text-[11px] font-medium rounded-[6px] cursor-pointer transition-colors ${
                        activeFont === "serif" 
                          ? "bg-white text-slate-800 shadow-xs" 
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Serif (Playfair)
                    </button>
                  </div>
                </div>
              </div>

              {/* Layout Selector */}
              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                <span className="block text-[11px] font-semibold text-slate-500 mb-1.5">Structure &amp; Disposition (Layout)</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveLayout("classic")}
                    className={`py-2 px-2.5 text-[11px] font-medium rounded-[8px] border text-center transition-all cursor-pointer ${
                      activeLayout === "classic"
                        ? "bg-nouvance-blue text-white border-nouvance-blue font-bold shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Classique (1 Col)
                  </button>
                  <button
                    onClick={() => setActiveLayout("sidebar-left")}
                    className={`py-2 px-2.5 text-[11px] font-medium rounded-[8px] border text-center transition-all cursor-pointer ${
                      activeLayout === "sidebar-left"
                        ? "bg-nouvance-blue text-white border-nouvance-blue font-bold shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Sidebar Gauche
                  </button>
                  <button
                    onClick={() => setActiveLayout("sidebar-right")}
                    className={`py-2 px-2.5 text-[11px] font-medium rounded-[8px] border text-center transition-all cursor-pointer ${
                      activeLayout === "sidebar-right"
                        ? "bg-nouvance-blue text-white border-nouvance-blue font-bold shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    Sidebar Droite
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Form inputs Accordion */}
          <CVForm data={cvData} onChange={(newData) => setCvData(newData)} />
        </div>

        {/* RIGHT COLUMN: LIVE RESUME PREVIEW PANEL (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Paper stage header */}
          <div className="no-print w-full flex items-center justify-between mb-3 text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Aperçu synchrone (Format A4)
            </span>
            <span>Échelle : 100%</span>
          </div>

          {/* Printable Page Container */}
          <div className="w-full relative bg-slate-200/50 rounded-[8px] p-2 sm:p-4 md:p-6 border border-slate-200/80 shadow-inner max-w-full overflow-x-auto min-h-[400px]">
            <CVPreview data={cvData} theme={currentTheme} font={activeFont} layout={activeLayout} />
          </div>
        </div>
      </main>

      {/* FOOTER BAR (Hides during Print) */}
      <footer className="no-print bg-white border-t border-slate-100 py-6 px-4 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto space-y-1">
          <p>© 2026 Nouvance IA. Tous droits réservés.</p>
          <p className="text-slate-350">Conçu avec précision sous l'identité de marque Nouvance IA.</p>
        </div>
      </footer>
    </div>
  );
}
