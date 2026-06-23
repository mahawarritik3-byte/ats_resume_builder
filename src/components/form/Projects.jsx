import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import AddButton from "../UI/AddButton";
import RemoveButton from "../UI/RemoveButton";
import SectionTitle from "../UI/SectionTitle";

function Projects({ projects, handleArrayChange, addItem, removeItem }) {
  return (
    <>
      <SectionTitle title="Projects" />

      {projects.map((project, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-4">
          <Input
            placeholder="Project Title"
            value={project.title}
            onChange={(e) =>
              handleArrayChange("projects", index, "title", e.target.value)
            }
          />

          <Input
            placeholder="Tech Stack"
            value={project.techStack}
            onChange={(e) =>
              handleArrayChange("projects", index, "techStack", e.target.value)
            }
          />

          <Textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) =>
              handleArrayChange("projects", index, "description", e.target.value)
            }
          />

          <Input
            placeholder="GitHub Link"
            value={project.github}
            onChange={(e) =>
              handleArrayChange("projects", index, "github", e.target.value)
            }
          />

          <Input
            placeholder="Live Demo Link"
            value={project.liveLink}
            onChange={(e) =>
              handleArrayChange("projects", index, "liveLink", e.target.value)
            }
          />

          {projects.length > 1 && (
            <RemoveButton onClick={() => removeItem("projects", index)} />
          )}
        </div>
      ))}

      <AddButton
        text="+ Add More Project"
        onClick={() =>
          addItem("projects", {
            title: "",
            techStack: "",
            description: "",
            github: "",
            liveLink: "",
          })
        }
      />
    </>
  );
}

export default Projects;