import PreviewSection from "./PreviewSection";

function getGithubUrl(username) {
  if (!username) return "";

  let cleanUsername = username.trim();

  if (cleanUsername.includes("github.com/")) {
    cleanUsername = cleanUsername.split("github.com/")[1];
  }

  cleanUsername = cleanUsername.replace("@", "").replaceAll("/", "");

  return `https://github.com/${cleanUsername}`;
}

function getCodingProfileUrl(platform, username) {
  if (!platform || !username) return "";

  let cleanUsername = username.trim().replace("@", "");

  if (cleanUsername.startsWith("http://") || cleanUsername.startsWith("https://")) {
    return cleanUsername;
  }

  const profileLinks = {
    LeetCode: `https://leetcode.com/u/${cleanUsername}/`,
    CodeChef: `https://www.codechef.com/users/${cleanUsername}`,
    Codeforces: `https://codeforces.com/profile/${cleanUsername}`,
    GeeksforGeeks: `https://www.geeksforgeeks.org/user/${cleanUsername}/`,
    HackerRank: `https://www.hackerrank.com/profile/${cleanUsername}`,
    HackerEarth: `https://www.hackerearth.com/@${cleanUsername}`,
    AtCoder: `https://atcoder.jp/users/${cleanUsername}`,
    "Coding Ninjas": `https://www.naukri.com/code360/profile/${cleanUsername}`,
    Codolio: `https://codolio.com/profile/${cleanUsername}`,
    Other: cleanUsername,
  };

  return profileLinks[platform] || "";
}

function ResumePreview({ resumeData, previewRef }) {
  const githubUrl = getGithubUrl(resumeData.personalInfo.githubUsername);

  const codingProfiles = resumeData.personalInfo.codingProfiles || [];

  return (
    <div className="preview-card">
      <h2 className="text-2xl font-bold mb-6 text-white">Live Resume Preview</h2>

      <div
        ref={previewRef}
        id="resume-preview"
        className="bg-white text-black p-8 rounded-xl min-h-[900px]"
      >
        <div className="text-center border-b border-gray-400 pb-4">
          <h1 className="text-3xl font-bold">
            {resumeData.personalInfo.name || "Your Name"}
          </h1>

          <p className="text-sm mt-2">
            {resumeData.personalInfo.email}
            {resumeData.personalInfo.phone &&
              ` | ${resumeData.personalInfo.phone}`}
            {resumeData.personalInfo.location &&
              ` | ${resumeData.personalInfo.location}`}
          </p>

          <div className="text-sm flex flex-wrap justify-center gap-2 mt-1">
            {resumeData.personalInfo.linkedin && (
              <a
                className="text-blue-700 underline"
                href={resumeData.personalInfo.linkedin}
                target="_blank"
              >
                LinkedIn
              </a>
            )}

            {githubUrl && (
              <a
                className="text-blue-700 underline"
                href={githubUrl}
                target="_blank"
              >
                GitHub
              </a>
            )}

            {resumeData.personalInfo.portfolio && (
              <a
                className="text-blue-700 underline"
                href={resumeData.personalInfo.portfolio}
                target="_blank"
              >
                Portfolio
              </a>
            )}

            {codingProfiles.map((profile, index) => {
              const url = getCodingProfileUrl(
                profile.platform,
                profile.username
              );

              if (!url) return null;

              return (
                <a
                  key={index}
                  className="text-blue-700 underline"
                  href={url}
                  target="_blank"
                >
                  {profile.platform}
                </a>
              );
            })}
          </div>
        </div>

        {resumeData.personalInfo.summary && (
          <PreviewSection title="Summary">
            <p>{resumeData.personalInfo.summary}</p>
          </PreviewSection>
        )}

        <PreviewSection title="Education">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold">{edu.institution}</h3>
              <p>
                {edu.degree} {edu.branch && `- ${edu.branch}`}
              </p>
              <p className="text-sm">
                {edu.location}
                {(edu.startYear || edu.endYear) &&
                  ` | ${edu.startYear} - ${edu.endYear}`}
              </p>
              <p className="text-sm">{edu.score}</p>
            </div>
          ))}
        </PreviewSection>

        <PreviewSection title="Experience">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold">{exp.company}</h3>
              <p>
                {exp.role} {exp.type && `| ${exp.type}`}
              </p>
              <p className="text-sm">
                {exp.location}
                {(exp.startDate || exp.endDate) &&
                  ` | ${exp.startDate} - ${exp.endDate}`}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </PreviewSection>

        <PreviewSection title="Skills">
          <p>{resumeData.skills.filter(Boolean).join(", ")}</p>
        </PreviewSection>

        <PreviewSection title="Projects">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm">{project.techStack}</p>
              <p>{project.description}</p>

              {project.github && (
                <a
                  className="text-sm text-blue-700 underline block"
                  href={project.github}
                  target="_blank"
                >
                  GitHub
                </a>
              )}

              {project.liveLink && (
                <a
                  className="text-sm text-blue-700 underline block"
                  href={project.liveLink}
                  target="_blank"
                >
                  Live Demo
                </a>
              )}
            </div>
          ))}
        </PreviewSection>

        <PreviewSection title="Certifications">
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{cert.name}</strong>
                {cert.organization && ` - ${cert.organization}`}
              </p>

              <p className="text-sm">
                {cert.date}
                {cert.link && (
                  <>
                    {" | "}
                    <a
                      href={cert.link}
                      target="_blank"
                      className="text-blue-700 underline"
                    >
                      Certificate
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </PreviewSection>

        <PreviewSection title="Achievements">
          {resumeData.achievements.map((ach, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>{ach.title}</strong>
              </p>
              <p>{ach.description}</p>
            </div>
          ))}
        </PreviewSection>
      </div>
    </div>
  );
}

export default ResumePreview;