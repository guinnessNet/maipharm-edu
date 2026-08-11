# 교육자료 샘플 게시 운영 가이드

## 1. 문서 목적

강의·칼럼·책을 만드는 과정에서 나온 HTML 결과물을 `edu.maipharm.com/sample/`에 계속 축적한다. 이 문서는 어느 작업의 결과물을 선택하고, 어떤 경로에 배치하며, 배포 후 무엇을 확인해야 하는지 정한 운영 절차다.

## 2. 지침과 결과물의 경로를 분리한다

| 구분 | 역할 | 예시 |
| --- | --- | --- |
| 제작 지침 | Claude 등 제작 도구가 읽는 명세·자료 | `https://edu.maipharm.com/dry/` |
| 샘플 목록 | 사람이 교육 결과물을 찾는 입구 | `https://edu.maipharm.com/sample/` |
| 실행 샘플 | 브라우저에서 직접 여는 결과물 | `https://edu.maipharm.com/sample/dry/first/` |

제작 지침에서는 샘플 결과물로 연결하지 않는다. 사용자가 “`edu.maipharm.com/dry`의 지침을 확인하고 만들어줘”라고 입력했을 때 완성본을 베끼지 않고 지침과 재료만 읽게 하기 위해서다.

## 3. 공개 경로 규칙

새 결과물은 다음 규칙으로 올린다.

```text
/sample/<주제>/<단계>/
```

- `<주제>`: 영문 소문자와 하이픈으로 작성한다. 예: `dry`, `medication-timeline`
- `<단계>`: 결과물의 의미가 드러나는 짧은 영문을 쓴다.
  - `first`: 최소 요청으로 만든 첫 결과
  - `final`: 명세 보강과 검증을 마친 비교용 결과
  - 다른 단계가 꼭 필요하면 `revised`, `offline`처럼 의미를 명시한다.
- 독자에게 안내하는 URL에는 버전 쿼리 문자열을 붙이지 않는다.
- 각 경로는 폴더 안의 `index.html`로 제공한다.

현재 등록된 경로는 다음과 같다.

| 주제 | 단계 | 공개 URL |
| --- | --- | --- |
| 건조시럽 계산기 | 첫 결과 | `https://edu.maipharm.com/sample/dry/first/` |
| 건조시럽 계산기 | 개선·검증 결과 | `https://edu.maipharm.com/sample/dry/final/` |

## 4. 게시할 결과물을 고르는 기준

1. 해당 강의·칼럼 작업에서 실제로 생성된 HTML을 원본으로 삼는다.
2. 첫 결과는 실패를 과장하거나 다시 만들지 않고 당시 생성 파일을 그대로 사용한다.
3. 개선 결과는 계산값·출처·경고·오프라인 동작 등 해당 작업의 검증을 마친 파일을 사용한다.
4. 환자 식별정보, 대화 기록, API 키, 로컬 파일 경로 등 공개하면 안 되는 값이 없는지 먼저 검사한다.
5. 외부 API·글꼴·스크립트·이미지를 불러온다면 출처와 네트워크 의존성을 확인한다. 가능하면 단일 HTML로 독립 실행한다.
6. 게시 과정에서는 계산 로직이나 화면을 고치지 않는다. 수정이 필요하면 원래 작업에서 새 결과물을 만든 뒤 다시 선택한다.

## 5. 저장소에 올리는 순서

작업 저장소는 `/Users/maicto/Desktop/maipharm-edu`다.

### 5.1 배포 전 상태 확인

```bash
cd /Users/maicto/Desktop/maipharm-edu
git status --short
npm test
```

기존 변경이 있다면 소유자를 확인하고 샘플 게시와 무관한 파일은 건드리지 않는다.

### 5.2 원본 해시 기록

```bash
shasum -a 256 '/원본/경로/첫-결과.html'
shasum -a 256 '/원본/경로/개선-결과.html'
```

출력된 SHA-256은 복제 후와 운영 배포 후 대조한다.

### 5.3 샘플 경로 생성과 복제

건조시럽 계산기 예시:

```bash
mkdir -p sample/dry/first sample/dry/final
cp '/원본/경로/첫-결과.html' sample/dry/first/index.html
cp '/원본/경로/개선-결과.html' sample/dry/final/index.html
```

복제한 파일이 원본과 같은지 확인한다.

```bash
cmp '/원본/경로/첫-결과.html' sample/dry/first/index.html
cmp '/원본/경로/개선-결과.html' sample/dry/final/index.html
```

두 명령이 아무것도 출력하지 않고 종료 코드 0이면 동일하다.

### 5.4 샘플 목록 갱신

