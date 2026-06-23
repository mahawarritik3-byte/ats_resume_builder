const initialResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    githubUsername: "",
    portfolio: "",
    summary: "",

    codingProfiles: [
      {
        platform: "",
        username: "",
      },
    ],
  },

  education: [
    {
      institution: "",
      degree: "",
      branch: "",
      location: "",
      startYear: "",
      endYear: "",
      score: "",
    },
  ],

  experience: [
    {
      company: "",
      role: "",
      type: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],

  skills: [""],

  projects: [
    {
      title: "",
      techStack: "",
      description: "",
      github: "",
      liveLink: "",
    },
  ],

  certifications: [
    {
      name: "",
      organization: "",
      date: "",
      link: "",
    },
  ],

  achievements: [
    {
      title: "",
      description: "",
    },
  ],
};

export default initialResumeData;