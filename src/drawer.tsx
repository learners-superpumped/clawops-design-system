"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type DrawerSide = "left" | "right" | "top" | "bottom";
type DrawerSize = "sm" | "md" | "lg" | "full";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export const Drawer = Dialog.Root;
export const DrawerTrigger = Dialog.Trigger;
export const DrawerClose = Dialog.Close;

export type DrawerOverlayProps = ComponentPropsWithoutRef<
  typeof Dialog.Overlay
>;
export function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
  return (
    <Dialog.Overlay
      className={cx("co-drawer__overlay", className)}
      {...props}
    />
  );
}

export interface DrawerContentProps extends ComponentPropsWithoutRef<
  typeof Dialog.Content
> {
  side?: DrawerSide;
  size?: DrawerSize;
  variant?: "standard" | "navigation";
  showClose?: boolean;
  closeLabel?: string;
  overlay?: boolean;
  portalContainer?: HTMLElement | null;
}
export function DrawerContent({
  className,
  children,
  side = "right",
  size = "md",
  variant = "standard",
  showClose = true,
  closeLabel = "닫기",
  overlay = true,
  portalContainer,
  ...props
}: DrawerContentProps) {
  return (
    <Dialog.Portal container={portalContainer ?? undefined}>
      {overlay && <DrawerOverlay />}
      <Dialog.Content
        className={cx(
          "co-drawer__content",
          `co-drawer__content--${side}`,
          `co-drawer__content--${size}`,
          variant === "navigation" && "co-drawer__content--navigation",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <Dialog.Close className="co-drawer__close" aria-label={closeLabel}>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export type DrawerHeaderProps = ComponentPropsWithoutRef<"header">;
export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return <header className={cx("co-drawer__header", className)} {...props} />;
}

export type DrawerTitleProps = ComponentPropsWithoutRef<typeof Dialog.Title>;
export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <Dialog.Title className={cx("co-drawer__title", className)} {...props} />
  );
}

export type DrawerDescriptionProps = ComponentPropsWithoutRef<
  typeof Dialog.Description
>;
export function DrawerDescription({
  className,
  ...props
}: DrawerDescriptionProps) {
  return (
    <Dialog.Description
      className={cx("co-drawer__description", className)}
      {...props}
    />
  );
}

export interface DrawerBodyProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
}
export function DrawerBody({ className, ...props }: DrawerBodyProps) {
  return <div className={cx("co-drawer__body", className)} {...props} />;
}

export type DrawerFooterProps = ComponentPropsWithoutRef<"footer">;
export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return <footer className={cx("co-drawer__footer", className)} {...props} />;
}
