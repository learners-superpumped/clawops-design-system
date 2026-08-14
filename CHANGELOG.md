# 변경 기록

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
