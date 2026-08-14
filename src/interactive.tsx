"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useId, useState } from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}
export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultValue?: string;
}
export function Tabs({ items, defaultValue, className, ...props }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(defaultValue ?? items[0]?.id);
  return (
    <div className={cx("co-tabs", className)} {...props}>
      <div className="co-tabs__list" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            id={`${baseId}-${item.id}-tab`}
            type="button"
            role="tab"
            aria-selected={active === item.id}
            aria-controls={`${baseId}-${item.id}-panel`}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`${baseId}-${item.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-${item.id}-tab`}
          hidden={active !== item.id}
          className="co-tabs__panel"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}

export interface SwitchProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  label: ReactNode;
  description?: ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export function Switch({
  label,
  description,
  defaultChecked = false,
  checked,
  onCheckedChange,
  className,
  ...props
}: SwitchProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const value = checked ?? internal;
  const toggle = () => {
    const next = !value;
    if (checked === undefined) setInternal(next);
    onCheckedChange?.(next);
  };
  return (
    <div className={cx("co-switch-row", className)}>
      <div>
        <strong>{label}</strong>
        {description && <p>{description}</p>}
      </div>
      <button
        type="button"
        className="co-switch"
        role="switch"
        aria-checked={value}
        aria-label={typeof label === "string" ? label : undefined}
        onClick={toggle}
        {...props}
      >
        <span />
      </button>
    </div>
  );
}

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  defaultValue?: string;
}
export function Accordion({
  items,
  defaultValue,
  className,
  ...props
}: AccordionProps) {
  const [open, setOpen] = useState<string | undefined>(defaultValue);
  return (
    <div className={cx("co-accordion", className)} {...props}>
      {items.map((item) => {
        const expanded = open === item.id;
        return (
          <div className="co-accordion__item" key={item.id}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? undefined : item.id)}
            >
              <span>{item.title}</span>
              <i aria-hidden="true">＋</i>
            </button>
            <div className="co-accordion__content" hidden={!expanded}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
