import { TBlogCategory, TBlogPost } from "@/interface/app/blog";

export const initialBlogCategories: TBlogCategory[] = [
  { id: 1, label: "All Posts", active: false },
  { id: 2, label: "Web Development", active: false },
  { id: 3, label: "UI/UX Design", active: false },
  { id: 4, label: "Mobile Development", active: false },
  { id: 5, label: "Tutorial", active: false },
  { id: 6, label: "Tips & Tricks", active: false },
  { id: 7, label: "Personal", active: false },
];

export const initialBlogPosts: TBlogPost[] = [
  {
    id: 1,
    title: "Building Interactive 3D Experiences with Three.js and React",
    excerpt:
      "Learn how to create stunning 3D animations and interactive experiences using Three.js in your React applications.",
    date: "2025-10-15",
    category: "Web Development",
    readTime: "8 min read",
    isNew: true,
    tags: ["React", "Three.js", "3D", "Animation"],
    author: {
      name: "Diama Dev",
    },
    content: [
      {
        type: "paragraph",
        content:
          "Three.js has revolutionized the way we create 3D experiences on the web. Combined with React's component-based architecture, you can build stunning interactive 3D applications that run smoothly in the browser.",
      },
      {
        type: "heading",
        content: "Getting Started with Three.js",
      },
      {
        type: "paragraph",
        content:
          "First, let's install the necessary dependencies. You'll need three.js and @react-three/fiber, which provides React bindings for Three.js.",
      },
      {
        type: "code",
        language: "bash",
        content: "npm install three @react-three/fiber @react-three/drei",
      },
      {
        type: "heading",
        content: "Creating Your First 3D Scene",
      },
      {
        type: "paragraph",
        content:
          "Let's create a simple rotating cube to understand the basics. The Canvas component from @react-three/fiber acts as the container for your 3D scene.",
      },
      {
        type: "code",
        language: "tsx",
        content: `import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} />
      <Box />
      <OrbitControls />
    </Canvas>
  )
}`,
      },
      {
        type: "heading",
        content: "Adding Interactivity",
      },
      {
        type: "paragraph",
        content:
          "The real magic happens when you add user interactions. You can use React hooks like useState and useFrame to create dynamic animations.",
      },
      {
        type: "quote",
        content:
          "The combination of Three.js and React creates endless possibilities for creative web experiences.",
      },
      {
        type: "heading",
        content: "Best Practices",
      },
      {
        type: "list",
        content: [
          "Optimize your 3D models to reduce file size",
          "Use instancing for repeated geometries",
          "Implement level of detail (LOD) for better performance",
          "Lazy load 3D assets to improve initial page load",
          "Use proper lighting to enhance visual appeal",
        ],
      },
      {
        type: "paragraph",
        content:
          "With these fundamentals, you're ready to start building amazing 3D experiences. Remember to always optimize for performance and test across different devices.",
      },
    ],
  },
  {
    id: 2,
    title: "Mastering Framer Motion: Advanced Animation Techniques",
    excerpt:
      "Dive deep into advanced animation patterns with Framer Motion and create buttery smooth user experiences.",
    date: "2025-10-10",
    category: "Web Development",
    readTime: "12 min read",
    isNew: true,
    tags: ["Framer Motion", "Animation", "React", "UI"],
    author: {
      name: "Diama Dev",
    },
    content: [
      {
        type: "paragraph",
        content:
          "Framer Motion is a powerful animation library for React that makes creating complex animations simple and intuitive. In this guide, we'll explore advanced techniques to take your animations to the next level.",
      },
      {
        type: "heading",
        content: "Layout Animations",
      },
      {
        type: "paragraph",
        content:
          "One of the most powerful features in Framer Motion is layout animations. They automatically animate between layout changes without complex calculations.",
      },
      {
        type: "code",
        language: "tsx",
        content: `import { motion } from 'framer-motion'

<motion.div layout className="box">
  {/* Content changes, layout animates automatically */}
</motion.div>`,
      },
      {
        type: "heading",
        content: "Gesture Animations",
      },
      {
        type: "paragraph",
        content:
          "Create engaging interactions with gesture-based animations. Framer Motion provides built-in support for hover, tap, drag, and more.",
      },
      {
        type: "list",
        content: [
          "whileHover for hover states",
          "whileTap for click interactions",
          "drag for draggable elements",
          "whileInView for scroll-triggered animations",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Designing Micro-Interactions That Delight Users",
    excerpt:
      "Explore the art of creating meaningful micro-interactions that enhance user experience and engagement.",
    date: "2025-10-05",
    category: "UI/UX Design",
    readTime: "6 min read",
    isNew: true,
    tags: ["UI/UX", "Design", "Micro-interactions"],
    author: {
      name: "Diama Dev",
    },
  },
  {
    id: 4,
    title: "Next.js 15: What's New and How to Upgrade",
    excerpt:
      "A comprehensive guide to the latest features in Next.js 15 and step-by-step migration instructions.",
    date: "2025-09-28",
    category: "Web Development",
    readTime: "10 min read",
    isNew: false,
    tags: ["Next.js", "React", "Tutorial"],
  },
  {
    id: 5,
    title: "Building a Design System from Scratch",
    excerpt:
      "Step-by-step guide to creating a scalable and maintainable design system for your projects.",
    date: "2025-09-20",
    category: "UI/UX Design",
    readTime: "15 min read",
    isNew: false,
    tags: ["Design System", "UI/UX", "Components"],
  },
  {
    id: 6,
    title: "Flutter vs React Native: A Developer's Perspective",
    excerpt:
      "Comparing two popular mobile development frameworks based on real-world project experience.",
    date: "2025-09-15",
    category: "Mobile Development",
    readTime: "9 min read",
    isNew: false,
    tags: ["Flutter", "React Native", "Mobile"],
  },
  {
    id: 7,
    title: "CSS Grid and Flexbox: When to Use Which",
    excerpt:
      "Understanding the differences between CSS Grid and Flexbox and choosing the right tool for your layout.",
    date: "2025-09-10",
    category: "Tutorial",
    readTime: "7 min read",
    isNew: false,
    tags: ["CSS", "Layout", "Tutorial"],
  },
  {
    id: 8,
    title: "10 VS Code Extensions Every Developer Should Use",
    excerpt:
      "Boost your productivity with these essential VS Code extensions for modern web development.",
    date: "2025-09-05",
    category: "Tips & Tricks",
    readTime: "5 min read",
    isNew: false,
    tags: ["VS Code", "Tools", "Productivity"],
  },
  {
    id: 9,
    title: "My Journey from Beginner to Full-Stack Developer",
    excerpt:
      "Sharing my personal experience, challenges, and lessons learned in becoming a full-stack developer.",
    date: "2025-08-30",
    category: "Personal",
    readTime: "11 min read",
    isNew: false,
    tags: ["Career", "Personal", "Learning"],
  },
  {
    id: 10,
    title: "TypeScript Best Practices for Large-Scale Applications",
    excerpt:
      "Essential TypeScript patterns and practices for building maintainable large-scale applications.",
    date: "2025-08-25",
    category: "Web Development",
    readTime: "13 min read",
    isNew: false,
    tags: ["TypeScript", "Best Practices", "Architecture"],
  },
  {
    id: 11,
    title: "Optimizing React Performance: A Complete Guide",
    excerpt:
      "Learn advanced techniques to optimize your React applications for better performance and user experience.",
    date: "2025-08-20",
    category: "Tutorial",
    readTime: "14 min read",
    isNew: false,
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: 12,
    title: "Dark Mode Implementation with Tailwind CSS",
    excerpt:
      "A practical guide to implementing dark mode in your applications using Tailwind CSS.",
    date: "2025-08-15",
    category: "Tutorial",
    readTime: "6 min read",
    isNew: false,
    tags: ["Tailwind", "Dark Mode", "CSS"],
  },
];
