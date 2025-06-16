import type { Post } from "./types"

// This is a mock implementation for demo purposes
// In a real app, this would read from the filesystem or a database
export async function getPosts(): Promise<Post[]> {
  // Mock data for demonstration
  return [
    {
      slug: "getting-started-with-nextjs",
      title: "Getting Started with Next.js",
      date: "2025-03-15",
      excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
      content:
        "# Getting Started with Next.js\n\nNext.js is a React framework that enables functionality such as server-side rendering and static site generation.\n\n## Why Next.js?\n\nNext.js provides a great developer experience with features like:\n\n- File-system routing\n- API routes\n- Built-in CSS support\n- Image optimization\n\n```jsx\nfunction HomePage() {\n  return <div>Welcome to Next.js!</div>\n}\n\nexport default HomePage\n```\n\n<MermaidDiagram chart={`graph TD;\nA[Client] --> B[Next.js];\nB --> C[React];\nB --> D[Server];\nD --> E[Database];\n`} />",
      readingTime: 5,
      tags: ["Next.js", "React", "Web Development"],
    },
    {
      slug: "understanding-graph-neural-networks",
      title: "Understanding Graph Neural Networks",
      date: "2025-02-28",
      excerpt: "A deep dive into Graph Neural Networks (GNNs) and their applications in various domains.",
      content:
        "# Understanding Graph Neural Networks\n\nGraph Neural Networks (GNNs) are a class of deep learning methods designed to perform inference on data described by graphs.\n\n## How GNNs Work\n\nGNNs work by propagating information along the edges of a graph and updating node representations.\n\n<MermaidDiagram chart={`graph LR;\nA[Node] --> B[Aggregate];\nB --> C[Update];\nC --> D[Output];\n`} />",
      readingTime: 8,
      tags: ["Machine Learning", "GNN", "Data Science"],
    },
    {
      slug: "building-secure-crypto-wallets",
      title: "Building Secure Cryptocurrency Wallets",
      date: "2025-01-10",
      excerpt: "Learn how to build secure HD wallets for cryptocurrencies with facial authentication.",
      content:
        "# Building Secure Cryptocurrency Wallets\n\nIn this post, we'll explore how to build a secure HD wallet for cryptocurrencies with facial authentication.\n\n## HD Wallet Architecture\n\nHierarchical Deterministic (HD) wallets generate a tree of keys from a single seed.\n\n<MermaidDiagram chart={`graph TD;\nA[Seed] --> B[Master Key];\nB --> C[Child Key 1];\nB --> D[Child Key 2];\nB --> E[Child Key 3];\n`} />",
      readingTime: 10,
      tags: ["Blockchain", "Security", "Cryptocurrency"],
    },
  ]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find((post) => post.slug === slug) || null
}



export const technologies = [
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Kubernetes",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "GitLab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  },
  {
    name: "Prisma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "GCP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Bash",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    name: "Pandas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  {
    name: "NumPy",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  {
    name: "Keras",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  },
  {
    name: "Solana",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solana/solana-original.svg",
  },
  {
    name: "Electron",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
  },
];