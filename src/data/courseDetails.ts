export interface CourseModule {
    title: string
    topics: string[]
}

export interface CourseDetail {
    id: string
    title: string
    track: 'Tech & Data' | 'Trading' | 'Software Engineering'
    description: string
    objectives: string[]
    curriculum: CourseModule[]
    prerequisites: string[]
    targetAudience: string[]
    instructor: {
        name: string
        role: string
        bio: string
        image?: string
    }
    duration: string
    format: string
    outcomes: string[]
    certification: string
    testimonials: {
        name: string
        role: string
        quote: string
        image?: string
    }[]
}

export const courseDetails: Record<string, CourseDetail> = {
    // Tech & Data Track
    'data-analytics': {
        id: 'data-analytics',
        title: 'Data Analytics',
        track: 'Tech & Data',
        description: 'Master the art of turning raw data into actionable insights. This comprehensive course covers the entire data analysis lifecycle, from data cleaning and preparation to visualization and storytelling. You will learn to use industry-standard tools to solve real-world business problems.',
        objectives: [
            'Understand the data analysis process and lifecycle',
            'Clean and prepare data for analysis',
            'Perform exploratory data analysis (EDA)',
            'Create compelling data visualizations',
            'Communicate findings effectively to stakeholders',
        ],
        curriculum: [
            {
                title: 'Introduction to Data Analytics',
                topics: ['Data types and structures', 'The data analysis lifecycle', 'Data ethics and privacy'],
            },
            {
                title: 'Excel for Data Analysis',
                topics: ['Advanced formulas and functions', 'Pivot tables and charts', 'Data cleaning in Excel'],
            },
            {
                title: 'SQL Fundamentals',
                topics: ['Relational databases', 'Basic queries (SELECT, FROM, WHERE)', 'Joins and aggregations'],
            },
            {
                title: 'Data Visualization with Tableau/Power BI',
                topics: ['Connecting to data sources', 'Creating interactive dashboards', 'Data storytelling principles'],
            },
            {
                title: 'Capstone Project',
                topics: ['End-to-end analysis of a real-world dataset', 'Presentation of findings'],
            },
        ],
        prerequisites: ['Basic computer literacy', 'Familiarity with Microsoft Excel is helpful but not required'],
        targetAudience: ['Aspiring data analysts', 'Business professionals looking to upskill', 'Students'],
        instructor: {
            name: 'Chioma Okonkwo',
            role: 'Senior Data Analyst',
            bio: 'Chioma has over 8 years of experience in data analytics, working with top financial institutions across Africa. She is passionate about making data accessible to everyone.',
        },
        duration: '8 weeks',
        format: 'Hybrid (Online & Weekend In-person)',
        outcomes: [
            'Proficiency in Excel, SQL, and Power BI/Tableau',
            'A portfolio of data analysis projects',
            'Job-ready skills for entry-level data analyst roles',
        ],
        certification: 'Onebit Certified Data Analyst',
        testimonials: [
            {
                name: 'Emmanuel Adebayo',
                role: 'Business Analyst',
                quote: 'This course completely transformed my career. I went from manually processing spreadsheets to building automated dashboards.',
            },
        ],
    },
    'data-science': {
        id: 'data-science',
        title: 'Data Science',
        track: 'Tech & Data',
        description: 'Dive deep into the world of predictive modeling and machine learning. This course bridges the gap between data analysis and advanced AI, teaching you how to build algorithms that learn from data to make predictions and decisions.',
        objectives: [
            'Master Python for data science',
            'Understand statistical concepts for machine learning',
            'Build and evaluate machine learning models',
            'Deploy models into production',
        ],
        curriculum: [
            {
                title: 'Python for Data Science',
                topics: ['NumPy and Pandas', 'Data manipulation', 'Visualization with Matplotlib/Seaborn'],
            },
            {
                title: 'Statistics & Probability',
                topics: ['Descriptive statistics', 'Hypothesis testing', 'Probability distributions'],
            },
            {
                title: 'Machine Learning Basics',
                topics: ['Supervised vs. Unsupervised learning', 'Regression and Classification', 'Model evaluation metrics'],
            },
            {
                title: 'Advanced Machine Learning',
                topics: ['Decision Trees and Random Forests', 'Clustering algorithms', 'Feature engineering'],
            },
            {
                title: 'Capstone Project',
                topics: ['Building a predictive model for a real business case'],
            },
        ],
        prerequisites: ['Basic programming knowledge (Python preferred)', 'Understanding of basic math/statistics'],
        targetAudience: ['Data analysts', 'Software developers', 'Math/Stats graduates'],
        instructor: {
            name: 'Dr. Tunde Bakare',
            role: 'Lead Data Scientist',
            bio: 'Tunde holds a PhD in Computer Science and has led data science teams at major tech startups. He specializes in predictive analytics and NLP.',
        },
        duration: '10 weeks',
        format: 'Online Live Classes',
        outcomes: [
            'Ability to build and deploy ML models',
            'Deep understanding of statistical analysis',
            'Readiness for Junior Data Scientist roles',
        ],
        certification: 'Onebit Certified Data Scientist',
        testimonials: [
            {
                name: 'Sarah Johnson',
                role: 'Data Scientist',
                quote: 'The curriculum is rigorous but incredibly rewarding. The hands-on projects gave me the confidence to apply for data science jobs.',
            },
        ],
    },
    'python-programming': {
        id: 'python-programming',
        title: 'Python Programming',
        track: 'Tech & Data',
        description: 'Learn the world’s most popular programming language from scratch. This course is designed for absolute beginners and covers the fundamentals of Python programming, from basic syntax to building simple applications.',
        objectives: [
            'Write clean, efficient Python code',
            'Understand core programming concepts',
            'Work with files and data structures',
            'Build basic scripts and applications',
        ],
        curriculum: [
            {
                title: 'Python Basics',
                topics: ['Variables and Data Types', 'Control Flow (If/Else, Loops)', 'Functions'],
            },
            {
                title: 'Data Structures',
                topics: ['Lists, Tuples, and Dictionaries', 'Sets', 'List Comprehensions'],
            },
            {
                title: 'Object-Oriented Programming (OOP)',
                topics: ['Classes and Objects', 'Inheritance', 'Polymorphism'],
            },
            {
                title: 'File Handling & Modules',
                topics: ['Reading and writing files', 'Importing standard libraries', 'Error handling'],
            },
            {
                title: 'Final Project',
                topics: ['Building a command-line application'],
            },
        ],
        prerequisites: ['No prior coding experience required'],
        targetAudience: ['Beginners', 'Students', 'Anyone interested in coding'],
        instructor: {
            name: 'Michael Chen',
            role: 'Software Engineer',
            bio: 'Michael is a Python enthusiast with a background in automation and web development. He loves teaching beginners the joy of coding.',
        },
        duration: '6 weeks',
        format: 'Online Self-paced + Live Q&A',
        outcomes: [
            'Solid foundation in Python programming',
            'Ability to automate simple tasks',
            'Preparation for advanced coding courses',
        ],
        certification: 'Onebit Python Specialist',
        testimonials: [
            {
                name: 'Kemi Adeyemi',
                role: 'Student',
                quote: 'I never thought I could learn to code, but this course made it so easy to understand. Python is now my favorite tool.',
            },
        ],
    },
    'python-for-data-science': {
        id: 'python-for-data-science',
        title: 'Python for Data Science',
        track: 'Tech & Data',
        description: 'A focused course for those who already know basic programming or want to fast-track into data science. Learn the specific libraries and techniques used by data scientists to analyze and visualize data.',
        objectives: [
            'Master Pandas for data manipulation',
            'Create professional visualizations',
            'Perform statistical analysis with Python',
        ],
        curriculum: [
            {
                title: 'NumPy & Pandas',
                topics: ['Array operations', 'DataFrames', 'Data cleaning and transformation'],
            },
            {
                title: 'Data Visualization',
                topics: ['Matplotlib basics', 'Seaborn for statistical plots', 'Interactive plots with Plotly'],
            },
            {
                title: 'Exploratory Data Analysis',
                topics: ['Univariate and Bivariate analysis', 'Handling missing data', 'Correlation analysis'],
            },
            {
                title: 'Mini-Projects',
                topics: ['Analyzing financial datasets', 'Visualizing health data'],
            },
        ],
        prerequisites: ['Basic Python knowledge'],
        targetAudience: ['Developers', 'Analysts transitioning to Python'],
        instructor: {
            name: 'Priya Patel',
            role: 'Data Engineer',
            bio: 'Priya specializes in building data pipelines and analytics tools. She focuses on efficient, production-ready code.',
        },
        duration: '5 weeks',
        format: 'Online Live Classes',
        outcomes: [
            'Proficiency in the Python Data Science stack',
            'Ability to handle large datasets programmatically',
        ],
        certification: 'Onebit Python Data Science Certificate',
        testimonials: [
            {
                name: 'David O.',
                role: 'Financial Analyst',
                quote: 'This course saved me hours of work every week. I can now automate my reporting with Python.',
            },
        ],
    },
    'sql-for-analytics': {
        id: 'sql-for-analytics',
        title: 'SQL for Analytics',
        track: 'Tech & Data',
        description: 'Data lives in databases, and SQL is the key to unlocking it. This course teaches you how to communicate with databases to extract, filter, and aggregate data for analysis.',
        objectives: [
            'Write complex SQL queries',
            'Design efficient database schemas',
            'Perform advanced data analysis using SQL',
        ],
        curriculum: [
            {
                title: 'Database Fundamentals',
                topics: ['RDBMS concepts', 'Tables, Keys, and Relationships'],
            },
            {
                title: 'Querying Data',
                topics: ['SELECT, WHERE, ORDER BY', 'Filtering and Sorting'],
            },
            {
                title: 'Advanced Querying',
                topics: ['Joins (Inner, Left, Right, Full)', 'Group By and Aggregations', 'Subqueries'],
            },
            {
                title: 'Data Manipulation',
                topics: ['INSERT, UPDATE, DELETE', 'Creating and modifying tables'],
            },
        ],
        prerequisites: ['None'],
        targetAudience: ['Aspiring analysts', 'Product managers', 'Marketers'],
        instructor: {
            name: 'James Wilson',
            role: 'Database Administrator',
            bio: 'James has managed petabyte-scale databases for e-commerce giants. He teaches SQL with a focus on performance and best practices.',
        },
        duration: '4 weeks',
        format: 'Online Self-paced',
        outcomes: [
            'Fluency in SQL',
            'Ability to query any relational database',
        ],
        certification: 'Onebit SQL Pro',
        testimonials: [
            {
                name: 'Fatima G.',
                role: 'Marketing Manager',
                quote: 'I no longer have to wait for the tech team to pull data for me. SQL gave me independence.',
            },
        ],
    },
    'power-bi': {
        id: 'power-bi',
        title: 'Power BI',
        track: 'Tech & Data',
        description: 'Transform data into stunning, interactive dashboards. Learn to use Microsoft Power BI to connect to data sources, model data, and create reports that drive business decisions.',
        objectives: [
            'Connect to various data sources',
            'Model data using DAX',
            'Design professional reports and dashboards',
            'Share and collaborate on reports',
        ],
        curriculum: [
            {
                title: 'Getting Started',
                topics: ['Power BI Desktop interface', 'Connecting to data'],
            },
            {
                title: 'Data Transformation',
                topics: ['Power Query Editor', 'Cleaning and shaping data'],
            },
            {
                title: 'Data Modeling & DAX',
                topics: ['Relationships', 'Calculated columns and measures', 'Time intelligence'],
            },
            {
                title: 'Visualization & Publishing',
                topics: ['Choosing the right charts', 'Formatting and design', 'Publishing to Power BI Service'],
            },
        ],
        prerequisites: ['Basic Excel knowledge'],
        targetAudience: ['Analysts', 'Managers', 'Report developers'],
        instructor: {
            name: 'Grace Nnaji',
            role: 'BI Developer',
            bio: 'Grace is a certified Microsoft Trainer who helps organizations adopt data-driven cultures through Power BI.',
        },
        duration: '5 weeks',
        format: 'Weekend Workshops',
        outcomes: [
            'Ability to build end-to-end BI solutions',
            'Mastery of DAX',
        ],
        certification: 'Onebit Power BI Specialist',
        testimonials: [
            {
                name: 'Carlos M.',
                role: 'Operations Lead',
                quote: 'The dashboards I built after this course impressed my CEO so much I got a promotion.',
            },
        ],
    },
    'big-data-engineering': {
        id: 'big-data-engineering',
        title: 'Big Data Engineering',
        track: 'Tech & Data',
        description: 'Learn to build the infrastructure that powers modern data applications. This advanced course covers distributed computing, data pipelines, and cloud data warehousing.',
        objectives: [
            'Design scalable data architectures',
            'Build ETL/ELT pipelines',
            'Work with Big Data tools like Spark and Hadoop',
        ],
        curriculum: [
            {
                title: 'Big Data Concepts',
                topics: ['The 3 Vs of Big Data', 'Distributed computing basics'],
            },
            {
                title: 'Hadoop & Spark',
                topics: ['HDFS and MapReduce', 'Apache Spark fundamentals', 'PySpark'],
            },
            {
                title: 'Data Warehousing',
                topics: ['Modern Data Stack', 'Snowflake/BigQuery basics'],
            },
            {
                title: 'Workflow Orchestration',
                topics: ['Airflow basics', 'Scheduling pipelines'],
            },
        ],
        prerequisites: ['Strong Python/SQL skills', 'Basic Linux knowledge'],
        targetAudience: ['Data Analysts', 'Backend Developers'],
        instructor: {
            name: 'Ahmed Hassan',
            role: 'Senior Data Engineer',
            bio: 'Ahmed architects data platforms for fintech unicorns. He lives and breathes distributed systems.',
        },
        duration: '12 weeks',
        format: 'Online Live Classes',
        outcomes: [
            'Job-ready Data Engineering skills',
            'Experience with industry-standard tools',
        ],
        certification: 'Onebit Data Engineer',
        testimonials: [
            {
                name: 'Tobi A.',
                role: 'Data Engineer',
                quote: 'The transition from analyst to engineer was tough, but this course provided the roadmap I needed.',
            },
        ],
    },
    'cloud-foundations': {
        id: 'cloud-foundations',
        title: 'Cloud Foundations (AWS/Azure)',
        track: 'Tech & Data',
        description: 'The future of IT is in the cloud. Gain a solid understanding of cloud computing concepts and get hands-on experience with leading platforms like AWS or Azure.',
        objectives: [
            'Understand core cloud concepts',
            'Deploy basic infrastructure',
            'Manage security and costs in the cloud',
        ],
        curriculum: [
            {
                title: 'Cloud Concepts',
                topics: ['IaaS, PaaS, SaaS', 'Public vs. Private Cloud'],
            },
            {
                title: 'Core Services',
                topics: ['Compute (EC2/VMs)', 'Storage (S3/Blob)', 'Networking (VPC/VNET)'],
            },
            {
                title: 'Security & Identity',
                topics: ['IAM', 'Security Groups', 'Compliance'],
            },
            {
                title: 'Billing & Management',
                topics: ['Cost management tools', 'Monitoring and logging'],
            },
        ],
        prerequisites: ['Basic IT knowledge'],
        targetAudience: ['IT professionals', 'Developers', 'Managers'],
        instructor: {
            name: 'Sarah Lee',
            role: 'Cloud Architect',
            bio: 'Sarah helps enterprises migrate to the cloud. She holds multiple AWS and Azure certifications.',
        },
        duration: '4 weeks',
        format: 'Online Self-paced',
        outcomes: [
            'Preparation for Cloud Practitioner/Fundamentals exams',
            'Ability to launch cloud resources',
        ],
        certification: 'Onebit Cloud Associate',
        testimonials: [
            {
                name: 'John D.',
                role: 'SysAdmin',
                quote: 'A perfect introduction to the cloud. Demystified a lot of the jargon for me.',
            },
        ],
    },
    'product-design': {
        id: 'product-design',
        title: 'Product Design (UI/UX)',
        track: 'Tech & Data',
        description: 'Learn to design digital products that users love. This course covers the entire design process, from user research and wireframing to high-fidelity prototyping and testing.',
        objectives: [
            'Conduct user research',
            'Create wireframes and prototypes',
            'Master design tools like Figma',
            'Understand design systems',
        ],
        curriculum: [
            {
                title: 'UX Fundamentals',
                topics: ['Design thinking', 'User personas', 'User journey mapping'],
            },
            {
                title: 'UI Design Basics',
                topics: ['Typography', 'Color theory', 'Layout and grids'],
            },
            {
                title: 'Figma Mastery',
                topics: ['Auto-layout', 'Components', 'Prototyping'],
            },
            {
                title: 'Product Strategy',
                topics: ['Design sprints', 'Handing off to developers'],
            },
        ],
        prerequisites: ['Creativity and empathy'],
        targetAudience: ['Aspiring designers', 'Product managers', 'Entrepreneurs'],
        instructor: {
            name: 'Yemi Alade',
            role: 'Product Designer',
            bio: 'Yemi has designed apps used by millions. She believes good design is about solving problems, not just making things pretty.',
        },
        duration: '8 weeks',
        format: 'Hybrid',
        outcomes: [
            'A professional design portfolio',
            'Proficiency in Figma',
        ],
        certification: 'Onebit UI/UX Designer',
        testimonials: [
            {
                name: 'Lisa K.',
                role: 'Junior Designer',
                quote: 'The portfolio reviews were invaluable. I landed my first design gig thanks to this course.',
            },
        ],
    },
    'cybersecurity-foundations': {
        id: 'cybersecurity-foundations',
        title: 'Cybersecurity Foundations',
        track: 'Tech & Data',
        description: 'Protect digital assets in an increasingly connected world. Learn the fundamentals of cybersecurity, including threat landscape, defense strategies, and security best practices.',
        objectives: [
            'Identify common security threats',
            'Understand network security basics',
            'Implement security best practices',
        ],
        curriculum: [
            {
                title: 'Security Principles',
                topics: ['CIA Triad', 'Risk management', 'Authentication vs. Authorization'],
            },
            {
                title: 'Threat Landscape',
                topics: ['Malware', 'Phishing', 'Social Engineering'],
            },
            {
                title: 'Network Security',
                topics: ['Firewalls', 'VPNs', 'Encryption basics'],
            },
            {
                title: 'Security Operations',
                topics: ['Incident response', 'Security auditing'],
            },
        ],
        prerequisites: ['Basic computer networking knowledge'],
        targetAudience: ['IT professionals', 'Anyone interested in security'],
        instructor: {
            name: 'Rotimi Williams',
            role: 'Security Analyst',
            bio: 'Rotimi helps organizations secure their infrastructure against modern threats. He is a Certified Ethical Hacker.',
        },
        duration: '6 weeks',
        format: 'Online Live Classes',
        outcomes: [
            'Foundational security knowledge',
            'Security awareness',
        ],
        certification: 'Onebit Security Associate',
        testimonials: [
            {
                name: 'Peter P.',
                role: 'IT Support',
                quote: 'Opened my eyes to how vulnerable systems can be and how to protect them.',
            },
        ],
    },
    'ai-prompt-engineering': {
        id: 'ai-prompt-engineering',
        title: 'AI & Prompt Engineering',
        track: 'Tech & Data',
        description: 'Unlock the power of Generative AI. Learn how to effectively communicate with AI models like GPT-4 to automate tasks, generate content, and solve complex problems.',
        objectives: [
            'Understand how LLMs work',
            'Master prompt engineering techniques',
            'Integrate AI into workflows',
        ],
        curriculum: [
            {
                title: 'Intro to GenAI',
                topics: ['History of AI', 'How LLMs function', 'Capabilities and limitations'],
            },
            {
                title: 'Prompting Strategies',
                topics: ['Zero-shot vs. Few-shot', 'Chain of thought', 'Prompt tuning'],
            },
            {
                title: 'AI Tools & Applications',
                topics: ['ChatGPT, Midjourney, Claude', 'Building AI agents'],
            },
            {
                title: 'Ethics & Future',
                topics: ['Bias in AI', 'Responsible AI use'],
            },
        ],
        prerequisites: ['None'],
        targetAudience: ['Everyone'],
        instructor: {
            name: 'Chinedu Okeke',
            role: 'AI Researcher',
            bio: 'Chinedu explores the cutting edge of human-AI interaction. He believes AI is a tool for empowerment.',
        },
        duration: '3 weeks',
        format: 'Online Workshops',
        outcomes: [
            'Ability to leverage AI for productivity',
            'Advanced prompting skills',
        ],
        certification: 'Onebit AI Prompt Engineer',
        testimonials: [
            {
                name: 'Anita R.',
                role: 'Content Creator',
                quote: 'This course 10x\'d my productivity. I use what I learned every single day.',
            },
        ],
    },
    'automation-with-python': {
        id: 'automation-with-python',
        title: 'Automation with Python',
        track: 'Tech & Data',
        description: 'Stop doing boring tasks. Learn to write Python scripts that automate file management, web scraping, data entry, and report generation.',
        objectives: [
            'Automate file and folder operations',
            'Scrape data from websites',
            'Automate Excel and PDF tasks',
        ],
        curriculum: [
            {
                title: 'Scripting Basics',
                topics: ['Review of Python basics', 'Running scripts'],
            },
            {
                title: 'File Automation',
                topics: ['Organizing files', 'Batch renaming', 'Working with paths'],
            },
            {
                title: 'Web Scraping',
                topics: ['BeautifulSoup', 'Selenium basics'],
            },
            {
                title: 'Office Automation',
                topics: ['Automating Excel with pandas/openpyxl', 'Sending automated emails'],
            },
        ],
        prerequisites: ['Basic Python knowledge'],
        targetAudience: ['Admin staff', 'Analysts', 'Anyone with repetitive tasks'],
        instructor: {
            name: 'Michael Chen',
            role: 'Automation Specialist',
            bio: 'Michael loves saving time. He has automated thousands of hours of manual work for clients.',
        },
        duration: '4 weeks',
        format: 'Weekend Workshops',
        outcomes: [
            'Ability to build custom automation bots',
            'Increased personal productivity',
        ],
        certification: 'Onebit Automation Specialist',
        testimonials: [
            {
                name: 'Ken T.',
                role: 'Operations Manager',
                quote: 'I automated my weekly reporting process and saved myself 4 hours every Friday.',
            },
        ],
    },

    // Trading Track
    'forex-trading': {
        id: 'forex-trading',
        title: 'Forex Trading',
        track: 'Trading',
        description: 'Understanding global currency markets. This course teaches you the basics of Forex and helps you understand technical analysis and risk management strategies used by professional traders.',
        objectives: [
            'Understand how the Forex market works',
            'Perform technical and fundamental analysis',
            'Develop a trading plan and strategy',
            'Manage risk effectively',
        ],
        curriculum: [
            {
                title: 'Foundation & Market Structure',
                topics: ['Welcome to Forex Trading', 'Introduction to Market Structure', 'Reading the Charts'],
            },
            {
                title: 'ICT Fundamentals - Liquidity & Order Blocks',
                topics: ['Understanding Liquidity', 'Order Blocks (The ICT Edge)', 'Fair Value Gaps (FVG)'],
            },
            {
                title: 'ICT Core Concepts - Smart Money',
                topics: ['Smart Money Concepts (SMC)', 'Inducement & Stop Hunts', 'Optimal Trade Entry (OTE)'],
            },
            {
                title: 'Advanced ICT & Risk Management',
                topics: ['Breaker Blocks & Mitigation Blocks', 'Killzones & Session Trading', 'Risk Management Essentials'],
            },
            {
                title: 'Additional Strategies & Trade Execution',
                topics: ['Trend Line Strategy (Non-ICT Approach)', 'Putting It All Together', 'Trade Execution & Psychology'],
            },
            {
                title: 'Real Trading Preparation & Final Review',
                topics: ['Common Beginner Mistakes', 'Building Your Trading Routine', 'Final Assessment & Next Steps'],
            },
        ],
        prerequisites: ['None'],
        targetAudience: ['Aspiring traders', 'Investors'],
        instructor: {
            name: 'Chosen Uzodinma',
            role: 'Pro Forex Trader',
            bio: 'Chosen has been trading the markets for 2+ years. He focuses on price action and disciplined risk management.',
        },
        duration: '6 weeks',
        format: 'Live Trading Sessions + Theory',
        outcomes: [
            'A funded trading account (optional)',
            'A proven trading strategy',
        ],
        certification: 'Onebit Certified Trader',
        testimonials: [
            {
                name: 'Samuel E.',
                role: 'Independent Trader',
                quote: 'The risk management module alone saved my capital. I am finally profitable.',
            },
        ],
    },
    'crypto-trading': {
        id: 'crypto-trading',
        title: 'Crypto Trading',
        track: 'Trading',
        description: 'Navigate the volatile world of cryptocurrencies. Learn to analyze blockchain projects, trade crypto assets, and understand the unique mechanics of DeFi and Web3 markets.',
        objectives: [
            'Understand blockchain technology',
            'Analyze crypto market cycles',
            'Trade on CEX and DEX platforms',
            'Secure your digital assets',
        ],
        curriculum: [
            {
                title: 'Crypto Basics',
                topics: ['Bitcoin and Ethereum', 'Wallets and Security', 'Stablecoins'],
            },
            {
                title: 'Market Analysis',
                topics: ['On-chain analysis', 'Tokenomics', 'Market sentiment'],
            },
            {
                title: 'Trading Strategies',
                topics: ['Swing trading vs. Day trading', 'Arbitrage opportunities', 'DeFi yield farming'],
            },
            {
                title: 'Risk & Regulation',
                topics: ['Scam avoidance', 'Regulatory landscape', 'Tax implications'],
            },
        ],
        prerequisites: ['None'],
        targetAudience: ['Crypto enthusiasts', 'Investors'],
        instructor: {
            name: 'Jenny Okafor',
            role: 'Crypto Analyst',
            bio: 'Jenny is an early adopter of Bitcoin and a DeFi expert. She teaches how to navigate the crypto space safely.',
        },
        duration: '6 weeks',
        format: 'Online Live Classes',
        outcomes: [
            'Ability to analyze crypto projects',
            'Secure trading and storage practices',
        ],
        certification: 'Onebit Crypto Specialist',
        testimonials: [
            {
                name: 'Mike R.',
                role: 'Investor',
                quote: 'Finally, I understand what I am investing in. The on-chain analysis section was an eye-opener.',
            },
        ],
    },

    // Software Engineering Track
    'frontend-development': {
        id: 'frontend-development',
        title: 'Frontend Development',
        track: 'Software Engineering',
        description: 'Build beautiful, interactive user interfaces. This course covers the core technologies of the web: HTML, CSS, and JavaScript, along with modern frameworks like React.',
        objectives: [
            'Build responsive websites',
            'Master JavaScript ES6+',
            'Create single-page applications with React',
        ],
        curriculum: [
            {
                title: 'Web Fundamentals',
                topics: ['HTML5 Semantic Structure', 'CSS3 Styling and Flexbox/Grid', 'Responsive Design'],
            },
            {
                title: 'JavaScript Deep Dive',
                topics: ['DOM Manipulation', 'Async/Await and Fetch API', 'Modern ES6+ Syntax'],
            },
            {
                title: 'React.js',
                topics: ['Components and Props', 'State Management (Hooks)', 'Routing'],
            },
            {
                title: 'Deployment & Tools',
                topics: ['Git/GitHub', 'Vercel/Netlify', 'Build tools (Vite)'],
            },
        ],
        prerequisites: ['Basic computer skills'],
        targetAudience: ['Aspiring web developers', 'Designers who want to code'],
        instructor: {
            name: 'David Okeke',
            role: 'Senior Frontend Engineer',
            bio: 'David builds pixel-perfect interfaces for global brands. He is passionate about web performance and accessibility.',
        },
        duration: '8 weeks',
        format: 'Hybrid',
        outcomes: [
            'A portfolio of web projects',
            'Job-ready React skills',
        ],
        certification: 'Onebit Frontend Developer',
        testimonials: [
            {
                name: 'Chinwe U.',
                role: 'Frontend Developer',
                quote: 'I went from knowing nothing to building a full React app in 2 months. The mentorship was amazing.',
            },
        ],
    },
    'backend-development': {
        id: 'backend-development',
        title: 'Backend Development',
        track: 'Software Engineering',
        description: 'Power the web from behind the scenes. Learn to build robust APIs, manage databases, and handle server logic using Node.js or Python.',
        objectives: [
            'Build RESTful APIs',
            'Design database schemas',
            'Implement authentication and security',
        ],
        curriculum: [
            {
                title: 'Server-Side Basics',
                topics: ['HTTP Protocol', 'Node.js/Express or Python/Django', 'API Design Principles'],
            },
            {
                title: 'Databases',
                topics: ['SQL vs. NoSQL', 'ORM (Prisma/TypeORM)', 'Database migrations'],
            },
            {
                title: 'Authentication',
                topics: ['JWT', 'OAuth', 'Password hashing'],
            },
            {
                title: 'Deployment',
                topics: ['Docker basics', 'Cloud deployment (Heroku/AWS)', 'CI/CD pipelines'],
            },
        ],
        prerequisites: ['Basic programming knowledge'],
        targetAudience: ['Aspiring backend engineers'],
        instructor: {
            name: 'Seyi Balogun',
            role: 'Backend Architect',
            bio: 'Seyi designs scalable systems that handle millions of requests. He teaches best practices for robust backend code.',
        },
        duration: '8 weeks',
        format: 'Online Live Classes',
        outcomes: [
            'Ability to build scalable APIs',
            'Understanding of server architecture',
        ],
        certification: 'Onebit Backend Developer',
        testimonials: [
            {
                name: 'Tunde A.',
                role: 'Backend Engineer',
                quote: 'Understanding how servers actually work changed everything for me. Great course.',
            },
        ],
    },
    'fullstack-engineering': {
        id: 'fullstack-engineering',
        title: 'Fullstack Engineering',
        track: 'Software Engineering',
        description: 'Become a complete developer. This intensive bootcamp covers both frontend and backend technologies, enabling you to build and deploy full-fledged web applications from scratch.',
        objectives: [
            'Master the MERN stack (MongoDB, Express, React, Node)',
            'Build end-to-end applications',
            'Understand the full software development lifecycle',
        ],
        curriculum: [
            {
                title: 'Frontend Mastery',
                topics: ['React Advanced Patterns', 'State Management (Redux/Context)'],
            },
            {
                title: 'Backend Mastery',
                topics: ['Advanced Node.js', 'Microservices concepts'],
            },
            {
                title: 'Integration',
                topics: ['Connecting frontend to backend', 'Real-time features (WebSockets)'],
            },
            {
                title: 'DevOps for Developers',
                topics: ['Docker', 'AWS basics', 'Monitoring'],
            },
        ],
        prerequisites: ['Intermediate coding skills'],
        targetAudience: ['Developers wanting to bridge the gap'],
        instructor: {
            name: 'Team Onebit',
            role: 'Engineering Leads',
            bio: 'Taught by a team of senior engineers covering their respective areas of expertise.',
        },
        duration: '12 weeks',
        format: 'Intensive Bootcamp',
        outcomes: [
            'Fullstack portfolio projects',
            'Readiness for Senior/Lead roles',
        ],
        certification: 'Onebit Fullstack Engineer',
        testimonials: [
            {
                name: 'Mary J.',
                role: 'Fullstack Dev',
                quote: 'The most challenging and rewarding thing I have done. I now feel confident building anything.',
            },
        ],
    },
    'api-development': {
        id: 'api-development',
        title: 'API Development',
        track: 'Software Engineering',
        description: 'APIs are the glue of the internet. Learn to design, build, document, and consume APIs using modern standards like REST and GraphQL.',
        objectives: [
            'Design intuitive API interfaces',
            'Build GraphQL APIs',
            'Document APIs with Swagger/OpenAPI',
        ],
        curriculum: [
            {
                title: 'API Design',
                topics: ['REST constraints', 'Resource naming', 'Versioning'],
            },
            {
                title: 'GraphQL',
                topics: ['Schemas and Types', 'Queries and Mutations', 'Resolvers'],
            },
            {
                title: 'Documentation',
                topics: ['OpenAPI Specification', 'Swagger UI'],
            },
            {
                title: 'Testing & Security',
                topics: ['Postman testing', 'Rate limiting', 'API Keys'],
            },
        ],
        prerequisites: ['Backend basics'],
        targetAudience: ['Backend developers'],
        instructor: {
            name: 'Seyi Balogun',
            role: 'Backend Architect',
            bio: 'Seyi ensures APIs are clean, fast, and secure.',
        },
        duration: '4 weeks',
        format: 'Workshops',
        outcomes: [
            'Mastery of API standards',
            'Ability to build public-facing APIs',
        ],
        certification: 'Onebit API Specialist',
        testimonials: [
            {
                name: 'John K.',
                role: 'Developer',
                quote: 'GraphQL finally makes sense to me. Great explanations.',
            },
        ],
    },
    'devops-foundations': {
        id: 'devops-foundations',
        title: 'DevOps Foundations',
        track: 'Software Engineering',
        description: 'Bridge the gap between development and operations. Learn the culture, practices, and tools that enable organizations to deliver applications at high velocity.',
        objectives: [
            'Understand CI/CD pipelines',
            'Master containerization with Docker',
            'Learn Infrastructure as Code (IaC)',
        ],
        curriculum: [
            {
                title: 'DevOps Culture',
                topics: ['The Three Ways', 'Agile and Lean'],
            },
            {
                title: 'Containerization',
                topics: ['Docker basics', 'Docker Compose', 'Container orchestration concepts'],
            },
            {
                title: 'CI/CD',
                topics: ['GitHub Actions', 'Automated testing', 'Deployment strategies'],
            },
            {
                title: 'Infrastructure as Code',
                topics: ['Terraform basics', 'Configuration management'],
            },
        ],
        prerequisites: ['Linux basics', 'Understanding of SDLC'],
        targetAudience: ['Developers', 'SysAdmins'],
        instructor: {
            name: 'Ahmed Hassan',
            role: 'DevOps Engineer',
            bio: 'Ahmed automates everything. He helps teams ship code faster and safer.',
        },
        duration: '6 weeks',
        format: 'Online Live Classes',
        outcomes: [
            'Ability to set up CI/CD pipelines',
            'Docker proficiency',
        ],
        certification: 'Onebit DevOps Associate',
        testimonials: [
            {
                name: 'Paul W.',
                role: 'DevOps Engineer',
                quote: 'This course gave me the practical skills I needed to move from SysAdmin to DevOps.',
            },
        ],
    },
}
