import { Slot, Slottable } from "@radix-ui/react-slot";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export interface NavigationTabsProps extends HTMLAttributes<HTMLElement> {
  label: string;
}
export function NavigationTabs({
  className,
  label,
  ...props
}: NavigationTabsProps) {
  return (
    <nav
      className={cx("co-navigation-tabs", className)}
      aria-label={label}
      {...props}
    />
  );
}

export interface NavigationTabProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  asChild?: boolean;
  icon?: ReactNode;
  count?: number;
}
export function NavigationTab({
  className,
  active,
  asChild,
  icon,
  count,
  children,
  ...props
}: NavigationTabProps) {
  const shared = {
    className: cx("co-navigation-tab", active && "is-active", className),
    "aria-current": active ? ("page" as const) : undefined,
    ...props,
  };
  if (asChild) {
    return (
      <Slot {...shared}>
        {icon && <span className="co-navigation-tab__icon">{icon}</span>}
        <Slottable>{children}</Slottable>
        {count !== undefined && (
          <span className="co-navigation-tab__count">{count}</span>
        )}
      </Slot>
    );
  }
  return (
    <a {...shared}>
      {icon && <span className="co-navigation-tab__icon">{icon}</span>}
      <span className="co-navigation-tab__label">{children}</span>
      {count !== undefined && (
        <span className="co-navigation-tab__count">{count}</span>
      )}
    </a>
  );
}
