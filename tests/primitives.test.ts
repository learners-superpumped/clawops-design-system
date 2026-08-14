import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Badge,
  Button,
  Card,
  DrawerNavChevron,
  DrawerNavIcon,
  DrawerNavItem,
  DrawerNavigation,
  DrawerNavSubmenu,
  DrawerNavText,
  Field,
  FilterChip,
  Input,
  Pagination,
  SearchField,
  getPaginationItems,
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
        createElement(SearchField, { label: "통화 검색", shortcut: "/" }),
        createElement(FilterChip, { selected: true, count: 4 }, "완료"),
        createElement(Pagination, { page: 3, pageCount: 12 }),
      ),
    );

    expect(markup).toContain('type="search"');
    expect(markup).toContain('aria-pressed="true"');
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain('aria-label="이전 페이지"');
  });

  it("keeps pagination ranges stable at boundaries", () => {
    expect(getPaginationItems(1, 20)).toEqual([
      1,
      2,
      3,
      4,
      5,
      "end-ellipsis",
      20,
    ]);
    expect(getPaginationItems(10, 20)).toEqual([
      1,
      "start-ellipsis",
      9,
      10,
      11,
      "end-ellipsis",
      20,
    ]);
    expect(getPaginationItems(20, 20)).toEqual([
      1,
      "start-ellipsis",
      16,
      17,
      18,
      19,
      20,
    ]);
    expect(getPaginationItems(1, 0)).toEqual([]);
  });

  it("supports compact and disabled pagination states", () => {
    const markup = renderToStaticMarkup(
      createElement(Pagination, {
        page: 2,
        pageCount: 8,
        compact: true,
        disabled: true,
      }),
    );
    expect(markup).toContain("co-pagination--compact");
    expect(markup).toContain('aria-disabled="true"');
    expect(markup).toContain("<strong>2</strong> / 8");
  });

  it("renders material drawer items and expandable submenus accessibly", () => {
    const markup = renderToStaticMarkup(
      createElement(
        DrawerNavigation,
        { "aria-label": "주 메뉴" },
        createElement(
          DrawerNavItem,
          { active: true },
          createElement(DrawerNavIcon, null, "01"),
          createElement(DrawerNavText, null, "대시보드"),
        ),
        createElement(
          DrawerNavItem,
          { "aria-expanded": true },
          createElement(DrawerNavText, null, "전화번호"),
          createElement(DrawerNavChevron, { open: true }),
        ),
        createElement(
          DrawerNavSubmenu,
          { open: true },
          createElement(DrawerNavItem, { nested: true }, "번호 목록"),
        ),
      ),
    );

    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain('aria-expanded="true"');
    expect(markup).toContain('data-state="open"');
    expect(markup).toContain("co-drawer-nav__item--nested");
    expect(markup).toContain("co-drawer-nav__chevron is-open");
  });
});
