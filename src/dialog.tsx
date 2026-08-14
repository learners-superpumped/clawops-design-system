"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "./primitives.js";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export type DialogOverlayProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>;
export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={cx("co-dialog__overlay", className)}
      {...props}
    />
  );
}

export interface DialogContentProps extends ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> {
  size?: "sm" | "md" | "lg";
  showClose?: boolean;
  closeLabel?: string;
  portalContainer?: HTMLElement | null;
}
export function DialogContent({
  className,
  children,
  size = "md",
  showClose = true,
  closeLabel = "닫기",
  portalContainer,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal container={portalContainer ?? undefined}>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cx(
          "co-dialog__content",
          `co-dialog__content--${size}`,
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className="co-dialog__close"
            aria-label={closeLabel}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export type DialogHeaderProps = ComponentPropsWithoutRef<"header">;
export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <header className={cx("co-dialog__header", className)} {...props} />;
}

export type DialogTitleProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cx("co-dialog__title", className)}
      {...props}
    />
  );
}

export type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;
export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cx("co-dialog__description", className)}
      {...props}
    />
  );
}

export type DialogBodyProps = ComponentPropsWithoutRef<"div">;
export function DialogBody({ className, ...props }: DialogBodyProps) {
  return <div className={cx("co-dialog__body", className)} {...props} />;
}

export type DialogFooterProps = ComponentPropsWithoutRef<"footer">;
export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return <footer className={cx("co-dialog__footer", className)} {...props} />;
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  tone?: "primary" | "danger";
  loading?: boolean;
  onConfirm: () => void;
}
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
  confirmLabel = "확인",
  cancelLabel = "취소",
  tone = "primary",
  loading,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm" showClose={!loading}>
        <DialogHeader className="co-confirm-dialog__header">
          {icon && (
            <span
              className={cx(
                "co-confirm-dialog__icon",
                tone === "danger" && "co-confirm-dialog__icon--danger",
              )}
            >
              {icon}
            </span>
          )}
          <div>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogPrimitive.Close asChild>
            <Button variant="secondary" disabled={loading}>
              {cancelLabel}
            </Button>
          </DialogPrimitive.Close>
          <Button
            variant={tone === "danger" ? "primary" : "accent"}
            className={tone === "danger" ? "co-button--danger" : undefined}
            disabled={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
