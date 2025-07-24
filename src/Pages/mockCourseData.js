// mockCourseData.js
export const mockCourseData = {
  // 1. AWS Training
  aws123: {
    id: 'aws123',
    name: 'AWS Training',
    description: 'Master Amazon Web Services cloud platform with hands-on projects',
    mode: 'online',
    category: 'Cloud Computing',
    subcategory: 'AWS',
    duration: '6 Months',
    noOfLessons: 10,
    noOfStudents: 350,
    faq: [
      { question: 'Is this suitable for beginners?', answer: 'Yes, we start from fundamentals' },
      { question: 'Will I get AWS credits?', answer: 'Yes, $100 AWS credits provided' },
      { question: 'Certification coverage?', answer: 'Covers AWS Solutions Architect exam' }
    ],
    courseObject: [
      { title: 'Cloud Concepts', content: 'Understand cloud service models' },
      { title: 'EC2 Mastery', content: 'Launch and manage virtual servers' },
      { title: 'S3 Storage', content: 'Work with object storage' },
      { title: 'Database Services', content: 'RDS and DynamoDB implementation' },
      { title: 'Networking', content: 'VPC configuration and security' },
      { title: 'Serverless', content: 'Build Lambda functions' },
      { title: 'Security', content: 'IAM and encryption practices' },
      { title: 'DevOps', content: 'CI/CD pipelines on AWS' },
      { title: 'Migration', content: 'Move workloads to cloud' },
      { title: 'Cost Optimization', content: 'Monitor and reduce expenses' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/amazon-web-services.png', title: 'AWS Labs' },
      { image: 'https://img.icons8.com/color/96/certificate.png', title: 'Exam Prep' },
      { image: 'https://img.icons8.com/color/96/conference-call.png', title: 'Mentor Support' }
    ],
    rating: 4.8,
    reviewCount: 142,
    isPopular: true,
    isHighRated: true,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format',
    price: 899,
    status: 'available'
  },

  // 2. Angular
  angular123: {
    id: 'angular123',
    name: 'Angular 2+',
    description: 'Build modern web applications with Angular framework',
    mode: 'both',
    category: 'Web Development',
    subcategory: 'Frontend',
    duration: '4 Months',
    noOfLessons: 8,
    noOfStudents: 280,
    faq: [
      { question: 'Angular vs React?', answer: 'We focus on Angular ecosystem' },
      { question: 'Prerequisites?', answer: 'Basic JavaScript knowledge required' },
      { question: 'Project based?', answer: 'Yes, builds 3 real applications' }
    ],
    courseObject: [
      { title: 'TypeScript', content: 'Learn core language features' },
      { title: 'Components', content: 'Create reusable UI elements' },
      { title: 'Directives', content: 'DOM manipulation techniques' },
      { title: 'Services', content: 'Dependency injection' },
      { title: 'Routing', content: 'Navigation and lazy loading' },
      { title: 'Forms', content: 'Template and reactive forms' },
      { title: 'HTTP Client', content: 'API communication' },
      { title: 'State Management', content: 'NgRx implementation' },
      { title: 'Testing', content: 'Unit and e2e testing' },
      { title: 'Deployment', content: 'Production builds' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/angularjs.png', title: 'Latest Version' },
      { image: 'https://img.icons8.com/color/96/code.png', title: 'Real Projects' },
      { image: 'https://img.icons8.com/color/96/design.png', title: 'UI Patterns' }
    ],
    rating: 4.6,
    reviewCount: 87,
    isPopular: true,
    isHighRated: false,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format',
    price: 699,
    status: 'available'
  },

  // 3. Power BI
  powerbi123: {
    id: 'powerbi123',
    name: 'PowerBI',
    description: 'Transform data into compelling visualizations with Microsoft Power BI',
    mode: 'online',
    category: 'Data Analytics',
    subcategory: 'Business Intelligence',
    duration: '3 Months',
    noOfLessons: 8,
    noOfStudents: 420,
    faq: [
      { question: 'Excel required?', answer: 'Helpful but not mandatory' },
      { question: 'Desktop vs Online?', answer: 'Covers both versions' },
      { question: 'DAX coverage?', answer: 'Comprehensive formulas training' }
    ],
    courseObject: [
      { title: 'Data Import', content: 'Connect to multiple sources' },
      { title: 'Transformation', content: 'Power Query editor' },
      { title: 'Data Modeling', content: 'Relationships and measures' },
      { title: 'DAX Formulas', content: 'Advanced calculations' },
      { title: 'Visualizations', content: 'Charts and custom visuals' },
      { title: 'Dashboards', content: 'Interactive reporting' },
      { title: 'Power BI Service', content: 'Publishing and sharing' },
      { title: 'Row-Level Security', content: 'Data access control' },
      { title: 'Performance', content: 'Optimize report speed' },
      { title: 'Advanced Analytics', content: 'AI visuals and R/Python' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/power-bi.png', title: 'Hands-on Labs' },
      { image: 'https://img.icons8.com/color/96/business-report.png', title: 'Case Studies' },
      { image: 'https://img.icons8.com/color/96/microsoft.png', title: 'Certification Path' }
    ],
    rating: 4.9,
    reviewCount: 156,
    isPopular: true,
    isHighRated: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format',
    price: 499,
    status: 'available'
  },

  // 4. Cyber Security
  cyber123: {
    id: 'cyber123',
    name: 'Cyber Security',
    description: 'Defend systems and networks against digital attacks',
    mode: 'both',
    category: 'Security',
    subcategory: 'Ethical Hacking',
    duration: '5 Months',
    noOfLessons: 8,
    noOfStudents: 380,
    faq: [
      { question: 'Legal concerns?', answer: 'Focuses on ethical hacking only' },
      { question: 'Tools covered?', answer: 'Kali Linux, Metasploit, Wireshark etc.' },
      { question: 'Job ready?', answer: 'Prepares for security analyst roles' }
    ],
    courseObject: [
      { title: 'Security Fundamentals', content: 'CIA triad and threats' },
      { title: 'Network Security', content: 'Firewalls and IDS/IPS' },
      { title: 'Cryptography', content: 'Encryption algorithms' },
      { title: 'Pen Testing', content: 'Vulnerability assessment' },
      { title: 'Web Security', content: 'OWASP Top 10' },
      { title: 'Forensics', content: 'Incident response' },
      { title: 'Compliance', content: 'GDPR, HIPAA standards' },
      { title: 'Cloud Security', content: 'AWS/Azure protection' },
      { title: 'Malware Analysis', content: 'Reverse engineering' },
      { title: 'Career Path', content: 'Security certifications roadmap' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/cyber-security.png', title: 'Hands-on Hacking' },
      { image: 'https://img.icons8.com/color/96/lock.png', title: 'CTF Challenges' },
      { image: 'https://img.icons8.com/color/96/security-configuration.png', title: 'Cert Prep' }
    ],
    rating: 4.7,
    reviewCount: 112,
    isPopular: false,
    isHighRated: true,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format',
    price: 799,
    status: 'available'
  },

  // 5. Data Science
  datasci123: {
    id: 'datasci123',
    name: 'Data Science',
    description: 'Complete data science training with Python and ML algorithms',
    mode: 'online',
    category: 'Data Science',
    subcategory: 'Machine Learning',
    duration: '7 Months',
    noOfLessons: 10,
    noOfStudents: 450,
    faq: [
      { question: 'Math required?', answer: 'We cover necessary statistics' },
      { question: 'Python needed?', answer: 'Taught from basics' },
      { question: 'GPU access?', answer: 'Cloud notebooks provided' }
    ],
    courseObject: [
      { title: 'Python Basics', content: 'NumPy, Pandas, Matplotlib' },
      { title: 'Data Cleaning', content: 'Handle missing values' },
      { title: 'EDA', content: 'Visual analysis techniques' },
      { title: 'Statistics', content: 'Probability distributions' },
      { title: 'ML Basics', content: 'Regression and classification' },
      { title: 'Advanced ML', content: 'Ensemble methods' },
      { title: 'Deep Learning', content: 'Neural networks intro' },
      { title: 'NLP', content: 'Text processing basics' },
      { title: 'Deployment', content: 'Model APIs with Flask' },
      { title: 'Capstone', content: 'End-to-end project' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/python.png', title: 'Python Focus' },
      { image: 'https://img.icons8.com/color/96/artificial-intelligence.png', title: 'ML Projects' },
      { image: 'https://img.icons8.com/color/96/cloud.png', title: 'Cloud Labs' }
    ],
    rating: 4.9,
    reviewCount: 203,
    isPopular: true,
    isHighRated: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format',
    price: 999,
    status: 'available'
  },

  // 6. DevOps
  devops123: {
    id: 'devops123',
    name: 'DevOps Training',
    description: 'CI/CD, containers, and infrastructure as code mastery',
    mode: 'both',
    category: 'DevOps',
    subcategory: 'Cloud',
    duration: '6 Months',
    noOfLessons: 9,
    noOfStudents: 410,
    faq: [
      { question: 'Cloud provider?', answer: 'Covers AWS, Azure, GCP' },
      { question: 'Kubernetes depth?', answer: 'From basics to deployments' },
      { question: 'Real projects?', answer: '3 complete CI/CD pipelines' }
    ],
    courseObject: [
      { title: 'Linux Basics', content: 'Command line proficiency' },
      { title: 'Git', content: 'Version control workflows' },
      { title: 'Docker', content: 'Containerization' },
      { title: 'Kubernetes', content: 'Orchestration' },
      { title: 'CI/CD', content: 'Jenkins/GitHub Actions' },
      { title: 'IaC', content: 'Terraform' },
      { title: 'Monitoring', content: 'Prometheus/Grafana' },
      { title: 'Cloud DevOps', content: 'AWS services' },
      { title: 'Security', content: 'DevSecOps practices' },
      { title: 'Capstone', content: 'End-to-end project' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/docker.png', title: 'Container Labs' },
      { image: 'https://img.icons8.com/color/96/kubernetes.png', title: 'K8s Cluster' },
      { image: 'https://img.icons8.com/color/96/continuous.png', title: 'CI/CD Pipelines' }
    ],
    rating: 4.8,
    reviewCount: 178,
    isPopular: true,
    isHighRated: true,
    image: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=500&auto=format',
    price: 899,
    status: 'available'
  },

  // 7. Python
  python123: {
    id: 'python123',
    name: 'Python Training',
    description: 'From Python basics to advanced programming concepts',
    mode: 'online',
    category: 'Programming',
    subcategory: 'Python',
    duration: '4 Months',
    noOfLessons: 9,
    noOfStudents: 520,
    faq: [
      { question: 'Beginner friendly?', answer: 'Starts from absolute basics' },
      { question: 'Projects included?', answer: '5 practical projects' },
      { question: 'Job preparation?', answer: 'Interview prep included' }
    ],
    courseObject: [
      { title: 'Syntax Basics', content: 'Variables, loops, functions' },
      { title: 'Data Structures', content: 'Lists, dictionaries, tuples' },
      { title: 'OOP', content: 'Classes and inheritance' },
      { title: 'File I/O', content: 'Working with files' },
      { title: 'Modules', content: 'Standard library usage' },
      { title: 'Web Scraping', content: 'BeautifulSoup/Scrapy' },
      { title: 'APIs', content: 'Requests library' },
      { title: 'GUI', content: 'Tkinter basics' },
      { title: 'Automation', content: 'Practical scripts' },
      { title: 'Best Practices', content: 'PEP8 and testing' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/python.png', title: 'Coding Exercises' },
      { image: 'https://img.icons8.com/color/96/jupyter.png', title: 'Notebooks' },
      { image: 'https://img.icons8.com/color/96/project.png', title: 'Real Projects' }
    ],
    rating: 4.7,
    reviewCount: 245,
    isPopular: true,
    isHighRated: false,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&auto=format',
    price: 599,
    status: 'available'
  },

  // 8. Selenium
  selenium123: {
    id: 'selenium123',
    name: 'Selenium Training',
    description: 'Automate web testing with Selenium WebDriver',
    mode: 'both',
    category: 'Testing',
    subcategory: 'Automation',
    duration: '3 Months',
    noOfLessons: 9,
    noOfStudents: 310,
    faq: [
      { question: 'Java or Python?', answer: 'Taught with Java by default' },
      { question: 'Framework included?', answer: 'Build Page Object Model framework' },
      { question: 'Cross-browser?', answer: 'Chrome, Firefox, Edge coverage' }
    ],
    courseObject: [
      { title: 'Selenium Basics', content: 'Setup and architecture' },
      { title: 'Locators', content: 'XPath, CSS selectors' },
      { title: 'WebDriver', content: 'Browser automation' },
      { title: 'TestNG', content: 'Test organization' },
      { title: 'POM', content: 'Page Object Model' },
      { title: 'Data-Driven', content: 'External test data' },
      { title: 'Parallel', content: 'Cross-browser execution' },
      { title: 'Grid', content: 'Distributed testing' },
      { title: 'Reporting', content: 'Extent Reports' },
      { title: 'CI Integration', content: 'Jenkins setup' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/selenium-test-automation.png', title: 'Hands-on Labs' },
      { image: 'https://img.icons8.com/color/96/java-coffee-cup-logo.png', title: 'Java Framework' },
      { image: 'https://img.icons8.com/color/96/continuous.png', title: 'CI Integration' }
    ],
    rating: 4.5,
    reviewCount: 98,
    isPopular: false,
    isHighRated: false,
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=500&auto=format',
    price: 499,
    status: 'available'
  },

  // 9. Digital Marketing
  dm123: {
    id: 'dm123',
    name: 'Digital Marketing Training',
    description: 'Master online marketing strategies and tools',
    mode: 'online',
    category: 'Marketing',
    subcategory: 'Digital',
    duration: '4 Months',
    noOfLessons: 9,
    noOfStudents: 380,
    faq: [
      { question: 'Platforms covered?', answer: 'Google, Facebook, Instagram, LinkedIn' },
      { question: 'Certifications?', answer: 'Prepares for Google Ads/Analytics' },
      { question: 'Practical work?', answer: 'Real campaign simulations' }
    ],
    courseObject: [
      { title: 'SEO', content: 'Keyword research and optimization' },
      { title: 'Content', content: 'Blog and video strategies' },
      { title: 'Social Media', content: 'Platform-specific tactics' },
      { title: 'PPC', content: 'Google Ads campaigns' },
      { title: 'Email', content: 'Automation and sequences' },
      { title: 'Analytics', content: 'Google Analytics mastery' },
      { title: 'Automation', content: 'Marketing tools stack' },
      { title: 'Conversion', content: 'Landing page optimization' },
      { title: 'Strategy', content: 'Omnichannel planning' },
      { title: 'Capstone', content: 'Complete campaign' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/google-ads.png', title: 'Ad Campaigns' },
      { image: 'https://img.icons8.com/color/96/google-analytics.png', title: 'Analytics' },
      { image: 'https://img.icons8.com/color/96/instagram.png', title: 'Social Media' }
    ],
    rating: 4.6,
    reviewCount: 134,
    isPopular: false,
    isHighRated: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format',
    price: 699,
    status: 'available'
  },

  // 10. Full Stack QA (SDET)
  sdet123: {
    id: 'sdet123',
    name: 'Full Stack QA (SDET)',
    description: 'Become a Software Development Engineer in Test',
    mode: 'both',
    category: 'Testing',
    subcategory: 'Automation',
    duration: '6 Months',
    noOfLessons: 9,
    noOfStudents: 250,
    faq: [
      { question: 'Coding required?', answer: 'Yes, focuses on test automation' },
      { question: 'Coverage?', content: 'Web, API, mobile, performance' },
      { question: 'Job ready?', answer: 'Prepares for SDET roles' }
    ],
    courseObject: [
      { title: 'Programming', content: 'Java/Python for testing' },
      { title: 'Web Automation', content: 'Selenium/Playwright' },
      { title: 'API Testing', content: 'RestAssured/Postman' },
      { title: 'Mobile', content: 'Appium basics' },
      { title: 'Performance', content: 'JMeter/LoadRunner' },
      { title: 'Security', content: 'OWASP ZAP basics' },
      { title: 'CI/CD', content: 'Jenkins integration' },
      { title: 'Cloud', content: 'Sauce Labs/BrowserStack' },
      { title: 'Framework', content: 'Build test framework' },
      { title: 'Capstone', content: 'End-to-end project' }
    ],
    features: [
      { image: 'https://img.icons8.com/color/96/test-passed.png', title: 'Full Stack' },
      { image: 'https://img.icons8.com/color/96/code.png', title: 'Framework' },
      { image: 'https://img.icons8.com/color/96/jenkins.png', title: 'CI/CD' }
    ],
    rating: 4.7,
    reviewCount: 87,
    isPopular: true,
    isHighRated: false,
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=500&auto=format',
    price: 899,
    status: 'available'
  }
};

export const courseIdMap = {
  "AWS Training": "aws123",
  "Angular 2+": "angular123",
  "PowerBI": "powerbi123",
  "Cyber Security": "cyber123",
  "Azure": "azure123",
  "Data Science": "datasci123",
  "PowerBI Power Apps Training": "powerapps123",
  "Salesforce Dev & Admin": "salesforce123",
  "DevOps Training": "devops123",
  "MSBI": "msbi123",
  "Data Analytics Training": "dataanalytics123",
  "QA / Testing Tools": "qa123",
  "Python Training": "python123",
  "Selenium Training": "selenium123",
  "RPA Training": "rpa123",
  "Generative AI for Testing": "genai123",
  "Digital Marketing Training": "dm123",
  "Appium": "appium123",
  "Playwright": "playwright123",
  "Full Stack QA (SDET)": "sdet123",
  "JMeter": "jmeter123",
  "Protractor": "protractor123",
  "UFT / QTP": "uft123",
  "Cucumber": "cucumber123",
  "ETL Testing": "etl123",
  "ISTQB Training": "istqb123",
  "LoadRunner": "loadrunner123",
  "WebServices Testing": "webtest123",
  "Manual Testing": "manual123",
};