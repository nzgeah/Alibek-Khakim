

const skillGroups = [
  { title: 'Languages', skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Dart'] },
  { title: 'Frameworks & Libraries', skills: ['React', 'Vite', 'Node.js', 'Express.js', 'Django', '.NET', 'JWT', 'NPM'] },
  { title: 'Databases', skills: ['PostgreSQL'] },
  { title: 'Game Development', skills: ['Unity', 'Godot', 'Itch.io'] },
  { title: 'Design & Creative Tools', skills: ['Figma', 'Canva', 'Blender', 'SketchUp', 'Aseprite', 'Adobe Photoshop', 'After Effects', 'Premiere Pro', 'Audition'] },
  { title: 'Tools & Platforms', skills: ['Git', 'GitHub', 'Postman', 'Cisco'] },
];

export default function Home() {
  return (
    <div className="container home-page">
      <section className="hero">
        <h1>Hi, I'm Alibek Khakim.</h1>
        <p>I'm a full-stack developer, game developer, and 3D designer building thoughtful web, mobile, and interactive experiences.</p>
        <div className="flex gap-4">
          <a href="/projects" className="btn">View My Work</a>
          <a href="#connect" onClick={(e) => { e.preventDefault(); document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-outline">Connect With Me</a>
        </div>
      </section>

      <section className="about-section mt-8 mb-8">
        <h2>About Me</h2>
        <p className="text-lg mt-4" style={{ maxWidth: '800px' }}>
          A graduate of Astana IT University, I work across the full product journey—from database design and backend architecture to polished user interfaces. I also create games and 3D experiences with Unity.
        </p>
        <p className="text-lg mt-4" style={{ maxWidth: '800px' }}>
          I'm currently pursuing Machine Learning at QAIRU University (2026–2029), with a focus on AI-driven tools for education and personalized learning. I'm always open to collaborating on meaningful EdTech and AI projects.
        </p>
        <div className="mt-4">
          <a href="/resume.pdf" download className="btn btn-outline">Download CV</a>
        </div>
      </section>

      <section className="skills-section mt-8 mb-8">
        <h2>Tech Stack</h2>
        <div className="tech-stack" aria-label="Technology skills">
          {skillGroups.map((group) => (
            <section className="tech-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tech-badges">
                {group.skills.map((skill) => (
                  <span className="tech-badge" key={skill}>{skill}</span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
