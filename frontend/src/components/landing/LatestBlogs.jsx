import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar, Clock, User } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const blogs = [
  {
    title: 'How to Maximize Your B2B Travel Agency Margins in 2025',
    category: 'Business Tips',
    categoryColor: 'bg-[#2563EB]',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
    author: 'Rahul Mehta',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&auto=format&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Discover the top strategies that leading travel agencies use to maximize their margins and grow revenue with smart B2B partnerships.',
  },
  {
    title: 'Top 10 Emerging Travel Destinations for Indian Tourists in 2025',
    category: 'Destinations',
    categoryColor: 'bg-purple-600',
    date: 'Jan 10, 2025',
    readTime: '7 min read',
    author: 'Pooja Singh',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b1b4e3b6?w=60&h=60&auto=format&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
    excerpt: 'From the hidden gems of Southeast Asia to the rising stars of Europe  explore destinations your clients will love in 2025.',
  },
  {
    title: 'Understanding Visa Requirements: A Complete Guide for Travel Agents',
    category: 'Visa Guide',
    categoryColor: 'bg-orange-500',
    date: 'Jan 5, 2025',
    readTime: '10 min read',
    author: 'Amit Sharma',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&auto=format&fit=crop&crop=face',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Navigate the complexities of international visa requirements with this comprehensive guide designed for travel agency professionals.',
  },
]

export default function LatestBlogs() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="container-max section-padding">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] rounded-full">
              Latest Blogs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] text-balance">
              Insights & Resources for Travel Agencies
            </h2>
          </div>
          <a href="#" className="flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:gap-2.5 transition-all shrink-0">
            View All Articles <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-card rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,140,255,0.15)] transition-all duration-400 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white rounded-full ${blog.categoryColor}`}>
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#1F2937] leading-snug mb-3 group-hover:text-[#2563EB] transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Author + Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-8 h-8 rounded-full object-cover border border-[#E5E7EB]"
                    />
                    <span className="text-xs font-semibold text-[#1F2937]">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#2563EB] group-hover:gap-2 transition-all">
                    Read More <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
