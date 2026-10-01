import { useState } from 'react';
import { Link } from 'react-router-dom';

const quickQuestions = ['How do I add a project?', 'How do I update my profile?', 'Where is my dashboard?'];

function answerFor(message) {
  const question = message.toLowerCase();
  if (question.includes('project')) return 'Open My Projects, complete the form, and choose Create project. Your project will appear immediately and can be edited or deleted any time.';
  if (question.includes('profile') || question.includes('name') || question.includes('email')) return 'Open the Profile tab, update your name or email, then select Save profile.';
  if (question.includes('event') || question.includes('register')) return 'Open Events from the sidebar or your dashboard. Select Register to join an event, or Cancel registration to remove your RSVP.';
  if (question.includes('dashboard') || question.includes('portal')) return 'Your member dashboard is available from My Dashboard in the sidebar or the Member Dashboard link on the public site.';
  if (question.includes('delete') || question.includes('remove')) return 'Your own projects can be deleted from My Projects with the Delete action. Profile data can be replaced from the Profile tab.';
  return 'I can help with projects, events, profile updates, navigation, and deleting your own records. Choose a question below or ask me directly.';
}

export default function SystemChatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    { from: 'bot', text: 'Hi! I am the Code Club system assistant. What do you need?' },
  ]);

  function sendMessage(text = message) {
    const cleanMessage = text.trim();
    if (!cleanMessage) return;
    setConversation((current) => [
      ...current,
      { from: 'user', text: cleanMessage },
      { from: 'bot', text: answerFor(cleanMessage) },
    ]);
    setMessage('');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open && (
        <section className="mb-3 flex h-[min(32rem,calc(100vh-7rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-ink-border bg-slate-950/95 shadow-[0_20px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl" aria-label="Code Club system assistant">
          <header className="flex items-center justify-between border-b border-ink-border bg-ink-surface px-4 py-3">
            <div><p className="text-sm font-bold text-white">System assistant</p><p className="text-xs text-accent">Online</p></div>
            <button onClick={() => setOpen(false)} className="rounded-lg px-2 py-1 text-text-dim hover:bg-white/10 hover:text-white" aria-label="Close assistant">X</button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {conversation.map((item, index) => <div key={`${item.from}-${index}`} className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-5 ${item.from === 'user' ? 'ml-auto bg-primary text-slate-950' : 'bg-ink-surface text-text-dim'}`}>{item.text}</div>)}
            <div className="flex flex-wrap gap-2 pt-1">{quickQuestions.map((question) => <button key={question} onClick={() => sendMessage(question)} className="rounded-full border border-ink-border px-2.5 py-1 text-left text-[11px] text-accent hover:border-primary">{question}</button>)}</div>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="flex gap-2 border-t border-ink-border p-3">
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask the assistant" aria-label="Message assistant" className="min-w-0 flex-1 rounded-lg border border-ink-border bg-ink-surface px-3 py-2 text-sm text-white focus:border-primary focus:outline-none" />
            <button type="submit" className="rounded-lg bg-primary px-3 text-sm font-bold text-slate-950">Send</button>
          </form>
          <Link to="/member/dashboard" onClick={() => setOpen(false)} className="px-4 pb-3 text-xs text-accent hover:text-white">Open member dashboard</Link>
        </section>
      )}
      <button onClick={() => setOpen((current) => !current)} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary text-xl text-slate-950 shadow-[0_12px_35px_rgba(16,185,129,0.35)] transition hover:scale-105" aria-label={open ? 'Close system assistant' : 'Open system assistant'} title="System assistant">💬</button>
    </div>
  );
}