const defaultConfig = {
            full_name: "DHARANI WASUNDARA",
            job_title: "Undergraduate",
            location: "Ragama, Sri Lanka",
            phone: "+94 766141046",
            email: "wasundradharani@gmail.com",
            profile_summary: "Hardworking and skilled Computer Science student who loves creating new software. Great at working with others and known for doing excellent work and getting great results.",
            github_url: "https://github.com/Dharaniwasundara",
            linkedin_url: "http://www.linkedin.com/in/dharani-wasundara-bb07a53za",
            background_color: "#000000",
            primary_color: "#8a2be2",
            secondary_color: "#9333ea",
            text_color: "#ffffff",
            secondary_text_color: "#d1d5db"
        };

        async function onConfigChange(config) {
            document.getElementById('hero-name').textContent = config.full_name || defaultConfig.full_name;
            document.getElementById('hero-title').textContent = config.job_title || defaultConfig.job_title;
            document.getElementById('location').textContent = config.location || defaultConfig.location;
            document.getElementById('phone').textContent = config.phone || defaultConfig.phone;
            document.getElementById('email').textContent = config.email || defaultConfig.email;
            document.getElementById('profile').textContent = config.profile_summary || defaultConfig.profile_summary;
            
            const githubUrl = config.github_url || defaultConfig.github_url;
            const linkedinUrl = config.linkedin_url || defaultConfig.linkedin_url;
            document.getElementById('github-link').href = githubUrl;
            document.getElementById('linkedin-link').href = linkedinUrl;

            const bgColor = config.background_color || defaultConfig.background_color;
            const primaryColor = config.primary_color || defaultConfig.primary_color;
            const secondaryColor = config.secondary_color || defaultConfig.secondary_color;
            const textColor = config.text_color || defaultConfig.text_color;
            const secondaryText = config.secondary_text_color || defaultConfig.secondary_text_color;

            document.body.style.background = bgColor;

            const gradientElements = document.querySelectorAll('.hero-name, .section-title');
            gradientElements.forEach(el => {
                el.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
                el.style.webkitBackgroundClip = 'text';
                el.style.webkitTextFillColor = 'transparent';
                el.style.backgroundClip = 'text';
            });

            document.querySelectorAll('.timeline-title, .project-title, .skill-category-title').forEach(el => {
                el.style.color = textColor;
            });

            document.querySelectorAll('.profile-text, .timeline-description, .contact-item, .skill-list li, .cert-badge').forEach(el => {
                el.style.color = secondaryText;
            });

            document.querySelectorAll('.timeline-subtitle, .social-btn').forEach(el => {
                el.style.color = secondaryColor;
            });
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            config.background_color = value;
                            window.elementSdk.setConfig({ background_color: value });
                        }
                    },
                    {
                        get: () => config.primary_color || defaultConfig.primary_color,
                        set: (value) => {
                            config.primary_color = value;
                            window.elementSdk.setConfig({ primary_color: value });
                        }
                    },
                    {
                        get: () => config.secondary_color || defaultConfig.secondary_color,
                        set: (value) => {
                            config.secondary_color = value;
                            window.elementSdk.setConfig({ secondary_color: value });
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            config.text_color = value;
                            window.elementSdk.setConfig({ text_color: value });
                        }
                    },
                    {
                        get: () => config.secondary_text_color || defaultConfig.secondary_text_color,
                        set: (value) => {
                            config.secondary_text_color = value;
                            window.elementSdk.setConfig({ secondary_text_color: value });
                        }
                    }
                ],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["full_name", config.full_name || defaultConfig.full_name],
                ["job_title", config.job_title || defaultConfig.job_title],
                ["location", config.location || defaultConfig.location],
                ["phone", config.phone || defaultConfig.phone],
                ["email", config.email || defaultConfig.email],
                ["profile_summary", config.profile_summary || defaultConfig.profile_summary],
                ["github_url", config.github_url || defaultConfig.github_url],
                ["linkedin_url", config.linkedin_url || defaultConfig.linkedin_url]
            ]);
        }

        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
        }

        // Go to Top Button functionality
        const goToTopBtn = document.getElementById('goToTop');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                goToTopBtn.classList.add('visible');
            } else {
                goToTopBtn.classList.remove('visible');
            }
        });

        goToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });