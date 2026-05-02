# 운영 노트 (Deployment & Operations)

본인 학술 포트폴리오 사이트의 배포·운영·SEO 관련 모든 정보를 한 문서에 정리했습니다.
새로 환경 셋업하거나 6개월 뒤에 다시 손볼 때 이 문서만 보면 됩니다.

---

## 1. 현재 라이브 상태

| 항목 | 값 |
| --- | --- |
| 사이트 URL | https://ccloser505.github.io |
| GitHub 레포 | https://github.com/ccloser505/ccloser505.github.io |
| 호스팅 | GitHub Pages (user page) |
| 빌드/배포 | GitHub Actions (`.github/workflows/deploy.yml`) |
| 배포 트리거 | `main` 브랜치 push |
| 평균 배포 시간 | 30초 ~ 1분 (build 17s + deploy 8s) |

### 라이브로 확인된 엔드포인트
- ✅ `/` (About)
- ✅ `/research/`, `/presentations/`, `/blog/`, `/cv/`
- ✅ `/blog/welcome/` (샘플 포스트)
- ✅ `/sitemap-index.xml` → `/sitemap-0.xml` (6 URL)
- ✅ `/robots.txt`
- ✅ Person JSON-LD (홈페이지 이외 모든 페이지에도 임베드됨)
- ✅ OpenGraph + Twitter Card (소셜 공유 미리보기)

---

## 2. 일상적인 작업 흐름

> 모든 변경은 코드 수정 → `git push` → 1~2분 후 자동 반영.

### 새 블로그 글 쓰기

1. `src/content/blog/내-글-슬러그.md` 파일 생성
2. frontmatter 작성:
   ```yaml
   ---
   title: "글 제목"
   description: "목록에 보일 1~2문장 요약"
   pubDate: 2026-05-10
   tags: ["research", "method"]   # 선택
   draft: false                    # true면 빌드에서 제외
   ---
   ```
3. 마크다운 본문 작성
4. `git add . && git commit -m "blog: <제목>" && git push`

### 출간 전 미리보기 (draft 모드)

```bash
npm run dev   # http://localhost:4321/ 에서 확인
```
`draft: true`인 글은 dev에서도 목록/페이지에 안 뜹니다. 미리 보고 싶으면 `false`로 바꿔서 로컬 확인 후 다시 `true`로 돌리거나, dev 서버용으로 임시 토글.

### CV PDF 갱신

1. PDF를 `public/files/cv-hwayeon-kim.pdf` 경로로 복사 (덮어쓰기)
2. `git add public/files/cv-hwayeon-kim.pdf && git commit -m "cv: update <month> <year>" && git push`

### 출판 / 발표 추가

| 추가할 내용 | 편집할 파일 |
| --- | --- |
| 신규 논문, working paper | `src/data/publications.ts` |
| 신규 발표, 초청 강연 | `src/data/presentations.ts` |
| 학력 / 소속 / 한 줄 소개 | `src/data/profile.ts` |
| 메뉴 항목 | `src/data/navigation.ts` |

데이터 파일 수정 → push만 하면 모든 페이지에 자동 반영됩니다.

### 사진 / 색상 / 폰트 변경

| 변경 항목 | 위치 |
| --- | --- |
| 프로필 이미지 | `public/images/profile.jpg` (덮어쓰기) |
| 색상 토큰 | `src/styles/global.css`의 `@theme {}` 블록 |
| 폰트 | `src/styles/global.css` 상단 `@import url(...)` 라인 |
| 메타 description 기본값 | `src/data/profile.ts`의 `tagline` |

---

## 3. SEO 셋업 현황

### 자동 처리되는 것
- **메타 태그** (`BaseLayout.astro`): `<title>`, `description`, `canonical`, OG 6종, Twitter Card 4종 — 모든 페이지에 자동 출력
- **사이트맵**: `@astrojs/sitemap`이 빌드 시 자동 생성 (새 페이지 추가하면 자동 포함)
- **JSON-LD Person schema**: 사이트 전체에 본인 정체성 임베드 (이름·김화연·소속·연구 분야·학력)
- **robots.txt**: 모든 크롤러 허용 + 사이트맵 위치 안내

### 도메인 산 뒤에 1회 작업
1. **Google Search Console** 등록 → 사이트맵 제출
   - https://search.google.com/search-console
   - 도메인 소유권 확인 (DNS TXT 레코드 추가)
   - "Sitemaps" 메뉴에서 `https://새도메인/sitemap-index.xml` 제출
2. **Bing Webmaster Tools** (선택) — Google Search Console에서 자동 import 가능
3. **소셜 미리보기 검증**:
   - https://www.opengraph.xyz/
   - https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

### 학술 SEO 핵심 인사이트
일반 블로그와 달리 학술 포트폴리오는 **검색 키워드 경쟁이 아니라 본인 이름 검색 시 본인이 노출되는 것**이 목표.
- 효과적: CV·이메일 서명·학회 슬라이드·Google Scholar 프로필에 URL 포함
- JSON-LD는 "Hwayeon Kim sociologist" 같은 검색에서 본인 카드를 강화
- 백링크는 학회 발표/공저자 사이트/소속 기관 페이지에서 자연스럽게 생김

---

## 4. 커스텀 도메인 마이그레이션

도메인 구입 후 (예: `hwayeon-kim.com`) 사이트는 그대로 두고 도메인만 갈아끼울 수 있습니다.

### 단계
1. **도메인 구입** — 추천: [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) (원가, 마진 없음)
2. **`astro.config.mjs`** 의 `site` 값 변경:
   ```js
   site: 'https://hwayeon-kim.com',
   base: '/',
   ```
3. **`public/CNAME`** 파일 생성 (한 줄, 도메인만):
   ```
   hwayeon-kim.com
   ```
4. **DNS 레코드** (도메인 등록 사이트에서):
   - Apex (`hwayeon-kim.com`):
     - A 레코드 4개:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
   - `www` 서브도메인:
     - CNAME → `ccloser505.github.io`
5. **GitHub 레포 Settings → Pages → Custom domain** 에 `hwayeon-kim.com` 입력
6. DNS 전파 후 (보통 5분 ~ 1시간) **Enforce HTTPS** 체크
7. `git push`로 변경사항 반영
8. `https://ccloser505.github.io`는 새 도메인으로 자동 301 리다이렉트됨 (SEO 손실 X)

### 그 후 1회 작업 (Search Console)
- 새 도메인을 Google Search Console에 추가
- 사이트맵 재제출
- 기존 `.github.io` 속성도 등록해두면 리다이렉트 추적 가능

---

## 5. 자주 쓰는 명령어

### 로컬 개발
```bash
npm run dev        # 개발 서버 (localhost:4321, HMR 지원)
npm run build      # 프로덕션 빌드 → dist/
npm run preview    # 빌드 결과 로컬 미리보기
```

### Git / 배포
```bash
git status                          # 변경사항 확인
git add . && git commit -m "..."    # 커밋
git push                            # 푸시 → 자동 배포 트리거

gh run list --limit 5               # 최근 워크플로 실행 목록
gh run watch                        # 진행 중인 워크플로 실시간 모니터링
gh run view <id> --log-failed       # 실패한 빌드 로그 확인
```

### GitHub Pages 상태 확인
```bash
gh api repos/ccloser505/ccloser505.github.io/pages
```

---

## 6. 트러블슈팅

### 빌드 실패: "Node.js v20.x is not supported by Astro"
- `.github/workflows/deploy.yml` 의 `withastro/action` 단계에 `node-version: 22` 명시 필요
- 이미 적용된 상태이므로 재발하지 않을 것

### 푸시했는데 사이트가 안 바뀜
1. `gh run list --limit 3` 으로 워크플로 상태 확인
2. 실패한 경우 `gh run view <id> --log-failed`
3. 성공인데 안 바뀌면: 브라우저 캐시 문제 → 강력 새로고침 (Cmd+Shift+R)
4. CDN 캐시는 1~2분 내 갱신됨

### 블로그 글 frontmatter 검증 실패
- `pubDate`는 `2026-05-10` 또는 `"2026-05-10"` 형식
- `tags`는 항상 배열 (`["one"]` 형태, 단일 태그도 마찬가지)
- `draft` 빠지면 자동으로 `false`
- 자세한 스키마: `src/content.config.ts`

### 이미지가 모바일에서 너무 큼 / 작음
- 사이드바 이미지 너비 조절: `src/components/Sidebar.astro` 의 `max-w-[260px]`
- 프로필 이미지 자체를 더 큰 해상도로 교체하는 게 가장 안전 (현재 736x948)

### CV PDF 다운로드 버튼이 404
- `public/files/cv-hwayeon-kim.pdf` 파일이 실제로 존재하는지 확인
- 파일명이 정확히 일치하는지 확인 (`src/data/profile.ts`의 `links.cv`)

---

## 7. 보안 / 권한

### GitHub
- 레포: **public** (학술 포트폴리오 코드는 공개해도 무방)
- 만약 비공개로 바꾸려면 GitHub Pages는 **Pro 계정** 필요 (월 $4)

### gh CLI 인증
- 토큰 스코프: `repo`, `workflow`, `gist`, `read:org`
- 이메일: ccloser505@gmail.com
- 인증 갱신: `gh auth refresh`

### 비밀번호 / 키 관리
- 현재 사이트는 **순수 정적**이라 API 키나 secret이 없음
- 만약 추후 폼/이메일 통합 시 GitHub Actions secrets 사용

---

## 8. 향후 확장 아이디어

| 기능 | 구현 비용 | 가치 |
| --- | --- | --- |
| 다크 모드 | 1~2시간 (Tailwind `dark:` 변형) | 중 |
| RSS 피드 | 30분 (`@astrojs/rss`) | 학술 블로그면 중상 |
| 태그별 블로그 필터 | 1~2시간 | 글 10개 이상이면 가치 있음 |
| 영문/한글 i18n | 4~8시간 | 한국 독자 비중 따라 |
| Plausible/GoatCounter analytics | 30분 | 트래픽 추적 원하면 |
| 댓글 (Giscus) | 1시간 | 토론 원하면 |
| 검색 (Pagefind) | 1~2시간 | 글 30개 이상이면 |

당장은 콘텐츠 채우는 게 우선. 위 기능들은 필요해질 때 하나씩 붙이면 됨.

---

## 9. 참고 링크

- Astro 공식 문서: https://docs.astro.build
- Tailwind CSS v4: https://tailwindcss.com/docs
- GitHub Pages: https://docs.github.com/pages
- Google Search Console: https://search.google.com/search-console
- Schema.org Person: https://schema.org/Person
- 디자인 영감 — Heesoo Jang: https://www.heesoojang.com
- 디자인 영감 — Min Lee: https://anthropologistminlee.com

---

_Last updated: 2026-05-03_
