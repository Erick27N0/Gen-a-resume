import React, { useState } from "react";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Languages as LanguagesIcon, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin
} from "lucide-react";
import { CVData, Experience, Education, Language } from "../types";

interface CVFormProps {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export default function CVForm({ data, onChange }: CVFormProps) {
  // Accordion open states
  const [activeSection, setActiveSection] = useState<string>("personal");
  
  // Temporary skill input state
  const [skillInput, setSkillInput] = useState<string>("");
  
  // Temporary language input states
  const [langName, setLangName] = useState<string>("");
  const [langLevel, setLangLevel] = useState<string>("Courant");

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  // Update helper
  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string) => {
    const updated = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    };
    onChange(updated);
  };

  // --- EXPERIENCES HANDLERS ---
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange({
      ...data,
      experiences: [...data.experiences, newExp]
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updatedExperiences = [...data.experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    // If set to current, clear endDate
    if (field === "current" && value === true) {
      updatedExperiences[index].endDate = "";
    }
    onChange({
      ...data,
      experiences: updatedExperiences
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter(exp => exp.id !== id)
    });
  };

  // --- EDUCATIONS HANDLERS ---
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: "",
      school: "",
      city: "",
      year: "",
      description: ""
    };
    onChange({
      ...data,
      educations: [...data.educations, newEdu]
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updatedEducations = [...data.educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value
    };
    onChange({
      ...data,
      educations: updatedEducations
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      educations: data.educations.filter(edu => edu.id !== id)
    });
  };

  // --- SKILLS HANDLERS ---
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkill = skillInput.trim();
    if (cleanSkill && !data.skills.includes(cleanSkill)) {
      onChange({
        ...data,
        skills: [...data.skills, cleanSkill]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s !== skillToRemove)
    });
  };

  // --- LANGUAGES HANDLERS ---
  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanLang = langName.trim();
    if (cleanLang) {
      const newLang: Language = {
        id: `lang-${Date.now()}`,
        name: cleanLang,
        level: langLevel
      };
      onChange({
        ...data,
        languages: [...data.languages, newLang]
      });
      setLangName("");
    }
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(l => l.id !== id)
    });
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* 1. SECTION: INFOS PERSONNELLES */}
      <div className="bg-white border border-slate-100 rounded-[8px] overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection("personal")}
          className="w-full flex items-center justify-between p-4 bg-white text-left font-medium text-nouvance-blue hover:bg-slate-50/50 transition-colors duration-150"
          id="accordion-btn-personal"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#132B63]/5 rounded-[6px] text-nouvance-blue">
              <User size={18} />
            </div>
            <span>Informations personnelles</span>
          </div>
          {activeSection === "personal" ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {activeSection === "personal" && (
          <div className="p-4 border-t border-slate-100 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Nom complet</label>
                <input
                  type="text"
                  placeholder="ex: Alexandre Dupuis"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Poste visé / Titre</label>
                <input
                  type="text"
                  placeholder="ex: Product Designer"
                  value={data.personalInfo.jobTitle}
                  onChange={(e) => updatePersonalInfo("jobTitle", e.target.value)}
                  className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Adresse e-mail</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400"><Mail size={15} /></span>
                  <input
                    type="email"
                    placeholder="ex: contact@example.com"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    className="w-full pl-9 pr-3 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Téléphone</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400"><Phone size={15} /></span>
                  <input
                    type="text"
                    placeholder="ex: +33 6 00 00 00 00"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    className="w-full pl-9 pr-3 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Localisation</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400"><MapPin size={15} /></span>
                  <input
                    type="text"
                    placeholder="ex: Paris, France"
                    value={data.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    className="w-full pl-9 pr-3 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Site internet / Portfolio</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-400"><Globe size={15} /></span>
                  <input
                    type="text"
                    placeholder="ex: https://portfolio.me"
                    value={data.personalInfo.website}
                    onChange={(e) => updatePersonalInfo("website", e.target.value)}
                    className="w-full pl-9 pr-3 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Profil LinkedIn</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400"><Linkedin size={15} /></span>
                <input
                  type="text"
                  placeholder="ex: linkedin.com/in/profil"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                  className="w-full pl-9 pr-3 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">À propos de moi / Accroche</label>
              <textarea
                rows={3}
                placeholder="Rédigez un résumé accrocheur de votre parcours et de vos motivations..."
                value={data.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white transition-colors resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. SECTION: EXPERIENCES */}
      <div className="bg-white border border-slate-100 rounded-[8px] overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection("experiences")}
          className="w-full flex items-center justify-between p-4 bg-white text-left font-medium text-nouvance-blue hover:bg-slate-50/50 transition-colors duration-150"
          id="accordion-btn-experiences"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#132B63]/5 rounded-[6px] text-nouvance-blue">
              <Briefcase size={18} />
            </div>
            <span className="flex items-center gap-2">
              Expériences professionnelles
              <span className="text-xs bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full font-normal">
                {data.experiences.length}
              </span>
            </span>
          </div>
          {activeSection === "experiences" ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {activeSection === "experiences" && (
          <div className="p-4 border-t border-slate-100 space-y-4 animate-fadeIn">
            {data.experiences.map((exp, idx) => (
              <div key={exp.id} className="p-4 border border-slate-150 rounded-[8px] bg-slate-50/50 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-white hover:shadow-xs transition-all"
                  title="Supprimer cette expérience"
                >
                  <Trash2 size={15} />
                </button>
                
                <h4 className="text-xs font-semibold text-nouvance-blue pr-8">
                  {exp.role || exp.company ? `${exp.role} chez ${exp.company}` : `Expérience #${idx + 1}`}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Poste</label>
                    <input
                      type="text"
                      placeholder="ex: UI Designer Senior"
                      value={exp.role}
                      onChange={(e) => updateExperience(idx, "role", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Entreprise</label>
                    <input
                      type="text"
                      placeholder="ex: Google"
                      value={exp.company}
                      onChange={(e) => updateExperience(idx, "company", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Ville / Localisation</label>
                    <input
                      type="text"
                      placeholder="ex: Paris, France"
                      value={exp.location}
                      onChange={(e) => updateExperience(idx, "location", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple"
                    />
                  </div>
                  <div className="flex items-end h-full pb-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(idx, "current", e.target.checked)}
                        className="rounded border-slate-300 text-nouvance-purple focus:ring-nouvance-purple h-4 w-4"
                      />
                      <span className="text-xs text-slate-600">Poste actuel</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Date de début</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(idx, "startDate", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Date de fin</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(idx, "endDate", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Missions & Réalisations (Saut de ligne pour puces)</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez vos tâches quotidiennes et vos réussites majeures..."
                    value={exp.description}
                    onChange={(e) => updateExperience(idx, "description", e.target.value)}
                    className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple resize-none"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-slate-300 hover:border-nouvance-purple rounded-[8px] text-xs font-medium text-nouvance-purple hover:bg-slate-50 transition-all duration-150"
            >
              <Plus size={15} />
              Ajouter une expérience professionnelle
            </button>
          </div>
        )}
      </div>

      {/* 3. SECTION: FORMATIONS */}
      <div className="bg-white border border-slate-100 rounded-[8px] overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection("education")}
          className="w-full flex items-center justify-between p-4 bg-white text-left font-medium text-nouvance-blue hover:bg-slate-50/50 transition-colors duration-150"
          id="accordion-btn-education"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#132B63]/5 rounded-[6px] text-nouvance-blue">
              <GraduationCap size={18} />
            </div>
            <span className="flex items-center gap-2">
              Formations / Études
              <span className="text-xs bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full font-normal">
                {data.educations.length}
              </span>
            </span>
          </div>
          {activeSection === "education" ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {activeSection === "education" && (
          <div className="p-4 border-t border-slate-100 space-y-4 animate-fadeIn">
            {data.educations.map((edu, idx) => (
              <div key={edu.id} className="p-4 border border-slate-150 rounded-[8px] bg-slate-50/50 space-y-3 relative group">
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-white hover:shadow-xs transition-all"
                  title="Supprimer cette formation"
                >
                  <Trash2 size={15} />
                </button>

                <h4 className="text-xs font-semibold text-nouvance-blue pr-8">
                  {edu.degree || edu.school ? `${edu.degree} - ${edu.school}` : `Formation #${idx + 1}`}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Diplôme / Titre</label>
                    <input
                      type="text"
                      placeholder="ex: Master Informatique"
                      value={edu.degree}
                      onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">École / Université</label>
                    <input
                      type="text"
                      placeholder="ex: Université de la Sorbonne"
                      value={edu.school}
                      onChange={(e) => updateEducation(idx, "school", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Ville / Lieu</label>
                    <input
                      type="text"
                      placeholder="ex: Paris"
                      value={edu.city}
                      onChange={(e) => updateEducation(idx, "city", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Année d'obtention (ou période)</label>
                    <input
                      type="text"
                      placeholder="ex: 2022 ou 2020-2022"
                      value={edu.year}
                      onChange={(e) => updateEducation(idx, "year", e.target.value)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-slate-300 hover:border-nouvance-purple rounded-[8px] text-xs font-medium text-nouvance-purple hover:bg-slate-50 transition-all duration-150"
            >
              <Plus size={15} />
              Ajouter une formation
            </button>
          </div>
        )}
      </div>

      {/* 4. SECTION: COMPETENCES */}
      <div className="bg-white border border-slate-100 rounded-[8px] overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection("skills")}
          className="w-full flex items-center justify-between p-4 bg-white text-left font-medium text-nouvance-blue hover:bg-slate-50/50 transition-colors duration-150"
          id="accordion-btn-skills"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#132B63]/5 rounded-[6px] text-nouvance-blue">
              <Wrench size={18} />
            </div>
            <span className="flex items-center gap-2">
              Compétences
              <span className="text-xs bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full font-normal">
                {data.skills.length}
              </span>
            </span>
          </div>
          {activeSection === "skills" ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {activeSection === "skills" && (
          <div className="p-4 border-t border-slate-100 space-y-4 animate-fadeIn">
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="ex: React.js, Figma, SQL..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white"
              />
              <button
                type="submit"
                className="bg-nouvance-purple hover:bg-[#6329db] text-white text-xs px-3 py-2 rounded-[8px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus size={14} />
                Ajouter
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {data.skills.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Aucune compétence ajoutée.</p>
              ) : (
                data.skills.map((skill) => (
                  <span
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    className="inline-flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 py-1 px-2.5 rounded-[8px] text-slate-700 cursor-pointer transition-all"
                    title="Cliquez pour supprimer"
                  >
                    {skill}
                    <span className="text-[10px] text-slate-400 hover:text-rose-600">×</span>
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. SECTION: LANGUES */}
      <div className="bg-white border border-slate-100 rounded-[8px] overflow-hidden transition-all duration-200">
        <button
          onClick={() => toggleSection("languages")}
          className="w-full flex items-center justify-between p-4 bg-white text-left font-medium text-nouvance-blue hover:bg-slate-50/50 transition-colors duration-150"
          id="accordion-btn-languages"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#132B63]/5 rounded-[6px] text-nouvance-blue">
              <LanguagesIcon size={18} />
            </div>
            <span className="flex items-center gap-2">
              Langues
              <span className="text-xs bg-slate-100 text-slate-500 py-0.5 px-2 rounded-full font-normal">
                {data.languages.length}
              </span>
            </span>
          </div>
          {activeSection === "languages" ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {activeSection === "languages" && (
          <div className="p-4 border-t border-slate-100 space-y-4 animate-fadeIn">
            <form onSubmit={handleAddLanguage} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Langue</label>
                <input
                  type="text"
                  placeholder="ex: Anglais"
                  value={langName}
                  onChange={(e) => setLangName(e.target.value)}
                  className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-medium text-slate-500 mb-0.5">Niveau</label>
                <select
                  value={langLevel}
                  onChange={(e) => setLangLevel(e.target.value)}
                  className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-[8px] focus:outline-none focus:border-nouvance-purple focus:bg-white h-[34px]"
                >
                  <option value="Maternelle">Maternelle</option>
                  <option value="Bilingue">Bilingue</option>
                  <option value="Courant">Courant</option>
                  <option value="Professionnel">Professionnel</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Débutant">Débutant</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-nouvance-purple hover:bg-[#6329db] text-white text-xs px-3 py-2 rounded-[8px] font-medium flex items-center justify-center gap-1 cursor-pointer transition-colors h-[34px]"
                >
                  <Plus size={14} />
                  Ajouter
                </button>
              </div>
            </form>

            <div className="space-y-1.5 pt-1">
              {data.languages.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Aucune langue ajoutée.</p>
              ) : (
                data.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex items-center justify-between p-2 bg-slate-50 border border-slate-150 rounded-[8px] text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-700">{lang.name}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 italic">{lang.level}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLanguage(lang.id)}
                      className="text-slate-400 hover:text-rose-500 p-0.5 rounded"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
