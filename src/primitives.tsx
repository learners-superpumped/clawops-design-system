import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

type Space = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20;
type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface ThemeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
export function Theme({ className, ...props }: ThemeProps) {
  return <div className={cx("co-theme", className)} {...props} />;
}

export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("co-container", className)} {...props} />;
}

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  gap?: Space;
}
export function Stack({ className, gap = 6, style, ...props }: LayoutProps) {
  return (
    <div
      className={cx("co-stack", className)}
      style={
        {
          "--co-stack-gap": `var(--co-space-${gap})`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
export function Inline({ className, gap = 3, style, ...props }: LayoutProps) {
  return (
    <div
      className={cx("co-inline", className)}
      style={
        {
          "--co-inline-gap": `var(--co-space-${gap})`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
export interface GridProps extends LayoutProps {
  columns?: 1 | 2 | 3 | 4;
}
export function Grid({
  className,
  columns = 3,
  gap = 6,
  style,
  ...props
}: GridProps) {
  return (
    <div
      className={cx("co-grid", className)}
      style={
        {
          "--co-grid-columns": columns,
          "--co-grid-gap": `var(--co-space-${gap})`,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyleProps;
function buttonClass(
  { variant = "primary", size = "md", fullWidth = false }: ButtonStyleProps,
  className?: string,
) {
  return cx(
    "co-button",
    `co-button--${variant}`,
    size !== "md" && `co-button--${size}`,
    fullWidth && "co-button--full",
    className,
  );
}
export function Button({
  className,
  variant,
  size,
  fullWidth,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, fullWidth }, className)}
      {...props}
    />
  );
}
export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleProps;
export function ButtonLink({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={buttonClass({ variant, size, fullWidth }, className)}
      {...props}
    />
  );
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  tone?: "glass" | "strong";
  flat?: boolean;
  padding?: Space;
}
export function Card({
  className,
  tone = "glass",
  flat,
  padding = 6,
  style,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cx(
        "co-card",
        tone === "strong" && "co-card--strong",
        flat && "co-card--flat",
        className,
      )}
      {...props}
    >
      <div
        className="co-card__body"
        style={
          {
            "--co-card-padding": `var(--co-space-${padding})`,
            ...style,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  tone?: "neutral" | "accent" | "success";
  dot?: boolean;
}
export function Badge({
  className,
  tone = "neutral",
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        "co-badge",
        tone !== "neutral" && `co-badge--${tone}`,
        className,
      )}
      {...props}
    >
      {dot && <i className="co-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  label: ReactNode;
  htmlFor: string;
  hint?: ReactNode;
  error?: ReactNode;
}
export function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={cx("co-field", className)} {...props}>
      <div className="co-field__header">
        <label className="co-label" htmlFor={htmlFor}>
          {label}
        </label>
        {hint && <span className="co-hint">{hint}</span>}
      </div>
      {children}
      {error && (
        <span className="co-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx("co-input", className)} {...props} />;
}
export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx("co-textarea", className)} {...props} />;
}

export interface SectionHeadingProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        "co-section-heading",
        align === "center" && "co-section-heading--center",
        className,
      )}
      {...props}
    >
      {eyebrow && <span className="co-eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export interface AmbientProps extends HTMLAttributes<HTMLDivElement> {
  color?: "blue" | "cyan" | "violet";
  size?: number;
}
export function Ambient({
  className,
  color = "blue",
  size = 520,
  style,
  ...props
}: AmbientProps) {
  return (
    <div
      aria-hidden="true"
      className={cx("co-ambient", `co-ambient--${color}`, className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}
