// Translation data structure
const translations = {
    en: {
        // Navigation
        nav: {
            companies: "Companies",
            support: "Support",
            team: "Team",
            register: "Free Registration",
            badge: "Tokyo AI Community Official Partner"
        },
        
        // Hero Section
        hero: {
            subtitle: "Your Next Career Stage in AI Engineering",
            title1: "Specialized Career Partner",
            title2: "for AI Engineers",
            description: "As Tokyo AI Community's official partner,\nwe create connections with companies perfect for you.",
            cta: "Start Free Career Consultation",
            features: {
                multilingual: "Multilingual",
                enterprise: "Value Focus",
                support: "1-on-1 Support",
                free: "Free"
            }
        },
        
        // Trust Section
        trust: {
            title: "Why AI Engineers Choose Us",
            subtitle: "Unique value through Tokyo AI Community partnership",
            card1: {
                title: "Deep Analysis",
                description: "Evaluate invisible assets to find high-growth companies."
            },
            card2: {
                title: "Proven Track",
                description: "From enterprises to startups, leveraging value creation insights."
            },
            card3: {
                title: "Full Support",
                description: "Creator × consulting perspective tells your story."
            },
            card4: {
                title: "Data-Driven",
                description: "Tech stack, growth, and culture evaluation"
            }
        },
        
        // Companies Section
        companies: {
            title: "Partner Companies",
            subtitle: "5 exclusive opportunities monthly",
            categories: {
                foreign: "Global Tech Companies",
                foreignList: ["Major Cloud Platforms", "Leading AI Companies", "Tech Giants", "Others"],
                foreignLabel: "Key Areas",
                startup: "AI Startups",
                startupList: ["Pre-Seed - Series A", "Series B - C", "Pre-IPO", "Post-IPO"],
                startupLabel: "Key Areas",
                enterprise: "Japanese Enterprises",
                enterpriseList: ["Finance", "Manufacturing", "Retail", "Consulting"],
                enterpriseLabel: "Key Areas"
            },
            connectionHighlight: "Leveraging Tokyo AI Community insights for company information and interview preparation"
        },
        
        // Value Create Section
        value: {
            title: "3 Reasons to Choose Us",
            subtitle: "Comprehensive support specialized for AI engineers",
            step1: {
                title: "Career Consultation",
                description: "Understanding your career vision"
            },
            step2: {
                title: "Company Matching",
                description: "Data-driven matching process"
            },
            step3: {
                title: "Interview Support",
                description: "End-to-end interview preparation"
            },
            benefit1: {
                title: "Corporate Value Analysis Professionals",
                description: "Analyzing the true value of companies using IR consulting expertise. Comprehensive evaluation of not only finances but also management philosophy, corporate culture, and growth potential",
                list: [
                    "Visualizing companies' \"invisible assets\"",
                    "Selection of visionary companies",
                    "Support for long-term career building"
                ]
            },
            benefit2: {
                title: "Support for Foreign Engineers",
                description: "Comprehensive support specialized for foreign engineers in Japan. Full support to overcome language, visa, and cultural barriers",
                list: [
                    "Multilingual career consulting available",
                    "Visa support and residence status consultation",
                    "Japanese corporate culture onboarding support"
                ]
            },
            benefit3: {
                title: "Individual Career Consulting",
                description: "Individual support tailored to each person's career plan. Accompanying you from interview preparation to post-employment follow-up",
                list: [
                    "Career plan design and future potential evaluation",
                    "Interview preparation and portfolio creation support",
                    "3-month follow-up after joining"
                ]
            }
        },
        
        // Team Section
        team: {
            title: "Leadership Team",
            subtitle: "Enterprise value experts supporting your career",
            barry: {
                name: "Barry O'Neill",
                role: "Senior Advisor",
                title: "Global Entrepreneur & TechStars Mentor",
                badge: "🌍 European Network Lead",
                description: "Former corporate development leader with global M&A experience"
            },
            shu: {
                name: "Shu Koike",
                role: "Career Advisor",
                title: "Cross-functional HR & Education Specialist",
                badge: "✨ Direct Support for All Cases",
                description: "1,000+ career consultations completed"
            }
        },
        
        // Registration Form
        register: {
            title: "Start Free Consultation",
            subtitle: "Complete in 30 seconds",
            form: {
                name: "Name",
                email: "Email",
                linkedin: "LinkedIn Profile",
                linkedinPlaceholder: "https://linkedin.com/in/yourprofile",
                position: "Current Position",
                positionPlaceholder: "Select your current role",
                positionOptions: {
                    ml: "Machine Learning Engineer",
                    backend: "Backend Engineer",
                    fullstack: "Full-Stack Engineer",
                    data: "Data Scientist",
                    other: "Other IT Role"
                },
                message: "Message (Optional)",
                messagePlaceholder: "Share your career goals or concerns",
                terms: "I agree to the",
                termsLink: "Terms of Service",
                privacyLink: "Privacy Policy",
                submit: "Start Free Consultation"
            }
        },
        
        // FAQ Section
        faq: {
            title: "Frequently Asked Questions",
            q1: {
                question: "Is the service really free?",
                answer: "Yes, it's completely free for job seekers. We receive fees from hiring companies."
            },
            q2: {
                question: "What level of experience is required?",
                answer: "We support all levels from new graduates to senior engineers."
            },
            q3: {
                question: "Do you support visa applications?",
                answer: "Yes, we provide visa consultation and support for international candidates."
            },
            q4: {
                question: "Can I consult while employed?",
                answer: "Yes, all consultations are confidential. Your current employer won't be informed."
            },
            q5: {
                question: "Which areas do you cover?",
                answer: "Primarily Tokyo area, but remote positions are available nationwide."
            }
        },
        
        // Footer
        footer: {
            company: "Operating Company",
            companyName: "Value Create Inc.",
            license: "Licensed Employment Placement Business: 13-Yu-301304",
            services: "Services",
            benefits: "Benefits",
            companies: "Partner Companies",
            registration: "Free Registration",
            companyInfo: "Company Info",
            about: "About Us",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            security: "Security",
            community: "Community",
            news: "News & Updates",
            blog: "Tech Blog",
            contact: "Contact",
            copyright: "© 2024 AI Talent Bridge by Value Create Inc. All Rights Reserved.",
            backToTop: "Back to Top"
        }
    },
    
    ja: {
        // Navigation
        nav: {
            companies: "採用企業",
            support: "サポート内容",
            team: "運営体制",
            register: "無料登録",
            badge: "Tokyo AI Community公式パートナー"
        },
        
        // Hero Section
        hero: {
            subtitle: "AIエンジニアとして、次のステージへ",
            title1: "AIエンジニア専門の",
            title2: "キャリアパートナー",
            description: "Tokyo AI コミュニティの公式パートナーが\nあなたに最適な企業との出会いを創出します",
            cta: "無料キャリア相談を開始",
            features: {
                multilingual: "多言語対応",
                enterprise: "企業価値視点",
                support: "1対1サポート",
                free: "完全無料"
            }
        },
        
        // Trust Section
        trust: {
            title: "なぜAIエンジニアが選ぶのか",
            subtitle: "Tokyo AI Communityとの連携が生む独自の価値",
            card1: {
                title: "企業分析力",
                description: "見えない資産まで評価。成長性の高い企業と出会えます。"
            },
            card2: {
                title: "幅広い実績",
                description: "上場企業からスタートアップまで、価値創造の知見を活かして提案。"
            },
            card3: {
                title: "伴走サポート",
                description: "クリエイター×コンサルタントの視点で強みをストーリー化。"
            },
            card4: {
                title: "データ分析",
                description: "技術・成長性・カルチャーを定量評価"
            }
        },
        
        // Companies Section
        companies: {
            title: "採用企業",
            subtitle: "月5名限定の厳選求人",
            categories: {
                foreign: "外資系テック企業",
                foreignList: ["大手クラウドプラットフォーム", "AI先進企業", "テックジャイアント", "その他"],
                foreignLabel: "主な領域",
                startup: "AIスタートアップ",
                startupList: ["Pre-Seed - Series A", "Series B - C", "Pre-IPO", "Post-IPO"],
                startupLabel: "主な領域",
                enterprise: "日系大手企業",
                enterpriseList: ["金融", "製造", "小売", "コンサル"],
                enterpriseLabel: "主な領域"
            },
            connectionHighlight: "コミュニティの知見を活用した企業情報の提供と選考対策サポート"
        },
        
        // Value Create Section
        value: {
            title: "選ばれる3つの理由",
            subtitle: "AIエンジニア専門の包括的なサポート",
            step1: {
                title: "キャリア相談",
                description: "あなたのビジョンを理解"
            },
            step2: {
                title: "企業マッチング",
                description: "データドリブンなマッチング"
            },
            step3: {
                title: "面接サポート",
                description: "エンドツーエンドの面接準備"
            },
            benefit1: {
                title: "企業価値分析のプロフェッショナル",
                description: "IRコンサルティングの実績を活かし、企業の真の価値を分析。財務だけでなく、経営理念、企業文化、成長性を総合評価",
                list: [
                    "企業の「見えない資産」を可視化",
                    "ビジョナリーカンパニーの選別",
                    "長期的なキャリア構築を支援"
                ]
            },
            benefit2: {
                title: "外国人エンジニア向けサポート",
                description: "日本在住の外国人エンジニアに特化した手厚いフォロー。言語、ビザ、文化の壁を乗り越える全面支援",
                list: [
                    "多言語対応のキャリアコンサルティング",
                    "ビザサポート・在留資格相談",
                    "日本企業文化のオンボーディング支援"
                ]
            },
            benefit3: {
                title: "個別キャリアコンサルティング",
                description: "一人ひとりのキャリアプランに寄り添う個別サポート。面接対策から入社後のフォローまで伴走",
                list: [
                    "キャリアプラン設計・将来性評価",
                    "面接対策・ポートフォリオ作成支援",
                    "入社後3ヶ月間のフォローアップ"
                ]
            }
        },
        
        // Team Section
        team: {
            title: "運営チーム",
            subtitle: "企業価値の専門家があなたのキャリアをサポート",
            barry: {
                name: "Barry O'Neill",
                role: "シニアアドバイザー",
                title: "グローバル起業家・TechStarsメンター",
                badge: "🌍 欧州ネットワーク担当",
                description: "元事業開発責任者、グローバルM&A経験豊富"
            },
            shu: {
                name: "Shu Koike",
                role: "キャリアアドバイザー",
                title: "教育・人材・人事を横断するスペシャリスト",
                badge: "✨ 全案件を直接担当",
                description: "1,000名以上のキャリア形成を支援"
            }
        },
        
        // Registration Form
        register: {
            title: "無料相談に申し込む",
            subtitle: "最短30秒で完了",
            form: {
                name: "お名前",
                email: "メールアドレス",
                linkedin: "LinkedInプロフィール",
                linkedinPlaceholder: "https://linkedin.com/in/yourprofile",
                position: "現在の職種",
                positionPlaceholder: "選択してください",
                positionOptions: {
                    ml: "機械学習エンジニア",
                    backend: "バックエンドエンジニア",
                    fullstack: "フルスタックエンジニア",
                    data: "データサイエンティスト",
                    other: "その他IT職"
                },
                message: "相談内容（任意）",
                messagePlaceholder: "転職のご希望やお悩みをお聞かせください",
                terms: "同意する：",
                termsLink: "利用規約",
                privacyLink: "プライバシーポリシー",
                submit: "無料相談を開始する"
            }
        },
        
        // FAQ Section
        faq: {
            title: "よくあるご質問",
            q1: {
                question: "本当に無料ですか？",
                answer: "はい、求職者の方は完全無料です。採用企業から報酬をいただく仕組みです。"
            },
            q2: {
                question: "どのレベルから相談できますか？",
                answer: "新卒からシニアエンジニアまで、幅広いレベルに対応しています。"
            },
            q3: {
                question: "ビザサポートはありますか？",
                answer: "はい、外国人エンジニアのビザ相談・取得支援も行っています。"
            },
            q4: {
                question: "現職に知られずに相談できますか？",
                answer: "はい、秘密厳守で対応します。現職への情報漏洩は一切ありません。"
            },
            q5: {
                question: "地方からでも相談できますか？",
                answer: "東京圏が中心ですが、リモート求人も多数あり全国対応可能です。"
            }
        },
        
        // Footer
        footer: {
            company: "運営会社",
            companyName: "株式会社バリュークリエイト",
            license: "有料職業紹介事業 許可番号：13-ユ-301304",
            services: "サービス",
            benefits: "メリット",
            companies: "採用企業",
            registration: "無料登録",
            companyInfo: "企業情報",
            about: "運営会社",
            privacy: "プライバシーポリシー",
            terms: "利用規約",
            security: "セキュリティ",
            community: "コミュニティ",
            news: "最新情報",
            blog: "技術ブログ",
            contact: "お問い合わせ",
            copyright: "© 2024 AI Talent Bridge by Value Create Inc. All Rights Reserved.",
            backToTop: "トップへ戻る"
        }
    }
};