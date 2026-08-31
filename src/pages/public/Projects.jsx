
import { useData } from '../../context/DataContext';

export default function Projects() {
  const { projects } = useData();

  return (
    <div>
      <h2>Coding Club Projects</h2>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {projects?.map((project) => (
          <div key={project.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
            <h3>{project.title}</h3>
            <p><strong>Status:</strong> {project.status}</p>
            <p>{project.description}</p>
            <p><em>Objectives:</em> {project.objectives}</p>
          </div>
        ))}
      </div>
    </div>
  );
}