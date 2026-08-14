"use client";

import { useState } from "react";

export function CodeBlock({
  code,
  compact = false,
}: {
  code: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className={`docs-code ${compact ? "docs-code-compact" : ""}`}>
      <div className="docs-code-bar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <button type="button" onClick={copy}>
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function MobileNavigation({
  navigation,
}: {
  navigation: ReadonlyArray<{
    title: string;
    items: ReadonlyArray<readonly [string, string]>;
  }>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mobile-navigation">
      <button
        type="button"
        aria-label="문서 메뉴"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <i />
        <i />
      </button>
      {open && (
        <div className="mobile-navigation-panel">
          {navigation.map((group) => (
            <nav key={group.title}>
              <strong>{group.title}</strong>
              {group.items.map(([label, href]) => (
                <a href={href} key={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
            </nav>
          ))}
        </div>
      )}
    </div>
  );
}
