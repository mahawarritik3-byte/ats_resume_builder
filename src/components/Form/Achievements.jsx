import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import AddButton from "../UI/AddButton";
import RemoveButton from "../UI/RemoveButton";
import SectionTitle from "../UI/SectionTitle";

function Achievements({ achievements, handleArrayChange, addItem, removeItem }) {
  return (
    <>
      <SectionTitle title="Achievements" />

      {achievements.map((ach, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
          <Input
            placeholder="Achievement Title"
            value={ach.title}
            onChange={(e) =>
              handleArrayChange("achievements", index, "title", e.target.value)
            }
          />

          <Textarea
            placeholder="Achievement Description"
            value={ach.description}
            onChange={(e) =>
              handleArrayChange("achievements", index, "description", e.target.value)
            }
          />

          {achievements.length > 1 && (
            <RemoveButton onClick={() => removeItem("achievements", index)} />
          )}
        </div>
      ))}

      <AddButton
        text="+ Add More Achievement"
        onClick={() =>
          addItem("achievements", {
            title: "",
            description: "",
          })
        }
      />
    </>
  );
}

export default Achievements;