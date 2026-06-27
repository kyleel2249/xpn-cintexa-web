/* ============================================
   CINTEXA — Enterprise Website JavaScript
   Tech Stack: Vanilla JS (ES6+)
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // DOM READY
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initNavbar();
        initNetworkCanvas();
        initScrollAnimations();
        initCounterAnimation();
        initDeveloperTabs();
        initHealthChecker();
        initForms();
        initJayChat();
        initCodeCopy();
        initToolkitDownloads();
    });

    // ============================================
    // NAVBAR
    // ============================================
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        // Scroll behavior
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });

        // Mobile toggle
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                const isOpen = navLinks.classList.toggle('open');
                navToggle.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', isOpen);
            });

            // Close on link click
            navLinks.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    // ============================================
    // NETWORK CANVAS ANIMATION
    // ============================================
    function initNetworkCanvas() {
        const canvas = document.getElementById('networkCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let isVisible = true;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
        }

        const nodes = [];
        const NODE_COUNT = 60;
        const CONNECTION_DIST = 150;
        const MOUSE_DIST = 200;
        let mouse = { x: null, y: null };

        class Node {
            constructor(w, h) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update(w, h) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;

                // Mouse interaction
                if (mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_DIST) {
                        const force = (MOUSE_DIST - dist) / MOUSE_DIST;
                        this.vx += (dx / dist) * force * 0.02;
                        this.vy += (dy / dist) * force * 0.02;
                    }
                }

                // Damping
                this.vx *= 0.99;
                this.vy *= 0.99;
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(30, 107, 255, 0.6)';
                ctx.fill();
            }
        }

        function initNodes() {
            nodes.length = 0;
            const w = canvas.width / Math.min(window.devicePixelRatio, 2);
            const h = canvas.height / Math.min(window.devicePixelRatio, 2);
            for (let i = 0; i < NODE_COUNT; i++) {
                nodes.push(new Node(w, h));
            }
        }

        function drawConnections(ctx, w, h) {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DIST) {
                        const opacity = (1 - dist / CONNECTION_DIST) * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(30, 107, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!isVisible) return;
            const dpr = Math.min(window.devicePixelRatio, 2);
            const w = canvas.width / dpr;
            const h = canvas.height / dpr;

            ctx.clearRect(0, 0, w, h);

            nodes.forEach(node => {
                node.update(w, h);
                node.draw(ctx);
            });

            drawConnections(ctx, w, h);
            animationId = requestAnimationFrame(animate);
        }

        // Mouse tracking
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Visibility observer
        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
            if (isVisible && !animationId) {
                animate();
            } else if (!isVisible && animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
        observer.observe(canvas);

        // Init
        resize();
        initNodes();
        animate();

        window.addEventListener('resize', () => {
            resize();
            initNodes();
        });
    }

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.service-card, .platform-card, .case-card, .blog-card, .pricing-card, .roadmap-item, .diag-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number[data-target]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, target) {
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // ============================================
    // DEVELOPER TABS
    // ============================================
    function initDeveloperTabs() {
        const navItems = document.querySelectorAll('.dev-nav-item');
        const panels = document.querySelectorAll('.dev-panel');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const tab = item.dataset.tab;

                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');

                panels.forEach(p => {
                    p.classList.remove('active');
                    if (p.id === 'panel-' + tab) {
                        p.classList.add('active');
                    }
                });
            });
        });
    }

    // ============================================
    // HEALTH CHECKER QUIZ
    // ============================================
    function initHealthChecker() {
        const quizContainer = document.getElementById('quizContainer');
        if (!quizContainer) return;

        const steps = quizContainer.querySelectorAll('.quiz-step');
        const progressBar = document.getElementById('quizProgress');
        const resultPanel = document.getElementById('quizResult');
        const retakeBtn = document.getElementById('retakeQuiz');

        let currentStep = 0;
        let totalScore = 0;
        const scores = [];

        function showStep(index) {
            steps.forEach((step, i) => {
                step.classList.toggle('active', i === index);
            });
            const progress = ((index) / steps.length) * 100;
            if (progressBar) progressBar.style.width = progress + '%';
        }

        function showResult() {
            const avgScore = Math.round(totalScore / scores.length);

            steps.forEach(s => s.classList.remove('active'));
            resultPanel.classList.add('active');
            if (progressBar) progressBar.style.width = '100%';

            // Animate score ring
            const scoreValue = document.getElementById('scoreValue');
            const scoreRingFill = document.getElementById('scoreRingFill');
            const resultTitle = document.getElementById('resultTitle');
            const resultDesc = document.getElementById('resultDesc');
            const resultRecs = document.getElementById('resultRecs');

            // Set score
            if (scoreValue) {
                let current = 0;
                const interval = setInterval(() => {
                    current += 2;
                    if (current >= avgScore) {
                        current = avgScore;
                        clearInterval(interval);
                    }
                    scoreValue.textContent = current;
                }, 30);
            }

            // Animate ring
            if (scoreRingFill) {
                const circumference = 2 * Math.PI * 45;
                const offset = circumference - (avgScore / 100) * circumference;
                setTimeout(() => {
                    scoreRingFill.style.strokeDashoffset = offset;
                }, 100);
            }

            // Result text
            let title, desc, recs = [];
            if (avgScore >= 70) {
                title = 'Advanced Digital Maturity';
                desc = 'Your organization demonstrates strong digital capabilities. Focus on optimization and emerging technologies to maintain your competitive edge.';
                recs = [
                    ['AI Integration', 'Explore AI/ML capabilities for predictive analytics'],
                    ['Edge Computing', 'Consider edge deployment for latency-critical operations'],
                    ['Developer Experience', 'Invest in internal developer platforms']
                ];
            } else if (avgScore >= 40) {
                title = 'Developing Digital Foundation';
                desc = 'You have a solid foundation with room for significant improvement. Prioritize automation and cloud-native adoption.';
                recs = [
                    ['CI/CD Pipeline', 'Implement automated deployment workflows'],
                    ['Cloud Migration', 'Accelerate cloud-native architecture adoption'],
                    ['Data Integration', 'Unify data sources for better analytics']
                ];
            } else {
                title = 'Early Digital Stage';
                desc = 'Your digital infrastructure needs foundational work. We recommend starting with a comprehensive digital transformation assessment.';
                recs = [
                    ['Legacy Modernization', 'Plan phased migration from on-premise systems'],
                    ['Cloud Strategy', 'Develop a cloud adoption roadmap'],
                    ['Process Automation', 'Identify high-impact manual processes to automate']
                ];
            }

            if (resultTitle) resultTitle.textContent = title;
            if (resultDesc) resultDesc.textContent = desc;
            if (resultRecs) {
                resultRecs.innerHTML = recs.map(([label, text]) => 
                    `<div class="result-rec-item"><span>${label}:</span><span>${text}</span></div>`
                ).join('');
            }
        }

        // Handle option clicks
        quizContainer.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', () => {
                const value = parseInt(option.dataset.value);
                scores.push(value);
                totalScore += value;
                currentStep++;

                if (currentStep < steps.length - 1) {
                    showStep(currentStep);
                } else {
                    showResult();
                }
            });
        });

        // Retake
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => {
                currentStep = 0;
                totalScore = 0;
                scores.length = 0;
                resultPanel.classList.remove('active');
                const scoreRingFill = document.getElementById('scoreRingFill');
                if (scoreRingFill) scoreRingFill.style.strokeDashoffset = 283;
                showStep(0);
            });
        }
    }

    // ============================================
    // FORMS
    // ============================================
    function initForms() {
        // Contact form
        const contactForm = document.getElementById('contactForm');
        const contactSuccess = document.getElementById('contactSuccess');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                contactForm.style.display = 'none';
                if (contactSuccess) contactSuccess.classList.add('active');
            });
        }

        // Audit form
        const auditForm = document.getElementById('auditForm');
        const auditSuccess = document.getElementById('auditSuccess');

        if (auditForm) {
            auditForm.addEventListener('submit', (e) => {
                e.preventDefault();
                auditForm.style.display = 'none';
                if (auditSuccess) auditSuccess.classList.add('active');
            });
        }
    }

    // ============================================
    // JAY CHAT ASSISTANT
    // ============================================
    function initJayChat() {
        const jayToggle = document.getElementById('jayToggle');
        const jayClose = document.getElementById('jayClose');
        const jayChat = document.getElementById('jayChat');
        const jayInput = document.getElementById('jayInput');
        const jaySend = document.getElementById('jaySend');
        const jayMessages = document.getElementById('jayMessages');
        const jayQuickReplies = document.getElementById('jayQuickReplies');

        if (!jayToggle || !jayChat) return;

        function toggleChat() {
            const isOpen = jayChat.classList.toggle('open');
            jayChat.setAttribute('aria-hidden', !isOpen);
            if (isOpen && jayInput) {
                setTimeout(() => jayInput.focus(), 300);
            }
        }

        jayToggle.addEventListener('click', toggleChat);
        if (jayClose) jayClose.addEventListener('click', toggleChat);

        // Quick replies
        if (jayQuickReplies) {
            jayQuickReplies.querySelectorAll('.jay-quick-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const query = btn.dataset.query;
                    if (query) {
                        addUserMessage(query);
                        processQuery(query);
                    }
                });
            });
        }

        // Send message
        function sendMessage() {
            const text = jayInput.value.trim();
            if (!text) return;
            addUserMessage(text);
            jayInput.value = '';
            processQuery(text);
        }

        if (jaySend) jaySend.addEventListener('click', sendMessage);
        if (jayInput) {
            jayInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }

        function addUserMessage(text) {
            const msg = document.createElement('div');
            msg.className = 'jay-message jay-message-user';
            msg.innerHTML = `
                <div class="jay-bubble"><p>${escapeHtml(text)}</p></div>
                <span class="jay-time">Just now</span>
            `;
            jayMessages.appendChild(msg);
            jayMessages.scrollTop = jayMessages.scrollHeight;
        }

        function addBotMessage(text) {
            const msg = document.createElement('div');
            msg.className = 'jay-message jay-message-bot';
            msg.innerHTML = `
                <div class="jay-bubble"><p>${text}</p></div>
                <span class="jay-time">Just now</span>
            `;
            jayMessages.appendChild(msg);
            jayMessages.scrollTop = jayMessages.scrollHeight;
        }

        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'jay-typing active';
            typing.id = 'jayTyping';
            typing.innerHTML = '<span></span><span></span><span></span>';
            jayMessages.appendChild(typing);
            jayMessages.scrollTop = jayMessages.scrollHeight;
        }

        function hideTyping() {
            const typing = document.getElementById('jayTyping');
            if (typing) typing.remove();
        }

        function processQuery(query) {
            showTyping();

            const responses = {
                'services': 'CINTEXA offers five core services: Software Development (custom enterprise apps), Website Development (high-performance web platforms), Cloud Infrastructure (multi-cloud architecture), API Integration (REST/GraphQL), and Digital Transformation (legacy modernization). Which would you like to explore further?',
                'pricing': 'We have three tiers: Starter at $499/month for small teams, Business at $1,999/month for growing companies (our most popular), and Enterprise with custom pricing for organizations needing maximum control. All plans include SSL, CDN, and support. Would you like details on a specific plan?',
                'audit': 'Great choice! To request a free business audit, fill out the form in the Business Diagnostics section with your company details and current challenges. Our team will analyze your digital maturity and provide actionable recommendations within 24 hours.',
                'developers': 'The Cintexa Developer Platform provides REST and GraphQL APIs, SDKs for JavaScript, Python, Go, and Java, sandbox environments, and comprehensive documentation. You can explore the Developer Portal section for endpoint examples and authentication guides.',
                'contact': 'You can reach us at hello@cintexa.com or use the contact form on this page. Our team typically responds within 24 hours. For enterprise inquiries, we also offer dedicated account managers.',
                'cloud': 'Our Cloud Infrastructure service covers multi-cloud deployment on AWS, GCP, and Azure, Kubernetes orchestration, serverless computing, and infrastructure-as-code. We guarantee 99.99% uptime SLA with auto-scaling and disaster recovery.',
                'default': 'Thanks for reaching out! I'm here to help with questions about our services, pricing, developer tools, or to guide you through our free business audit. What would you like to know more about?'
            };

            const lowerQuery = query.toLowerCase();
            let response = responses.default;

            for (const [key, value] of Object.entries(responses)) {
                if (lowerQuery.includes(key)) {
                    response = value;
                    break;
                }
            }

            setTimeout(() => {
                hideTyping();
                addBotMessage(response);
            }, 800 + Math.random() * 600);
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // CODE COPY
    // ============================================
    function initCodeCopy() {
        document.querySelectorAll('.code-copy').forEach(btn => {
            btn.addEventListener('click', () => {
                const codeBlock = btn.closest('.code-block');
                const code = codeBlock.querySelector('code');
                if (code) {
                    navigator.clipboard.writeText(code.textContent).then(() => {
                        btn.textContent = 'Copied!';
                        setTimeout(() => btn.textContent = 'Copy', 2000);
                    });
                }
            });
        });
    }

    // ============================================
    // TOOLKIT DOWNLOADS
    // ============================================
    function initToolkitDownloads() {
        document.querySelectorAll('.toolkit-download').forEach(btn => {
            btn.addEventListener('click', () => {
                const resource = btn.dataset.resource;
                const names = {
                    roadmap: 'CINTEXA_Business_Growth_Roadmap_2024.pdf',
                    checklist: 'CINTEXA_Scaling_Checklist_2024.pdf',
                    guide: 'CINTEXA_Digital_Transformation_Guide_2024.pdf'
                };

                // Create a mock download
                const blob = new Blob([
                    `CINTEXA — ${names[resource] || 'Resource'}\n\n` +
                    `This is a preview of the requested resource.\n` +
                    `In production, this would download the actual PDF file.\n\n` +
                    `Generated: ${new Date().toLocaleDateString()}`
                ], { type: 'text/plain' });

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = names[resource] || 'cintexa-resource.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                btn.textContent = 'Downloaded!';
                setTimeout(() => btn.textContent = 'Download PDF', 2000);
            });
        });
    }

})();
