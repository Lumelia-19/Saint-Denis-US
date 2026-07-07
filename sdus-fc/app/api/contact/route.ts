import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Empeche le caching et force le runtime Node (Resend SDK utilise des modules
// non compatibles edge a 100%). Si tu preferes edge, switch sur fetch direct.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_SUBJECTS = ['Inscription', 'Détection', 'Stage vacances', 'Partenariat', 'Autre'] as const;
type Subject = (typeof VALID_SUBJECTS)[number];

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  subject: Subject;
  message: string;
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function validate(data: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!data || typeof data !== 'object') return { ok: false, error: 'Corps de requete invalide.' };
  const d = data as Record<string, unknown>;
  const firstName = isString(d.firstName) ? d.firstName.trim() : '';
  const lastName = isString(d.lastName) ? d.lastName.trim() : '';
  const email = isString(d.email) ? d.email.trim() : '';
  const subjectRaw = isString(d.subject) ? d.subject.trim() : '';
  const message = isString(d.message) ? d.message.trim() : '';

  if (!firstName || firstName.length > 80) return { ok: false, error: 'Prenom invalide.' };
  if (!lastName || lastName.length > 80) return { ok: false, error: 'Nom invalide.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return { ok: false, error: 'Email invalide.' };
  if (!VALID_SUBJECTS.includes(subjectRaw as Subject)) return { ok: false, error: 'Objet invalide.' };
  if (!message || message.length < 5 || message.length > 5000) return { ok: false, error: 'Message trop court ou trop long.' };

  return { ok: true, data: { firstName, lastName, email, subject: subjectRaw as Subject, message } };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL || 'contact@ufsd.fr';
  const fromAddress = process.env.CONTACT_FROM_EMAIL || 'UFSD <onboarding@resend.dev>';

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Service mail non configure. Contacte l\'admin du site.' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 });
  }

  const v = validate(body);
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 });

  const { firstName, lastName, email, subject, message } = v.data;
  const fullName = `${firstName} ${lastName}`;

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color: #0d1b4b; max-width: 560px;">
      <h2 style="color: #1b3a8c; margin: 0 0 16px;">Nouveau message - ${escapeHtml(subject)}</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 0; color: #5a6478;">Nom</td><td style="padding: 4px 0;"><strong>${escapeHtml(fullName)}</strong></td></tr>
        <tr><td style="padding: 4px 0; color: #5a6478;">Email</td><td style="padding: 4px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #f26522;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 4px 0; color: #5a6478;">Objet</td><td style="padding: 4px 0;">${escapeHtml(subject)}</td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid #e7ecf6; margin: 20px 0;" />
      <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${escapeHtml(message)}</p>
      <hr style="border: none; border-top: 1px solid #e7ecf6; margin: 24px 0;" />
      <p style="font-size: 12px; color: #5a6478;">Envoye depuis le formulaire de contact ufsd.fr.</p>
    </div>
  `;

  const text = [
    `Nouveau message - ${subject}`,
    '',
    `Nom: ${fullName}`,
    `Email: ${email}`,
    `Objet: ${subject}`,
    '',
    message,
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `[Site UFSD] ${subject} - ${fullName}`,
      html,
      text,
    });

    if (error) {
      // Log complet cote serveur (visible dans Vercel Functions logs)
      console.error('[contact] Resend error:', JSON.stringify(error, null, 2));
      console.error('[contact] config used:', { from: fromAddress, to: toAddress });

      // Mappe les erreurs Resend frequentes vers un message clair cote client
      const raw = `${error.name ?? ''} ${error.message ?? ''}`.toLowerCase();
      let userMsg = error.message || 'Envoi impossible pour le moment.';
      if (raw.includes('domain') && raw.includes('not verified')) {
        userMsg =
          "Le domaine de l'expéditeur n'est pas vérifié sur Resend. " +
          'Vérifie ufsd.fr sur resend.com/domains ou utilise un sender ' +
          "déjà vérifié (ex. onboarding@resend.dev - réservé à l'email du compte Resend).";
      } else if (raw.includes('api key') || raw.includes('unauthorized') || raw.includes('forbidden')) {
        userMsg = 'Clé API Resend invalide ou expirée.';
      } else if (raw.includes('testing') || raw.includes("can't send")) {
        userMsg =
          "Avec onboarding@resend.dev, Resend n'autorise l'envoi QUE vers l'email du compte Resend. " +
          "Mets CONTACT_TO_EMAIL = email de ton compte Resend, ou vérifie ton domaine.";
      }

      return NextResponse.json(
        { error: userMsg, debug: { name: error.name, message: error.message } },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[contact] unexpected error:', msg, err);
    return NextResponse.json({ error: `Erreur serveur : ${msg}` }, { status: 500 });
  }
}
