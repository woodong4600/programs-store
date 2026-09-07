/**
 * 사이트 설정
 */
const SITE_CONFIG = {
    siteName: "woodong's Programs",
    github: "https://github.com/woodong4600", // 본인의 GitHub 주소로 변경
    author: "woodong4600" // 본인 이름으로 변경
};

/**
 * 프로그램 데이터 목록
 * 프로그램을 추가하려면 아래 배열에 객체를 추가하세요.
 */
const programs = [
    {
        name: "PC Optimizer",
        description: "Windows용 컴퓨터 저장공간 및 성능 관리 프로그램입니다. 컴퓨터를 쉽게 관리하세요.",
        version: "v1.0.0",
        category: "유틸리티",
        icon: "🖥️", // SVG나 이미지 경로로 변경 가능
        page: "programs/PCOptimizer.html",
        download: "https://github.com/woodong4600/pc_optimizer/raw/refs/heads/main/PC%20Optimizer%20Setup.exe",
        os: "Windows"
    },
    {
        name: "FolderBuilder",
        description: "원하는 폴더 구조를 입력하면 폴더와 파일을 자동으로 생성해주는 간편한 Windows 프로그램입니다. 프로젝트 개발을 쉽게 하세요.",
        version: "v1.2.0",
        category: "개발",
        icon: "📂",
        page: "programs/FolderBuilder.html",
        download: "https://github.com/woodong4600/FolderBuilder/raw/refs/heads/main/FolderBuilderSetup.exe",
        os: "Windows"
    },
    {
        name: "clipvault",
        description: "Windows용 스마트 클립보드 기록 관리자입니다. 복사한 텍스트와 이미지를 쉽게 관리하세요.",
        version: "v0.9.5",
        category: "유틸리티",
        icon: "📋",
        page: "programs/clipvault.html",
        download: "https://github.com/woodong4600/Clipvault/raw/refs/heads/main/ClipvaultSetup.exe",
        os: "Windows"
    },
    {
        name: "AlwaysTop",
        description: "Windows용 항상 위에 표시되는 창 관리자입니다. 중요 창을 쉽게 관리하세요.",
        version: "v0.9.5",
        category: "유틸리티",
        icon: "📌",
        page: "programs/AlwaysTop.html",
        download: "https://github.com/woodong4600/AlwaysTop/raw/refs/heads/main/AlwaysTop_Setup_x64.exe",
        os: "Windows"
    }
];

// 사이트 정보 적용
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('site-name-nav').textContent = SITE_CONFIG.siteName;
    document.getElementById('site-author').textContent = SITE_CONFIG.author;
    document.getElementById('github-link').href = SITE_CONFIG.github;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    renderCategories();
    renderPrograms(programs);

    // 검색 이벤트
    const searchInput = document.getElementById('search-input');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterPrograms();
        });
    }
});

// 카테고리 버튼 생성
function renderCategories() {
    const filterGroup = document.getElementById('category-filters');
    if(!filterGroup) return;

    const categories = ['all', ...new Set(programs.map(p => p.category))];
    
    // 기본 '전체' 버튼 제외하고 나머지만 동적 추가 (이미 HTML에 '전체'가 있으므로)
    categories.forEach(cat => {
        if(cat === 'all') return;
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = cat;
        btn.dataset.category = cat;
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPrograms();
        };
        filterGroup.appendChild(btn);
    });

    // 전체 버튼 클릭 이벤트 연결
    const allBtn = filterGroup.querySelector('[data-category="all"]');
    allBtn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        filterPrograms();
    };
}

// 프로그램 카드 렌더링
function renderPrograms(data) {
    const grid = document.getElementById('program-grid');
    const noResults = document.getElementById('no-results');
    if(!grid) return;

    grid.innerHTML = '';
    
    if(data.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }

    data.forEach(prog => {
        const card = document.createElement('div');
        card.className = 'card fade-in';
        card.innerHTML = `
            <div class="card-icon">${prog.icon}</div>
            <h3 class="card-title">${prog.name}</h3>
            <p class="card-desc">${prog.description}</p>
            <div class="card-meta">
                <span>📦 ${prog.version}</span>
                <span>💻 ${prog.os}</span>
            </div>
            <div class="card-btns">
                <a href="${prog.page}" class="btn btn-outline">자세히 보기</a>
                <a href="${prog.download}" class="btn btn-primary">다운로드</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 검색 및 필터 통합 로직
function filterPrograms() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

    const filtered = programs.filter(prog => {
        const matchesSearch = prog.name.toLowerCase().includes(searchTerm) || 
                              prog.description.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || prog.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    renderPrograms(filtered);
}