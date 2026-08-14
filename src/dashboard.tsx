import { Slot } from "@radix-ui/react-slot";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface PageHeaderProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
}
export function PageHeader({
  className,
  title,
  description,
  eyebrow,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cx("co-page-header", className)} {...props}>
      <div className="co-page-header__copy">
        {eyebrow && <span className="co-page-header__eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="co-page-header__actions">{actions}</div>}
    </header>
  );
}

export type SectionCardProps = HTMLAttributes<HTMLElement>;
export function SectionCard({ className, ...props }: SectionCardProps) {
  return <section className={cx("co-section-card", className)} {...props} />;
}

export type SectionCardHeaderProps = HTMLAttributes<HTMLElement>;
export function SectionCardHeader({
  className,
  ...props
}: SectionCardHeaderProps) {
  return (
    <header className={cx("co-section-card__header", className)} {...props} />
  );
}

export type SectionCardHeadingProps = HTMLAttributes<HTMLDivElement>;
export function SectionCardHeading({
  className,
  ...props
}: SectionCardHeadingProps) {
  return (
    <div className={cx("co-section-card__heading", className)} {...props} />
  );
}

export type SectionCardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export function SectionCardTitle({
  className,
  ...props
}: SectionCardTitleProps) {
  return <h2 className={cx("co-section-card__title", className)} {...props} />;
}

export type SectionCardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export function SectionCardDescription({
  className,
  ...props
}: SectionCardDescriptionProps) {
  return (
    <p className={cx("co-section-card__description", className)} {...props} />
  );
}

export type SectionCardBodyProps = HTMLAttributes<HTMLDivElement>;
export function SectionCardBody({ className, ...props }: SectionCardBodyProps) {
  return <div className={cx("co-section-card__body", className)} {...props} />;
}

export interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  icon?: ReactNode;
}
export function ActionLink({
  className,
  asChild,
  icon,
  children,
  ...props
}: ActionLinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp className={cx("co-action-link", className)} {...props}>
      {children}
      {icon ?? (
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 10h11m-4-4 4 4-4 4" />
        </svg>
      )}
    </Comp>
  );
}

export interface DataTableProps extends TableHTMLAttributes<HTMLTableElement> {
  minWidth?: number | string;
  label?: string;
}
export function DataTable({
  className,
  style,
  minWidth = 640,
  label,
  ...props
}: DataTableProps) {
  return (
    <div
      className="co-data-table__scroll"
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      <table
        className={cx("co-data-table", className)}
        style={{ minWidth, ...style }}
        {...props}
      />
    </div>
  );
}

export type DataTableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export function DataTableHeader({ className, ...props }: DataTableHeaderProps) {
  return <thead className={cx("co-data-table__head", className)} {...props} />;
}

export type DataTableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export function DataTableBody({ className, ...props }: DataTableBodyProps) {
  return <tbody className={cx("co-data-table__body", className)} {...props} />;
}

export interface DataTableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  interactive?: boolean;
  selected?: boolean;
}
export function DataTableRow({
  className,
  interactive,
  selected,
  ...props
}: DataTableRowProps) {
  return (
    <tr
      className={cx(
        "co-data-table__row",
        interactive && "is-interactive",
        selected && "is-selected",
        className,
      )}
      aria-selected={selected || undefined}
      {...props}
    />
  );
}

export type DataTableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
export function DataTableHead({ className, ...props }: DataTableHeadProps) {
  return <th className={cx("co-data-table__th", className)} {...props} />;
}

export type DataTableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
export function DataTableCell({ className, ...props }: DataTableCellProps) {
  return <td className={cx("co-data-table__td", className)} {...props} />;
}

export interface EmptyStateProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
}
export function EmptyState({
  className,
  icon,
  title,
  description,
  actions,
  compact,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cx(
        "co-empty-state",
        compact && "co-empty-state--compact",
        className,
      )}
      {...props}
    >
      {icon && <span className="co-empty-state__icon">{icon}</span>}
      <div className="co-empty-state__copy">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="co-empty-state__actions">{actions}</div>}
    </div>
  );
}

export type UsageMeterTone = "primary" | "success" | "warning" | "danger";
export interface UsageMeterItem {
  key: string;
  label: ReactNode;
  used: number;
  limit?: number | null;
  unit?: ReactNode;
  hint?: ReactNode;
  tone?: UsageMeterTone;
}
export interface UsageMeterGroup {
  key: string;
  label: ReactNode;
  items: UsageMeterItem[];
}
export interface UsageMeterListProps extends HTMLAttributes<HTMLDivElement> {
  groups: UsageMeterGroup[];
  unlimitedLabel?: ReactNode;
}
export function UsageMeterList({
  className,
  groups,
  unlimitedLabel = "무제한",
  ...props
}: UsageMeterListProps) {
  return (
    <div className={cx("co-usage-list", className)} {...props}>
      {groups.map((group) => (
        <section className="co-usage-list__group" key={group.key}>
          <h3>{group.label}</h3>
          <div>
            {group.items.map((item) => {
              const unlimited = item.limit == null;
              const ratio = unlimited
                ? 0
                : Math.min(
                    100,
                    Math.max(
                      0,
                      (item.used / Math.max(item.limit ?? 1, 1)) * 100,
                    ),
                  );
              const tone =
                item.tone ??
                (ratio >= 100 ? "danger" : ratio >= 80 ? "warning" : "primary");
              return (
                <div className="co-usage-meter" key={item.key}>
                  <div className="co-usage-meter__topline">
                    <span>{item.label}</span>
                    <strong>
                      {item.used.toLocaleString()}
                      {item.unit}
                      <small>
                        {unlimited ? (
                          <> · {unlimitedLabel}</>
                        ) : (
                          ` / ${item.limit?.toLocaleString()}${item.unit ?? ""}`
                        )}
                      </small>
                    </strong>
                  </div>
                  {!unlimited && (
                    <div
                      className="co-usage-meter__track"
                      role="progressbar"
                      aria-label={
                        typeof item.label === "string" ? item.label : undefined
                      }
                      aria-valuemin={0}
                      aria-valuemax={item.limit ?? 0}
                      aria-valuenow={Math.min(
                        item.used,
                        item.limit ?? item.used,
                      )}
                    >
                      <i
                        className={`co-usage-meter__fill co-usage-meter__fill--${tone}`}
                        style={{ width: `${ratio}%` }}
                      />
                    </div>
                  )}
                  {item.hint && <p>{item.hint}</p>}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
