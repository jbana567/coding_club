import { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function ManageProjects() {
  const { projects, addProject, deleteProject } = useData();
  const [formData, setFormData] = useState({ title: '', status: 'Planning', description: '', objectives: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(formData);
    setFormData({ title: '', status: 'Planning', description: '', objectives: '' });
  };

  return (
    <div>
      <h2>Project Management</h2>

      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', marginBottom: '2rem', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3>Add New Project</h3>
        <input
          type="text"
          placeholder="Project Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          style={{ padding: '0.5rem' }}
        >
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <textarea
          placeholder="Description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={{ padding: '0.5rem', minHeight: '70px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Create Project</button>
      </form>

      <h3>Existing Projects</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '0.5rem' }}>Title</th>
            <th style={{ padding: '0.5rem' }}>Status</th>
            <th style={{ padding: '0.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>{p.title}</td>
              <td style={{ padding: '0.5rem' }}>{p.status}</td>
              <td style={{ padding: '0.5rem' }}>
                <button onClick={() => deleteProject(p.id)} style={{ color: 'red', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}