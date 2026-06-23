import AddButton from "../UI/AddButton";
import SectionTitle from "../UI/SectionTitle";

function Skills({ skills, handleSkillChange, addSkill, removeSkill }) {
  return (
    <>
      <SectionTitle title="Skills" />

      {skills.map((skill, index) => (
        <div key={index} className="flex gap-2 mb-3">
          <input
            className="w-full border border-gray-300 p-2 rounded outline-none focus:border-blue-500"
            placeholder="Skill e.g. React.js"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />

          {skills.length > 1 && (
            <button
              type="button"
              className="bg-red-500 text-white px-3 rounded"
              onClick={() => removeSkill(index)}
            >
              X
            </button>
          )}
        </div>
      ))}

      <AddButton text="+ Add More Skill" onClick={addSkill} />
    </>
  );
}

export default Skills;