'use client';
import { useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';

const CATEGORIES = [
  'U6-U9',
  'U10-U13',
  'U14-U17',
  'U18-Seniors',
  'Seniors',
  'Futsal',
  'Foot Féminin',
  'Loisirs/Vétérans',
] as const;

// Saison 2026/2027. Années de naissance plausibles (de -6 ans à seniors).
const BIRTH_YEARS = Array.from({ length: 22 }, (_, i) => 2021 - i); // 2021 -> 2000

const EMPTY_FORM = {
  playerFirstName: '',
  playerLastName: '',
  birthYear: '',
  category: CATEGORIES[0],
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  message: '',
  documents: '',
  consent: false,
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

const DOCS: { icon: IconName; label: string }[] = [
  { icon: 'camera', label: 'Photo d’identité (format officiel)' },
  { icon: 'file-text', label: 'Certificat médical de non contre-indication' },
  { icon: 'map-pin', label: 'Justificatif de domicile (moins de 3 mois)' },
];

export default function InscriptionFormulairePage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const update =
    (field: keyof typeof EMPTY_FORM) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleConsent = () => setForm((prev) => ({ ...prev, consent: !prev.consent }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          birthYear: form.birthYear ? Number(form.birthYear) : '',
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; success?: boolean };
      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMsg(data.error || 'Erreur lors de l’envoi.');
        return;
      }
      setStatus('sent');
      setForm(EMPTY_FORM);
    } catch {
      setStatus('error');
      setErrorMsg('Connexion impossible. Réessayez plus tard.');
    }
  };

  return (
    <section className="relative pt-32 pb-24 bg-surface overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-grid-ink opacity-70" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="eyebrow text-flame mb-4">Saison 2026 / 2027</p>
          <h1 className="hero-title text-navy lg:text-[5.6rem]">
            Inscription{' '}
            <span className="text-flame">en ligne</span>
          </h1>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy/82 sm:text-lg">
            Remplissez le formulaire ci-dessous. Le bureau des inscriptions de l’UFSD
            vous recontactera par email pour finaliser l’adhésion.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Formulaire */}
          <Reveal className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-8 h-full">
              {status === 'sent' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-mist border border-cloud p-4">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-flame text-white shrink-0">
                    <Icon name="check" size={18} strokeWidth={3} />
                  </span>
                  <p className="text-sm text-navy">
                    Demande envoyée ! Un email de confirmation vous a été envoyé. Le bureau des inscriptions vous recontactera.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 form-error flex items-center gap-3 rounded-xl p-4">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-red-500 text-white shrink-0">
                    <Icon name="close" size={18} strokeWidth={3} />
                  </span>
                  <p className="text-sm">{errorMsg}</p>
                </div>
              )}

              {/* Identité du joueur */}
              <div className="flex items-center gap-3 mb-5">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-royal text-white shrink-0">
                  <Icon name="runner" size={20} />
                </span>
                <h2 className="display-sm text-xl text-navy">Identité du joueur</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="playerFirstName" className="field-label">Prénom</label>
                  <input id="playerFirstName" type="text" required value={form.playerFirstName} onChange={update('playerFirstName')} className="field" placeholder="Prénom du joueur" />
                </div>
                <div>
                  <label htmlFor="playerLastName" className="field-label">Nom</label>
                  <input id="playerLastName" type="text" required value={form.playerLastName} onChange={update('playerLastName')} className="field" placeholder="Nom du joueur" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div>
                  <label htmlFor="birthYear" className="field-label">Année de naissance</label>
                  <select id="birthYear" required value={form.birthYear} onChange={update('birthYear')} className="field">
                    <option value="" disabled>Sélectionnez une année</option>
                    {BIRTH_YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="field-label">Catégorie</label>
                  <select id="category" value={form.category} onChange={update('category')} className="field">
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Coordonnées parent / tuteur */}
              <div className="flex items-center gap-3 mt-8 mb-5">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-royal text-white shrink-0">
                  <Icon name="users" size={20} />
                </span>
                <h2 className="display-sm text-xl text-navy">Parent / Tuteur</h2>
              </div>
              <div>
                <label htmlFor="parentName" className="field-label">Nom complet</label>
                <input id="parentName" type="text" required value={form.parentName} onChange={update('parentName')} className="field" placeholder="Prénom et nom du parent ou tuteur" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div>
                  <label htmlFor="parentEmail" className="field-label">Email</label>
                  <input id="parentEmail" type="email" required value={form.parentEmail} onChange={update('parentEmail')} className="field" placeholder="vous@email.fr" />
                </div>
                <div>
                  <label htmlFor="parentPhone" className="field-label">Téléphone</label>
                  <input id="parentPhone" type="tel" required value={form.parentPhone} onChange={update('parentPhone')} className="field" placeholder="06 12 34 56 78" />
                </div>
              </div>

              {/* Message libre */}
              <div className="mt-5">
                <label htmlFor="message" className="field-label">Message (optionnel)</label>
                <textarea id="message" rows={4} value={form.message} onChange={update('message')} className="field resize-y" placeholder="Précisez votre demande, le niveau du joueur, des disponibilités…" />
              </div>

              {/* Note documents */}
              <div className="mt-5">
                <label htmlFor="documents" className="field-label">Documents (optionnel)</label>
                <input id="documents" type="text" value={form.documents} onChange={update('documents')} className="field" placeholder="Précisez si vous transmettez déjà les pièces (voir ci-contre)" />
                <p className="mt-2 text-xs text-slate-soft">
                  L’envoi des fichiers (photo, certificat médical, justificatif) sera disponible prochainement en ligne.
                </p>
              </div>

              {/* Consentement RGPD */}
              <div className="mt-6 flex items-start gap-3">
                <button
                  type="button"
                  onClick={toggleConsent}
                  aria-pressed={form.consent}
                  aria-label="Consentement à la politique de confidentialité"
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition-colors ${
                    form.consent ? 'border-flame bg-flame text-white' : 'border-cloud bg-white text-transparent'
                  }`}
                >
                  {form.consent && <Icon name="check" size={14} strokeWidth={3.5} />}
                </button>
                <p className="text-sm text-slate-soft leading-relaxed">
                  J’accepte que mes données soient traitées par l’UFSD pour traiter cette demande,
                  conformément à la{' '}
                  <Link href="/confidentialite" className="text-flame font-semibold underline underline-offset-2">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || !form.consent}
                className="btn-primary group mt-6 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'sending' ? 'Envoi…' : 'Envoyer la demande'}
                <Icon
                  name="send"
                  size={16}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </Reveal>

          {/* Sidebar : pièces à fournir */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[1.6rem] bg-mesh p-7">
                <h3 className="display-sm text-xl text-white mb-5">Pièces à fournir</h3>
                <ul className="space-y-4">
                  {DOCS.map((d) => (
                    <li key={d.label} className="flex items-start gap-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-flame shrink-0">
                        <Icon name={d.icon} size={18} />
                      </span>
                      <p className="text-white text-sm leading-relaxed pt-1.5">{d.label}</p>
                    </li>
                  ))}
                </ul>
                <p className="text-white/60 text-xs mt-5 leading-relaxed">
                  Ces pièces seront à transmettre lors de la finalisation de l’inscription.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="card p-7">
                <h3 className="display-sm text-xl text-navy mb-3">Une question ?</h3>
                <p className="text-slate-soft text-sm leading-relaxed">
                  Pour toute précision sur les inscriptions, détections ou stages,
                  contactez le bureau des inscriptions.
                </p>
                <Link href="/contact" className="btn-outline group mt-4 w-full justify-between">
                  Contacter le club
                  <Icon name="arrow-right" size={18} strokeWidth={2.4} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}