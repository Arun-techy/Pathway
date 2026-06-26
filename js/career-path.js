document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.node-btn');
    const progressLine = document.getElementById('progress-line');
    const detailsPanel = document.getElementById('details-panel');
    
    // Database of career stages (To be replaced by Backend API later)
    const careerData = {
        student: {
            title: "Computer Science Student",
            badge: "Foundation Phase",
            desc: "Focusing on core data structures, algorithms, and basic web technologies. Building the academic foundation required for corporate engineering.",
            salary: "₹0 - ₹2 LPA (Stipends)",
            role: "Learner & Builder",
            skills: ["HTML/CSS/JS", "Data Structures", "Git Basics", "Problem Solving"],
            responsibilities: [
                "Maintain a high academic CGPA.",
                "Build 2-3 personal portfolio projects.",
                "Participate in hackathons (like SIH) and coding competitions.",
                "Understand fundamental computer networking and OS concepts."
            ]
        },
        intern: {
            title: "Software Development Intern",
            badge: "Entry Phase",
            desc: "First exposure to production codebases. Learning agile methodologies, version control in teams, and reading large-scale code.",
            salary: "₹15K - ₹50K / month",
            role: "Contributor",
            skills: ["React.js Basics", "REST APIs", "Team Git", "Jira/Agile"],
            responsibilities: [
                "Write unit tests and fix minor UI bugs.",
                "Shadow senior engineers during architecture planning.",
                "Ship small, non-critical features to production.",
                "Learn CI/CD pipeline basics."
            ]
        },
        junior: {
            title: "Junior Frontend Engineer",
            badge: "Execution Phase",
            desc: "Full-time individual contributor. Translating Figma designs into pixel-perfect, responsive UI components with clean logic.",
            salary: "₹6 LPA - ₹12 LPA",
            role: "Individual Contributor",
            skills: ["React/Next.js", "TypeScript", "Redux/Zustand", "Tailwind CSS"],
            responsibilities: [
                "Develop and maintain UI components.",
                "Ensure cross-browser compatibility and responsive design.",
                "Write clean, self-documenting code.",
                "Participate in daily stand-ups and sprint planning."
            ]
        },
        mid: {
            title: "Mid-Level Engineer",
            badge: "Ownership Phase",
            desc: "Taking ownership of entire features or modules. Beginning to mentor juniors and making localized architectural decisions.",
            salary: "₹15 LPA - ₹28 LPA",
            role: "Feature Owner",
            skills: ["Advanced React Patterns", "Web Performance Optimization", "System Design Basics", "Mentorship"],
            responsibilities: [
                "Lead the development of epic-level features.",
                "Conduct thorough code reviews for junior peers.",
                "Optimize application performance (Core Web Vitals).",
                "Collaborate directly with Product Managers and Designers."
            ]
        },
        senior: {
            title: "Senior Frontend Engineer",
            badge: "Strategic Phase",
            desc: "A force multiplier. Designing scalable frontend architectures, setting coding standards, and solving the hardest technical problems.",
            salary: "₹30 LPA - ₹60+ LPA",
            role: "Technical Leader",
            skills: ["Frontend Architecture", "Micro-frontends", "CI/CD Architecture", "Cross-team Leadership"],
            responsibilities: [
                "Define the technical roadmap for the frontend team.",
                "Architect scalable solutions for millions of users.",
                "Drive engineering culture and best practices.",
                "Interview and build the engineering team."
            ]
        },
        architect: {
            title: "Frontend System Architect",
            badge: "Visionary Phase",
            desc: "Looking 2-3 years ahead. Choosing tech stacks for the entire organization and aligning technical strategy with business goals.",
            salary: "₹70 LPA - ₹1.5+ Cr",
            role: "Organizational Leader",
            skills: ["Enterprise Architecture", "Business Strategy", "Cloud Infrastructure", "Global Scaling"],
            responsibilities: [
                "Make high-stakes decisions on framework adoptions.",
                "Design systems that span multiple engineering teams.",
                "Reduce cloud infrastructure costs through optimized delivery.",
                "Report directly to VP of Engineering or CTO."
            ]
        }
    };

    let growthChartInstance = null;

    function renderDetails(stageKey) {
        const data = careerData[stageKey];
        if(!data) return;

        // Construct HTML
        const html = `
            <div class="card details-card">
                <div class="details-header">
                    <span class="stage-badge">${data.badge}</span>
                    <h2>${data.title}</h2>
                    <p class="text-muted">${data.desc}</p>
                </div>
                
                <div class="metrics-row">
                    <div class="metric-box">
                        <label>Expected Compensation</label>
                        <div class="value">${data.salary}</div>
                    </div>
                    <div class="metric-box">
                        <label>Primary Focus</label>
                        <div class="value" style="color: var(--clr-text-main); font-size: 1rem;">${data.role}</div>
                    </div>
                </div>

                <div class="content-grid">
                    <div class="content-section">
                        <h4><i data-lucide="zap"></i> Required Stack</h4>
                        <div class="skill-tags">
                            ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <h4><i data-lucide="check-square"></i> Key Responsibilities</h4>
                        <ul class="resp-list">
                            ${data.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="chart-wrapper">
                    <canvas id="stageGrowthChart"></canvas>
                </div>
            </div>
        `;

        detailsPanel.innerHTML = html;
        lucide.createIcons(); // Re-init icons for injected HTML

        // Render mini-chart based on stage
        renderChart(stageKey);
    }

    function renderChart(stageKey) {
        const ctx = document.getElementById('stageGrowthChart').getContext('2d');
        
        // Mock data mapping for chart visual appeal
        const chartValues = {
            student: [10, 20, 30, 45, 60],
            intern: [20, 35, 50, 65, 80],
            junior: [30, 50, 70, 85, 100],
            mid: [50, 70, 90, 110, 140],
            senior: [80, 110, 150, 190, 240],
            architect: [150, 200, 260, 330, 400]
        };

        if(growthChartInstance) {
            growthChartInstance.destroy();
        }

        growthChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5+'],
                datasets: [{
                    label: 'Impact / Value Trajectory',
                    data: chartValues[stageKey],
                    borderColor: '#F4B400', // Accent color
                    borderWidth: 3,
                    pointBackgroundColor: '#123458',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { display: false }
                }
            }
        });
    }

    // Handle Node Clicks
    nodes.forEach((node, index) => {
        node.addEventListener('click', () => {
            // 1. Reset all nodes
            nodes.forEach(n => {
                n.classList.remove('active');
                n.classList.remove('completed');
            });

            // 2. Set current to active, previous to completed
            for(let i = 0; i <= index; i++) {
                if(i === index) {
                    nodes[i].classList.add('active');
                } else {
                    nodes[i].classList.add('completed');
                }
            }

            // 3. Animate SVG Line
            // Total dash offset is 600. 5 segments between 6 nodes.
            // 600 / 5 = 120 pixels per segment
            const targetOffset = 600 - (index * 120);
            progressLine.style.strokeDashoffset = targetOffset;

            // 4. Update Details Panel
            const stage = node.getAttribute('data-stage');
            renderDetails(stage);
        });
    });

    // Initialize first node
    renderDetails('student');
    progressLine.style.strokeDashoffset = 600; // Start empty
});