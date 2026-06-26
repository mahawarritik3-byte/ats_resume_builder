function Skills({ skills, handleSkillGroupChange, addSkillGroup, removeSkillGroup }) {
  return (
    <div>
      <div className="skills-header">
        <h3>Skills</h3>

        <button type="button" onClick={addSkillGroup} className="add-group-btn">
          + Add Group
        </button>
      </div>

      {skills.map((skillGroup, index) => (
        <div className="skill-group-card" key={index}>
          <div className="skill-group-top">
            <div className="skill-input-box">
              <label>Group Name</label>
              <input
                type="text"
                placeholder="e.g. Programming"
                value={skillGroup.groupName}
                onChange={(e) =>
                  handleSkillGroupChange(index, "groupName", e.target.value)
                }
              />
            </div>

            <button
              type="button"
              onClick={() => removeSkillGroup(index)}
              className="remove-group-btn"
            >
              Remove
            </button>
          </div>

          <div className="skill-input-box">
            <label>Skills (comma-separated)</label>
            <input
              type="text"
              placeholder="JavaScript, Node.js, React"
              value={skillGroup.skills}
              onChange={(e) =>
                handleSkillGroupChange(index, "skills", e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skills;