import { cn } from "@/lib/utils";

function Field({ label, error, hint, className, children, htmlFor }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <label htmlFor={htmlFor} className="block text-sm font-semibold">{label}</label>}
      {children}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

export function Input({ label, error, hint, className, id, ...props }) {
  const fid = id || props.name;
  return (
    <Field label={label} error={error} hint={hint} className={className} htmlFor={fid}>
      <input id={fid} aria-invalid={!!error} className={cn("input-base", error && "border-red-500")} {...props} />
    </Field>
  );
}

export function Textarea({ label, error, hint, className, id, rows = 3, ...props }) {
  const fid = id || props.name;
  return (
    <Field label={label} error={error} hint={hint} className={className} htmlFor={fid}>
      <textarea id={fid} rows={rows} aria-invalid={!!error} className={cn("input-base", error && "border-red-500")} {...props} />
    </Field>
  );
}

export function Select({ label, error, hint, className, id, children, ...props }) {
  const fid = id || props.name;
  return (
    <Field label={label} error={error} hint={hint} className={className} htmlFor={fid}>
      <select id={fid} aria-invalid={!!error} className={cn("input-base", error && "border-red-500")} {...props}>{children}</select>
    </Field>
  );
}
