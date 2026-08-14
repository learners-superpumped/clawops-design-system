import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  ActionLink,
  Badge,
  Button,
  Card,
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
  DrawerNavChevron,
  DrawerNavIcon,
  DrawerNavItem,
  DrawerNavigation,
  DrawerNavSubmenu,
  DrawerNavText,
  Dialog,
  DialogTrigger,
  EmptyState,
  Field,
  FilterChip,
  Input,
  Pagination,
  PageHeader,
  NavigationTab,
  NavigationTabs,
  SearchField,
  SectionCard,
  SectionCardBody,
  SectionCardDescription,
  SectionCardHeader,
  SectionCardHeading,
  SectionCardTitle,
  UsageMeterList,
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

  it("composes dashboard page headers and section cards", () => {
    const markup = renderToStaticMarkup(
      createElement(
        "main",
        null,
        createElement(PageHeader, {
          eyebrow: "운영",
          title: "대시보드",
          description: "오늘의 전화 운영 현황입니다.",
          actions: createElement(ActionLink, { href: "/calls" }, "전체 통화"),
        }),
        createElement(
          SectionCard,
          null,
          createElement(
            SectionCardHeader,
            null,
            createElement(
              SectionCardHeading,
              null,
              createElement(SectionCardTitle, null, "최근 통화"),
              createElement(SectionCardDescription, null, "최신 연결 상태"),
            ),
          ),
          createElement(SectionCardBody, null, "내용"),
        ),
      ),
    );

    expect(markup).toContain("co-page-header");
    expect(markup).toContain("co-action-link");
    expect(markup).toContain("co-section-card__title");
    expect(markup).toContain("오늘의 전화 운영 현황입니다.");
  });

  it("renders accessible dashboard tables and empty states", () => {
    const markup = renderToStaticMarkup(
      createElement(
        "div",
        null,
        createElement(
          DataTable,
          { label: "최근 통화", minWidth: 480 },
          createElement(
            DataTableHeader,
            null,
            createElement(
              DataTableRow,
              null,
              createElement(DataTableHead, null, "전화번호"),
            ),
          ),
          createElement(
            DataTableBody,
            null,
            createElement(
              DataTableRow,
              { selected: true },
              createElement(DataTableCell, null, "070-0000-0000"),
            ),
          ),
        ),
        createElement(EmptyState, {
          title: "통화 기록이 없습니다",
          description: "첫 통화를 연결해 보세요.",
          compact: true,
        }),
      ),
    );

    expect(markup).toContain('role="region"');
    expect(markup).toContain('aria-label="최근 통화"');
    expect(markup).toContain('aria-selected="true"');
    expect(markup).toContain("co-empty-state--compact");
  });

  it("renders grouped usage meters with progress semantics", () => {
    const markup = renderToStaticMarkup(
      createElement(UsageMeterList, {
        groups: [
          {
            key: "voice",
            label: "음성",
            items: [
              {
                key: "outbound",
                label: "발신",
                used: 80,
                limit: 100,
                unit: "분",
              },
              {
                key: "inbound",
                label: "수신",
                used: 20,
                limit: null,
                unit: "분",
              },
            ],
          },
        ],
      }),
    );

    expect(markup).toContain('role="progressbar"');
    expect(markup).toContain('aria-valuenow="80"');
    expect(markup).toContain("co-usage-meter__fill--warning");
    expect(markup).toContain("무제한");
  });

  it("renders URL navigation tabs with current-page semantics", () => {
    const markup = renderToStaticMarkup(
      createElement(
        NavigationTabs,
        { label: "전화번호 메뉴" },
        createElement(
          NavigationTab,
          { href: "/numbers", active: true, count: 2 },
          "내 번호",
        ),
        createElement(NavigationTab, { href: "/numbers/sip" }, "SIP 단말"),
      ),
    );

    expect(markup).toContain('aria-label="전화번호 메뉴"');
    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain("co-navigation-tab__count");
  });

  it("supports warning badges and accessible dialog triggers", () => {
    const markup = renderToStaticMarkup(
      createElement(
        "div",
        null,
        createElement(Badge, { tone: "warning", dot: true }, "준비 중"),
        createElement(
          Dialog,
          null,
          createElement(DialogTrigger, null, "번호 설정"),
        ),
      ),
    );

    expect(markup).toContain("co-badge--warning");
    expect(markup).toContain("준비 중");
    expect(markup).toContain("번호 설정");
  });
});
