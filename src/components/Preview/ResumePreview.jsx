function getGithubUrl(username) {
  if (!username) return "";

  let cleanUsername = username.trim();

  if (cleanUsername.startsWith("http://") || cleanUsername.startsWith("https://")) {
    return cleanUsername;
  }

  if (cleanUsername.includes("github.com/")) {
    cleanUsername = cleanUsername.split("github.com/")[1];
  }

  cleanUsername = cleanUsername.replace("@", "").replaceAll("/", "");

  return cleanUsername ? `https://github.com/${cleanUsername}` : "";
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

function splitPoints(text) {
  if (!text) return [];

  return text
    .split("\n")
    .map((point) => point.trim())
    .filter(Boolean);
}

function isFilled(value) {
  return value !== undefined && value !== null && value.toString().trim() !== "";
}

function ResumePreview({ resumeData = {} }) {
  const personalInfo = resumeData.personalInfo || {};
  const education = resumeData.education || [];
  const experience = resumeData.experience || [];
  const skills = resumeData.skills || [];
  const projects = resumeData.projects || [];
  const certifications = resumeData.certifications || [];
  const achievements = resumeData.achievements || [];

  const githubUrl = getGithubUrl(personalInfo.githubUsername);
  const codingProfiles = personalInfo.codingProfiles || [];

  const filledCodingProfiles = codingProfiles.filter(
    (profile) => isFilled(profile.platform) && isFilled(profile.username)
  );

  const hasPersonalInfo =
    isFilled(personalInfo.name) ||
    isFilled(personalInfo.email) ||
    isFilled(personalInfo.phone) ||
    isFilled(personalInfo.location) ||
    isFilled(personalInfo.linkedin) ||
    isFilled(personalInfo.githubUsername) ||
    isFilled(personalInfo.portfolio) ||
    filledCodingProfiles.length > 0;

  const filledEducation = education.filter(
    (edu) =>
      isFilled(edu.institution) ||
      isFilled(edu.degree) ||
      isFilled(edu.branch) ||
      isFilled(edu.location) ||
      isFilled(edu.startYear) ||
      isFilled(edu.endYear) ||
      isFilled(edu.score)
  );

  const filledExperience = experience.filter(
    (exp) =>
      isFilled(exp.company) ||
      isFilled(exp.role) ||
      isFilled(exp.type) ||
      isFilled(exp.location) ||
      isFilled(exp.startDate) ||
      isFilled(exp.endDate) ||
      isFilled(exp.description)
  );

  const filledSkills = skills.filter((skillGroup) => {
    if (typeof skillGroup === "string") {
      return isFilled(skillGroup);
    }

    return (
      skillGroup &&
      (isFilled(skillGroup.groupName) || isFilled(skillGroup.skills))
    );
  });

  const filledProjects = projects.filter(
    (project) =>
      isFilled(project.title) ||
      isFilled(project.techStack) ||
      isFilled(project.description) ||
      isFilled(project.github) ||
      isFilled(project.liveLink)
  );

  const filledCertifications = certifications.filter(
    (cert) =>
      isFilled(cert.name) ||
      isFilled(cert.organization) ||
      isFilled(cert.date) ||
      isFilled(cert.link)
  );

  const filledAchievements = achievements.filter(
    (ach) => isFilled(ach.title) || isFilled(ach.description)
  );

  return (
    <div className="resume-preview">
      {hasPersonalInfo && (
        <header className="resume-header">
          {personalInfo.name && <h1>{personalInfo.name}</h1>}

          <p className="resume-contact">
            {personalInfo.email && <>Email: {personalInfo.email}</>}
            {personalInfo.phone && <> | Phone: {personalInfo.phone}</>}
            {personalInfo.location && <> | {personalInfo.location}</>}

            {personalInfo.linkedin && (
              <>
                {" "}
                |{" "}
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </>
            )}

            {githubUrl && (
              <>
                {" "}
                |{" "}
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </>
            )}

            {personalInfo.portfolio && (
              <>
                {" "}
                |{" "}
                <a href={personalInfo.portfolio} target="_blank" rel="noreferrer">
                  Portfolio
                </a>
              </>
            )}

            {filledCodingProfiles.map((profile, index) => {
              const url = getCodingProfileUrl(profile.platform, profile.username);
              if (!url) return null;

              return (
                <span key={index}>
                  {" "}
                  |{" "}
                  <a href={url} target="_blank" rel="noreferrer">
                    {profile.platform}
                  </a>
                </span>
              );
            })}
          </p>
        </header>
      )}

      {personalInfo.summary && (
        <section>
          <h2>SUMMARY</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {filledEducation.length > 0 && (
        <section>
          <h2>EDUCATION</h2>

          {filledEducation.map((edu, index) => (
            <div className="resume-row" key={index}>
              <div>
                {(edu.degree || edu.branch) && (
                  <h3>
                    {edu.degree}
                    {edu.branch && ` in ${edu.branch}`}
                  </h3>
                )}

                {(edu.institution || edu.location) && (
                  <p>
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </p>
                )}
              </div>

              <div className="resume-right">
                {(edu.startYear || edu.endYear) && (
                  <p>
                    {edu.startYear}
                    {edu.endYear && ` - ${edu.endYear}`}
                  </p>
                )}

                {edu.score && <p>{edu.score}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      {filledSkills.length > 0 && (
        <section>
          <h2>TECHNICAL SKILLS</h2>

          {filledSkills.map((skillGroup, index) => {
            if (typeof skillGroup === "string") {
              return <p key={index}>{skillGroup}</p>;
            }

            return (
              <p key={index}>
                {isFilled(skillGroup.groupName) && (
                  <strong>{skillGroup.groupName}: </strong>
                )}
                {skillGroup.skills}
              </p>
            );
          })}
        </section>
      )}

      {filledExperience.length > 0 && (
        <section>
          <h2>WORK EXPERIENCE</h2>

          {filledExperience.map((exp, index) => (
            <div key={index} className="resume-item">
              {(exp.role || exp.company || exp.type) && (
                <h3>
                  {exp.role}
                  {exp.company && ` - ${exp.company}`}
                  {exp.type && ` | ${exp.type}`}
                </h3>
              )}

              {(exp.location || exp.startDate || exp.endDate) && (
                <p>
                  {exp.location}
                  {(exp.startDate || exp.endDate) &&
                    ` | ${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ""}`}
                </p>
              )}

              {splitPoints(exp.description).length > 0 && (
                <ul>
                  {splitPoints(exp.description).map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {filledProjects.length > 0 && (
        <section>
          <h2>PROJECTS</h2>

          {filledProjects.map((project, index) => (
            <div key={index} className="resume-item">
              {(project.title || project.techStack) && (
                <h3>
                  {project.title}
                  {project.techStack && ` | ${project.techStack}`}
                </h3>
              )}

              {splitPoints(project.description).length > 0 && (
                <ul>
                  {splitPoints(project.description).map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}

              {(project.github || project.liveLink) && (
                <p>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}

                  {project.github && project.liveLink && " | "}

                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {filledCodingProfiles.length > 0 && (
        <section>
          <h2>CODING PROFILES</h2>
          <ul>
            {filledCodingProfiles.map((profile, index) => {
              const url = getCodingProfileUrl(profile.platform, profile.username);
              if (!url) return null;

              return (
                <li key={index}>
                  {profile.platform}:{" "}
                  <a href={url} target="_blank" rel="noreferrer">
                    Profile Link
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {filledAchievements.length > 0 && (
        <section>
          <h2>ACHIEVEMENTS</h2>

          <ul>
            {filledAchievements.map((ach, index) => (
              <li key={index}>
                {ach.title && <strong>{ach.title}</strong>}
                {ach.title && ach.description && " - "}
                {ach.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      {filledCertifications.length > 0 && (
        <section>
          <h2>CERTIFICATIONS</h2>

          <ul>
            {filledCertifications.map((cert, index) => (
              <li key={index}>
                {cert.name && <strong>{cert.name}</strong>}
                {cert.organization && ` - ${cert.organization}`}
                {cert.date && ` | ${cert.date}`}
                {cert.link && (
                  <>
                    {" "}
                    |{" "}
                    <a href={cert.link} target="_blank" rel="noreferrer">
                      Certificate
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default ResumePreview;