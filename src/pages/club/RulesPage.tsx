import { rulesMock } from "@/mocks/rules";

const SECTIONS = Object.values(rulesMock);

export function RulesPage() {
  return (
    <div className="pb-8">
      <div className="px-4 pt-4 pb-2">
        <p className="label-large text-on-surface-variant uppercase tracking-widest">Правила клуба</p>
        <p className="body-medium text-on-surface-variant mt-1">Формируются автоматически из настроек клуба</p>
      </div>
      <div className="space-y-3 px-4 mt-2">
        {SECTIONS.map((section) => (
          <div key={section.title} className="p-5 rounded-[1.25rem] bg-surface-container-low">
            <p className="title-medium text-on-surface mb-3">{section.title}</p>
            <p className="body-medium text-on-surface-variant leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
