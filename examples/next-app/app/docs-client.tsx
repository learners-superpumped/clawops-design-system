"use client";

import { useState } from "react";
import {
  Badge,
  FilterBar,
  FilterChip,
  Pagination,
  SearchField,
} from "@teamlearners/clawops-design-system";

const operationRows = [
  ["010-xxxx-4821", "고객 문의", "완료", "2분 14초", "방금 전"],
  ["070-xxxx-8010", "예약 확인", "통화 중", "1분 08초", "1분 전"],
  ["010-xxxx-1290", "배송 안내", "완료", "48초", "3분 전"],
  ["010-xxxx-7754", "결제 문의", "실패", "12초", "8분 전"],
  ["070-xxxx-2468", "대표번호", "완료", "3분 41초", "12분 전"],
  ["010-xxxx-6302", "상담 접수", "통화 중", "32초", "14분 전"],
] as const;

export function OperationsExplorer() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("전체");
  const [page, setPage] = useState(1);
  const filtered = operationRows.filter(
    ([number, subject, rowStatus]) =>
      (status === "전체" || rowStatus === status) &&
      `${number} ${subject}`.toLowerCase().includes(query.toLowerCase()),
  );
  const pageSize = 3;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const updateStatus = (next: string) => {
    setStatus(next);
    setPage(1);
  };
  return (
    <div className="operations-explorer">
      <div className="operations-toolbar">
        <SearchField
          label="통화 검색"
          value={query}
          onValueChange={(next) => {
            setQuery(next);
            setPage(1);
          }}
          placeholder="번호 또는 통화 목적 검색"
          shortcut="/"
        />
        <FilterBar label="통화 상태 필터">
          {["전체", "통화 중", "완료", "실패"].map((item) => (
            <FilterChip
              key={item}
              selected={status === item}
              count={
                item === "전체"
                  ? operationRows.length
                  : operationRows.filter((row) => row[2] === item).length
              }
              onClick={() => updateStatus(item)}
            >
              {item}
            </FilterChip>
          ))}
        </FilterBar>
      </div>
      <div className="operations-list" role="table" aria-label="최근 통화">
        <div className="operations-list-head" role="row">
          <span role="columnheader">전화번호</span>
          <span role="columnheader">통화 목적</span>
          <span role="columnheader">상태</span>
          <span role="columnheader">통화 시간</span>
          <span role="columnheader">시각</span>
        </div>
        {visible.map(([number, subject, rowStatus, duration, time]) => (
          <div
            className="operations-list-row"
            role="row"
            key={`${number}-${subject}`}
          >
            <strong role="cell">{number}</strong>
            <span role="cell">{subject}</span>
            <span role="cell">
              <Badge
                tone={
                  rowStatus === "완료"
                    ? "success"
                    : rowStatus === "통화 중"
                      ? "accent"
                      : "danger"
                }
                dot
              >
                {rowStatus}
              </Badge>
            </span>
            <span role="cell">{duration}</span>
            <span role="cell">{time}</span>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="operations-empty">조건에 맞는 통화가 없습니다.</div>
        )}
      </div>
      <div className="operations-footer">
        <span>총 {filtered.length}건</span>
        <Pagination
          className="operations-pagination-desktop"
          page={Math.min(page, pageCount)}
          pageCount={pageCount}
          onPageChange={setPage}
        />
        <Pagination
          className="operations-pagination-mobile"
          page={Math.min(page, pageCount)}
          pageCount={pageCount}
          onPageChange={setPage}
          compact
        />
      </div>
    </div>
  );
}

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
