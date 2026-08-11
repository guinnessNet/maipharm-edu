# 마이팜 교육자료 허브

책과 강의에 싣는 짧은 주소를 제공하는 정적 GitHub Pages 저장소다.

## 공개 경로

- 허브: `https://edu.maipharm.com/`
- 건조시럽 계산기 지침: `https://edu.maipharm.com/dry`
- 교육자료 샘플: `https://edu.maipharm.com/sample/`
- 고정 원본: `https://raw.githubusercontent.com/guinnessNet/dry-syrup-calculator/v1.2.0/START-HERE.md`

`sources/dry-v1.2.0.md`는 11제품 고정 원본의 복제본이다. 검증기는 원문 전체를 HTML로 이스케이프한 결과와 배포 파일을 직접 비교한다.

교육 결과물은 제작 지침과 분리해 `/sample/<주제>/<단계>/`에 올린다. 원본 선정부터 배포 후 해시 확인까지의 절차는 [교육자료 샘플 게시 운영 가이드](docs/SAMPLE-PUBLISHING.md)를 따른다.

## 빌드와 검증

```bash
npm run build
npm test
```

외부 패키지는 사용하지 않는다. 빌드는 원문을 HTML로 이스케이프해 `dry/index.html`에 넣는다. 자동 이동과 실행 스크립트는 사용하지 않는다.

## GitHub Pages와 DNS

- Pages source: `main` 브랜치의 `/`
- Custom domain: `edu.maipharm.com`
- DNS: `edu CNAME guinnessnet.github.io`

GitHub에서 도메인 소유권 TXT 레코드를 발급받아 DNS에 추가하고 인증서가 준비된 뒤 `Enforce HTTPS`를 켠다.

## 새 버전 갱신

1. `dry-syrup-calculator`에서 새 릴리스 태그를 발행한다.
2. 기존 출판물을 보존해야 하면 현재 `/dry` 내용을 버전 경로로 먼저 복사한다.
3. `sources/`에 새 `START-HERE.md`를 추가한다.
4. 빌드 스크립트의 파일명·버전·고정 원본 URL을 같은 태그로 바꾼다.
5. 검증 스크립트의 버전·필수 marker·고정 원본 URL을 새 원본에 맞춘다.
6. `npm run build && npm test`를 통과시킨다.
7. 배포 후 HTTP, Claude 웹 대화, 인쇄용 QR을 각각 확인한다.
