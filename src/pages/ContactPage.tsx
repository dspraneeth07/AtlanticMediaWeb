import { useState, type FormEvent } from 'react'
import { ADDRESS, BUDGETS, CLIENTS, CONTACT_EMAIL, COUNTRY_CODES, ENQUIRY_TYPES, PHONES, PRIOR_HANDLE, SERVICE_OPTIONS } from '../data'
import { Marquee } from '../components/Hero'
import { Arrow, ClientLogo, Reveal, SectionTag } from '../components/ui'
import { PageTitle } from '../components/pageui'

type Form = {
  name: string
  code: string
  phone: string
  email: string
  type: string
  services: string[]
  other: string
  budget: string
  message: string
}
type Errors = Partial<Record<keyof Form, string>>

const EMPTY: Form = { name: '', code: '+91', phone: '', email: '', type: '', services: [], other: '', budget: '', message: '' }

function validate(f: Form): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please enter your name.'
  if (!/^[\d\s-]{7,15}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number (digits only).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.type) e.type = 'Let us know if you’re a brand or a creator.'
  if (!f.services.length) e.services = 'Pick at least one service.'
  if (f.services.includes('Other') && !f.other.trim()) e.other = 'Tell us what you’re looking for.'
  return e
}

/**
 * There is no backend yet: a valid submission opens the visitor's email app with
 * the enquiry pre-filled. Swap `send` for a form service or API call when ready.
 */
