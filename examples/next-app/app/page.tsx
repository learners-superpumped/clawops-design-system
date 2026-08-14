import type { ReactNode } from "react";

import {
  Accordion,
  Avatar,
  Badge,
  Button,
  ButtonLink,
  Callout,
  Card,
  Field,
  Grid,
  IconButton,
  Input,
  Progress,
  Pagination,
  SearchField,
  Separator,
  Skeleton,
  Spinner,
  Stack,
  Stat,
  Switch,
  Tabs,
  Textarea,
  Theme,
  Tooltip,
} from "@teamlearners/clawops-design-system";

import {
  CodeBlock,
  ComponentSearch,
  MobileNavigation,
  OperationsExplorer,
} from "./docs-client";

const navigation = [
  {
    title: "시작하기",
    items: [
      ["소개", "#introduction"],
      ["설치", "#installation"],
      ["디자인 원칙", "#principles"],
    ],
  },
  {
    title: "기초",
    items: [
      ["색상", "#colors"],
      ["타이포그래피", "#typography"],
      ["모션", "#motion"],
    ],
  },
  {
    title: "컴포넌트",
    items: [
      ["버튼", "#buttons"],
      ["입력", "#forms"],
      ["데이터 표시", "#data-display"],
      ["검색과 필터", "#data-navigation"],
      ["피드백", "#feedback"],
      ["인터랙션", "#interactive"],
    ],
  },
] as const;

function Logo() {
  return (
    <span className="docs-logo-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h11m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.8 8.3a4.2 4.2 0 1 1 8.4 0c0 4.6 1.8 5 1.8 5H4s1.8-.4 1.8-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.3 15.2a1.8 1.8 0 0 0 3.4 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m4.5 10.4 3.2 3.2 7.8-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="docs-section" id={id}>
      <header className="docs-section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      {children}
    </section>
  );
}

function Demo({
  title,
  description,
  children,
  code,
  className = "",
}: {
  title: string;
  description?: string;
  children: ReactNode;
  code?: string;
  className?: string;
}) {
  return (
    <div className={`component-demo ${className}`}>
      <div className="component-demo-heading">
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <Badge>React</Badge>
      </div>
      <div className="component-stage">{children}</div>
      {code && <CodeBlock code={code} compact />}
    </div>
  );
}

