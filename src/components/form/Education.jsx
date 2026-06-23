import Input from "../UI/Input";
import AddButton from "../UI/AddButton";
import RemoveButton from "../UI/RemoveButton";
import SectionTitle from "../UI/SectionTitle";

function Education({ education, handleArrayChange, addItem, removeItem }) {
  return (
    <>
      <SectionTitle title="Education" />

      {education.map((edu, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
          <Input
            placeholder="Institution Name"
            value={edu.institution}
            onChange={(e) =>
              handleArrayChange("education", index, "institution", e.target.value)
            }
          />

          <Input
            placeholder="Degree / Class"
            value={edu.degree}
            onChange={(e) =>
              handleArrayChange("education", index, "degree", e.target.value)
            }
          />

          <Input
            placeholder="Branch / Stream"
            value={edu.branch}
            onChange={(e) =>
              handleArrayChange("education", index, "branch", e.target.value)
            }
          />

          <Input
            placeholder="Location e.g. Jaipur, Rajasthan"
            value={edu.location}
            onChange={(e) =>
              handleArrayChange("education", index, "location", e.target.value)
            }
          />

          <Input
            placeholder="Start Year"
            value={edu.startYear}
            onChange={(e) =>
              handleArrayChange("education", index, "startYear", e.target.value)
            }
          />

          <Input
            placeholder="End Year"
            value={edu.endYear}
            onChange={(e) =>
              handleArrayChange("education", index, "endYear", e.target.value)
            }
          />

          <Input
            placeholder="CGPA / Percentage"
            value={edu.score}
            onChange={(e) =>
              handleArrayChange("education", index, "score", e.target.value)
            }
          />

          {education.length > 1 && (
            <RemoveButton onClick={() => removeItem("education", index)} />
          )}
        </div>
      ))}

      <AddButton
        text="+ Add More Education"
        onClick={() =>
          addItem("education", {
            institution: "",
            degree: "",
            branch: "",
            location: "",
            startYear: "",
            endYear: "",
            score: "",
          })
        }
      />
    </>
  );
}

export default Education;