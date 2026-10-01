import { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialReport = {
  totalMembers: 1248,
  activeProjects: 184,
  eventsHosted: 24,
  hackathonGrants: '$12,500',
  stageDistribution: [
    { stage: 'Stage 1 (Beginner)', count: 450, percentage: 36 },
    { stage: 'Stage 2 (Junior Dev)', count: 380, percentage: 30 },
    { stage: 'Stage 3 (Senior Dev)', count: 270, percentage: 22 },
    { stage: 'Stage 4 (Pro Dev)', count: 148, percentage: 12 },
  ],
  monthlyGrowth: [
    { month: 'Oct', members: 820, projects: 110 },
    { month: 'Nov', members: 940, projects: 135 },
    { month: 'Dec', members: 1050, projects: 150 },
    { month: 'Jan', members: 1120, projects: 168 },
    { month: 'Feb', members: 1200, projects: 178 },
    { month: 'Mar', members: 1248, projects: 184 },
  ],
};

const systemDocuments = [
  {
    id: 'doc-1',
    title: 'Code Club Operating Guidelines & Stage Criteria',
    category: 'System Guidelines & Policy',
    format: 'PDF / Markdown',
    date: '2026-03-01',
    version: 'v2.4',
    summary: 'Standard operating procedures detailing member stage progressions (Stage 1 to Stage 4), mentor responsibilities, and project evaluation criteria.',
    content: `# Code Club Rwanda - Standard Operating Guidelines & Member Stage Criteria

## 1. Executive Purpose
Code Club Rwanda is built to empower aspiring developers from complete beginners to industry-ready software engineers through structured learning paths, community mentorship, and real-world project shipping.

## 2. Four-Stage Learning Path Framework
- **Stage 1 (Entry / Beginner)**: Syntax, logic, variables, functions, and basic problem solving (Python / HTML / CSS).
- **Stage 2 (Junior Developer)**: Data structures, version control (Git), API integration, and building full applications (JavaScript / TypeScript / React).
- **Stage 3 (Senior Developer)**: Software design patterns, testing, databases (PostgreSQL/SQL), backend microservices, and team collaboration.
- **Stage 4 (Professional Developer)**: System architecture, cloud deployment, security awareness, technical interviews, and startup incubation.

## 3. Project Submission & Review Workflow
1. Members submit projects via the Member Portal or Projects tab.
2. Mentors review code formatting, test coverage, and documentation.
3. Approved projects are featured on the public showcase and count toward stage promotion.`,
  },
  {
    id: 'doc-2',
    title: 'Code Club Annual Community & Audit Report 2025-2026',
    category: 'Executive Audit & Performance Report',
    format: 'PDF / Executive Brief',
    date: '2026-02-28',
    version: 'v1.0',
    summary: 'Full audit summarizing 1,248 active members, 184 published projects, 24 community workshops, and $12,500 hackathon grant disbursements.',
    content: `# Code Club Rwanda - Annual Community & Audit Report (2025-2026)

## Key Growth Highlights
- **Total Active Members**: 1,248 registered coders (+14.2% YoY growth)
- **Projects Published**: 184 open source and community web/mobile/AI applications
- **Hackathon Grants Awarded**: $12,500 USD distributed across 12 winning teams
- **Workshops & Forums**: 24 events hosted in Kigali and online

## Financial & Grant Disbursement Audit
- **Kigali CodeFest 2026 Prize Pool**: $5,000 USD (Distributed May 2026)
- **AI Social Impact Grants**: $3,500 USD (Distributed April 2026)
- **GreenTech Challenge**: $4,000 USD (Distributed January 2026)

## Recommendations & Q3-Q4 Expansion Plan
Expand high-speed coding labs across Northern & Southern Provinces, launching 5 additional mentorship cohorts in late 2026.`,
  },
  {
    id: 'doc-3',
    title: 'Member Certification & Evaluation Standard Document',
    category: 'Certification Standard',
    format: 'DOCX / Official Template',
    date: '2026-01-15',
    version: 'v1.2',
    summary: 'Official evaluation template used by leads and mentors to certify member stage completions and issue digital certificates.',
    content: `# Code Club Rwanda - Member Stage Certification & Evaluation Document

## Evaluation Metrics
1. **Technical Proficiency**: 40% (Clean code, Git commits, unit test coverage)
2. **Project Portfolio**: 35% (Working demo, UI/UX responsiveness, API integration)
3. **Community Contribution**: 25% (Peer mentoring, forum answers, workshop attendance)

## Certificate Generation Procedure
Upon achieving 80%+ total evaluation score in Stage 2, 3, or 4, the member receives a verified digital certificate with unique QR code verification.`,
  },
];

export default function Reports() {
  const [report, setReport] = useState(initialReport);
  const [exportMessage, setExportMessage] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    api
      .get('/dashboard/stats')
      .then(({ data }) => setReport((prev) => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  function handleExport(format, docTitle = 'Code Club Performance Report') {
    setExportMessage(`Generating "${docTitle}" (${format})... Download started!`);
    setTimeout(() => setExportMessage(''), 4000);
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 px-1 sm:px-0">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">Reports &amp; Documentation Portal</h1>
          <p className="text-xs sm:text-sm text-text-dim mt-1">Access system operating guidelines, audit documentation, performance analytics, and report exports.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => handleExport('PDF', 'Complete System Audit')}
            className="btn-secondary text-xs font-semibold flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 sm:py-2.5"
          >
            📄 Export PDF
          </button>
          <button
            onClick={() => handleExport('CSV', 'Members & Analytics Dataset')}
            className="btn-primary text-xs font-semibold flex-1 sm:flex-none flex items-center justify-center gap-2 py-2 sm:py-2.5"
          >
            📊 Export CSV
          </button>
        </div>
      </div>

      {/* Export Toast Notification */}
      {exportMessage && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold animate-fade-in flex items-center justify-between">
          <span>{exportMessage}</span>
          <button onClick={() => setExportMessage('')} className="text-white hover:text-emerald-200 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card p-4 sm:p-5 rounded-3xl">
          <p className="text-[11px] sm:text-xs font-semibold text-text-dim">Registered Members</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 sm:mt-2">{report.totalMembers.toLocaleString()}</p>
          <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400 mt-1.5 sm:mt-2 block">↑ 14.2% Growth</span>
        </div>
        <div className="glass-card p-4 sm:p-5 rounded-3xl">
          <p className="text-[11px] sm:text-xs font-semibold text-text-dim">Published Projects</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 sm:mt-2">{report.activeProjects}</p>
          <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400 mt-1.5 sm:mt-2 block">↑ 8.4% Submissions</span>
        </div>
        <div className="glass-card p-4 sm:p-5 rounded-3xl">
          <p className="text-[11px] sm:text-xs font-semibold text-text-dim">Events Hosted</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 sm:mt-2">{report.eventsHosted}</p>
          <span className="text-[9px] sm:text-[10px] font-bold text-accent mt-1.5 sm:mt-2 block">24 Workshops</span>
        </div>
        <div className="glass-card p-4 sm:p-5 rounded-3xl">
          <p className="text-[11px] sm:text-xs font-semibold text-text-dim">Hackathon Grants</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 sm:mt-2">{report.hackathonGrants}</p>
          <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 mt-1.5 sm:mt-2 block">Awarded to Members</span>
        </div>
      </div>

      {/* SYSTEM DOCUMENTATION HUB SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">System Documentation &amp; Guidelines Hub</h2>
            <p className="text-xs text-text-dim">Official Code Club system operating manuals, evaluation guidelines, and executive audit documents.</p>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-accent px-3 py-1 rounded-full bg-primary/10 border border-primary/20 self-start sm:self-auto whitespace-nowrap">
            3 Official Documents
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {systemDocuments.map((doc) => (
            <div key={doc.id} className="glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between hover:border-primary/40 transition space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {doc.format}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-text-dim font-semibold">{doc.version}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug pt-1">{doc.title}</h3>
                <p className="text-xs text-text-dim leading-relaxed">{doc.summary}</p>
              </div>

              <div className="pt-4 border-t border-ink-border/60 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-ink-surface hover:bg-white/10 text-white border border-ink-border transition flex items-center gap-1.5"
                >
                  <span>📖 Read Document</span>
                </button>
                <button
                  onClick={() => handleExport(doc.format, doc.title)}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-accent hover:text-white transition"
                >
                  📥 Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Distribution & Monthly Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stage Distribution Breakdown */}
        <div className="lg:col-span-6 glass-card p-5 sm:p-6 rounded-3xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-white">Member Learning Stage Breakdown</h3>
            <span className="text-xs text-text-dim font-semibold">1,248 Members</span>
          </div>

          <div className="space-y-4 pt-2">
            {report.stageDistribution.map((st) => (
              <div key={st.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-white">{st.stage}</span>
                  <span className="text-accent">{st.count} members ({st.percentage}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-ink-surface overflow-hidden border border-ink-border/40">
                  <div
                    style={{ width: `${st.percentage}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Growth Chart */}
        <div className="lg:col-span-6 glass-card p-5 sm:p-6 rounded-3xl space-y-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-white">6-Month Member Growth Curve</h3>
            <span className="text-xs text-emerald-400 font-bold">↑ Active Trend</span>
          </div>

          <div className="pt-4 flex items-end justify-between gap-2 sm:gap-3 h-44 sm:h-48">
            {report.monthlyGrowth.map((g) => {
              const heightPct = Math.round((g.members / 1300) * 100);
              return (
                <div key={g.month} className="flex-1 flex flex-col items-center gap-1.5 sm:gap-2 h-full justify-end">
                  <span className="text-[9px] sm:text-[10px] font-bold text-text-dim">{g.members}</span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className="w-full rounded-t-xl bg-gradient-to-t from-primary/30 to-accent hover:to-white transition-all duration-300"
                  ></div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-white">{g.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DOCUMENT VIEWER MODAL - Fully Responsive */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="glass-card p-5 sm:p-8 rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-y-auto space-y-5 border border-primary/40 shadow-2xl relative animate-fade-in">
            <div className="flex items-start justify-between gap-3 border-b border-ink-border/60 pb-3.5">
              <div>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                  {selectedDoc.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-2 leading-snug">{selectedDoc.title}</h2>
                <p className="text-[11px] sm:text-xs text-text-dim mt-0.5">Version {selectedDoc.version} · Published {selectedDoc.date}</p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-full bg-ink-surface hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Document Content View */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-text-dim whitespace-pre-line font-mono bg-ink-surface/40 p-4 sm:p-6 rounded-2xl border border-ink-border/50 max-h-[50vh] overflow-y-auto">
              {selectedDoc.content}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-ink-border/60">
              <span className="text-[11px] sm:text-xs text-text-dim font-medium text-center sm:text-left">Code Club Rwanda MIS Document System</span>
              <div className="flex items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="btn-secondary text-xs py-2 px-4 flex-1 sm:flex-none"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleExport(selectedDoc.format, selectedDoc.title);
                    setSelectedDoc(null);
                  }}
                  className="btn-primary text-xs py-2 px-4 flex-1 sm:flex-none"
                >
                  📥 Export File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
