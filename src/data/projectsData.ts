export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    tech: string[];
    year: string;
    category: string;
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    features: string[];
}

export const projects: Project[] = [
    {
        id: "apex-systems",
        title: "APEX SYSTEMS",
        shortDescription:
            "End-to-end restaurant management platform. Orders, inventory, analytics — all controlled from one interface.",
        fullDescription:
            "A comprehensive restaurant management solution designed to streamline operations from front-of-house to back-of-house. Features real-time order tracking, intelligent inventory management with predictive restocking, staff scheduling, and detailed analytics dashboards. Built for scale, handling 1000+ orders per day across multiple outlets.",
        tech: ["Next.js", "Firebase", "React Native", "Node.js", "Redis"],
        year: "2025",
        category: "Full Stack",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
        features: [
            "Real-time order management with kitchen display system",
            "Predictive inventory tracking with auto-reorder alerts",
            "Multi-outlet staff scheduling and payroll integration",
            "Analytics dashboard with revenue forecasting",
            "Customer loyalty program with mobile app",
        ],
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "finai",
        title: "FINAI",
        shortDescription:
            "AI-powered personal finance tracker with automated expense categorization and intelligent budgeting.",
        fullDescription:
            "FinAI leverages machine learning to automatically categorize expenses, detect spending patterns, and provide personalized budgeting advice. The app connects securely to bank accounts, analyzes transaction history, and generates insights to help users achieve their financial goals.",
        tech: ["React Native", "Expo", "Python", "TensorFlow", "Plaid API"],
        year: "2025",
        category: "Mobile",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
        features: [
            "AI-powered automatic expense categorization (95% accuracy)",
            "Smart budget recommendations based on spending patterns",
            "Bill reminders and subscription tracking",
            "Investment portfolio overview",
            "Financial goal tracking with progress visualization",
        ],
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "neural-grid",
        title: "NEURAL GRID",
        shortDescription:
            "Distributed computing framework for machine learning workloads across edge devices.",
        fullDescription:
            "Neural Grid enables distributed ML training and inference across heterogeneous edge devices. The framework automatically partitions models, manages device communication, and optimizes workload distribution based on device capabilities. Designed for privacy-preserving federated learning scenarios.",
        tech: ["Python", "CUDA", "Kubernetes", "gRPC", "PyTorch"],
        year: "2024",
        category: "Infrastructure",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        features: [
            "Automatic model partitioning for distributed execution",
            "Dynamic workload balancing across devices",
            "Secure aggregation for federated learning",
            "Support for heterogeneous hardware (GPU, TPU, Edge)",
            "Real-time monitoring and fault tolerance",
        ],
        githubUrl: "#",
    },
    {
        id: "velocity",
        title: "VELOCITY",
        shortDescription:
            "Real-time performance monitoring dashboard for high-frequency trading systems.",
        fullDescription:
            "Velocity provides microsecond-level visibility into HFT system performance. The dashboard displays live metrics, latency distributions, and anomaly detection alerts. Built to handle millions of data points per second while maintaining sub-100ms rendering times.",
        tech: ["TypeScript", "WebSocket", "D3.js", "InfluxDB", "Go"],
        year: "2024",
        category: "Data Visualization",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        features: [
            "Microsecond-precision latency monitoring",
            "Real-time anomaly detection with ML",
            "Custom alerting rules and escalation",
            "Historical analysis and reporting",
            "Multi-system correlation view",
        ],
        liveUrl: "#",
    },
    {
        id: "quantum-ui",
        title: "QUANTUM UI",
        shortDescription:
            "A design system and component library with fluid animations and accessibility built-in.",
        fullDescription:
            "Quantum UI is a comprehensive React component library featuring 50+ production-ready components. Every component is designed with motion, accessibility, and customization in mind. Includes a visual theme editor and Figma kit for designers.",
        tech: ["React", "TypeScript", "Framer Motion", "Radix UI", "Storybook"],
        year: "2024",
        category: "Design System",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=600&fit=crop",
        features: [
            "50+ accessible, animated components",
            "Visual theme editor with CSS variable export",
            "Dark/light mode with system preference detection",
            "Comprehensive documentation with live examples",
            "Figma component library included",
        ],
        githubUrl: "#",
    },
    {
        id: "echo-ai",
        title: "ECHO AI",
        shortDescription:
            "Conversational AI assistant with multi-modal understanding and task automation.",
        fullDescription:
            "Echo is an AI assistant that understands text, voice, and images to help users automate daily tasks. Features include calendar management, email drafting, research assistance, and smart home control through natural conversation.",
        tech: ["Python", "OpenAI", "LangChain", "FastAPI", "React"],
        year: "2024",
        category: "AI/ML",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        features: [
            "Multi-modal input (text, voice, image)",
            "Context-aware conversation memory",
            "Integration with 20+ productivity tools",
            "Custom automation workflow builder",
            "Privacy-first on-device processing option",
        ],
        liveUrl: "#",
        githubUrl: "#",
    },
];

export const categories = [
    "All",
    "Full Stack",
    "Mobile",
    "Infrastructure",
    "Data Visualization",
    "Design System",
    "AI/ML",
];
