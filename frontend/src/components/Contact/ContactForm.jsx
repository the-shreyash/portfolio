import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { submitContactForm } from "../../services/api";

const projectTypes = [
  "AI Product",
  "Web Application",
  "SaaS",
  "Portfolio",
  "E-commerce",
  "Automation",
  "Other",
];

const initialState = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    setServerError("");

    try {
      await submitContactForm(values);
      setStatus("success");
      setValues(initialState);
    } catch (err) {
      setStatus("error");
      setServerError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again in a moment."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] px-8 py-20 text-center">
        <CheckCircle2 size={40} className="text-[var(--color-accent)]" />
        <h3 className="mt-6 font-display text-2xl font-medium tracking-tight">
          Message received.
        </h3>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          I'll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs font-semibold uppercase tracking-widest underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-[var(--color-surface)] px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-accent)] ${
      errors[field] ? "border-red-400" : "border-[var(--color-line)]"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            className={inputClass("name")}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange("email")}
            className={inputClass("email")}
            placeholder="you@company.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Company (optional)
          </label>
          <input
            id="company"
            type="text"
            value={values.company}
            onChange={handleChange("company")}
            className={inputClass("company")}
            placeholder="Organization"
          />
        </div>

        <div>
          <label htmlFor="projectType" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Project Type
          </label>
          <select
            id="projectType"
            value={values.projectType}
            onChange={handleChange("projectType")}
            className={inputClass("projectType")}
          >
            <option value="">Select a type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="budget" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
          Budget (optional)
        </label>
        <input
          id="budget"
          type="text"
          value={values.budget}
          onChange={handleChange("budget")}
          className={inputClass("budget")}
          placeholder="e.g. $2,000 – $5,000"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          className={inputClass("message")}
          placeholder="Tell me what you're working on."
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-bg)] transition-transform hover:scale-[1.01] disabled:opacity-60 md:w-auto"
      >
        {status === "submitting" && <Loader2 size={14} className="animate-spin" />}
        {status === "submitting" ? "Sending" : "Submit Message"}
      </button>
    </form>
  );
}
