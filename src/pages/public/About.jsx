const pillars = [
  'Hands-on training and peer mentoring',
  'Community projects with real-world impact',
  'Events, hackathons, and networking opportunities',
  'Support for students, founders, and digital builders',
];

export default function About() {
  return (
    <section className="section-shell py-20">
      <div className="mx-auto max-w-4xl">
        <span className="stat-pill">About Code Club</span>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">We build the next generation of problem-solvers.</h1>
        <p className="mt-6 text-lg leading-8 text-text-dim">
          Code Club Rwanda is a community-first technology movement that gives young people the space, support, and tools to learn, experiment, and thrive in the digital economy.
          We believe that innovation grows when people collaborate, share knowledge, and turn ideas into visible impact.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white">Our mission</h2>
          <p className="mt-4 text-text-dim leading-7">
            To create an inclusive environment where students, developers, and entrepreneurs can learn coding, collaborate on meaningful projects, and build the confidence to lead in a digital world.
          </p>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white">What we focus on</h2>
          <ul className="mt-4 space-y-3 text-text-dim">
            {pillars.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 glass-card p-8 md:p-10">
        <h2 className="text-2xl font-bold text-white">Why it matters</h2>
        <p className="mt-4 text-text-dim leading-7">
          Rwanda’s future is digital, and access to technical skills must be widespread. Code Club helps close that gap by helping members move from curiosity to capability — through mentorship, team-based projects, and active participation in the local innovation ecosystem.
        </p>
      </div>
    </section>
  );
}
