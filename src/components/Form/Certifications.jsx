import Input from "../UI/Input";
import AddButton from "../UI/AddButton";
import RemoveButton from "../UI/RemoveButton";
import SectionTitle from "../UI/SectionTitle";

function Certifications({ certifications, handleArrayChange, addItem, removeItem }) {
  return (
    <>
      <SectionTitle title="Certifications" />

      {certifications.map((cert, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
          <Input
            placeholder="Certificate Name"
            value={cert.name}
            onChange={(e) =>
              handleArrayChange("certifications", index, "name", e.target.value)
            }
          />

          <Input
            placeholder="Organization"
            value={cert.organization}
            onChange={(e) =>
              handleArrayChange(
                "certifications",
                index,
                "organization",
                e.target.value
              )
            }
          />

          <Input
            placeholder="Date"
            value={cert.date}
            onChange={(e) =>
              handleArrayChange("certifications", index, "date", e.target.value)
            }
          />

          <Input
            placeholder="Certificate Link"
            value={cert.link}
            onChange={(e) =>
              handleArrayChange("certifications", index, "link", e.target.value)
            }
          />

          {certifications.length > 1 && (
            <RemoveButton onClick={() => removeItem("certifications", index)} />
          )}
        </div>
      ))}

      <AddButton
        text="+ Add More Certification"
        onClick={() =>
          addItem("certifications", {
            name: "",
            organization: "",
            date: "",
            link: "",
          })
        }
      />
    </>
  );
}

export default Certifications;