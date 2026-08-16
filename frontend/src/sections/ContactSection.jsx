import ContactForm from "../components/Contact/ContactForm";

export default function ContactSection({ email = "shs140326@gmail.com" }) {
  return (
    <section id="contact" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-4xl font-medium leading-[0.98] tracking-tight md:text-7xl">
          HAVE SOMETHING
          <br />
          WORTH BUILDING?
        </h2>
        <p className="mt-6 max-w-md text-[var(--color-ink-soft)]">
          Tell me what you're working on.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${email}`}
            className="rounded-full border border-[var(--color-ink)] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest"
          >
            Email Me
          </a>
          <a
            href="#contact-form"
            className="rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-bg)]"
          >
            Start a Project
          </a>
        </div>

        <div
          id="contact-form"
          className="mt-16 rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 md:rounded-[var(--radius-2xl)] md:p-12"
        >
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
