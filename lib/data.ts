import { Project, Experience, Education, Post } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Mystic Vault",
    description: "Engineered dual-mode wallet with biometric auth, reducing unauthorized access by 70% and tripling security rating. Implemented HD wallet architecture on Ethereum/Solana, boosting cross-chain adoption by 40%. Automated threat alerts via Telegram API, accelerating response time by 85%. Coded voice-guided interface with Google TTS, cutting operation errors by 65% and doubling UX scores.",
    image: "/images/mystic wallet.png",
    tags: ["Next.js", "AWS", "Docker", "Raspberry Pi", "PostgreSQL", "Prisma", "Solana/Web3.js", "OpenCV"],
    github: "https://github.com/yashs33244/hack-the-hills",
    demo: "https://wallet.yashprojects.online",
    featured: true,
  },
  {
    id: 2,
    title: "Resume Builder",
    description: "Launched responsive Next.js/TypeScript resume builder, raising retention by 25% and cutting bounce rate by 30%. Designed ATS-optimized templates with industry experts, boosting interview callbacks by 40%. Configured AWS load-balanced infrastructure, achieving 99.9% uptime for 1k+ monthly users. Delivered 90% satisfaction via A/B-tested UI/UX enhancements.",
    image: "/images/final_cv.png",
    tags: ["TypeScript", "Prisma", "PostgreSQL", "Docker", "Turborepo", "Recoil", "Gemini API"],
    github: "https://github.com/yashs33244/resume-build",
    demo: "https://finalcv.yashprojects.online",
    featured: true,
  },
  {
    id: 3,
    title: "Paytm Payment Simulation",
    description: "Built real-time payment system with WebHooks, slashing confirmation time by 40% and lifting conversions by 15%. Optimized Prisma/MongoDB queries, improving retrieval speed by 35% under peak load. Containerized with Docker and deployed via CI/CD, reducing onboarding time by 60% and eliminating deployment failures.",
    image: "/images/system_design.png",
    tags: ["WebHooks", "Next.js", "Docker", "MongoDB", "Prisma", "next-auth", "CI/CD", "AWS"],
    github: "https://github.com/yashs33244/paytm_project/",
    demo: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Artist Compare",
    description: "A platform where users can compare artists across various metrics including net worth, earnings, global influence, awards, collaborations, genre impact, commercial success, and longevity.",
    image: "/images/artist_compare.png",
    tags: ["Next.js", "TypeScript", "Data Visualization", "API Integration"],
    github: "https://github.com/yashs33244/artist-compare",
    demo: "https://compare.yashprojects.online",
  },
  {
    id: 5,
    title: "Chess Game Application",
    description: "Interactive chess game with real-time multiplayer functionality, move validation, and game state management.",
    image: "https://media.wired.com/photos/603581e83a0450bfbe5c7564/master/w_1600%2Cc_limit/GEAR-1-Chess-dot-com.jpg",
    tags: ["JavaScript", "Socket.io", "React", "Express"],
    github: "https://github.com/yashs33244/chess-game",
    demo: "#",
  },
  {
    id: 6,
    title: "Music Similarity Taste",
    description: "Application that calculates similarity percentage between users' playlists, achieving 7th place in college Hackathon with 97% accuracy.",
    image: "/images/similarity.png",
    tags: ["Python", "Machine Learning", "API Integration", "Data Analysis"],
    github: "https://github.com/yashs33244/Music_similar_taste",
    demo: "#",
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Software Engineering Intern",
    company: "ViewR",
    startDate: "Jan 2025",
    endDate: "March 2025",
    description: "Architecting AWS cloud infrastructure and Kubernetes CI/CD pipelines for scalable applications.",
    responsibilities: [
      "Architected AWS cloud infrastructure as code across multi-region deployments, governing all resources and core infra, guaranteeing 99.95% availability",
      "Streamlined Kubernetes CI/CD pipelines for 10 applications in a unified repo, slashing deploy time by 65% and elevating success rates to 85%",
      "Developed scalable backend with rate limiting, processing 200 requests/second and incorporating custom models in TypeScript/Express.js",
      "Launched open-source & custom AI models via Helm on Kubernetes, decreasing API latency to 2 ms, maintaining HA with persistent storage, and documenting full infra code"
    ],
    technologies: ["TypeScript", "React", "Docker", "Prisma", "PostgreSQL", "Kubernetes", "AWS", "Helm", "Express.js"]
  },
  {
    id: 2,
    role: "Research Assistant (Intern)",
    company: "IIT Mandi",
    startDate: "May 2024",
    endDate: "Sept 2024",
    description: "Conducted advanced research on continuous authentication systems and compound olfaction using Graph Neural Networks.",
    responsibilities: [
      "Formulated a continuous authentication system for a banking app, enhancing security by 12% from 9%",
      "Spearheaded research on olfaction of compounds with Graph Neural Networks, delivering a 3% accuracy gain",
      "Optimized Transformer models to facilitate NLP tasks, yielding a 5% performance boost"
    ],
    technologies: ["Python", "Keras", "Numpy", "Pandas", "Seaborn", "Graph Neural Networks", "Transformer Models", "NLP"]
  }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Indian Institute of Information Technology Una",
    location: "Himachal Pradesh, India",
    startDate: "Oct 2022",
    endDate: "July 2026",
    gpa: "8.3/10.0",
    description: "Pursuing Bachelor of Technology in Computer Science and Engineering with focus on software development, machine learning, and cloud technologies."
  }
];

