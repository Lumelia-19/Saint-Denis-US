'use client';
import { useState } from 'react';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';
import { ContactFormData } from '@/lib/types';

const SUBJECTS = ['Inscription', 'Détection', 'Stage vacances', 'Partenariat', 'Autre demande'];

const EMPTY_FORM: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  subject: SUBJECTS[0],
  message: '',
};

const COORDS: { icon: IconName; label: string; value: string }[] = [
  { icon: 'map-pin', label: 'Adresse', value: 'Stade Marville, Saint-Denis (93)' },
  { icon: 'mail', label: 'Email', value: 'contact@sdus-fc93.fr' },
  { icon: 'phone', label: 'Téléphone', value: 'Sur demande par email' },
  { icon: 'clock', label: 'Horaires', value: 'Lun – Sam · 9h – 19h' },
];

const SOCIALS: { icon: IconName; label: string; href: string }[] = [
  { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/sdus_football/' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const update =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };
      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Erreur lors de l’envoi.');
        return;
      }
      setStatus('sent');
      setForm(EMPTY_FORM);
    } catch {
      setStatus('error');
      setErrorMsg('Connexion impossible. Réessaie plus tard.');
    }
  };

  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 bg-surface overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-grid-ink opacity-70" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="eyebrow text-flame mb-4">Une question ?</p>
          <h1 className="hero-title text-royal lg:text-[5.6rem]">
            Nous{' '}
            <span className="text-flame">contacter</span>
          </h1>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-deep/82 sm:text-base lg:text-lg">
            Le club vous répond rapidement - inscriptions, détections, partenariats ou simple curiosité.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mt-12">
          {/* Form */}
          <Reveal className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-5 sm:p-6 lg:p-8 h-full">
              {status === 'sent' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-mist border border-cloud p-4">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-flame text-white shrink-0">
                    <Icon name="check" size={18} strokeWidth={3} />
                  </span>
                  <p className="text-sm text-navy">
                    Message envoyé ! On te répond rapidement par email.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-red-500 text-white shrink-0">
                    <Icon name="close" size={18} strokeWidth={3} />
                  </span>
                  <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="field-label">Prénom</label>
                  <input id="firstName" type="text" required value={form.firstName} onChange={update('firstName')} className="field" placeholder="Votre prénom" />
                </div>
                <div>
                  <label htmlFor="lastName" className="field-label">Nom</label>
                  <input id="lastName" type="text" required value={form.lastName} onChange={update('lastName')} className="field" placeholder="Votre nom" />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="email" className="field-label">Email</label>
                <input id="email" type="email" required value={form.email} onChange={update('email')} className="field" placeholder="vous@email.fr" />
              </div>
              <div className="mt-5">
                <label htmlFor="subject" className="field-label">Objet</label>
                <select id="subject" value={form.subject} onChange={update('subject')} className="field">
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="field-label">Message</label>
                <textarea id="message" required rows={5} value={form.message} onChange={update('message')} className="field resize-y" placeholder="Votre message…" />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary group mt-6 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'sending' ? 'Envoi…' : 'Envoyer le message'}
                <Icon
                  name="send"
                  size={16}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </Reveal>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[1.6rem] bg-mesh p-5 sm:p-6 lg:p-7">
                <h3 className="display-sm text-lg sm:text-xl text-white mb-5">Coordonnées</h3>
                <ul className="space-y-4">
                  {COORDS.map((c) => (
                    <li key={c.label} className="flex items-start gap-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-flame shrink-0">
                        <Icon name={c.icon} size={18} />
                      </span>
                      <div>
                        <p className="text-white/45 text-[0.68rem] uppercase tracking-[0.14em]">{c.label}</p>
                        <p className="text-white text-sm">{c.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="card p-5 sm:p-6 lg:p-7">
                <h3 className="display-sm text-lg sm:text-xl text-navy mb-4">Réseaux sociaux</h3>
                <div className="flex gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid place-items-center w-12 h-12 rounded-xl border border-cloud text-accent hover:bg-royal hover:text-white hover:-translate-y-1 transition-all"
                    >
                      <Icon name={s.icon} size={20} />
                    </a>
                  ))}
                </div>
                <p className="text-slate-soft text-sm mt-4">@sdus_football</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
