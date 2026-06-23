import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import AddButton from "../UI/AddButton";
import RemoveButton from "../UI/RemoveButton";
import SectionTitle from "../UI/SectionTitle";

function Experience({ experience, handleArrayChange, addItem, removeItem }) {
  return (
    <>
      <SectionTitle title="Experience" />

      {experience.map((exp, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
          <Input
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) =>
              handleArrayChange("experience", index, "company", e.target.value)
            }
          />

          <Input
            placeholder="Role"
            value={exp.role}
            onChange={(e) =>
              handleArrayChange("experience", index, "role", e.target.value)
            }
          />

          <select
            className="w-full border border-gray-300 p-2 rounded mb-3 outline-none focus:border-blue-500"
            value={exp.type}
            onChange={(e) =>
              handleArrayChange("experience", index, "type", e.target.value)
            }
          >
            <option value="">Select Experience Type</option>
            <option value="Internship">Internship</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Freelance">Freelance</option>
          </select>

          <Input
            placeholder="Location"
            value={exp.location}
            onChange={(e) =>
              handleArrayChange("experience", index, "location", e.target.value)
            }
          />

          <Input
            placeholder="Start Date"
            value={exp.startDate}
            onChange={(e) =>
              handleArrayChange("experience", index, "startDate", e.target.value)
            }
          />

          <Input
            placeholder="End Date"
            value={exp.endDate}
            onChange={(e) =>
              handleArrayChange("experience", index, "endDate", e.target.value)
            }
          />

          <Textarea
            placeholder="Work Description"
            value={exp.description}
            onChange={(e) =>
              handleArrayChange("experience", index, "description", e.target.value)
            }
          />

          {experience.length > 1 && (
            <RemoveButton onClick={() => removeItem("experience", index)} />
          )}
        </div>
      ))}

      <AddButton
        text="+ Add More Experience"
        onClick={() =>
          addItem("experience", {
            company: "",
            role: "",
            type: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
      />
    </>
  );
}

export default Experience;