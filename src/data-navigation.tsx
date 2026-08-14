"use client";

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";

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

export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  containerClassName?: string;
}

export function SearchField({
  className,
  containerClassName,
  ...props
}: SearchFieldProps) {
  return (
    <label className={cx("co-search-field", containerClassName)}>
      <SearchIcon />
      <input type="search" className={className} {...props} />
    </label>
  );
}

export function FilterBar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("co-filter-bar", className)} {...props} />;
}

export interface FilterChipProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-pressed"
> {
  selected?: boolean;
  count?: number;
  leadingIcon?: ReactNode;
}

export function FilterChip({
  selected = false,
  count,
  leadingIcon,
  className,
  children,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={cx("co-filter-chip", selected && "is-selected", className)}
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

function paginationItems(page: number, pageCount: number) {
  if (pageCount <= 7)
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  const values = new Set([1, pageCount, page - 1, page, page + 1]);
  const sorted = [...values]
    .filter((value) => value > 0 && value <= pageCount)
    .sort((a, b) => a - b);
  const items: Array<number | "ellipsis"> = [];
  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) items.push("ellipsis");
    items.push(value);
  });
  return items;
}

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  label?: string;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  label = "페이지 이동",
  className,
  ...props
}: PaginationProps) {
  const safePage = Math.min(Math.max(page, 1), Math.max(pageCount, 1));
  const move = (next: number) => onPageChange?.(next);
  return (
    <nav
      className={cx("co-pagination", className)}
      aria-label={label}
      {...props}
    >
      <button
        type="button"
        className="co-pagination__direction"
        aria-label="이전 페이지"
        disabled={safePage === 1}
        onClick={() => move(safePage - 1)}
      >
        ←
      </button>
      {paginationItems(safePage, pageCount).map((item, index) =>
        item === "ellipsis" ? (
          <span
            className="co-pagination__ellipsis"
            aria-hidden="true"
            key={`ellipsis-${index}`}
          >
            ···
          </span>
        ) : (
          <button
            type="button"
            key={item}
            aria-label={`${item}페이지`}
            aria-current={item === safePage ? "page" : undefined}
            onClick={() => move(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className="co-pagination__direction"
        aria-label="다음 페이지"
        disabled={safePage === pageCount || pageCount === 0}
        onClick={() => move(safePage + 1)}
      >
        →
      </button>
    </nav>
  );
}
