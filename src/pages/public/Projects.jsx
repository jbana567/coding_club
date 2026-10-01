<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af

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
<<<<<<< HEAD
}
=======
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      {loading && <p className="text-text-dim">Loading…</p>}
      {!loading && items.length === 0 && <p className="text-text-dim">No projects published yet.</p>}
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item._id} className="glass-card p-5">
            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-text-dim text-sm">{item.description || item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
>>>>>>> bc97c92 (Initial commit)
=======
}
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
