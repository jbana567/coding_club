import { createContext, useContext, useState, useEffect } from 'react';
import { mockProjects, mockEvents, mockHackathons, mockAnnouncements } from '../data/mockData';

const DataContext = createContext();

// Helper to load from localStorage with fallback to mock data
const loadInitialData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage`, e);
    return fallback;
  }
};

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() => loadInitialData('club_projects', mockProjects));
  const [events, setEvents] = useState(() => loadInitialData('club_events', mockEvents));
  const [hackathons, setHackathons] = useState(() => loadInitialData('club_hackathons', mockHackathons));
  const [announcements, setAnnouncements] = useState(() => loadInitialData('club_announcements', mockAnnouncements));
  const [registrations, setRegistrations] = useState(() => loadInitialData('club_registrations', {}));

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('club_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('club_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('club_hackathons', JSON.stringify(hackathons));
  }, [hackathons]);

  useEffect(() => {
    localStorage.setItem('club_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('club_registrations', JSON.stringify(registrations));
  }, [registrations]);

  // Project Handlers
  const addProject = (newProject) => {
    setProjects((prev) => [...prev, { ...newProject, id: String(Date.now()) }]);
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Event Handlers
  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, { ...newEvent, id: String(Date.now()) }]);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Announcement Handlers
  const addAnnouncement = (newAnnouncement) => {
    setAnnouncements((prev) => [
      { ...newAnnouncement, id: String(Date.now()), date: new Date().toISOString().split('T')[0] },
      ...prev,
    ]);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // Registration Handlers
  const registerForHackathon = (userId, hackathonId) => {
    setRegistrations((prev) => {
      const userRegistrations = prev[userId] || [];
      if (userRegistrations.includes(hackathonId)) return prev;
      return { ...prev, [userId]: [...userRegistrations, hackathonId] };
    });
  };

  const unregisterFromHackathon = (userId, hackathonId) => {
    setRegistrations((prev) => {
      const userRegistrations = prev[userId] || [];
      return {
        ...prev,
        [userId]: userRegistrations.filter((id) => id !== hackathonId),
      };
    });
  };

  const getUserRegistrations = (userId) => {
    const registeredIds = registrations[userId] || [];
    return hackathons.filter((h) => registeredIds.includes(h.id));
  };

  const getHackathonParticipants = (hackathonId) => {
    return Object.keys(registrations).filter((userId) =>
      registrations[userId]?.includes(hackathonId)
    );
  };

  // Helper to reset data back to mock defaults
  const resetToDefaultData = () => {
    localStorage.clear();
    setProjects(mockProjects);
    setEvents(mockEvents);
    setHackathons(mockHackathons);
    setAnnouncements(mockAnnouncements);
    setRegistrations({});
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        events,
        hackathons,
        announcements,
        registrations,
        addProject,
        deleteProject,
        addEvent,
        deleteEvent,
        addAnnouncement,
        deleteAnnouncement,
        registerForHackathon,
        unregisterFromHackathon,
        getUserRegistrations,
        getHackathonParticipants,
        resetToDefaultData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);