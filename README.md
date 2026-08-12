# My Programs Website

내가 만든 Windows 프로그램을 소개하고 배포하는 개인 웹사이트입니다.

## 🚀 GitHub Pages 배포 방법

1.  **Repository 생성**: GitHub에서 새 저장소(예: `my-programs`)를 만듭니다.
2.  **업로드**: 제공된 모든 폴더와 파일을 해당 저장소에 업로드합니다.
3.  **설정**:
    *   저장소의 **Settings** 탭으로 이동합니다.
    *   왼쪽 메뉴에서 **Pages**를 클릭합니다.
    *   **Build and deployment** 섹션에서 `Deploy from a branch`를 선택합니다.
    *   Branch를 `main` (또는 `master`), 폴더를 `/ (root)`로 선택하고 **Save**를 누릅니다.
4.  **확인**: 약 1~2분 후 `https://사용자이름.github.io/저장소이름/` 주소로 사이트가 배포됩니다.

## 🛠 프로그램 추가 방법

`js/app.js` 파일 상단의 `programs` 배열에 새로운 객체를 추가하기만 하면 메인 페이지에 자동으로 카드가 생성됩니다.

```javascript
{
    name: "새 프로그램 이름",
    description: "짧은 설명",
    version: "v1.0.0",
    category: "유틸리티",
    icon: "🚀",
    page: "programs/new-program.html",
    download: "GitHub Release 다운로드 URL",
    os: "Windows"
}