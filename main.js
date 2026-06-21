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

    const mockIssues = [
        { id: "ISS-2026-001", category: "Academics", status: "Under Review", desc: "Clash between elective mid-semester examinations for third-year students." },
        { id: "ISS-2026-002", category: "Infrastructure", status: "Resolved", desc: "Inadequate lighting in the pathway between the Tandoor and the Campus." },
        { id: "ISS-2026-003", category: "Hostel", status: "Under Review", desc: "Broken toilets in the old hostels." },
        { id: "ISS-2026-004", category: "Administration", status: "Resolved", desc: "Bro Ts Mess food tastes ass." }
    ];

    // --- DOM Elements ---
    const articlesContainer = document.getElementById('articles-container');
    const searchInput = document.getElementById('article-search');
    const filterSelect = document.getElementById('article-filter');
    
    const modal = document.getElementById('article-modal');
    const modalClose = document.querySelector('.modal-close');
    
    const concernForm = document.getElementById('concern-form');
    const formNotification = document.getElementById('form-notification');
    
    const issuesContainer = document.getElementById('issues-container');
    const adminActivityList = document.getElementById('admin-activity-list');

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
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
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

    // --- 4. Render Public Dashboard Issues ---
    function renderPublicIssues() {
        issuesContainer.innerHTML = '';
        mockIssues.forEach(issue => {
            const statusClass = issue.status === 'Resolved' ? 'status-resolved' : 'status-review';
            const card = document.createElement('div');
            card.className = 'issue-card';
            card.innerHTML = `
                <div class="issue-header">
                    <span class="issue-tag">${issue.category}</span>
                    <span class="issue-status ${statusClass}">${issue.status}</span>
                </div>
                <div class="issue-id">${issue.id}</div>
                <p class="issue-desc">${issue.desc}</p>
            `;
            issuesContainer.appendChild(card);
        });
    }

    // --- 5. Handle Form Submission & Local Storage ---
    concernForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById('name').value;
        const idVal = document.getElementById('student-id').value;
        const catVal = document.getElementById('category').value;
        const descVal = document.getElementById('description').value;
        const anonVal = document.getElementById('anonymous').checked;

        const newSubmission = {
            id: `SUB-${Date.now().toString().slice(-6)}`,
            name: anonVal ? 'Anonymous' : (nameVal || 'Student'),
            studentId: anonVal ? 'Hidden' : idVal,
            category: catVal,
            description: descVal,
            timestamp: new Date().toLocaleString()
        };

        // Save to local storage
        let submissions = JSON.parse(localStorage.getItem('lawSocietySubmissions') || '[]');
        submissions.unshift(newSubmission); // Add to top
        localStorage.setItem('lawSocietySubmissions', JSON.stringify(submissions));

        // Show Notification
        formNotification.textContent = `Success: Concern ${newSubmission.id} registered in ledger.`;
        formNotification.className = 'notification success';
        
        concernForm.reset();
        
        // Update Admin Panel
        renderAdminActivity();
        updateAdminCharts();

        setTimeout(() => {
            formNotification.className = 'notification hidden';
        }, 5000);
    });

    // --- 6. Admin Panel Setup ---
    let categoryChartInstance = null;
    let timelineChartInstance = null;

    function renderAdminActivity() {
        adminActivityList.innerHTML = '';
        const submissions = JSON.parse(localStorage.getItem('lawSocietySubmissions') || '[]');
        
        if (submissions.length === 0) {
            adminActivityList.innerHTML = '<li class="activity-item"><span class="act-desc">No recent submissions found in local storage.</span></li>';
            return;
        }

        // Show top 5 recent
        submissions.slice(0, 5).forEach(sub => {
            const li = document.createElement('li');
            li.className = 'activity-item';
            li.innerHTML = `
                <div>
                    <span class="act-cat">[${sub.category}]</span> 
                    <span class="act-desc">${sub.description.substring(0, 40)}...</span>
                </div>
                <div class="act-time">${sub.timestamp.split(',')[0]}</div>
            `;
            adminActivityList.appendChild(li);
        });
    }

    function updateAdminCharts() {
        const submissions = JSON.parse(localStorage.getItem('lawSocietySubmissions') || '[]');
        
        // Base mock data + local storage data
        const catCounts = {
            'Academics': 45,
            'Infrastructure': 30,
            'Hostel': 25,
            'Administration': 20,
            'Student Welfare': 30
        };

        submissions.forEach(sub => {
            if(catCounts[sub.category] !== undefined) {
                catCounts[sub.category]++;
            }
        });

        // Category Chart
        const ctxCat = document.getElementById('categoryChart');
        if (categoryChartInstance) categoryChartInstance.destroy();
        
        categoryChartInstance = new Chart(ctxCat, {
            type: 'doughnut',
            data: {
                labels: Object.keys(catCounts),
                datasets: [{
                    data: Object.values(catCounts),
                    backgroundColor: [
                        '#0F204B', '#1A3673', '#D4AF37', '#E8C550', '#6C757D'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { color: '#fff' } }
                }
            }
        });

        // Timeline Chart (Mocked trend + recent additions)
        const ctxTime = document.getElementById('timelineChart');
        if (timelineChartInstance) timelineChartInstance.destroy();

        // Generate mock last 7 days labels
        const labels = [];
        const data = [5, 8, 3, 12, 7, 4, 6]; 
        // Add +1 to today's count for every local storage submission
        data[6] += submissions.length;

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            labels.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
        }

        timelineChartInstance = new Chart(ctxTime, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Submissions',
                    data: data,
                    borderColor: '#D4AF37',
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#aaa' } },
                    x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#aaa' } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // --- Initialize ---
    renderArticles();
    renderPublicIssues();
    renderAdminActivity();
    
    // Slight delay to ensure Chart.js is fully loaded from CDN
    setTimeout(() => {
        if(typeof Chart !== 'undefined') {
            updateAdminCharts();
        }
    }, 500);
});
