import MenuSection from "./MenuSection";
import "./PageSection.css";

export default function PageSection({ PageTitle, sections }) {
  return (
    <div className="page">
      <div className="page-title">{PageTitle}</div>

      {sections.map((section, index) => (
        <MenuSection key={index} {...section} />
      ))}
    </div>
  );
}