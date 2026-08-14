# 변경 기록

## 0.7.0

- 제품 영역을 URL 단위로 탐색하는 반응형 `NavigationTabs`와 활성 상태·카운트 조합 추가
- 포커스 트랩, Escape 닫기, 포커스 복귀와 스크롤 잠금을 내장한 `Dialog` 조합 추가
- 위험 작업을 일관된 위계로 확인하는 `ConfirmDialog`와 `Badge` warning tone 추가
- 데스크톱·모바일·다크 모드와 모션 감소 환경을 고려한 블루 글래스 오버레이 스타일 추가

## 0.6.1

- `SectionCard`에 디자인 시스템 글래스 블러와 표면 그림자를 적용해 실제 블루 글래스 계층을 완성

## 0.6.0

- `PageHeader`, `SectionCard`, `ActionLink`, `DataTable`, `EmptyState`, `UsageMeterList` 대시보드 조합 컴포넌트 추가
- 사용량, 최근 활동, 빈 상태를 함께 보여주는 반응형 대시보드 예제 추가
- 표 스크롤 영역과 사용량 진행 상태에 접근성 시맨틱 적용

## 0.5.4

- Drawer 포털 내부에 독립적인 border-box 규칙을 적용해 가로 스크롤 제거
- 펼침 모션과 회전 Chevron을 포함한 접근 가능한 하위 메뉴 컴포넌트 추가
- 긴 메뉴 레이블 말줄임과 중첩 항목 폭 계산 안정화

## 0.5.3

- Material Drawer 내부를 구성하는 Navigation, Section, Label, Item, Icon, Text, Meta 추가
- 56px 항목, 22px 아이콘, 활성 pill, 44px 하위 항목과 키보드 포커스 제공

## 0.5.2

- 큰 메뉴 텍스트와 아이콘을 사용하는 Material Navigation Drawer 변형 추가
- 내비게이션 Drawer 폭을 320px, 닫기 터치 영역을 44px로 조정

## 0.5.1

- 플랫폼의 기존 업무 화면에 맞춰 Drawer를 플랫한 표면과 얇은 경계선으로 조정
- 내비게이션용 `sm` 폭을 280px로 맞추고 모서리·블러·강한 그림자 제거
- 헤더, 닫기 버튼, 본문과 푸터의 밀도를 기존 플랫폼 패널과 통일

## 0.5.0

- 좌·우·상·하 방향과 네 가지 크기를 지원하는 범용 `Drawer` 추가
- 포커스 트랩, Escape 닫기, 포커스 복귀, 스크롤 잠금 등 접근성 동작 내장
- 헤더·제목·설명·스크롤 본문·고정 푸터 조합과 글래스 스타일 제공
- Next.js 문서의 모바일 내비게이션을 실제 Drawer 사용 예제로 교체

## 0.4.1

- 문서의 컴포넌트 검색 버튼을 실제 명령 팔레트로 교체
- `⌘K`/`Ctrl+K`, 방향키, Enter와 Escape 키보드 탐색 지원
- 검색 결과 선택 시 해당 문서 섹션으로 이동
- 포털 렌더링으로 페이지 모션과 검색 팔레트의 stacking 충돌 제거

## 0.4.0

- SearchField에 clear, loading, shortcut hint, size, disabled, icon/content 슬롯과 국제화 레이블 추가
- FilterBar에 명시적 group semantics, FilterChip에 크기·disabled·focus 상태 추가
- Pagination에 SVG 아이콘, compact 모드, size, disabled, 국제화와 sibling/boundary 설정 추가
- 모든 데이터 탐색 컨트롤에 키보드 포커스와 모바일 44px 터치 영역 적용
- 중간 화면 툴바와 모바일 목록·필터·페이지네이션 레이아웃 개선
- 검색 및 페이지네이션 상태 예제와 경계값 테스트 추가

## 0.3.0

- 접근 가능한 `SearchField`, `FilterBar`, `FilterChip`, `Pagination` 추가
- 실패 상태를 위한 `Badge` danger tone 추가
- 실제 통화 목록을 검색·상태 필터·페이지 이동으로 탐색하는 문서 예제 추가
- 데이터 탐색 컴포넌트의 데스크톱·모바일 레이아웃 대응

## 0.2.0

- 인터랙티브 탭, 스위치와 아코디언 추가
- 아이콘 버튼, 콜아웃, 아바타, 진행률, 스켈레톤, 스피너, 구분선, 통계와 툴팁 추가
- 속도·이징 모션 토큰과 `prefers-reduced-motion` 대응 추가
- 탐색 사이드바, 실시간 예제, 코드 복사, 토큰과 모션 카탈로그를 갖춘 Next.js 문서 사이트 개편

## 0.1.0

- ClawOps 시맨틱 토큰과 기본 React 프리미티브 공개
