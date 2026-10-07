import React, { useState } from 'react';
import { Send, Terminal, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // anti-bot trap
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseLog, setResponseLog] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot verification (if filled, bot triggered)
    if (formData.honeypot) {
      console.warn('Spam bot detected via honeypot field.');
      setStatus('success');
      setResponseLog('PING 200 OK: Message acknowledged.');
      return;
    }

    // 2. Client-side rate limiting (prevent repeated submissions within 30s)
    const lastSent = localStorage.getItem('last_contact_sub');
    const now = Date.now();
    if (lastSent && now - parseInt(lastSent, 10) < 30000) {
      setStatus('error');
      setResponseLog('RATE_LIMIT_EXCEEDED: Please wait 30 seconds before sending another message.');
      return;
    }

    // 3. Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setResponseLog('VALIDATION_ERROR: Missing required fields (name, email, message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setResponseLog('SYNTAX_ERROR: Invalid email format detected.');
      return;
    }

    setStatus('submitting');
    setResponseLog('POST /api/v1/contact -> Web3Forms dispatch initiating...');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    // Fallback simulation mode if key is not yet set
    if (!accessKey || accessKey === 'your_web3forms_access_key_here') {
      setTimeout(() => {
        setStatus('success');
        localStorage.setItem('last_contact_sub', now.toString());
        setResponseLog(
          'SIMULATION MODE (Demo): Message received locally!\n' +
          'NOTE: To receive real emails to your inbox, set VITE_WEB3FORMS_ACCESS_KEY in your .env or Vercel settings.'
        );
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      }, 900);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
          from_name: 'Airil Portfolio Terminal',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        localStorage.setItem('last_contact_sub', now.toString());
        setResponseLog('STATUS 200 OK: Dispatch successful! Airil will respond promptly.');
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
        setResponseLog(`DISPATCH_FAILED: ${result.message || 'Error communicating with Web3Forms gateway.'}`);
      }
    } catch (err: unknown) {
      setStatus('error');
      setResponseLog(`NETWORK_ERROR: ${err instanceof Error ? err.message : 'Failed to reach dispatch server.'}`);
    }
  };

  return (
    <div className="font-mono text-sm sm:text-base">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden Honeypot Field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="hp_field">Ignore this input</label>
          <input
            id="hp_field"
            type="text"
            name="botcheck_field"
            tabIndex={-1}
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sender-name" className="block mb-1.5 font-mono text-xs sm:text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
              $ SENDER_NAME <span style={{ color: 'var(--accent-amber)' }}>*</span>
            </label>
            <input
              id="sender-name"
              type="text"
              required
              placeholder="e.g. John Doe / Tech Recruiter"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-md border font-mono text-sm sm:text-base transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400"
              style={{
                backgroundColor: 'var(--code-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label htmlFor="sender-email" className="block mb-1.5 font-mono text-xs sm:text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
              $ SENDER_EMAIL <span style={{ color: 'var(--accent-amber)' }}>*</span>
            </label>
            <input
              id="sender-email"
              type="email"
              required
              placeholder="e.g. recruiter@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-md border font-mono text-sm sm:text-base transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400"
              style={{
                backgroundColor: 'var(--code-bg)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="sender-subject" className="block mb-1.5 font-mono text-xs sm:text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
            $ SUBJECT <span style={{ color: 'var(--text-muted)' }}>(Optional)</span>
          </label>
          <input
            id="sender-subject"
            type="text"
            placeholder="e.g. Internship Inquiry (Sept 2027) / Technical Role"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md border font-mono text-sm sm:text-base transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400"
            style={{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <div>
          <label htmlFor="sender-message" className="block mb-1.5 font-mono text-xs sm:text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
            $ MESSAGE_PAYLOAD <span style={{ color: 'var(--accent-amber)' }}>*</span>
          </label>
          <textarea
            id="sender-message"
            required
            rows={4}
            placeholder="Type your message, opportunity details, or questions here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md border font-mono text-sm sm:text-base transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-y"
            style={{
              backgroundColor: 'var(--code-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            <span>Security: Rate-limited • Honeypot active • SSL encrypted</span>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50 cursor-pointer hover:opacity-95"
            style={{
              backgroundColor: 'var(--accent-green)',
              color: '#05110a',
            }}
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>EXECUTING...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>EXECUTE ./send_message.sh</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Terminal Log Console */}
      {responseLog && (
        <div
          className="mt-5 p-4 rounded-md border text-xs sm:text-sm font-mono leading-relaxed"
          style={{
            backgroundColor: 'var(--code-bg)',
            borderColor:
              status === 'success'
                ? 'var(--accent-green)'
                : status === 'error'
                ? '#ef4444'
                : 'var(--border-color)',
          }}
        >
          <div className="flex items-center gap-2 mb-2 font-bold">
            {status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {status === 'error' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
            {status === 'submitting' && <Terminal className="w-4 h-4 text-cyan-400" />}
            <span
              style={{
                color:
                  status === 'success'
                    ? 'var(--accent-green)'
                    : status === 'error'
                    ? '#ef4444'
                    : 'var(--accent-cyan)',
              }}
            >
              [CONSOLE OUTPUT]
            </span>
          </div>
          <pre className="whitespace-pre-wrap font-mono" style={{ color: 'var(--text-secondary)' }}>
            {responseLog}
          </pre>
        </div>
      )}
    </div>
  );
};
