import {
  Ambient,
  Badge,
  Button,
  ButtonLink,
  Card,
  Container,
  Field,
  Grid,
  Input,
  SectionHeading,
  Stack,
  Theme,
} from "@teamlearners/clawops-design-system";

export default function Page() {
  return (
    <Theme className="preview">
      <Ambient className="preview-ambient" size={640} />
      <Container className="preview-container">
        <SectionHeading
          eyebrow="ClawOps Design System"
          title="모든 제품에서 같은 경험을 만드세요."
          description="토큰과 React 컴포넌트를 공유하면서 제품별 정보 구조는 자유롭게 구성할 수 있습니다."
        />

        <Grid columns={2} gap={8}>
          <Card tone="strong" padding={8}>
            <Stack gap={6}>
              <Badge tone="success" dot>
                패키지 연결됨
              </Badge>
              <Field label="이메일" htmlFor="preview-email" hint="필수">
                <Input
                  id="preview-email"
                  type="email"
                  placeholder="you@example.com"
                />
              </Field>
              <Button variant="accent" size="lg" fullWidth>
                무료로 시작하기
              </Button>
            </Stack>
          </Card>

          <Card padding={8}>
            <Stack gap={6}>
              <Badge tone="accent">Next.js App Router</Badge>
              <h2 className="preview-card-title">조합 가능한 기본 컴포넌트</h2>
              <p className="preview-card-copy">
                제품 전용 로직 없이 레이아웃, 입력, 버튼과 표면 스타일만
                제공합니다.
              </p>
              <ButtonLink href="https://claw-ops.com" variant="secondary">
                ClawOps 보기
              </ButtonLink>
            </Stack>
          </Card>
        </Grid>
      </Container>
    </Theme>
  );
}
