import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Wrench, Languages as LanguagesIcon } from "lucide-react";
import { CVData, CVTheme, CVFont } from "../types";
import { CV_THEMES } from "../App"; // We will export CV_THEMES from App

interface CVPreviewProps {
  data: CVData;
  theme: CVTheme;
  font: CVFont;
}

export default function CVPreview({ data, theme, font }: CVPreviewProps) {
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

  return (
    <div 
      id="cv-preview-print-target"
      className={`w-full bg-white shadow-md border border-slate-100 rounded-[8px] overflow-hidden p-6 sm:p-8 md:p-10 text-slate-800 ${fontClass} aspect-[210/297] flex flex-col justify-between select-none`}
      style={{ minHeight: "297mm" }}
    >
      <div>
        {/* HEADER SECTION */}
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

          {/* CONTACT INFO */}
          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-4 text-[11px] sm:text-xs text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail size={13} style={{ color: theme.primaryColor }} />
                <span>{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone size={13} style={{ color: theme.primaryColor }} />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={13} style={{ color: theme.primaryColor }} />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <Globe size={13} style={{ color: theme.primaryColor }} />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personalInfo.website.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <Linkedin size={13} style={{ color: theme.primaryColor }} />
                <span>{personalInfo.linkedin.replace(/^linkedin\.com\/in\//, "")}</span>
              </span>
            )}
          </div>

          {/* SUMMARY / BIOGRAPHY */}
          {personalInfo.summary && (
            <div className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {personalInfo.summary}
            </div>
          )}
        </div>

        {/* MAIN BODY: 2 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* LEFT COLUMN: EXPERIENCES & EDUCATION */}
          <div className="md:col-span-2 space-y-6 sm:space-y-8">
            {/* EXPERIENCES SECTION */}
            <div>
              <h3 
                className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 flex items-center gap-2 border-b pb-1.5 text-slate-850"
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
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-[4px] h-fit w-fit transition-colors"
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

            {/* FORMATIONS SECTION */}
            <div>
              <h3 
                className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 flex items-center gap-2 border-b pb-1.5 text-slate-850"
                style={{ borderBottomColor: `${theme.primaryColor}25` }}
              >
                <GraduationCap size={13} style={{ color: theme.primaryColor }} />
                <span>FORMATIONS & DIPLÔMES</span>
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
          </div>

          {/* RIGHT COLUMN: SKILLS & LANGUAGES */}
          <div className="space-y-6">
            {/* COMPETENCES */}
            <div>
              <h3 
                className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 flex items-center gap-2 border-b pb-1.5 text-slate-850"
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

            {/* LANGUES */}
            <div>
              <h3 
                className="text-xs font-semibold tracking-[0.15em] uppercase mb-4 flex items-center gap-2 border-b pb-1.5 text-slate-850"
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
          </div>
        </div>
      </div>

      {/* FOOTER - Professional, discrete notice */}
      <div className="mt-8 border-t pt-4 flex items-center justify-between text-[9px] text-slate-400">
        <span>Généré avec l'outil de création de CV interactif</span>
        <span>Document officiel de candidature</span>
      </div>
    </div>
  );
}