export default function Page() {
  return (
    <Theme className="docs-site">
      <header className="docs-topbar">
        <a className="docs-brand" href="#introduction">
          <Logo />
          <span>ClawOps</span>
          <i>Design System</i>
        </a>
        <nav aria-label="상단 메뉴">
          <a href="#components">컴포넌트</a>
          <a href="#colors">토큰</a>
          <a href="https://github.com/learners-superpumped/clawops-design-system">
            GitHub
          </a>
        </nav>
        <div className="docs-top-actions">
          <Badge tone="success" dot>
            v0.4.1
          </Badge>
          <MobileNavigation navigation={navigation} />
        </div>
      </header>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <ComponentSearch navigation={navigation} />
          {navigation.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <strong>{group.title}</strong>
              {group.items.map(([label, href]) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </nav>
          ))}
          <div className="docs-sidebar-card">
            <span>새로운 컴포넌트</span>
            <strong>필요한 패턴이 있나요?</strong>
            <a href="https://github.com/learners-superpumped/clawops-design-system/issues">
              요청 남기기 <ArrowIcon />
            </a>
          </div>
        </aside>

        <main className="docs-content">
          <section className="docs-hero" id="introduction">
            <div className="docs-hero-copy">
              <Badge tone="accent">React 18·19 · Next.js App Router</Badge>
              <h1>
                ClawOps의 제품 경험을
                <br />
                <span>하나의 언어로.</span>
              </h1>
              <p>
                전화 인프라부터 운영 대시보드까지, 빠르게 조합하고 일관되게
                확장하는 블루 글래스 디자인 시스템입니다.
              </p>
              <div className="docs-hero-actions">
                <ButtonLink href="#installation" variant="accent" size="lg">
                  시작하기 <ArrowIcon />
                </ButtonLink>
                <ButtonLink href="#components" variant="secondary" size="lg">
                  컴포넌트 둘러보기
                </ButtonLink>
              </div>
            </div>
            <div className="hero-showcase" aria-label="컴포넌트 미리보기">
              <div className="hero-orbit hero-orbit-one" />
              <div className="hero-orbit hero-orbit-two" />
              <div className="hero-floating hero-floating-status">
                <span>●</span> 통화 연결됨
              </div>
              <div className="hero-floating hero-floating-event">
                <i>webhook</i>
                <strong>call.completed</strong>
                <span>204</span>
              </div>
              <Card tone="strong" padding={8} className="hero-main-card">
                <div className="hero-card-top">
                  <Avatar name="AI" status="online" />
                  <div>
                    <strong>고객센터 상담원</strong>
                    <span>실시간 통화</span>
                  </div>
                  <IconButton label="알림">
                    <BellIcon />
                  </IconButton>
                </div>
                <Separator />
                <div className="hero-wave" aria-hidden="true">
                  {Array.from({ length: 22 }).map((_, index) => (
                    <i key={index} />
                  ))}
                </div>
                <div className="hero-transcript">
                  <span>AI</span>
                  <p>안녕하세요. 무엇을 도와드릴까요?</p>
                </div>
                <Progress value={68} label="처리 중" showValue />
              </Card>
            </div>
          </section>

          <section className="docs-metrics" aria-label="패키지 특징">
            <div>
              <strong>18+</strong>
              <span>기본 컴포넌트</span>
            </div>
            <div>
              <strong>36</strong>
              <span>시맨틱 토큰</span>
            </div>
            <div>
              <strong>0</strong>
              <span>스타일 런타임</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>타입스크립트</span>
            </div>
          </section>

          <Section
            id="installation"
            eyebrow="QUICK START"
            title="3줄로 바로 시작하세요."
            description="전역 스타일을 한 번 불러오고 필요한 컴포넌트만 가져옵니다."
          >
            <Tabs
              items={[
                {
                  id: "npm",
                  label: "npm",
                  content: (
                    <CodeBlock code="npm install git+https://github.com/learners-superpumped/clawops-design-system.git#v0.4.1" />
                  ),
                },
                {
                  id: "pnpm",
                  label: "pnpm",
                  content: (
                    <CodeBlock code="pnpm add git+https://github.com/learners-superpumped/clawops-design-system.git#v0.4.1" />
                  ),
                },
                {
                  id: "yarn",
                  label: "yarn",
                  content: (
                    <CodeBlock code="yarn add git+https://github.com/learners-superpumped/clawops-design-system.git#v0.4.1" />
                  ),
                },
              ]}
            />
            <CodeBlock
              code={`import "@teamlearners/clawops-design-system/styles.css";
import { Button, Card, Theme } from "@teamlearners/clawops-design-system";

export default function App() {
  return <Theme><Card><Button variant="accent">시작하기</Button></Card></Theme>;
}`}
            />
          </Section>

          <Section
            id="principles"
            eyebrow="PRINCIPLES"
            title="강한 기본값, 열린 조합."
            description="제품 화면은 달라도 사용자는 같은 ClawOps를 경험해야 합니다."
          >
            <div className="principle-grid">
              <article>
                <span>01</span>
                <div className="principle-icon">◫</div>
                <h3>조합 가능한 프리미티브</h3>
                <p>
                  비즈니스 로직 없이 레이아웃과 상호작용의 역할만 제공합니다.
                </p>
              </article>
              <article>
                <span>02</span>
                <div className="principle-icon">◌</div>
                <h3>토큰이 만드는 일관성</h3>
                <p>
                  색상, 간격, 곡률과 모션을 하나의 시맨틱 토큰으로 관리합니다.
                </p>
              </article>
              <article>
                <span>03</span>
                <div className="principle-icon">⌁</div>
                <h3>접근 가능한 모션</h3>
                <p>
                  상태 변화를 설명하는 모션만 사용하고 감소 설정을 존중합니다.
                </p>
              </article>
            </div>
          </Section>

          <Section
            id="colors"
            eyebrow="FOUNDATIONS"
            title="의미로 사용하는 색상."
            description="색상값이 아니라 역할을 선택하면 모든 제품에서 자연스럽게 같은 계층이 만들어집니다."
          >
            <div className="color-grid">
              {[
                ["Canvas", "#F5F7FB", "--co-color-canvas", "canvas"],
                ["Surface", "#FFFFFF", "--co-color-surface", "surface"],
                ["Ink", "#172033", "--co-color-ink", "ink"],
                ["Primary", "#3B6FF5", "--co-color-primary", "primary"],
                ["Success", "#36A765", "--co-color-success", "success"],
                ["Danger", "#B54747", "--co-color-danger", "danger"],
              ].map(([name, hex, token, style]) => (
                <div className="color-card" key={name}>
                  <i className={`swatch swatch-${style}`} />
                  <strong>{name}</strong>
                  <span>{hex}</span>
                  <code>{token}</code>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="typography"
            eyebrow="TYPOGRAPHY"
            title="한국어를 먼저 고려한 위계."
            description="Pretendard를 기본으로 긴 한국어 문장에서도 안정적인 줄바꿈과 밀도를 유지합니다."
          >
            <div className="type-specimen">
              <div>
                <span>Display · 64/1.04</span>
                <strong>
                  전화 인프라를
                  <br />더 단순하게.
                </strong>
              </div>
              <div>
                <span>Heading · 36/1.12</span>
                <h3>에이전트에 집중하세요.</h3>
              </div>
              <div>
                <span>Body · 16/1.72</span>
                <p>
                  전화번호, 음성 통화와 실시간 이벤트를 하나의 API로 연결합니다.
                  복잡한 인프라 없이 제품 경험을 완성하세요.
                </p>
              </div>
              <div>
                <span>Mono · 13/1.6</span>
                <code>call.completed · 204</code>
              </div>
            </div>
          </Section>

          <div id="components" />
          <Section
            id="buttons"
            eyebrow="COMPONENTS · ACTION"
            title="버튼과 액션."
            description="중요도, 크기와 상태가 달라도 같은 동작감을 공유합니다."
          >
            <Demo
              title="Variants"
              description="콘텐츠 계층에 맞는 네 가지 강조 수준"
              code={`<Button variant="primary">Primary</Button>
<Button variant="accent">Accent</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>`}
            >
              <div className="demo-row">
                <Button>Primary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </Demo>
            <div className="demo-two-column">
              <Demo title="Sizes">
                <div className="demo-row demo-align-end">
                  <Button size="sm">Small</Button>
                  <Button>Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </Demo>
              <Demo title="Icon buttons">
                <div className="demo-row">
                  <Tooltip content="알림 보기">
                    <IconButton label="알림">
                      <BellIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton label="완료">
                    <CheckIcon />
                  </IconButton>
                  <Button variant="secondary">
                    다음 <ArrowIcon />
                  </Button>
                </div>
              </Demo>
            </div>
          </Section>

          <Section
            id="forms"
            eyebrow="COMPONENTS · INPUT"
            title="입력과 설정."
            description="명확한 레이블, 도움말과 포커스 상태를 기본으로 제공합니다."
          >
            <div className="demo-two-column">
              <Demo title="Text fields">
                <Stack>
                  <Field label="이메일" htmlFor="catalog-email" hint="필수">
                    <Input id="catalog-email" placeholder="you@example.com" />
                  </Field>
                  <Field label="요청 내용" htmlFor="catalog-message">
                    <Textarea
                      id="catalog-message"
                      placeholder="필요한 기능을 알려주세요."
                    />
                  </Field>
                </Stack>
              </Demo>
              <Demo title="Settings">
                <Stack>
                  <Switch
                    label="통화 녹음"
                    description="연결된 모든 통화를 자동으로 녹음합니다."
                    defaultChecked
                  />
                  <Separator />
                  <Switch
                    label="실시간 전사"
                    description="대화 내용을 실시간 텍스트로 변환합니다."
                  />
                </Stack>
              </Demo>
            </div>
          </Section>

          <Section
            id="data-display"
            eyebrow="COMPONENTS · DATA"
            title="데이터를 읽기 쉽게."
            description="숫자, 진행 상태와 사용자 정보를 운영 화면에 맞는 밀도로 보여줍니다."
          >
            <Demo title="Operational overview" className="dashboard-demo">
              <div className="stat-grid">
                <Stat
                  label="오늘의 통화"
                  value="1,284"
                  change="12.4%"
                  trend="up"
                />
                <Stat label="평균 응답" value="1.2s" change="0.3s" trend="up" />
                <Stat label="완료율" value="98.7%" change="안정적" />
              </div>
              <Separator />
              <div className="operator-row">
                <div className="avatar-stack">
                  <Avatar name="CS" status="online" />
                  <Avatar name="AI" status="online" />
                  <Avatar name="OP" status="busy" />
                </div>
                <Progress
                  value={74}
                  label="배치 전화 · 740 / 1,000"
                  showValue
                />
              </div>
            </Demo>
            <div className="demo-two-column">
              <Demo title="Loading states">
                <Stack>
                  <div className="skeleton-profile">
                    <Skeleton circle width={44} height={44} />
                    <div>
                      <Skeleton width="45%" />
                      <Skeleton width="78%" height={12} />
                    </div>
                  </div>
                  <Skeleton height={84} />
                  <div className="demo-row">
                    <Spinner size="sm" />
                    <Spinner />
                    <Spinner size="lg" />
                  </div>
                </Stack>
              </Demo>
              <Demo title="Avatars & badges">
                <div className="demo-column">
                  <div className="demo-row">
                    <Avatar name="AI" size="sm" status="online" />
                    <Avatar name="CX" status="busy" />
                    <Avatar name="OP" size="lg" status="offline" />
                  </div>
                  <div className="demo-row">
                    <Badge>기본</Badge>
                    <Badge tone="accent">처리 중</Badge>
                    <Badge tone="success" dot>
                      연결됨
                    </Badge>
                  </div>
                </div>
              </Demo>
            </div>
          </Section>

          <Section
            id="data-navigation"
            eyebrow="COMPONENTS · DATA NAVIGATION"
            title="운영 데이터를 빠르게 탐색."
            description="검색, 상태 필터와 페이지 이동을 같은 흐름으로 조합해 많은 통화 기록에서도 필요한 항목을 바로 찾습니다."
          >
            <Demo title="통화 기록 탐색" className="operations-demo">
              <OperationsExplorer />
            </Demo>
            <div className="demo-two-column navigation-state-grid">
              <Demo title="검색 상태">
                <Stack>
                  <SearchField
                    label="로딩 중인 검색"
                    defaultValue="070 번호"
                    loading
                  />
                  <SearchField
                    label="비활성 검색"
                    placeholder="검색할 수 없습니다"
                    disabled
                  />
                </Stack>
              </Demo>
              <Demo title="페이지 크기와 비활성 상태">
                <Stack>
                  <Pagination page={4} pageCount={20} size="sm" />
                  <Pagination page={4} pageCount={20} compact disabled />
                </Stack>
              </Demo>
            </div>
            <CodeBlock
              compact
              code={`<SearchField label="통화 검색" shortcut="/" />
<FilterBar label="통화 상태 필터">
  <FilterChip selected count={18}>통화 중</FilterChip>
</FilterBar>
<Pagination page={2} pageCount={12} onPageChange={setPage} />`}
            />
          </Section>

          <Section
            id="feedback"
            eyebrow="COMPONENTS · FEEDBACK"
            title="상태를 분명하게."
            description="성공, 정보, 주의와 오류를 색상에만 의존하지 않고 전달합니다."
          >
            <Demo title="Callouts">
              <Stack>
                <Callout tone="info" title="새로운 버전이 있습니다." icon="i">
                  변경 내역을 확인하고 업데이트하세요.
                </Callout>
                <Callout
                  tone="success"
                  title="번호 발급이 완료됐습니다."
                  icon={<CheckIcon />}
                >
                  070-xxxx-8010을 바로 연결할 수 있습니다.
                </Callout>
                <Callout
                  tone="warning"
                  title="잔여 크레딧을 확인하세요."
                  icon="!"
                >
                  현재 사용량 기준 약 3일 후 소진됩니다.
                </Callout>
                <Callout
                  tone="danger"
                  title="웹훅 전송에 실패했습니다."
                  icon="×"
                >
                  엔드포인트가 500 응답을 반환했습니다.
                </Callout>
              </Stack>
            </Demo>
          </Section>

          <Section
            id="interactive"
            eyebrow="COMPONENTS · INTERACTION"
            title="자연스럽게 이어지는 상호작용."
            description="접근 가능한 상태와 키보드 의미를 유지하면서 짧고 명확하게 반응합니다."
          >
            <div className="demo-two-column">
              <Demo title="Tabs">
                <Tabs
                  items={[
                    {
                      id: "overview",
                      label: "개요",
                      content: (
                        <p className="tab-copy">
                          통화 상태와 주요 지표를 확인합니다.
                        </p>
                      ),
                    },
                    {
                      id: "events",
                      label: "이벤트",
                      content: (
                        <p className="tab-copy">
                          서명된 웹훅 이벤트를 실시간으로 확인합니다.
                        </p>
                      ),
                    },
                    {
                      id: "recordings",
                      label: "녹음",
                      content: (
                        <p className="tab-copy">
                          통화별 녹음과 전사를 함께 관리합니다.
                        </p>
                      ),
                    },
                  ]}
                />
              </Demo>
              <Demo title="Accordion">
                <Accordion
                  defaultValue="first"
                  items={[
                    {
                      id: "first",
                      title: "Next.js에서 사용할 수 있나요?",
                      content:
                        "App Router와 Pages Router 모두 지원하며 서버 컴포넌트에서도 기본 프리미티브를 사용할 수 있습니다.",
                    },
                    {
                      id: "second",
                      title: "Tailwind가 필요한가요?",
                      content:
                        "필요하지 않습니다. vanilla CSS와 시맨틱 토큰으로 동작하고 Tailwind 프로젝트에도 함께 사용할 수 있습니다.",
                    },
                    {
                      id: "third",
                      title: "제품별 테마가 가능한가요?",
                      content:
                        "Theme의 클래스에서 --co-* 토큰만 재정의하면 됩니다.",
                    },
                  ]}
                />
              </Demo>
            </div>
          </Section>

          <Section
            id="motion"
            eyebrow="FOUNDATIONS · MOTION"
            title="의미가 있는 움직임."
            description="주의를 빼앗는 장식보다 상태 변화와 공간 관계를 이해시키는 데 사용합니다."
          >
            <div className="motion-grid">
              <article>
                <div className="motion-stage">
                  <i className="motion-dot motion-dot-enter" />
                </div>
                <strong>Enter</strong>
                <span>240ms · ease</span>
                <p>새 콘텐츠가 현재 흐름에 들어옵니다.</p>
              </article>
              <article>
                <div className="motion-stage">
                  <i className="motion-switch">
                    <b />
                  </i>
                </div>
                <strong>State</strong>
                <span>160ms · spring</span>
                <p>같은 요소 안에서 상태가 바뀝니다.</p>
              </article>
              <article>
                <div className="motion-stage">
                  <i className="motion-orbit-dot" />
                </div>
                <strong>Ambient</strong>
                <span>15s · alternate</span>
                <p>제품의 생동감만 낮은 강도로 전달합니다.</p>
              </article>
            </div>
            <Callout tone="info" title="Reduced motion 기본 지원">
              사용자가 모션 감소를 설정하면 모든 애니메이션과 전환 시간을
              자동으로 최소화합니다.
            </Callout>
          </Section>

          <footer className="docs-footer">
            <div>
              <Logo />
              <strong>ClawOps Design System</strong>
            </div>
            <p>TeamLearners가 ClawOps 제품을 위해 만들고 관리합니다.</p>
            <a href="https://github.com/learners-superpumped/clawops-design-system">
              GitHub에서 보기 <ArrowIcon />
            </a>
          </footer>
        </main>

        <aside className="docs-toc">
          <strong>이 페이지에서</strong>
          <a href="#installation">설치</a>
          <a href="#principles">디자인 원칙</a>
          <a href="#colors">색상</a>
          <a href="#buttons">버튼</a>
          <a href="#forms">입력</a>
          <a href="#interactive">인터랙션</a>
          <a href="#motion">모션</a>
          <span />
          <a href="https://github.com/learners-superpumped/clawops-design-system/issues">
            문서 개선하기 ↗
          </a>
        </aside>
      </div>
    </Theme>
  );
}