// In-memory storage for blog posts
const blogPosts: Post[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    date: '2025-03-15',
    excerpt: 'Learn how to build modern web applications with Next.js, the React framework for production.',
    content: '# Getting Started with Next.js\n\nNext.js is a React framework that enables functionality such as server-side rendering and static site generation.\n\n## Why Next.js?\n\nNext.js provides a great developer experience with features like:\n\n- File-system routing\n- API routes\n- Built-in CSS support\n- Image optimization\n\n```jsx\nfunction HomePage() {\n  return <div>Welcome to Next.js!</div>\n}\n\nexport default HomePage\n```\n\n```mermaid\ngraph TD;\nA[Client] --> B[Next.js];\nB --> C[React];\nB --> D[Server];\nD --> E[Database];\n```',
    readingTime: 5,
    tags: ['Next.js', 'React', 'Web Development'],
    coverImage: '/placeholder.svg?height=400&width=600'
  },
  {
    slug: 'understanding-graph-neural-networks',
    title: 'Understanding Graph Neural Networks',
    date: '2025-02-28',
    excerpt: 'A deep dive into Graph Neural Networks (GNNs) and their applications in various domains.',
    content: '# Understanding Graph Neural Networks\n\nGraph Neural Networks (GNNs) are a class of deep learning methods designed to perform inference on data described by graphs.\n\n## How GNNs Work\n\nGNNs work by propagating information along the edges of a graph and updating node representations.\n\n```mermaid\ngraph LR;\nA[Node] --> B[Aggregate];\nB --> C[Update];\nC --> D[Output];\n```',
    readingTime: 8,
    tags: ['Machine Learning', 'GNN', 'Data Science'],
    coverImage: '/placeholder.svg?height=400&width=600'
  },
  {
    slug: 'building-secure-crypto-wallets',
    title: 'Building Secure Cryptocurrency Wallets',
    date: '2025-01-10',
    excerpt: 'Learn how to build secure HD wallets for cryptocurrencies with facial authentication.',
    content: '# Building Secure Cryptocurrency Wallets\n\nIn this post, we\'ll explore how to build a secure HD wallet for cryptocurrencies with facial authentication.\n\n## HD Wallet Architecture\n\nHierarchical Deterministic (HD) wallets generate a tree of keys from a single seed.\n\n```mermaid\ngraph TD;\nA[Seed] --> B[Master Key];\nB --> C[Child Key 1];\nB --> D[Child Key 2];\nB --> E[Child Key 3];\n```',
    readingTime: 10,
    tags: ['Blockchain', 'Security', 'Cryptocurrency'],
    coverImage: '/placeholder.svg?height=400&width=600'
  }
];

// In-memory blog post management functions
export function getPosts(): Post[] {
  return [...blogPosts];
}

export function getPostBySlug(slug: string): Post | null {
  return blogPosts.find(post => post.slug === slug) || null;
}

export function addPost(post: Post): void {
  blogPosts.push(post);
}

export function updatePost(updatedPost: Post): void {
  const index = blogPosts.findIndex(post => post.slug === updatedPost.slug);
  if (index !== -1) {
    blogPosts[index] = updatedPost;
  }
}

export function deletePost(slug: string): void {
  const index = blogPosts.findIndex(post => post.slug === slug);
  if (index !== -1) {
    blogPosts.splice(index, 1);
  }
}

