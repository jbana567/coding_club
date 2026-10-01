import { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialMembers = [
  {
    _id: 'm-old-1',
    name: 'Jean-Luc Nshimiyimana',
    email: 'jeanluc@codeclub.rw',
    stage: 'Stage 3 (Senior Dev)',
    role: 'Mentor',
    isActive: true,
    joined: '2024-02-15',
  },
  {
    _id: 'm-old-2',
    name: 'Diane Gasana',
    email: 'diane@codeclub.rw',
    stage: 'Stage 4 (Pro Dev)',
    role: 'Admin',
    isActive: true,
    joined: '2024-05-20',
  },
  {
    _id: 'm1',
    name: 'Saimon Tanvir',
    email: 'saimon@codeclub.rw',
    stage: 'Stage 4 (Pro Dev)',
    role: 'Member',
    isActive: true,
    joined: '2025-08-14',
  },
  {
    _id: 'm2',
    name: 'Royal Arkin',
    email: 'royal@codeclub.rw',
    stage: 'Stage 3 (Senior Dev)',
    role: 'Member',
    isActive: true,
    joined: '2025-11-10',
  },
  {
    _id: 'm3',
    name: 'Amina Umutoni',
    email: 'amina@codeclub.rw',
    stage: 'Stage 2 (Junior Dev)',
    role: 'Member',
    isActive: true,
    joined: '2026-01-05',
  },
  {
    _id: 'm4',
    name: 'David Nkurunziza',
    email: 'david@codeclub.rw',
    stage: 'Stage 1 (Beginner)',
    role: 'Member',
    isActive: false,
    joined: '2026-02-18',
  },
];

const initialPendingRequests = [
  {
    _id: 'req-1',
    name: 'Kevine Mutoni',
    email: 'kevine.mutoni@gmail.com',
    requestType: 'Stage 1 Beginner Application',
    stage: 'Stage 1 (Beginner)',
    requestedDate: '2026-03-12',
    portfolio: 'https://github.com/kevine-mutoni',
    notes: 'Completed Python intro quiz (95% score). Requesting initial membership.',
  },
  {
    _id: 'req-2',
    name: 'Eric Habimana',
    email: 'eric.habimana@gmail.com',
    requestType: 'Stage 2 Upgrade Request',
    stage: 'Stage 2 (Junior Dev)',
    requestedDate: '2026-03-11',
    portfolio: 'https://github.com/eric-h',
    notes: 'Submitted Bus Tracker project for review and completed Git module.',
  },
  {
    _id: 'req-3',
    name: 'Solange Uwase',
    email: 'solange.uwase@gmail.com',
    requestType: 'Mentor Application',
    stage: 'Stage 3 (Senior Dev)',
    requestedDate: '2026-03-09',
    portfolio: 'https://solangeuwase.dev',
    notes: '5 years React & Node experience in Kigali tech hub.',
  },
];

export default function Members() {
  const [members, setMembers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'
  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'requests' | 'apply_form'
  const [notification, setNotification] = useState('');
  
  // Quick Direct Add Form
  const [quickForm, setQuickForm] = useState({ name: '', email: '', stage: 'Stage 1 (Beginner)', role: 'member' });
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Full Application Form State
  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    requestType: 'Stage 1 Beginner Application',
    stage: 'Stage 1 (Beginner)',
    portfolio: '',
    notes: '',
  });

  useEffect(() => {
    setLoading(true);
    api
      .get('/members')
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) setMembers(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function notify(msg) {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  }

  function handleQuickAdd(e) {
    e.preventDefault();
    if (!quickForm.name || !quickForm.email) return;
    if (quickForm.role === 'admin' && members.some((member) => member.role === 'admin')) {
      notify('Only one admin account is allowed.');
      return;
    }
    const newMember = {
      _id: 'm_' + Date.now(),
      name: quickForm.name,
      email: quickForm.email,
      stage: quickForm.stage,
      role: quickForm.role,
      isActive: true,
      joined: new Date().toISOString().split('T')[0],
    };
    setMembers([newMember, ...members]);
    api.post('/members', newMember).catch(() => {});
    setQuickForm({ name: '', email: '', stage: 'Stage 1 (Beginner)', role: 'member' });
    setShowQuickAdd(false);
    notify(`Member "${newMember.name}" directly added to directory!`);
  }

  function handleApplicationSubmit(e) {
    e.preventDefault();
    if (!appForm.name || !appForm.email) return;
    const newReq = {
      _id: 'req_' + Date.now(),
      name: appForm.name,
      email: appForm.email,
      requestType: appForm.requestType,
      stage: appForm.stage,
      requestedDate: new Date().toISOString().split('T')[0],
      portfolio: appForm.portfolio || 'https://github.com',
      notes: appForm.notes || 'Submitted application via Member Application Portal.',
    };
    setPendingRequests([newReq, ...pendingRequests]);
    setAppForm({
      name: '',
      email: '',
      requestType: 'Stage 1 Beginner Application',
      stage: 'Stage 1 (Beginner)',
      portfolio: '',
      notes: '',
    });
    setActiveTab('requests');
    notify(`Application submitted for "${newReq.name}"! Added to Pending Requests.`);
  }

  function handleApproveRequest(req) {
    const approvedMember = {
      _id: 'm_' + Date.now(),
      name: req.name,
      email: req.email,
      stage: req.stage,
      role: req.requestType.includes('Mentor') ? 'Mentor' : 'Member',
      isActive: true,
      joined: new Date().toISOString().split('T')[0],
    };
    setMembers([approvedMember, ...members]);
    setPendingRequests(pendingRequests.filter((r) => r._id !== req._id));
    notify(`Approved application for "${req.name}"!`);
  }

  function handleRejectRequest(id, name) {
    setPendingRequests(pendingRequests.filter((r) => r._id !== id));
    notify(`Rejected request for "${name}".`);
  }

  function toggleActive(id) {
    setMembers(members.map((m) => (m._id === id ? { ...m, isActive: !m.isActive } : m)));
    api.put(`/members/${id}`).catch(() => {});
  }

  function changeRole(member, role) {
    if (role === 'admin' && members.some((item) => item.role === 'admin' && item._id !== member._id)) {
      notify('Only one admin account is allowed.');
      return;
    }

    setMembers((current) => current.map((item) => (item._id === member._id ? { ...item, role } : item)));
    api.put(`/members/${member._id}`, { role }).catch(() => {});

    try {
      const users = JSON.parse(localStorage.getItem('ccms_demo_users') || '[]');
      const updatedUsers = users.map((user) => (
        user.email.toLowerCase() === member.email.toLowerCase() ? { ...user, role } : user
      ));
      localStorage.setItem('ccms_demo_users', JSON.stringify(updatedUsers));
      if (role === 'admin') localStorage.setItem('ccms_admin_registered', 'true');
    } catch {
      // The API update remains the source of truth when local demo storage is unavailable.
    }
    notify(`${member.name} is now a ${role}.`);
  }

  function remove(id) {
    setMembers(members.filter((m) => m._id !== id));
    api.delete(`/members/${id}`).catch(() => {});
    notify('Member removed from directory.');
  }

  // Filter & Sort logic
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesStage = stageFilter === 'All' || m.stage.includes(stageFilter);
    return matchesSearch && matchesStage;
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const dateA = new Date(a.joined).getTime();
    const dateB = new Date(b.joined).getTime();
    return sortOrder === 'oldest' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-1 sm:px-0">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">Member Portal &amp; Directory</h1>
          <p className="text-xs sm:text-sm text-text-dim mt-1">Manage member applications, active directory, stage progressions, and onboarding workflow.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('apply_form')}
            className="btn-secondary text-xs sm:text-sm flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 sm:py-2.5"
          >
            <span>📝 Application Form</span>
          </button>
          <button
            onClick={() => setShowQuickAdd(!showQuickAdd)}
            className="btn-primary text-xs sm:text-sm flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 sm:py-2.5"
          >
            <span>{showQuickAdd ? '✕ Close' : '➕ Direct Add'}</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between animate-fade-in">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-white hover:text-emerald-200 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Direct Quick Add Drawer */}
      {showQuickAdd && (
        <form onSubmit={handleQuickAdd} className="glass-card p-4 sm:p-6 rounded-3xl space-y-4 border border-primary/30">
          <h3 className="text-sm sm:text-base font-bold text-white mb-2">Direct Add Member to Directory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <input
              required
              placeholder="Full Name"
              value={quickForm.name}
              onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary w-full"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              value={quickForm.email}
              onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary w-full"
            />
            <select
              value={quickForm.stage}
              onChange={(e) => setQuickForm({ ...quickForm, stage: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary w-full"
            >
              <option value="Stage 1 (Beginner)">Stage 1 (Beginner)</option>
              <option value="Stage 2 (Junior Dev)">Stage 2 (Junior Dev)</option>
              <option value="Stage 3 (Senior Dev)">Stage 3 (Senior Dev)</option>
              <option value="Stage 4 (Pro Dev)">Stage 4 (Pro Dev)</option>
            </select>
            <select
              value={quickForm.role}
              onChange={(e) => setQuickForm({ ...quickForm, role: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary w-full"
            >
              <option value="member">Normal member</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowQuickAdd(false)}
              className="btn-secondary text-xs sm:text-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs sm:text-sm">
              Save Member
            </button>
          </div>
        </form>
      )}

      {/* Main Tab Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-ink-border/60 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'members'
                ? 'bg-primary text-slate-950 shadow-md'
                : 'bg-ink-surface text-text-dim hover:text-white border border-ink-border'
            }`}
          >
            <span>👥 Active Members</span>
            <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-slate-950/20 text-slate-900">
              {members.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-ink-surface text-text-dim hover:text-white border border-ink-border'
            }`}
          >
            <span>📬 Pending Requests</span>
            {pendingRequests.length > 0 && (
              <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-amber-950/20 text-amber-950 animate-pulse">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('apply_form')}
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'apply_form'
                ? 'bg-sky-400 text-slate-950 shadow-md'
                : 'bg-ink-surface text-text-dim hover:text-white border border-ink-border'
            }`}
          >
            <span>📝 Application Form</span>
          </button>
        </div>

        {/* Sort Controls for Members Tab */}
        {activeTab === 'members' && (
          <div className="flex items-center gap-1.5 sm:gap-2 bg-ink-surface p-1 rounded-xl border border-ink-border self-start lg:self-auto overflow-x-auto w-full sm:w-auto">
            <span className="text-[11px] text-text-dim px-1.5 font-semibold whitespace-nowrap">Sort:</span>
            <button
              onClick={() => setSortOrder('newest')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition ${
                sortOrder === 'newest'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-text-dim hover:text-white'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortOrder('oldest')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition ${
                sortOrder === 'oldest'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-text-dim hover:text-white'
              }`}
            >
              Oldest ⏳
            </button>
          </div>
        )}
      </div>

      {/* TAB CONTENT 1: ALL MEMBERS DIRECTORY */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="glass-card p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="relative w-full sm:w-80">
              <span className="absolute left-3.5 top-2.5 text-text-dim text-xs sm:text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-ink-surface border border-ink-border rounded-xl pl-9 sm:pl-10 pr-4 py-2 text-xs text-white placeholder:text-text-dim/60 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              {['All', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStageFilter(s)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition ${
                    stageFilter === s
                      ? 'bg-primary text-slate-950 shadow-md font-bold'
                      : 'bg-ink-surface text-text-dim hover:text-white border border-ink-border'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden border border-ink-border">
            {loading ? (
              <div className="p-8 text-center text-text-dim text-xs sm:text-sm">Loading members directory…</div>
            ) : sortedMembers.length === 0 ? (
              <div className="p-8 text-center text-text-dim text-xs sm:text-sm">No members found matching search.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-ink-border/60 text-[11px] sm:text-xs uppercase tracking-wider text-text-dim bg-ink-surface/30">
                      <th className="py-3.5 px-4 sm:px-5">Member Name</th>
                      <th className="py-3.5 px-3 sm:px-4">Stage / Role</th>
                      <th className="py-3.5 px-3 sm:px-4">Joined ({sortOrder === 'oldest' ? 'Oldest' : 'Newest'})</th>
                      <th className="py-3.5 px-3 sm:px-4">Status</th>
                      <th className="py-3.5 px-4 sm:px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-border/40">
                    {sortedMembers.map((m) => (
                      <tr key={m._id} className="hover:bg-ink-surface/50 transition">
                        <td className="py-3.5 sm:py-4 px-4 sm:px-5">
                          <div>
                            <p className="font-semibold text-white text-xs sm:text-sm">{m.name}</p>
                            <p className="text-[11px] sm:text-xs text-text-dim">{m.email}</p>
                          </div>
                        </td>
                        <td className="py-3.5 sm:py-4 px-3 sm:px-4">
                          <div className="space-y-0.5">
                            <span className="text-[11px] sm:text-xs font-semibold text-accent block">{m.stage}</span>
                            <select
                              value={m.role?.toLowerCase() === 'mentor' ? 'agent' : m.role?.toLowerCase() || 'member'}
                              onChange={(e) => changeRole(m, e.target.value)}
                              className="bg-transparent text-[9px] sm:text-[10px] text-text-dim uppercase tracking-wider focus:outline-none"
                              aria-label={`Change role for ${m.name}`}
                            >
                              <option value="member">Normal member</option>
                              <option value="agent">Agent</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                        </td>
                        <td className="py-3.5 sm:py-4 px-3 sm:px-4 text-xs font-bold text-white whitespace-nowrap">{m.joined}</td>
                        <td className="py-3.5 sm:py-4 px-3 sm:px-4">
                          <span
                            className={`inline-flex px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                              m.isActive
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                : 'bg-red-500/15 text-red-300 border border-red-500/30'
                            }`}
                          >
                            {m.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3.5 sm:py-4 px-4 sm:px-5 text-right space-x-1.5 sm:space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => toggleActive(m._id)}
                            className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-ink-border hover:bg-ink-surface text-accent transition"
                          >
                            Toggle
                          </button>
                          <button
                            onClick={() => remove(m._id)}
                            className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-danger/20 hover:bg-danger/10 text-danger transition"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: PENDING MEMBER REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="glass-card p-4 sm:p-6 rounded-3xl border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">Membership &amp; Stage Upgrade Applications</h3>
              <p className="text-xs text-text-dim">Review incoming member registrations, mentor applications, and stage advancement requests.</p>
            </div>
            <button
              onClick={() => setActiveTab('apply_form')}
              className="btn-secondary text-xs self-start sm:self-auto shrink-0"
            >
              ➕ Submit New Request
            </button>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="glass-card p-8 sm:p-10 rounded-3xl text-center text-text-dim text-xs sm:text-sm">
              🎉 No pending requests right now! All member applications have been reviewed.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {pendingRequests.map((req) => (
                <div key={req._id} className="glass-card p-4 sm:p-6 rounded-3xl space-y-4 border border-ink-border hover:border-amber-500/40 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                        {req.requestType}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-white mt-2">{req.name}</h4>
                      <p className="text-xs text-text-dim">{req.email}</p>
                    </div>
                    <span className="text-[10px] sm:text-xs text-text-dim font-semibold whitespace-nowrap">{req.requestedDate}</span>
                  </div>

                  <div className="bg-ink-surface/60 p-3 sm:p-3.5 rounded-2xl border border-ink-border/50 text-xs text-text-dim space-y-1">
                    <p className="font-semibold text-accent">Target Stage: {req.stage}</p>
                    {req.portfolio && (
                      <p className="text-sky-300 truncate">🔗 <a href={req.portfolio} target="_blank" rel="noreferrer" className="underline">{req.portfolio}</a></p>
                    )}
                    <p className="pt-1">💬 {req.notes}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 sm:gap-3 pt-1">
                    <button
                      onClick={() => handleRejectRequest(req._id, req.name)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveRequest(req)}
                      className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md transition"
                    >
                      ✓ Approve Member
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT 3: SUBMIT MEMBER APPLICATION & STAGE FORM */}
      {activeTab === 'apply_form' && (
        <div className="glass-card p-4 sm:p-8 rounded-3xl border border-sky-500/30 space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">Member Application &amp; Stage Upgrade Request Form</h3>
            <p className="text-xs text-text-dim mt-1">
              Fill out this form to submit a new membership application, mentor request, or learning stage promotion request for administrative review.
            </p>
          </div>

          <form onSubmit={handleApplicationSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-text-dim mb-1">Applicant Full Name *</label>
                <input
                  required
                  placeholder="e.g. Divine Ishimwe"
                  value={appForm.name}
                  onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                  className="w-full bg-ink-surface border border-ink-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dim mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. divine@gmail.com"
                  value={appForm.email}
                  onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                  className="w-full bg-ink-surface border border-ink-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dim mb-1">Application / Request Type *</label>
                <select
                  value={appForm.requestType}
                  onChange={(e) => setAppForm({ ...appForm, requestType: e.target.value })}
                  className="w-full bg-ink-surface border border-ink-border rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="Stage 1 Beginner Application">Stage 1 Beginner Application</option>
                  <option value="Stage 2 Upgrade Request">Stage 2 Junior Upgrade Request</option>
                  <option value="Stage 3 Senior Upgrade Request">Stage 3 Senior Upgrade Request</option>
                  <option value="Stage 4 Pro Upgrade Request">Stage 4 Pro Upgrade Request</option>
                  <option value="Mentor Application">Mentor Application</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-dim mb-1">Target Learning Stage *</label>
                <select
                  value={appForm.stage}
                  onChange={(e) => setAppForm({ ...appForm, stage: e.target.value })}
                  className="w-full bg-ink-surface border border-ink-border rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="Stage 1 (Beginner)">Stage 1 (Beginner)</option>
                  <option value="Stage 2 (Junior Dev)">Stage 2 (Junior Dev)</option>
                  <option value="Stage 3 (Senior Dev)">Stage 3 (Senior Dev)</option>
                  <option value="Stage 4 (Pro Dev)">Stage 4 (Pro Dev)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-text-dim mb-1">GitHub / Portfolio Link</label>
                <input
                  placeholder="https://github.com/username or portfolio link"
                  value={appForm.portfolio}
                  onChange={(e) => setAppForm({ ...appForm, portfolio: e.target.value })}
                  className="w-full bg-ink-surface border border-ink-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-text-dim mb-1">Experience Summary &amp; Application Notes</label>
                <textarea
                  rows={3}
                  placeholder="Describe your coding experience, completed exercises, or reason for upgrade..."
                  value={appForm.notes}
                  onChange={(e) => setAppForm({ ...appForm, notes: e.target.value })}
                  className="w-full bg-ink-surface border border-ink-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setActiveTab('members')}
                className="btn-secondary text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-blue-600">
                Submit Application →
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
