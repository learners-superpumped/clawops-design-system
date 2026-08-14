import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Badge,
  Button,
  Card,
  Field,
  FilterChip,
  Input,
  Pagination,
  SearchField,
  tokens,
} from "../src/index.js";

describe("design system primitives", () => {
  it("renders semantic elements with stable prefixed classes", () => {
    const markup = renderToStaticMarkup(
      createElement(
        Card,
        { tone: "strong", padding: 8 },
        createElement(Badge, { tone: "success", dot: true }, "연결 가능"),
        createElement(
          Field,
          { label: "이메일", htmlFor: "email", hint: "필수" },
          createElement(Input, { id: "email", type: "email" }),
        ),
        createElement(Button, { variant: "accent" }, "시작하기"),
      ),
    );

    expect(markup).toContain("co-card--strong");
    expect(markup).toContain("co-badge--success");
    expect(markup).toContain('for="email"');
    expect(markup).toContain("co-button--accent");
  });

  it("exports CSS variable references for charts and inline styles", () => {
    expect(tokens.color.primary).toBe("var(--co-color-primary)");
    expect(tokens.radius.lg).toBe("var(--co-radius-lg)");
  });

  it("renders accessible data navigation controls", () => {
    const markup = renderToStaticMarkup(
      createElement(
        "div",
        null,
        createElement(SearchField, { "aria-label": "통화 검색" }),
        createElement(FilterChip, { selected: true, count: 4 }, "완료"),
        createElement(Pagination, { page: 3, pageCount: 12 }),
      ),
    );

    expect(markup).toContain('type="search"');
    expect(markup).toContain('aria-pressed="true"');
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain('aria-label="이전 페이지"');
  });
});
