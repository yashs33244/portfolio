import { Project, Experience, Post } from "./types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Mystic Wallet",
    description: "Dual-mode wallet with facial authentication, HD wallet architecture for Ethereum and Solana, Telegram bot notification system, and voice-guided procedures. This project secured 4th place among 50 teams in a competition with participants from 20 colleges across India.",
    image: "/images/mystic wallet.png",
    tags: ["Blockchain", "Web3", "React", "Node.js"],
    github: "https://github.com/yashs33244/hack-the-hills",
    demo: "https://wallet.yashprojects.online",
    featured: true,
  },
  {
    id: 2,
    title: "Artist Compare",
    description: "A platform where users can compare artists across various metrics including net worth, earnings, global influence, awards, collaborations, genre impact, commercial success, and longevity.",
    image: "/images/artist_compare.png",
    tags: ["Next.js", "TypeScript", "Data Visualization", "API Integration"],
    github: "https://github.com/yashs33244/artist-compare",
    demo: "https://compare.yashprojects.online",
    featured: true,
  },
  {
    id: 3,
    title: "Resume Builder",
    description: "Responsive builder with Next.js and TypeScript, ATS-friendly templates co-designed with industry professionals, AWS hosting with 99.9% uptime, and 90% user satisfaction rate.",
    image: "/images/final_cv.png",
    tags: ["Next.js", "TypeScript", "AWS", "Tailwind CSS"],
    github: "https://github.com/yashs33244/resume-build",
    demo: "https://finalcv.yashprojects.online",
    featured: true,
  },
  {
    id: 4,
    title: "Paytm Payment Simulation",
    description: "Real-time payment processing with WebHooks, streamlined database queries with Prisma ORM, and Docker containerization.",
    image: "/images/system_design.png",
    tags: ["Express", "Node.js", "Docker", "Prisma"],
    github: "https://github.com/yashs33244/paytm_project/",
    demo: "#",
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
    role: "Intern",
    company: "ViewR (IIT Delhi startup)",
    startDate: "Jan 2025",
    endDate: "March 2025",
    description: "Working on cloud infrastructure and microservices deployment for a cutting-edge AR/VR platform.",
    responsibilities: [
      "AWS cloud infrastructure with multi-region deployment",
      "Kubernetes CI/CD pipelines development",
      "Scalable backend engineering with rate limiting",
      "Microservices deployment with Helm charts"
    ],
    technologies: ["AWS", "Kubernetes", "Docker", "CI/CD", "Helm", "Node.js", "TypeScript"]
  },
  {
    id: 2,
    role: "Research Assistant",
    company: "IIT Mandi",
    startDate: "May 2024",
    endDate: "Sept 2024",
    description: "Conducted research on continuous authentication systems and compound olfaction using Graph Neural Networks.",
    responsibilities: [
      "Continuous authentication system for banking apps",
      "Research on compound olfaction using GNNs",
      "MPNN enhancement for compound analysis",
      "Transformer model refinement for NLP tasks"
    ],
    technologies: ["Python", "PyTorch", "GNN", "NLP", "Machine Learning", "Research"]
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

