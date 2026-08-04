

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Hi, I'm a Full-Stack Developer</h1>
        <p>I build modern, responsive, and performant web applications with a focus on clean design and solid architecture.</p>
        <div className="flex gap-4">
          <a href="/projects" className="btn">View My Work</a>
          <a href="/contact" className="btn btn-outline">Connect With Me</a>
        </div>
      </section>

      <section className="mt-8 mb-8">
        <h2>About Me</h2>
        <p className="text-lg mt-4" style={{ maxWidth: '800px' }}>
          I am a passionate developer who loves solving complex problems. 
          With a strong foundation in both frontend and backend technologies, 
          I can bring ideas to life from database design to the final user interface.
        </p>
        <div className="mt-4">
          <a href="/resume.pdf" download className="btn btn-outline">Download CV</a>
        </div>
      </section>

      <section className="mt-8 mb-8">
        <h2>Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4">
          <div className="card">
            <h3>Frontend</h3>
            <p className="text-muted">React, Vue, TypeScript, CSS3, HTML5</p>
          </div>
          <div className="card">
            <h3>Backend</h3>
            <p className="text-muted">Node.js, Express, Python, PostgreSQL</p>
          </div>
          <div className="card">
            <h3>Tools</h3>
            <p className="text-muted">Git, Docker, Figma, AWS</p>
          </div>
        </div>
      </section>
    </div>
  );
}
