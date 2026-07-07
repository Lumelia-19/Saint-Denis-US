import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Identique a la route contact : runtime Node (Resend SDK non edge-compat),
// pas de cache, force-dynamic.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// TODO (US-012) : brancher l'upload des pieces jointes (photo d'identite,
// certificat medical, justificatif de domicile) via Vercel Blob puis pieces
// jointes Resend. Pour l'instant on accepte un champ texte "documents"
// optionnel decrivant les pieces transmises par ailleurs.

const VALID_CATEGORIES = [
  'U6-U9',
  'U10-U13',
  'U14-U17',
  'U18-Seniors',
  'Seniors',
  'Futsal',
  'Foot Féminin',
  'Loisirs/Vétérans',
] as const;
type Category = (typeof VALID_CATEGORIES)[number];

interface InscriptionPayload {
  playerFirstName: string;
  playerLastName: string;
  birthYear: number;
  category: Category;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  message?: string;
  documents?: string;
  consent: boolean;
}

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function validate(data: unknown): { ok: true; data: InscriptionPayload } | { ok: false; error: string } {
  if (!data || typeof data !== 'object') return { ok: false, error: 'Corps de requête invalide.' };
  const d = data as Record<string, unknown>;

  const playerFirstName = isString(d.playerFirstName) ? d.playerFirstName.trim() : '';
  const playerLastName = isString(d.playerLastName) ? d.playerLastName.trim() : '';
  const birthYear = typeof d.birthYear === 'number' ? d.birthYear : Number.parseInt(isString(d.birthYear) ? d.birthYear : '', 10);
  const categoryRaw = isString(d.category) ? d.category.trim() : '';
  const parentName = isString(d.parentName) ? d.parentName.trim() : '';
  const parentEmail = isString(d.parentEmail) ? d.parentEmail.trim() : '';
  const parentPhone = isString(d.parentPhone) ? d.parentPhone.trim() : '';
  const message = isString(d.message) ? d.message.trim() : '';
  const documents = isString(d.documents) ? d.documents.trim() : '';
  const consent = d.consent === true;

  if (!playerFirstName || playerFirstName.length > 80) return { ok: false, error: 'Prénom du joueur invalide.' };
  if (!playerLastName || playerLastName.length > 80) return { ok: false, error: 'Nom du joueur invalide.' };
  if (!Number.isInteger(birthYear) || birthYear < 2000 || birthYear > new Date().getFullYear()) {
    return { ok: false, error: 'Année de naissance invalide.' };
  }
  if (!VALID_CATEGORIES.includes(categoryRaw as Category)) return { ok: false, error: 'Catégorie invalide.' };
  if (!parentName || parentName.length > 120) return { ok: false, error: 'Nom du parent/tuteur invalide.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail) || parentEmail.length > 200) {
    return { ok: false, error: 'Email du parent/tuteur invalide.' };
  }
  if (!parentPhone || parentPhone.length > 40) return { ok: false, error: 'Téléphone invalide.' };
  if (message.length > 5000) return { ok: false, error: 'Message trop long.' };
  if (documents.length > 2000) return { ok: false, error: 'Champ documents trop long.' };
  if (!consent) return { ok: false, error: 'Vous devez accepter la politique de confidentialité.' };

  return {
    ok: true,
    data: {
      playerFirstName,
      playerLastName,
      birthYear,
      category: categoryRaw as Category,
      parentName,
      parentEmail,
      parentPhone,
      message,
      documents,
      consent,
    },
  };
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

  // Meme strategie que la route contact : 503 si Resend n'est pas configure.
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Service mail non configuré. Contactez l\'admin du site.' },
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

  const p = v.data;
  const playerFullName = `${p.playerFirstName} ${p.playerLastName}`;

  // 1) Notification au club (recap de la demande d'inscription)
  const clubRows = [
    ['Joueur', playerFullName],
    ['Année de naissance', String(p.birthYear)],
    ['Catégorie', p.category],
    ['Parent / Tuteur', p.parentName],
    ['Email', p.parentEmail],
    ['Téléphone', p.parentPhone],
  ];
  if (p.documents) clubRows.push(['Documents (note)', p.documents]);

  const clubHtml = `
    <div style="font-family: Inter, Arial, sans-serif; color: #0d1b4b; max-width: 560px;">
      <h2 style="color: #1b3a8c; margin: 0 0 16px;">Nouvelle demande d'inscription - ${escapeHtml(p.category)}</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${clubRows
          .map(
            ([k, val]) =>
              `<tr><td style="padding: 4px 0; color: #5a6478;">${escapeHtml(k)}</td><td style="padding: 4px 0;"><strong>${escapeHtml(val)}</strong></td></tr>`,
          )
          .join('')}
      </table>
      ${
        p.message
          ? `<hr style="border: none; border-top: 1px solid #e7ecf6; margin: 20px 0;" /><p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${escapeHtml(
              p.message,
            )}</p>`
          : ''
      }
      <hr style="border: none; border-top: 1px solid #e7ecf6; margin: 24px 0;" />
      <p style="font-size: 12px; color: #5a6478;">Envoyé depuis le formulaire d'inscription ufsd.fr.</p>
    </div>
  `;

  const clubText = [
    `Nouvelle demande d'inscription - ${p.category}`,
    '',
    `Joueur: ${playerFullName}`,
    `Année de naissance: ${p.birthYear}`,
    `Catégorie: ${p.category}`,
    `Parent / Tuteur: ${p.parentName}`,
    `Email: ${p.parentEmail}`,
    `Téléphone: ${p.parentPhone}`,
    ...(p.documents ? ['', 'Documents (note):', p.documents] : []),
    ...(p.message ? ['', 'Message:', p.message] : []),
    '',
    'Envoyé depuis le formulaire d\'inscription ufsd.fr.',
  ].join('\n');

  // 2) Confirmation au parent
  const parentHtml = `
    <div style="font-family: Inter, Arial, sans-serif; color: #0d1b4b; max-width: 560px;">
      <h2 style="color: #1b3a8c; margin: 0 0 16px;">Demande d'inscription bien reçue</h2>
      <p style="line-height: 1.6; margin: 0 0 16px;">Bonjour ${escapeHtml(p.parentName)},</p>
      <p style="line-height: 1.6; margin: 0 0 16px;">
        Nous avons bien reçu la demande d'inscription de <strong>${escapeHtml(playerFullName)}</strong>
        en catégorie <strong>${escapeHtml(p.category)}</strong> à l'United Football Saint-Denis.
        Notre bureau des inscriptions vous recontactera très prochainement pour finaliser l'adhésion.
      </p>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 0 0 16px;">
        <tr><td style="padding: 4px 0; color: #5a6478;">Joueur</td><td style="padding: 4px 0;">${escapeHtml(playerFullName)}</td></tr>
        <tr><td style="padding: 4px 0; color: #5a6478;">Catégorie</td><td style="padding: 4px 0;">${escapeHtml(p.category)}</td></tr>
        <tr><td style="padding: 4px 0; color: #5a6478;">Saison</td><td style="padding: 4px 0;">2026 / 2027</td></tr>
      </table>
      <p style="line-height: 1.6; margin: 0 0 16px; font-size: 13px; color: #5a6478;">
        Pensez à préparer : photo d'identité, certificat médical de non contre-indication,
        justificatif de domicile (moins de 3 mois) et fiche d'inscription remplie.
      </p>
      <hr style="border: none; border-top: 1px solid #e7ecf6; margin: 24px 0;" />
      <p style="font-size: 12px; color: #5a6478;">Cet email vous a été envoyé automatiquement depuis ufsd.fr. Merci de ne pas y répondre.</p>
    </div>
  `;

  const parentText = [
    `Demande d'inscription bien reçue`,
    '',
    `Bonjour ${p.parentName},`,
    '',
    `Nous avons bien reçu la demande d'inscription de ${playerFullName} en catégorie ${p.category} à l'United Football Saint-Denis.`,
    `Notre bureau des inscriptions vous recontactera très prochainement pour finaliser l'adhésion.`,
    '',
    `Joueur: ${playerFullName}`,
    `Catégorie: ${p.category}`,
    `Saison: 2026 / 2027`,
    '',
    `Pensez à préparer : photo d'identité, certificat médical, justificatif de domicile (moins de 3 mois) et fiche d'inscription remplie.`,
    '',
    'Cet email vous a été envoyé automatiquement depuis ufsd.fr. Merci de ne pas y répondre.',
  ].join('\n');

  try {
    const resend = new Resend(apiKey);

    const [clubRes, parentRes] = await Promise.all([
      resend.emails.send({
        from: fromAddress,
        to: toAddress,
        replyTo: p.parentEmail,
        subject: `[UFSD] Inscription ${p.category} - ${playerFullName}`,
        html: clubHtml,
        text: clubText,
      }),
      resend.emails.send({
        from: fromAddress,
        to: p.parentEmail,
        subject: `Confirmation - Inscription de ${playerFullName} à l'UFSD`,
        html: parentHtml,
        text: parentText,
      }),
    ]);

    if (clubRes.error) {
      console.error('[inscription] Resend error (club):', JSON.stringify(clubRes.error, null, 2));
      console.error('[inscription] config used:', { from: fromAddress, to: toAddress });
      const raw = `${clubRes.error.name ?? ''} ${clubRes.error.message ?? ''}`.toLowerCase();
      let userMsg = clubRes.error.message || 'Envoi impossible pour le moment.';
      if (raw.includes('domain') && raw.includes('not verified')) {
        userMsg =
          "Le domaine de l'expéditeur n'est pas vérifié sur Resend. " +
          'Vérifiez ufsd.fr sur resend.com/domains ou utilisez un sender ' +
          "déjà vérifié (ex. onboarding@resend.dev - réservé à l'email du compte Resend).";
      } else if (raw.includes('api key') || raw.includes('unauthorized') || raw.includes('forbidden')) {
        userMsg = 'Clé API Resend invalide ou expirée.';
      } else if (raw.includes('testing') || raw.includes("can't send")) {
        userMsg =
          "Avec onboarding@resend.dev, Resend n'autorise l'envoi QUE vers l'email du compte Resend. " +
          "Mettez CONTACT_TO_EMAIL = email de votre compte Resend, ou vérifiez votre domaine.";
      }
      return NextResponse.json(
        { error: userMsg, debug: { name: clubRes.error.name, message: clubRes.error.message } },
        { status: 502 },
      );
    }

    if (parentRes.error) {
      // La notification club est partie mais la confirmation parent a échoué.
      console.error('[inscription] Resend error (parent):', JSON.stringify(parentRes.error, null, 2));
      return NextResponse.json(
        {
          error: 'Demande enregistrée mais email de confirmation non envoyé au parent.',
          debug: { name: parentRes.error.name, message: parentRes.error.message },
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, id: clubRes.data?.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[inscription] unexpected error:', msg, err);
    return NextResponse.json({ error: `Erreur serveur : ${msg}` }, { status: 500 });
  }
}