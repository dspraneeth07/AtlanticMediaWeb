import { CONTACT_EMAIL } from '../data'

// Starter legal text written for Atlantic Media. It is NOT legal advice —
// have it reviewed by counsel and updated with the company's registered details.
const PRIVACY = {
  title: 'Privacy Policy',
  effective: '1 September 2026',
  sections: [
    { h: '1. Who we are', p: ['Atlantic Media (“we”, “us”, “our”), Level 19 / Unit 3, One West – A Terminus Project, Financial District, Hyderabad, Telangana 500008, runs this website. This policy explains what personal information we collect when you use it, why we collect it and the choices you have.'] },
    { h: '2. Information we collect', p: ['Information you give us — for example your name, email address, phone number and the details you share when you fill in our contact form or write to us.', 'Information collected automatically — such as your browser type, device, pages visited and approximate location, gathered through cookies and similar technologies.'] },
    { h: '3. How we use it', p: ['To respond to enquiries and provide our services; to manage creator and brand partnerships; to improve and secure this website; and, where you have agreed, to send you updates. We do not sell your personal information.'] },
    { h: '4. Sharing', p: ['We share information only with service providers who help us run our business (such as hosting and email providers), with partners where needed to deliver a campaign you have asked us to run, or when the law requires it.'] },
    { h: '5. Cookies', p: ['We use essential cookies to make the site work and, with your consent, analytics cookies to understand how it is used. You can control cookies through your browser settings.'] },
    { h: '6. Keeping your information', p: ['We keep personal information only as long as we need it for the purposes above, or as required by law, and protect it with reasonable technical and organisational measures.'] },
    { h: '7. Your rights', p: ['Depending on where you live, you may have the right to access, correct or delete your information, or to object to how we use it. To make a request, contact us using the details below.'] },
    { h: '8. Changes', p: ['We may update this policy from time to time. The effective date at the top of the page shows when it was last changed.'] },
    { h: '9. Contact', p: [`Questions about this policy? Email ${CONTACT_EMAIL}.`] },
  ],
}

const TERMS = {
  title: 'Terms of Service',
  effective: '1 September 2026',
  sections: [
    { h: '1. Using this website', p: ['By using this website you agree to these terms. If you do not agree, please do not use the site.'] },
    { h: '2. Content', p: ['All content on this website, including text, graphics, logos and video, belongs to Atlantic Media or its licensors and may not be copied or reused without permission, except for sharing links to our pages.'] },
    { h: '3. Third-party links', p: ['The site may link to other websites. We are not responsible for their content or practices.'] },
    { h: '4. No warranties', p: ['The website is provided “as is”. We work to keep it accurate and available but do not guarantee that it will always be error-free or uninterrupted.'] },
    { h: '5. Limitation of liability', p: ['To the extent allowed by law, Atlantic Media is not liable for any indirect or consequential loss arising from use of this website.'] },
    { h: '6. Governing law', p: ['These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts in Hyderabad, Telangana.'] },
    { h: '7. Contact', p: [`Questions about these terms? Email ${CONTACT_EMAIL}.`] },
  ],
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const doc = kind === 'privacy' ? PRIVACY : TERMS
  return (
    <>
      <section className="legal-hero">
        <div className="container container--article">
          <h1 className="page-title">{doc.title}</h1>
          <p className="legal-hero__date">Effective date: {doc.effective}</p>
        </div>
      </section>
      <section className="section theme-light">
        <article className="article container container--article legal">
          {doc.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          ))}
        </article>
      </section>
    </>
  )
}
