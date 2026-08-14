"use client";

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { useRef, useState } from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}
function DirectionIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={direction === "left" ? "m12.5 5-5 5 5 5" : "m7.5 5 5 5-5 5"} />
    </svg>
  );
}
function ClearIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m6 6 8 8M14 6l-8 8" />
    </svg>
  );
}

export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "defaultValue" | "onChange"
> {
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  clearLabel?: string;
  clearable?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  shortcut?: string;
  size?: "sm" | "md" | "lg";
  startIcon?: ReactNode;
  endContent?: ReactNode;
  containerClassName?: string;
}
export function SearchField({
  label,
  value,
  defaultValue = "",
  onValueChange,
  onClear,
  clearLabel = "검색어 지우기",
  clearable = true,
  loading = false,
  loadingLabel = "검색 중",
  shortcut,
  size = "md",
  startIcon,
  endContent,
  className,
  containerClassName,
  disabled,
  ...props
}: SearchFieldProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentValue = value ?? internalValue;
  const update = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };
  const clear = () => {
    update("");
    onClear?.();
    inputRef.current?.focus();
  };
  return (
    <div
      className={cx(
        "co-search-field",
        `co-search-field--${size}`,
        disabled && "is-disabled",
        loading && "is-loading",
        containerClassName,
      )}
      aria-busy={loading || undefined}
    >
      <span className="co-search-field__icon">
        {startIcon ?? <SearchIcon />}
      </span>
      <input
        ref={inputRef}
        type="search"
        aria-label={label}
        value={currentValue}
        onChange={(event) => update(event.target.value)}
        className={className}
        disabled={disabled}
        {...props}
      />
      <span className="co-search-field__end">
        {loading && (
          <span
            className="co-search-field__spinner"
            role="status"
            aria-label={loadingLabel}
          />
        )}
        {!loading && clearable && currentValue.length > 0 && (
          <button type="button" onClick={clear} aria-label={clearLabel}>
            <ClearIcon />
          </button>
        )}
        {!loading && currentValue.length === 0 && shortcut && (
          <kbd>{shortcut}</kbd>
        )}
        {!loading && endContent}
      </span>
    </div>
  );
}

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}
export function FilterBar({ label, className, ...props }: FilterBarProps) {
  return (
    <div
      className={cx("co-filter-bar", className)}
      role="group"
      aria-label={label}
      {...props}
    />
  );
}

export interface FilterChipProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-pressed"
> {
  selected?: boolean;
  count?: number;
  size?: "sm" | "md";
  leadingIcon?: ReactNode;
}
export function FilterChip({
  selected = false,
  count,
  size = "md",
  leadingIcon,
  className,
  children,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={cx(
        "co-filter-chip",
        `co-filter-chip--${size}`,
        selected && "is-selected",
        className,
      )}
      aria-pressed={selected}
      {...props}
    >
      {leadingIcon && (
        <span className="co-filter-chip__icon">{leadingIcon}</span>
      )}
      <span>{children}</span>
      {count !== undefined && (
        <span className="co-filter-chip__count">{count}</span>
      )}
    </button>
  );
}

type PaginationItem = number | "start-ellipsis" | "end-ellipsis";
function range(start: number, end: number) {
  return Array.from(
    { length: Math.max(end - start + 1, 0) },
    (_, index) => start + index,
  );
}
export function getPaginationItems(
  page: number,
  pageCount: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationItem[] {
  if (pageCount <= 0) return [];
  const safePage = Math.min(Math.max(page, 1), pageCount);
  const startPages = range(1, Math.min(boundaryCount, pageCount));
  const endPages = range(
    Math.max(pageCount - boundaryCount + 1, boundaryCount + 1),
    pageCount,
  );
  const siblingsStart = Math.max(
    Math.min(
      safePage - siblingCount,
      pageCount - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(safePage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : pageCount - 1,
  );
  return [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis" as const]
      : boundaryCount + 1 < pageCount - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < pageCount - boundaryCount - 1
      ? ["end-ellipsis" as const]
      : pageCount - boundaryCount > boundaryCount
        ? [pageCount - boundaryCount]
        : []),
    ...endPages,
  ];
}

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  getPageLabel?: (page: number) => string;
  siblingCount?: number;
  boundaryCount?: number;
  size?: "sm" | "md";
  compact?: boolean;
  disabled?: boolean;
}
export function Pagination({
  page,
  pageCount,
  onPageChange,
  label = "페이지 이동",
  previousLabel = "이전 페이지",
  nextLabel = "다음 페이지",
  getPageLabel = (value) => `${value}페이지`,
  siblingCount = 1,
  boundaryCount = 1,
  size = "md",
  compact = false,
  disabled = false,
  className,
  ...props
}: PaginationProps) {
  const safePage = pageCount > 0 ? Math.min(Math.max(page, 1), pageCount) : 0;
  const move = (next: number) => !disabled && onPageChange?.(next);
  const items = compact
    ? []
    : getPaginationItems(safePage, pageCount, siblingCount, boundaryCount);
  return (
    <nav
      className={cx(
        "co-pagination",
        `co-pagination--${size}`,
        compact && "co-pagination--compact",
        className,
      )}
      aria-label={label}
      aria-disabled={disabled || undefined}
      {...props}
    >
      <button
        type="button"
        className="co-pagination__direction"
        aria-label={previousLabel}
        disabled={disabled || safePage <= 1}
        onClick={() => move(safePage - 1)}
      >
        <DirectionIcon direction="left" />
      </button>
      {compact && (
        <span className="co-pagination__summary" aria-live="polite">
          <strong>{safePage}</strong> / {pageCount}
        </span>
      )}
      {items.map((item) =>
        typeof item !== "number" ? (
          <span
            className="co-pagination__ellipsis"
            aria-hidden="true"
            key={item}
          >
            ···
          </span>
        ) : (
          <button
            type="button"
            key={item}
            aria-label={getPageLabel(item)}
            aria-current={item === safePage ? "page" : undefined}
            disabled={disabled}
            onClick={() => move(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className="co-pagination__direction"
        aria-label={nextLabel}
        disabled={disabled || safePage === 0 || safePage >= pageCount}
        onClick={() => move(safePage + 1)}
      >
        <DirectionIcon direction="right" />
      </button>
    </nav>
  );
}