`sample/index.html`에 주제 설명과 실행 링크를 추가한다. 링크 문구에는 단계의 의미를 함께 적는다.

- 첫 결과: 최소 입력으로 생성한 결과
- 개선 결과: 지침과 검증을 반영한 결과

샘플 HTML 자체를 목록 페이지 안에 iframe으로 넣지 않는다. 각 결과물을 독립 페이지로 연다.

### 5.5 로컬 검증

```bash
npm test
git diff --check
git diff -- dry/
git status --short
```

- 저장소 검증이 통과해야 한다.
- 제작 지침을 바꾸는 작업이 아니라면 `dry/` diff는 없어야 한다.
- 원본과 배치 파일의 SHA-256이 같아야 한다.
- `sample/index.html`의 링크가 실제 폴더와 일치해야 한다.

### 5.6 커밋과 배포

커밋 메시지는 한글 한 줄로 작성한다.

```bash
git add sample
git commit -m '교육자료 샘플 추가'
git push origin main
```

GitHub Pages는 `main` 브랜치의 루트를 배포한다. 푸시 성공만으로 완료 처리하지 않고 운영 URL을 다시 확인한다.

## 6. 배포 후 확인

각 URL이 HTTPS 200을 반환하는지 확인한다.

```bash
for sample_url in \
  https://edu.maipharm.com/sample/ \
  https://edu.maipharm.com/sample/<주제>/<단계>/
do
  curl -L -o /dev/null -s -w '%{http_code} %{url_effective}\n' "$sample_url"
done
```

운영 파일의 해시도 원본과 대조한다.

```bash
curl -fsSL https://edu.maipharm.com/sample/<주제>/<단계>/ | shasum -a 256
```

마지막으로 실제 브라우저에서 다음을 확인한다.

- 목록에서 새 샘플을 찾을 수 있다.
- 모바일 화면에서도 링크와 계산기 화면을 사용할 수 있다.
- 새로고침 후에도 직접 URL로 열린다.
- 계산 버튼과 초기화 등 주요 상호작용이 작동한다.
- 의도하지 않은 외부 요청이나 개인정보 전송이 없다.

## 7. 현재 건조시럽 샘플의 기준 기록

| 구분 | 원본 파일 | SHA-256 |
| --- | --- | --- |
| 첫 결과 | `건조시럽_환산계수_계산기.html` | `30d57e95fe5d0c630c1ec69b146abb7ae588bd7d1bf6430bb087cdaae260b997` |
| 개선 결과 | `dry-syrup-calculator (3).html` | `8699593c0e059e17f027586c07e46786a05739ce055704831cc71432d149999c` |

배포 커밋은 `02fb21b 교육자료 샘플관 추가`다. 제작 지침 `/dry/`은 이 배포에서 변경하지 않았으며, 운영 파일 해시는 `559e5d26fd6b70d5622288d78e40b6a334e69f577e68e3aee8947b1da3d5fcac`로 유지됐다.

## 8. 수정과 철회

- 잘못된 결과물을 덮어쓰지 말고 먼저 원본 작업에서 올바른 HTML을 다시 만든다.
- 공개 URL을 유지해야 하면 같은 경로의 `index.html`을 검증된 새 원본으로 교체한다.
- 과거 결과도 교육적 의미가 있으면 `first`, `revised`, `final`처럼 별도 단계로 보존한다.
- 개인정보나 비밀값이 발견되면 해당 파일을 즉시 공개 경로에서 제거하고, Git 기록 정리가 필요한지 별도로 판단한다.
- 일반적인 오게시라면 해당 커밋을 `git revert`하여 복구 가능한 이력을 남긴다.

## 9. 게시 완료 체크리스트

- [ ] 실제 작업에서 나온 원본 파일을 골랐다.
- [ ] 첫 결과와 개선 결과의 의미를 과장하지 않았다.
- [ ] 개인정보·비밀값·불필요한 로컬 경로가 없다.
- [ ] 외부 자료와 네트워크 의존성을 확인했다.
- [ ] `/sample/<주제>/<단계>/index.html`에 배치했다.
- [ ] `sample/index.html`에 링크를 추가했다.
- [ ] 제작 지침 경로를 의도치 않게 바꾸지 않았다.
- [ ] 원본과 로컬 배치 파일의 해시가 같다.
- [ ] `npm test`와 `git diff --check`가 통과했다.
- [ ] 한글 커밋 메시지로 `main`에 푸시했다.
- [ ] 운영 HTTPS 200과 원격 파일 해시를 확인했다.
- [ ] 실제 브라우저에서 모바일 화면과 주요 동작을 확인했다.

