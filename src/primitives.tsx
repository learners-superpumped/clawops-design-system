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
  tone?: "neutral" | "accent" | "success" | "danger";
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

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: "sm" | "md" | "lg";
}
export function IconButton({
  label,
  size = "md",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cx("co-icon-button", `co-icon-button--${size}`, className)}
      {...props}
    />
  );
}

export interface CalloutProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: ReactNode;
  tone?: "info" | "success" | "warning" | "danger";
  icon?: ReactNode;
}
export function Callout({
  title,
  tone = "info",
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cx("co-callout", `co-callout--${tone}`, className)}
      role={tone === "danger" ? "alert" : "status"}
      {...props}
    >
      {icon && <span className="co-callout__icon">{icon}</span>}
      <div>
        {title && <strong className="co-callout__title">{title}</strong>}
        <div className="co-callout__content">{children}</div>
      </div>
    </div>
  );
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "busy" | "offline";
}
export function Avatar({
  name,
  src,
  size = "md",
  status,
  className,
  ...props
}: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={cx("co-avatar", `co-avatar--${size}`, className)}
      title={name}
      {...props}
    >
      {src ? <img src={src} alt={name} /> : <span>{initials}</span>}
      {status && (
        <i
          className={cx("co-avatar__status", `co-avatar__status--${status}`)}
          aria-label={status}
        />
      )}
    </span>
  );
}

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: ReactNode;
  showValue?: boolean;
}
export function Progress({
  value,
  max = 100,
  label,
  showValue,
  className,
  ...props
}: ProgressProps) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cx("co-progress", className)} {...props}>
      {(label || showValue) && (
        <div className="co-progress__header">
          <span>{label}</span>
          {showValue && <strong>{Math.round(percent)}%</strong>}
        </div>
      )}
      <div
        className="co-progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}
export function Skeleton({
  width = "100%",
  height = 16,
  circle,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={cx("co-skeleton", circle && "co-skeleton--circle", className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: "sm" | "md" | "lg";
}
export function Spinner({
  label = "불러오는 중",
  size = "md",
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      className={cx("co-spinner", `co-spinner--${size}`, className)}
      role="status"
      aria-label={label}
      {...props}
    />
  );
}

export function Separator({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cx("co-separator", className)} {...props} />;
}

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  change?: ReactNode;
  trend?: "up" | "down" | "neutral";
}
export function Stat({
  label,
  value,
  change,
  trend = "neutral",
  className,
  ...props
}: StatProps) {
  return (
    <div className={cx("co-stat", className)} {...props}>
      <span className="co-stat__label">{label}</span>
      <strong className="co-stat__value">{value}</strong>
      {change && (
        <span className={cx("co-stat__change", `co-stat__change--${trend}`)}>
          {change}
        </span>
      )}
    </div>
  );
}

export interface TooltipProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "content"
> {
  content: ReactNode;
}
export function Tooltip({
  content,
  className,
  children,
  ...props
}: TooltipProps) {
  return (
    <span className={cx("co-tooltip", className)} {...props}>
      {children}
      <span className="co-tooltip__content" role="tooltip">
        {content}
      </span>
    </span>
  );
}
