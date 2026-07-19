import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Wrench, Languages as LanguagesIcon } from "lucide-react";
import { CVData, CVTheme, CVFont, CVLayout } from "../types";

interface CVPreviewProps {
  data: CVData;
  theme: CVTheme;
  font: CVFont;
  layout: CVLayout;
}

export default function CVPreview({ data, theme, font, layout }: CVPreviewProps) {
  const fontClass = font === "serif" ? "font-serif" : "font-sans";

  // Helper to format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const [year, month] = dateStr.split("-");
      if (!month) return year;
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const { personalInfo, experiences, educations, skills, languages } = data;

  // --- SUB-RENDER METHODS ---

  // Renders contact information in either horizontal or vertical layout
  const renderContactInfo = (isVertical = false) => {
    const listClasses = isVertical 
      ? "flex flex-col gap-3 text-[11px] text-slate-650"
      : "flex flex-wrap gap-y-2 gap-x-4 mt-4 text-[11px] sm:text-xs text-slate-600";
    
    return (
      <div className={listClasses}>
        {personalInfo.email && (
          <span className="flex items-center gap-2">
            <Mail size={13} style={{ color: theme.primaryColor }} />
            <span className="break-all">{personalInfo.email}</span>
          </span>
        )}
        {personalInfo.phone && (
          <span className="flex items-center gap-2">
            <Phone size={13} style={{ color: theme.primaryColor }} />
            <span>{personalInfo.phone}</span>
          </span>
        )}
        {personalInfo.location && (
          <span className="flex items-center gap-2">
            <MapPin size={13} style={{ color: theme.primaryColor }} />
            <span>{personalInfo.location}</span>
          </span>
        )}
        {personalInfo.website && (
          <span className="flex items-center gap-2">
            <Globe size={13} style={{ color: theme.primaryColor }} />
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
              {personalInfo.website.replace(/^https?:\/\//, "")}
            </a>
          </span>
        )}
        {personalInfo.linkedin && (
          <span className="flex items-center gap-2">
            <Linkedin size={13} style={{ color: theme.primaryColor }} />
            <span className="break-all">{personalInfo.linkedin.replace(/^linkedin\.com\/in\//, "")}</span>
          </span>
        )}
      </div>
    );
  };

  const renderExperiences = () => {
    return (
      <div className="space-y-4">
        <h3 
          className="text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2 border-b pb-1.5 text-slate-800"
          style={{ borderBottomColor: `${theme.primaryColor}25` }}
        >
          <Briefcase size={13} style={{ color: theme.primaryColor }} />
          <span>EXPÉRIENCES PROFESSIONNELLES</span>
        </h3>

        {experiences.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Aucune expérience renseignée.</p>
        ) : (
          <div className="space-y-5">
            {experiences.map((exp, idx) => (
              <div 
                key={exp.id} 
                className="relative pl-4 border-l-2 transition-all duration-300"
                style={{ borderColor: idx === 0 ? theme.primaryColor : '#e2e8f0' }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {exp.role || "Titre du poste"}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {exp.company || "Entreprise"}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <span 
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-[4px] h-fit w-fit whitespace-nowrap" 
                    style={{ backgroundColor: theme.primaryBg, color: theme.primaryColor }}
                  >
                    {formatDate(exp.startDate)} — {exp.current ? "En poste" : formatDate(exp.endDate)}
                  </span>
                </div>
                
                {exp.description && (
                  <div className="text-[11px] sm:text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderEducations = () => {
    return (
      <div className="space-y-4">
        <h3 
          className="text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2 border-b pb-1.5 text-slate-800"
          style={{ borderBottomColor: `${theme.primaryColor}25` }}
        >
          <GraduationCap size={13} style={{ color: theme.primaryColor }} />
          <span>FORMATIONS &amp; DIPLÔMES</span>
        </h3>

        {educations.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Aucune formation renseignée.</p>
        ) : (
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {edu.degree || "Diplôme obtenu"}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {edu.school || "École ou Université"}
                    {edu.city && ` • ${edu.city}`}
                  </p>
                </div>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 py-0.5 px-2 rounded-[4px] h-fit w-fit">
                  {edu.year || "Année"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSkills = () => {
    return (
      <div className="space-y-4">
        <h3 
          className="text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2 border-b pb-1.5 text-slate-800"
          style={{ borderBottomColor: `${theme.primaryColor}25` }}
        >
          <Wrench size={13} style={{ color: theme.primaryColor }} />
          <span>COMPÉTENCES</span>
        </h3>

        {skills.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Aucune compétence renseignée.</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="text-[10px] sm:text-xs font-medium py-1 px-2.5 rounded-[6px] border text-slate-700"
                style={{ borderColor: `${theme.primaryColor}15`, backgroundColor: `${theme.primaryColor}05` }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderLanguages = () => {
    return (
      <div className="space-y-4">
        <h3 
          className="text-xs font-semibold tracking-[0.15em] uppercase flex items-center gap-2 border-b pb-1.5 text-slate-800"
          style={{ borderBottomColor: `${theme.primaryColor}25` }}
        >
          <LanguagesIcon size={13} style={{ color: theme.primaryColor }} />
          <span>LANGUES</span>
        </h3>

        {languages.length === 0 ? (
          <p className="text-xs text-slate-400 italic">Aucune langue renseignée.</p>
        ) : (
          <div className="space-y-2.5">
            {languages.map((lang) => (
              <div key={lang.id} className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{lang.name}</span>
                <span 
                  className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-[4px]"
                  style={{ backgroundColor: theme.primaryBg, color: theme.primaryColor }}
                >
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      id="cv-preview-print-target"
      className={`w-full bg-white shadow-md border border-slate-100 rounded-[8px] overflow-hidden p-6 sm:p-8 md:p-10 text-slate-800 ${fontClass} aspect-[210/297] flex flex-col justify-between select-none`}
      style={{ minHeight: "297mm" }}
    >
      <div>
        {/* --- LAYOUT 1: SIDEBAR RIGHT (Asymmetric Right) --- */}
        {layout === "sidebar-right" && (
          <>
            {/* Header full width */}
            <div className="border-b pb-6 mb-6" style={{ borderColor: `${theme.primaryColor}20` }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 transition-colors"
                    style={{ color: theme.primaryColor }}
                  >
                    {personalInfo.fullName || "Votre Nom Complet"}
                  </h1>
                  <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">
                    {personalInfo.jobTitle || "Titre du poste ciblé"}
                  </p>
                </div>
              </div>

              {/* Horizontal contact info */}
              {renderContactInfo(false)}

              {/* Summary */}
              {personalInfo.summary && (
                <div className="mt-4 text-xs sm:text-sm text-slate-650 leading-relaxed max-w-3xl">
                  {personalInfo.summary}
                </div>
              )}
            </div>

            {/* Asymmetric columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Left wide column */}
              <div className="md:col-span-2 space-y-6 sm:space-y-8">
                {renderExperiences()}
                {renderEducations()}
              </div>

              {/* Right narrow column */}
              <div className="space-y-6 sm:space-y-8">
                {renderSkills()}
                {renderLanguages()}
              </div>
            </div>
          </>
        )}

        {/* --- LAYOUT 2: SIDEBAR LEFT (Asymmetric Left) --- */}
        {layout === "sidebar-left" && (
          <>
            {/* Top Minimal Header with Name and Job Title only */}
            <div className="border-b pb-5 mb-6" style={{ borderColor: `${theme.primaryColor}20` }}>
              <h1 
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 transition-colors"
                style={{ color: theme.primaryColor }}
              >
                {personalInfo.fullName || "Votre Nom Complet"}
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">
                {personalInfo.jobTitle || "Titre du poste ciblé"}
              </p>
            </div>

            {/* Asymmetric columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Left sidebar narrow column (Contact, Skills, Languages) */}
              <div className="space-y-6 sm:space-y-8">
                {/* Contact section explicitly styled in sidebar */}
                <div className="space-y-4">
                  <h3 
                    className="text-xs font-semibold tracking-[0.15em] uppercase border-b pb-1.5 text-slate-800"
                    style={{ borderBottomColor: `${theme.primaryColor}25` }}
                  >
                    <span>CONTACT</span>
                  </h3>
                  {renderContactInfo(true)}
                </div>

                {renderSkills()}
                {renderLanguages()}
              </div>

              {/* Right main column (Summary, Experiences, Educations) */}
              <div className="md:col-span-2 space-y-6 sm:space-y-8">
                {/* Summary at top of right side */}
                {personalInfo.summary && (
                  <div className="text-xs sm:text-sm text-slate-650 leading-relaxed max-w-3xl border-l-2 pl-3" style={{ borderColor: theme.primaryColor }}>
                    {personalInfo.summary}
                  </div>
                )}
                {renderExperiences()}
                {renderEducations()}
              </div>
            </div>
          </>
        )}

        {/* --- LAYOUT 3: CLASSIC (Single Column linear geometry) --- */}
        {layout === "classic" && (
          <>
            {/* Header full width */}
            <div className="border-b pb-6 mb-6 text-center" style={{ borderColor: `${theme.primaryColor}20` }}>
              <h1 
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 transition-colors"
                style={{ color: theme.primaryColor }}
              >
                {personalInfo.fullName || "Votre Nom Complet"}
              </h1>
              <p className="text-sm sm:text-base font-medium text-slate-500 mt-1">
                {personalInfo.jobTitle || "Titre du poste ciblé"}
              </p>

              {/* Centered horizontal contact info */}
              <div className="flex justify-center mt-3">
                {renderContactInfo(false)}
              </div>
            </div>

            {/* Linear sequential blocks */}
            <div className="space-y-6 sm:space-y-8">
              {/* Summary */}
              {personalInfo.summary && (
                <div className="text-xs sm:text-sm text-slate-650 leading-relaxed max-w-full text-center italic bg-slate-50 p-4 rounded-[6px] border border-slate-100">
                  {personalInfo.summary}
                </div>
              )}

              {renderExperiences()}
              {renderEducations()}

              {/* Bottom twin section for skills and languages to keep correct page balance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {renderSkills()}
                {renderLanguages()}
              </div>
            </div>
          </>
        )}
      </div>

      {/* FOOTER - Professional, discrete notice */}
      <div className="mt-8 border-t pt-4 flex items-center justify-between text-[9px] text-slate-400">
        <span>Généré avec l'outil de création de CV interactif</span>
        <span>Document officiel de candidature</span>
      </div>
    </div>
  );
}