function send(f: Form) {
  const lines = [
    `Name: ${f.name}`,
    `Phone: ${f.code} ${f.phone}`,
    `Email: ${f.email}`,
    `I am a: ${f.type}`,
    `Services: ${f.services.map((s) => (s === 'Other' ? `Other (${f.other})` : s)).join(', ')}`,
  ]
  if (f.budget) lines.push(`Budget: ${f.budget}`)
  if (f.message.trim()) lines.push('', f.message.trim())
  const body = lines.join('\n')
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`New enquiry from ${f.name}`)}&body=${encodeURIComponent(body)}`
}

export function ContactPage() {
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }
  const toggleService = (s: string) =>
    set('services', form.services.includes(s) ? form.services.filter((x) => x !== s) : [...form.services, s])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    send(form)
    setSent(true)
  }

  const err = (k: keyof Form) =>
    errors[k] ? (
      <p className="field__error" id={`e-${k}`}>
        {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof Form) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `e-${k}` : undefined })

  return (
    <>
      {/* Hero — same treatment as every other page */}
      <section className="page-hero contact-hero">
        <div className="container">
          <PageTitle lead="We are here" accent="for you!" />
          <a className="contact-hero__mail" href={`mailto:${CONTACT_EMAIL}`}>
            <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <span className="link-sweep">{CONTACT_EMAIL}</span>
          </a>
        </div>
      </section>

      {/* Email / call details + enquiry form */}
      <section className="section contact">
        <div className="container contact__grid">
          <div className="contact__aside">
            <Reveal as="h2" className="h2 h2--sm">
              Drop us an Email or Call
            </Reveal>
            <ul className="contact__facts">
              <li>
                <span>Email</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="link-sweep contact__line">{CONTACT_EMAIL}</a>
              </li>
              <li>
                <span>Call</span>
                {PHONES.map((ph) => (
                  <a key={ph} href={`tel:${ph.replace(/\s/g, '')}`} className="link-sweep contact__line">{ph}</a>
                ))}
              </li>
              <li>
                <span>Visit</span>
                {ADDRESS.lines.join(', ')}
              </li>
              <li>
                <span>Creators</span>
                DM PRIOR on Instagram <a href={PRIOR_HANDLE.href} target="_blank" rel="noopener noreferrer" className="link-sweep contact__line">{PRIOR_HANDLE.label}</a>
              </li>
            </ul>
          </div>

          {sent ? (
            <div className="form-done" role="status">
              <p className="form-done__title">Thanks, {form.name.split(' ')[0]}!</p>
              <p>Your email app should have opened with your enquiry filled in — just hit send. If it didn’t, write to us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
              <button className="underline-link" onClick={() => { setForm(EMPTY); setSent(false) }}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              <fieldset>
                <legend className="form__legend">Your Details</legend>
                <div className="field">
                  <label htmlFor="f-name">Name</label>
                  <input id="f-name" autoComplete="name" placeholder="Enter your name" value={form.name} onChange={(e) => set('name', e.target.value)} {...aria('name')} />
                  {err('name')}
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Phone Number</label>
                  <div className="field__phone">
                    <select aria-label="Country code" value={form.code} onChange={(e) => set('code', e.target.value)}>
                      {COUNTRY_CODES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <input id="f-phone" type="tel" autoComplete="tel-national" inputMode="tel" placeholder="Enter your phone number" value={form.phone} onChange={(e) => set('phone', e.target.value)} {...aria('phone')} />
                  </div>
                  {err('phone')}
                </div>
                <div className="field">
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" type="email" autoComplete="email" placeholder="Enter your email" value={form.email} onChange={(e) => set('email', e.target.value)} {...aria('email')} />
                  {err('email')}
                </div>
                <div className="field">
                  <label htmlFor="f-type">Are you a Creator or a Brand?</label>
                  <select id="f-type" value={form.type} onChange={(e) => set('type', e.target.value)} {...aria('type')}>
                    <option value="">Select option</option>
                    {ENQUIRY_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  {err('type')}
                </div>
              </fieldset>

              <fieldset className="field" {...aria('services')}>
                <legend>What services are you looking for?</legend>
                <div className="checks" id="f-services" tabIndex={-1}>
                  {SERVICE_OPTIONS.map((s) => (
                    <label key={s} className="check">
                      <input type="checkbox" checked={form.services.includes(s)} onChange={() => toggleService(s)} />
                      <span className="check__box" aria-hidden="true" />
                      {s}
                    </label>
                  ))}
                </div>
                {form.services.includes('Other') && (
                  <input id="f-other" className="field__other" placeholder="Tell us more" aria-label="Other service" value={form.other} onChange={(e) => set('other', e.target.value)} {...aria('other')} />
                )}
                {err('services')}
                {err('other')}
              </fieldset>

              <div className="field">
                <label htmlFor="f-budget">Budget <span className="field__opt">(optional)</span></label>
                <select id="f-budget" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-message">Project details <span className="field__opt">(optional)</span></label>
                <textarea id="f-message" rows={4} placeholder="Tell us about your brief, timeline or goals" value={form.message} onChange={(e) => set('message', e.target.value)} />
              </div>

              <button type="submit" className="form__submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </section>

      <Marquee
        className="contact__logos"
        label="Brands we work with"
        items={CLIENTS}
        render={(c) => (
          <li key={c.name} className="logo-cell">
            <ClientLogo client={c} />
          </li>
        )}
      />

      {/* Join our team */}
      <section className="section contact-team" aria-labelledby="join-h">
        <div className="container">
          <SectionTag>Careers</SectionTag>
          <div className="contact-team__head">
            <Reveal as="h2" className="h2">
              <span id="join-h">Join our team.</span>
            </Reveal>
            <Reveal delay={120} className="contact-team__side">
              <p className="lead">Brand managers, creators, editors, producers — if you want to set the pace, we want to hear from you.</p>
              <a className="btn-contact" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Job application — Atlantic Media')}`}>
                Send us your CV <Arrow />
              </a>
            </Reveal>
          </div>
          <div className="contact-team__grid">
            <Reveal className="contact-team__photo">
              <img src="/brand/team.jpg" alt="The Atlantic Media team" loading="lazy" />
            </Reveal>
            <Reveal delay={120} className="contact-team__building">
              <img src="/brand/office-building.jpg" alt="One West – A Terminus Project, Financial District, Hyderabad" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section contact-loc" aria-labelledby="loc-h">
        <div className="container">
          <SectionTag>Location</SectionTag>
          <Reveal as="h2" className="h2 h2--sm">
            <span id="loc-h">This is where we live!</span>
          </Reveal>
          <div className="contact-map">
            <iframe
              title="Atlantic Media office on Google Maps"
              src={`https://www.google.com/maps?q=${encodeURIComponent('One West A Terminus Project, Financial District, Hyderabad 500008')}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <address className="contact-map__card">
              <span className="contact-map__label">Address</span>
              {ADDRESS.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
              <a href={ADDRESS.map} target="_blank" rel="noopener noreferrer" className="link-sweep">
                Open in Google Maps ↗
              </a>
            </address>
          </div>
        </div>
      </section>
    </>
  )
}
