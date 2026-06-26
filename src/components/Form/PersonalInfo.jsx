import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import AddButton from "../UI/AddButton";
import RemoveButton from "../UI/RemoveButton";
import SectionTitle from "../UI/SectionTitle";

const codingPlatforms = [
  "LeetCode",
  "CodeChef",
  "Codeforces",
  "GeeksforGeeks",
  "HackerRank",
  "HackerEarth",
  "AtCoder",
  "Coding Ninjas",
  "Codolio",
  "Other",
];

function PersonalInfo({ personalInfo, handlePersonalChange }) {
  const handleCodingProfileChange = (index, field, value) => {
    const updatedProfiles = [...personalInfo.codingProfiles];
    updatedProfiles[index][field] = value;

    handlePersonalChange("codingProfiles", updatedProfiles);
  };

  const addCodingProfile = () => {
    handlePersonalChange("codingProfiles", [
      ...personalInfo.codingProfiles,
      {
        platform: "",
        username: "",
      },
    ]);
  };

  const removeCodingProfile = (index) => {
    const updatedProfiles = personalInfo.codingProfiles.filter(
      (_, i) => i !== index
    );

    handlePersonalChange("codingProfiles", updatedProfiles);
  };

  return (
    <>
      <SectionTitle title="Personal Info" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Full Name"
          value={personalInfo.name}
          onChange={(e) => handlePersonalChange("name", e.target.value)}
        />

        <Input
          placeholder="Email"
          value={personalInfo.email}
          onChange={(e) => handlePersonalChange("email", e.target.value)}
        />

        <Input
          placeholder="Phone"
          value={personalInfo.phone}
          onChange={(e) => handlePersonalChange("phone", e.target.value)}
        />

        <Input
          placeholder="Location"
          value={personalInfo.location}
          onChange={(e) => handlePersonalChange("location", e.target.value)}
        />

        <Input
          placeholder="LinkedIn Profile Link"
          value={personalInfo.linkedin}
          onChange={(e) => handlePersonalChange("linkedin", e.target.value)}
        />

        <Input
          placeholder="GitHub Username only e.g. mahawarritik3-byte"
          value={personalInfo.githubUsername}
          onChange={(e) =>
            handlePersonalChange("githubUsername", e.target.value)
          }
        />

        <Input
          placeholder="Portfolio / Website Link"
          value={personalInfo.portfolio}
          onChange={(e) => handlePersonalChange("portfolio", e.target.value)}
        />
      </div>

      <Textarea
        placeholder="Career Summary"
        value={personalInfo.summary}
        onChange={(e) => handlePersonalChange("summary", e.target.value)}
      />

      <SectionTitle title="Coding Profiles" />

      {personalInfo.codingProfiles.map((profile, index) => (
        <div
          key={index}
          className="border border-white/20 rounded-xl p-4 mb-4 bg-white/5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={profile.platform}
              onChange={(e) =>
                handleCodingProfileChange(index, "platform", e.target.value)
              }
            >
              <option value="">Select Coding Platform</option>

              {codingPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>

            <Input
              placeholder="Username only e.g. ritikmahawar011"
              value={profile.username}
              onChange={(e) =>
                handleCodingProfileChange(index, "username", e.target.value)
              }
            />
          </div>

          {personalInfo.codingProfiles.length > 1 && (
            <RemoveButton onClick={() => removeCodingProfile(index)} />
          )}
        </div>
      ))}

      <AddButton text="+ Add Coding Profile" onClick={addCodingProfile} />
    </>
  );
}

export default PersonalInfo;