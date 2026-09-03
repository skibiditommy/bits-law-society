document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mock Data ---
    const articles = [
        {
            id: 1,
            title: "The Constitutional Validity of Electoral Bonds",
            author: "ABC Sharma",
            category: "Constitutional Law",
            date: "Oct 15, 2025",
            preview: "An analysis of the Supreme Court's stance on anonymous political funding and its impact on democratic transparency.",
            content: "<p>The introduction of the Electoral Bond Scheme was pitched as a mechanism to cleanse the system of political funding. However, the veil of anonymity it provides raises fundamental questions regarding the voter's right to know under Article 19(1)(a) of the Constitution.</p><p>This paper examines the delicate balance between the privacy of the donor and the transparency expected in a vibrant democracy, arguing that opacity in political funding invariably skews the level playing field.</p>"
        },
        {
            id: 2,
            title: "Regulating AI: The Deepfake Dilemma",
            author: "DEF Patel",
            category: "Technology Law",
            date: "Nov 02, 2025",
            preview: "Examining the current legal frameworks in India to combat malicious deepfakes and generative AI misuse.",
            content: "<p>With the exponential rise in generative AI capabilities, the creation of highly realistic 'deepfakes' has outpaced legislative measures. Current frameworks under the Information Technology Act, 2000, particularly Sections 66E and 67, are often insufficient to address the nuance of synthetic media.</p><p>We propose a dedicated algorithmic accountability framework that places proactive responsibilities on platforms rather than solely relying on reactive takedown mechanisms.</p>"
        },
        {
            id: 3,
            title: "Corporate Governance Post-IL&FS",
            author: "GHI Desai",
            category: "Corporate Law",
            date: "Dec 10, 2025",
            preview: "A critical review of the systemic failures in statutory audits and the role of independent directors.",
            content: "<p>The IL&FS crisis served as a watershed moment for corporate governance in India, exposing the complacency of statutory auditors and the often-ceremonial role of independent directors.</p><p>This article reviews the subsequent amendments to the Companies Act, 2013, and SEBI regulations, assessing whether the regulatory tightening has genuinely fostered a culture of compliance or merely increased the box-ticking burden.</p>"
        },
        {
            id: 4,
            title: "Reformative vs. Retributive Justice",
            author: "JKL Reddy",
            category: "Criminal Law",
            date: "Jan 22, 2026",
            preview: "Evaluating the philosophical shifts in recent sentencing guidelines for non-violent offenders.",
            content: "<p>The Indian penal system has historically leaned towards retributive justice. However, recent jurisprudence and prison overcrowding have necessitated a paradigm shift.</p><p>By analyzing recent Supreme Court judgments on bail and parole, this piece argues for a structured integration of reformative practices, particularly for first-time and non-violent offenders, emphasizing rehabilitation over mere incarceration.</p>"
        },
        {
            id: 5,
            title: "The Global South in Space Law",
            author: "MNO Iyer",
            category: "International Law",
            date: "Feb 18, 2026",
            preview: "The equitable distribution of orbital slots and the impending crisis of space debris.",
            content: "<p>As commercial space exploration accelerates, the Outer Space Treaty of 1967 appears increasingly inadequate. The 'first-come, first-served' approach to orbital slots disproportionately favors technologically advanced nations.</p><p>This paper advocates for a more equitable framework that safeguards the interests of the Global South and mandates strict, universally enforceable protocols for space debris mitigation.</p>"
        },
        {
            id: 6,
            title: "Data Privacy and the Digital Personal Data Protection Act",
            author: "PQR Singh",
            category: "Technology Law",
            date: "Mar 05, 2026",
            preview: "A deep dive into the practical compliance challenges for tech startups under the new DPDP Act.",
            content: "<p>The enactment of the Digital Personal Data Protection (DPDP) Act marks a significant milestone. However, the compliance burden it places on early-stage startups could stifle innovation.</p><p>This analysis breaks down the key provisions—such as consent management and data principal rights—and outlines practical strategies for startups to achieve compliance without compromising agility.</p>"
        }
    ];


    // --- DOM Elements ---
    const articlesContainer = document.getElementById('articles-container');
    const searchInput = document.getElementById('article-search');
    const filterSelect = document.getElementById('article-filter');
    
    const modal = document.getElementById('article-modal');
    const modalClose = document.querySelector('.modal-close');

    // --- 1. Render Articles ---
    function renderArticles(filterText = '', filterCat = 'all') {
        articlesContainer.innerHTML = '';
        
        const filtered = articles.filter(article => {
            const matchesText = article.title.toLowerCase().includes(filterText.toLowerCase()) || 
                                article.author.toLowerCase().includes(filterText.toLowerCase());
            const matchesCat = filterCat === 'all' || article.category === filterCat;
            return matchesText && matchesCat;
        });

        if (filtered.length === 0) {
            articlesContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No publications found matching your criteria.</p>';
            return;
        }

        filtered.forEach(article => {
            const card = document.createElement('div');
            card.className = 'article-card';
            card.innerHTML = `
                <div class="article-meta">
                    <span class="article-category">${article.category}</span>
                    <span class="article-date">${article.date}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <div class="article-author">By ${article.author}</div>
                <p class="article-preview">${article.preview}</p>
                <div class="article-read-more">Read Full Text <i class="ri-arrow-right-line"></i></div>
            `;
            
            card.addEventListener('click', () => openModal(article));
            articlesContainer.appendChild(card);
        });
    }

    // --- 2. Article Search & Filter ---
    searchInput.addEventListener('input', (e) => renderArticles(e.target.value, filterSelect.value));
    filterSelect.addEventListener('change', (e) => renderArticles(searchInput.value, e.target.value));

    // --- 3. Modal Logic ---
    function openModal(article) {
        document.getElementById('modal-category').textContent = article.category;
        document.getElementById('modal-date').textContent = article.date;
        document.getElementById('modal-title').textContent = article.title;
        document.getElementById('modal-author').textContent = `By ${article.author}`;
        document.getElementById('modal-body').innerHTML = article.content;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- 4. Podcast Episode Switcher ---
    const podcastIframe = document.getElementById('main-podcast-iframe');
    const podcastTitle = document.getElementById('podcast-video-title');
    const podcastDesc = document.getElementById('podcast-video-desc');
    const episodeCards = document.querySelectorAll('.podcast-ep-card');

    episodeCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active from all, add to clicked
            episodeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const videoId = card.getAttribute('data-video-id');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');

            if (podcastIframe) {
                podcastIframe.src = `https://www.youtube.com/embed/${videoId}`;
            }
            if (podcastTitle) {
                podcastTitle.innerHTML = `<i class="ri-movie-line"></i> ${title}`;
            }
            if (podcastDesc) {
                podcastDesc.textContent = desc;
            }
        });
    });

    // --- Initialize ---
    renderArticles();
});
