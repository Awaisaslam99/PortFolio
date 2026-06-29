import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Code,
  Bot,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Award,
  Zap,
  GraduationCap,
  ArrowUp,
  Heart,
  Clock,
  Calendar,
  Phone,
  Newspaper,
  Building,
  Globe,
  BarChart3,
  FileCheck,
  ScanFace,
  MessageSquare,
  UtensilsCrossed,
  Car,
  PhoneCall,
  Menu,
  X,
  ArrowLeft,
  Video,
  FileText,
} from 'lucide-react';
import { ScrollProgress } from '../components/ScrollProgress';
import { fadeInUp, scaleIn, staggerContainer, viewportOnce } from '../lib/motionVariants';

// ── Back to top ──
function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-electric-500 text-base-900 rounded-full flex items-center justify-center glow-electric shadow-2xl"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── Company badge config ──
const COMPANY_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  InsightLix: { color: 'text-electric-400', bg: 'bg-electric-500/10', border: 'border-electric-500/25' },
  'Programmer Force': { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
  InternShips: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
};

// ── All projects data ──
const allProjects = [
  // ── InsightLix ──
  {
    title: 'Brain Tumor Detection Model',
    company: 'InsightLix',
    period: 'Jan 2026 – June 2026',
    status: 'completed',
    description:
      'Built a deep learning pipeline for MRI-based brain tumor detection and segmentation to streamline medical scan analysis. Leveraged SynthSeg and nnU-Net V2 to achieve high-accuracy lesion segmentation and structural volume calculations. Successfully integrated automated clinical insight generation to map baseline datasets and support diagnostic workflows.',
    technologies: ['Django', 'PostgreSQL', 'AI Models', 'React.js', 'Redis', 'Celery'],
    icon: Brain,
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
  },
  {
    title: 'AI News System',
    company: 'InsightLix',
    period: 'Jan 2026 – June 2026',
    status: 'completed',
    description:
      'Developed an AI news platform featuring automated web scraping, efficient article storage, and LLM-based summary generation. Integrated Google Text-to-Speech (gTTS) to automatically produce audio narration for published news items. Delivered a streamlined, centralized dashboard built with Django and React.js to monitor and manage the entire automated pipeline.',
    technologies: ['Django', 'React.js', 'LLM', 'PostgreSQL', 'gTTS', 'PlayWright', 'Celery', 'Redis'],
    icon: Newspaper,
    gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
  },
  {
    title: 'Estate AI Agent',
    company: 'InsightLix',
    period: 'Jan 2026 – June 2026',
    status: 'completed',
    description:
      'Architected a Real Estate AI Agent system powered by OpenAI LLM models and built with a robust Django and PostgreSQL backend. Integrated tier-based subscription plans—ranging from basic to enterprise—managed securely through Stripe payment solutions. The platform captures tailored user specifications via dynamic forms, embedding those preferences directly into LLM prompts to deliver highly customized real estate agent personalities.',
    technologies: ['Django', 'AI Models', 'Stripe', 'React.js', 'PostgreSQL'],
    icon: Building,
    gradient: 'bg-gradient-to-br from-red-500 to-orange-600',
  },
  {
    title: 'Automation Web-Scrapping',
    company: 'InsightLix',
    period: 'Jan 2026 – June 2026',
    status: 'completed',
    description:
      'Engineered an automated web scraping pipeline to extract dynamic showtimes, seat availability, and screen formats from multiple theater websites. To guarantee absolute technical accuracy, the system cross-references this raw data with internal pipeline data before using FastAPI to automatically classify and export the validated information into structured Excel formats.',
    technologies: ['FastAPI', 'Playwright', 'Celery', 'Redis', 'Sqlite'],
    icon: Globe,
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  {
    title: 'Enterprise Resource Planning (ERP) System',
    company: 'InsightLix',
    period: 'Jan 2026 – June 2026',
    status: 'completed',
    description:
      'Built a modern ERP & Accounting Management System using Django, DRF, and PostgreSQL for managing clients, invoices, payments, and financial operations, with future-ready API architecture and planned FBR Digital Invoicing integration.',
    technologies: ['Django', 'HTML5', 'CSS3', 'PostgreSQL'],
    icon: BarChart3,
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
  },
  // ── Programmer Force ──
  {
    title: 'Document Verification System',
    company: 'Programmer Force',
    period: 'June 2025 – Dec 2025',
    status: 'completed',
    description:
      'Developed a robust Document Verification System by training Vision Transformers on a diverse dataset of passports, driving licenses, and official identification documents. The high-accuracy model successfully identifies and verifies credentials by detecting fraud, AI-generated documents, spoofing attempts, and counterfeits. This deep learning pipeline ensures absolute precision in real-time document validation and security checks.',
    technologies: ['Python', 'SQLite', 'Vision Transformers', 'JavaScript'],
    icon: FileCheck,
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
  },
  {
    title: 'Facial Verification System',
    company: 'Programmer Force',
    period: 'June 2025 – Dec 2025',
    status: 'completed',
    description:
      'Developed a high-accuracy Facial Verification System by training Vision Transformers on advanced facial datasets encompassing AI-generated images, edited faces, and face-swapping techniques. The model ensures absolute precision by conducting real-time liveness detection and robust anti-spoofing checks to flag fraudulent imagery. This deep learning pipeline reliably distinguishes between real and fake faces, providing a secure layer for identity authentication.',
    technologies: ['Python', 'SQLite', 'Vision Transformers', 'JavaScript'],
    icon: ScanFace,
    gradient: 'bg-gradient-to-br from-purple-500 to-violet-600',
  },
  {
    title: 'Communication Tool-like Slack',
    company: 'Programmer Force',
    period: 'June 2025 – Dec 2025',
    status: 'completed',
    description:
      'Designed and engineered a dynamic, real-time communication platform built on a backend architecture of Flask, WebSockets, and SQLite. The system leverages secure REST APIs protected by JWT authentication to manage seamless data exchanges and user sessions. To enhance the user experience, the platform integrates advanced AI models that power intelligent features, including predictive next-word suggestions and deep chat analytics.',
    technologies: ['Python', 'Flask', 'React.js', 'SQL', 'Web Sockets', 'AI Models'],
    icon: MessageSquare,
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  },
  {
    title: 'AI-Powered White Label Pay-Per-Minute Call Platform',
    company: 'Programmer Force',
    period: 'June 2025 – Dec 2025',
    status: 'completed',
    description:
      'Built an AI-powered pay-per-minute calling platform by engineering its backend infrastructure using FastAPI, Stripe, Twilio, and Role-Based Access Control (RBAC). Developed advanced AI voice agents integrated with RAG-based knowledge base workflows to deliver intelligent, real-time automated support. Enhanced system security and user verification.',
    technologies: ['FastAPI', 'MongoDB', 'Twilio', 'Stripe', 'ElevenLabs', 'AI'],
    icon: PhoneCall,
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
  },
  {
    title: 'Restaurant Order Management System',
    company: 'Programmer Force',
    period: 'June 2025 – Dec 2025',
    status: 'completed',
    description:
      'Developed a Django-based Restaurant Order Management System featuring seamless QR code menu access and secure Stripe payment integration. The platform automates customer order placement, routes orders directly to the kitchen in real time, and provides dynamic order tracking. This full-stack solution optimizes restaurant workflows and enhances the overall dining experience.',
    technologies: ['Django', 'JavaScript', 'Stripe', 'SQLite'],
    icon: UtensilsCrossed ,
    gradient: 'bg-gradient-to-br from-red-500 to-orange-600',
  },
  // ── InternShips ──
  {
    title: 'Automatic Number Plate Recognition System',
    company: 'InternShips',
    period: 'Dec 2024 – Jan 2025',
    status: 'completed',
    description:
      'Contributed to an Automatic Number Plate Recognition (ANPR) system, leveraging Flask and Hugging Face models to detect vehicles and license plates. Implemented robust attribute recognition to identify vehicle plate details, color, category, and model. Engineered the data pipeline to store all captured recognition logs securely within an SQLite database.',
    technologies: ['Flask', 'HuggingFace', 'SQLite', 'Redis', 'Celery'],
    icon: Car,
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
  },
  {
    title: 'MCP-MultiTool AI Agent',
    company: 'InternShips',
    period: 'March 2025 – May 2025',
    status: 'completed',
    description:
      'Developed an MCP-based multi-tool AI agent using LangChain and the Google API to support dynamic task handling. The system seamlessly integrates an intelligent chatbot, mathematical computation, and a real-time weather assistant as callable tools. This architecture enables the agent to autonomously select and execute the optimal tool based on user intent.',
    technologies: ['LangChain', 'MCP', 'AI Model', 'SQLite'],
    icon: Bot ,
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
  },
  {
  title: 'Document Reader RAG-Agent',
  company: 'InternShips',
  period: 'March 2025 – May 2025',
  status: 'completed',
  description:
    'Developed a Retrieval-Augmented Generation (RAG) application using LangChain and the Google Gemini API, enabling users to upload PDF and text documents and interact with them through natural language conversations. Implemented document chunking, semantic embeddings, and vector-based retrieval to provide accurate, context-aware responses from uploaded content.',
  technologies: ['LangChain', 'Google Gemini API', 'RAG', 'Vector Database', 'Python'],
  icon: FileText,
  gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
},
{
  title: 'Video Summarizer RAG-Agent',
  company: 'InternShips',
  period: 'March 2025 – May 2025',
  status: 'completed',
  description:
    'Built an AI-powered video analysis and summarization system using Agno (formerly Phidata) and the Google Gemini API. The application processes uploaded videos, generates concise summaries, and enables users to ask context-aware questions through a conversational interface. Leveraged Retrieval-Augmented Generation (RAG) to deliver accurate responses based on video content.',
  technologies: ['Agno (Phidata)', 'Google Gemini API', 'RAG', 'LangChain', 'Python'],
  icon: Video,
  gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
},
];

type FilterType = 'All' | 'InsightLix' | 'Programmer Force' | 'InternShips';
const FILTERS: FilterType[] = ['All', 'InsightLix', 'Programmer Force', 'InternShips'];

function ProjectDetailCard({ project }: { project: (typeof allProjects)[0] }) {
  const Icon = project.icon;
  const companyStyle = COMPANY_CONFIG[project.company] ?? {
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/25',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-7 hover:border-electric-500/20 flex flex-col h-full hover:bg-white/8 transition-colors duration-300"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className={`w-14 h-14 ${project.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {project.status === 'ongoing' ? (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/15 text-green-400 rounded-full text-xs font-semibold border border-green-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Ongoing
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-white/8 text-gray-400 rounded-full text-xs font-semibold border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            Completed
          </span>
        )}
      </div>

      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-electric-500 transition-colors leading-tight">
        {project.title}
      </h3>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${companyStyle.bg} ${companyStyle.color} ${companyStyle.border}`}>
          <Building className="w-3 h-3" />
          {project.company}
        </span>
        <span className="flex items-center gap-1.5 text-gray-500 text-xs">
          <Calendar className="w-3 h-3" />
          {project.period}
        </span>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-2.5 py-1 bg-electric-500/10 text-electric-400 rounded-full text-xs font-medium border border-electric-500/20">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredProjects = allProjects.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.company === activeFilter;
  });

  const getCount = (f: FilterType) => {
    if (f === 'All') return allProjects.length;
    return allProjects.filter((p) => p.company === f).length;
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#080C14' }}>
      <ScrollProgress />
      <BackToTopButton />

      {/* ── Navbar ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 border-b border-white/5"
        initial={{ backgroundColor: 'rgba(8, 12, 20, 0.75)' }}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/')}
            className="font-display font-bold text-2xl gradient-text-electric"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Awais Aslam
          </motion.button>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Home', href: '/#home' },
              { label: 'About', href: '/#about' },
              { label: 'Education', href: '/#education' },
              { label: 'Experience', href: '/#experience' },
              { label: 'Skills', href: '/#skills' },
              { label: 'Contact', href: '/#contact' },
            ].map((link) => (
              <a key={link.label} href={link.href} className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors capitalize">
                {link.label}
              </a>
            ))}
            <span className="px-3 py-2 text-sm font-medium text-electric-500">Projects</span>
          </div>

          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(true)}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-72 z-50 border-l border-white/10"
              style={{ backgroundColor: '#0D1117' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="font-display font-bold text-xl gradient-text-electric">Awais Aslam</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-6">
                {[
                  { label: 'Home', href: '/#home' },
                  { label: 'About', href: '/#about' },
                  { label: 'Education', href: '/#education' },
                  { label: 'Experience', href: '/#experience' },
                  { label: 'Skills', href: '/#skills' },
                  { label: 'Contact', href: '/#contact' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <span className="px-4 py-3 text-electric-500 font-medium">Projects</span>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-electric-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 hover:border-electric-500/20 transition-all duration-300 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            custom={0.1}
            className="font-display text-5xl lg:text-7xl font-bold gradient-text-electric mb-6"
          >
            All Projects
          </motion.h1>

          <motion.p variants={fadeInUp} custom={0.2} className="text-xl text-gray-300 mb-2">
            A complete timeline of my work
          </motion.p>
          <motion.p variants={fadeInUp} custom={0.25} className="text-gray-500 text-sm mb-10">
            {allProjects.length} projects across AI, Full Stack &amp; Data Engineering
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {[
              { value: '12', label: 'Total Projects' },
              { value: '5', label: 'At InsightLix' },
              { value: '4', label: 'At Programmer Force' },
              { value: '3', label: 'InternShips' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i * 0.08}
                className="bg-white/5 border border-white/10 rounded-2xl px-7 py-4 text-center hover:border-electric-500/20 hover:bg-white/8 transition-colors duration-300"
              >
                <div className="font-display text-2xl font-bold text-electric-500">{stat.value}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Filter chips ── */}
      <section className="pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {FILTERS.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 ${
                  activeFilter === filter
                    ? 'bg-electric-500 text-base-900 border-transparent glow-electric'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-electric-500/30 hover:text-white'
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {filter}
                <span className="ml-2 text-xs opacity-70">({getCount(filter)})</span>
              </motion.button>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectDetailCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 border-t border-white/8" style={{ backgroundColor: '#0D1117' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>© 2026 Muhammad Awais Aslam. Made with</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.span>
            </div>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com/Awaisaslam99', Icon: Github },
                { href: 'https://www.linkedin.com/in/awaisaslam99/', Icon: Linkedin },
                { href: 'mailto:awaisaslam668@gmail.com', Icon: Mail },
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-electric-500 hover:bg-electric-500/10 hover:border-electric-500/30 transition-all duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
