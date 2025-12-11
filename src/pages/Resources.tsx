import { useState } from 'react'
import { BookOpen, FileText, X } from 'lucide-react'
import SEO from '../components/SEO'

interface Resource {
  id: number
  title: string
  filename: string
  description: string
  category: string
}

const resources: Resource[] = [
  {
    id: 1,
    title: "How to Handle Impromptu Speaking in an Interview",
    filename: "How to Handle Impromptu Speaking in an Interview_.pdf",
    description: "Master the art of thinking on your feet during interviews with practical strategies",
    category: "Interview Skills"
  },
  {
    id: 2,
    title: "How Can You Think on Your Feet and Answer Unexpected Questions?",
    filename: "How Can You Think on Your Feet and Answer Unexpected Questions_.pdf",
    description: "Learn powerful techniques to handle surprise questions with confidence",
    category: "Interview Skills"
  },
  {
    id: 3,
    title: "How Do I Turn 'Tell Me About Yourself' into a Compelling Story?",
    filename: "How Do I Turn _Tell Me About Yourself_ into a Compelling Story_.pdf",
    description: "Transform the most common interview question into your strongest answer",
    category: "Interview Skills"
  },
  {
    id: 4,
    title: "What Is the STAR Method for Storytelling?",
    filename: "What Is the STAR Method for Storytelling_.pdf",
    description: "Structure your responses using the proven STAR framework for maximum impact",
    category: "Interview Skills"
  },
  {
    id: 5,
    title: "How Can I Stop Sounding Scripted and Speak More Naturally?",
    filename: "How Can I Stop Sounding Scripted and Speak More Naturally_.pdf",
    description: "Develop authentic communication that resonates with your audience",
    category: "Speaking Skills"
  },
  {
    id: 6,
    title: "How to Handle Stage Fear Like a Pro",
    filename: "How to Handle Stage Fear Like a Pro_.pdf",
    description: "Overcome nervousness and present with confidence in any situation",
    category: "Speaking Skills"
  },
  {
    id: 7,
    title: "What is the Simple 3-Step Formula for Speaking Clarity?",
    filename: "What is the Simple 3-Step Formula for Speaking Clarity_.pdf",
    description: "Master clear and impactful communication with this proven approach",
    category: "Speaking Skills"
  },
  {
    id: 8,
    title: "How to End a Speech People Remember",
    filename: "How to End a Speech People Remember_.pdf",
    description: "Create memorable conclusions that leave lasting impressions on your audience",
    category: "Public Speaking"
  },
  {
    id: 9,
    title: "How Does Mock Parliament Sharpen Debate and Communication Skills?",
    filename: "How Does Mock Parliament Sharpen Debate and Communication Skills_.pdf",
    description: "Enhance your argumentation and persuasion abilities through structured debate",
    category: "Debate Skills"
  },
  {
    id: 10,
    title: "How to Master Communication in a GD",
    filename: "How to Master Communication in a GD_.pdf",
    description: "Excel in group discussions with effective communication strategies",
    category: "Communication Skills"
  },
  {
    id: 11,
    title: "How Can I Build Instant Rapport with Someone in 3 Minutes?",
    filename: "How Can I Build Instant Rapport with Someone in 3 Minutes_.pdf",
    description: "Quick techniques to establish genuine connections in any conversation",
    category: "Communication Skills"
  },
  {
    id: 12,
    title: "What Communication Mistakes Ruin First Impressions?",
    filename: "What Communication Mistakes Ruin First Impressions_.pdf",
    description: "Avoid common pitfalls and make strong first impressions every time",
    category: "Communication Skills"
  },
  {
    id: 13,
    title: "What Are 5 Quick Fixes to Sound Confident Instantly?",
    filename: "What Are 5 Quick Fixes to Sound Confident Instantly_.pdf",
    description: "Simple adjustments that immediately boost your communication confidence",
    category: "Communication Skills"
  },
  {
    id: 14,
    title: "What Are the Smartest Ways to Say 'I Don't Know' Professionally?",
    filename: "What Are the Smartest Ways to Say _I Don_t Know_ Professionally_.pdf",
    description: "Turn uncertainty into opportunity with professional communication tactics",
    category: "Professional Skills"
  },
  {
    id: 15,
    title: "What Are the Quickest Icebreakers for Any Occasion?",
    filename: "What Are the Quickest Icebreakers for Any Occasion_.pdf",
    description: "Break the ice effortlessly in professional and social settings",
    category: "Professional Skills"
  },
  {
    id: 16,
    title: "How to Lead a Team Meeting as a Student",
    filename: "How to Lead a Team Meeting as a Student_.pdf",
    description: "Develop leadership communication skills for effective team management",
    category: "Professional Skills"
  },
  {
    id: 17,
    title: "What Makes Indian Startup Founders Great Communicators?",
    filename: "What Makes Indian Startup Founders Great Communicators_.pdf",
    description: "Learn from successful entrepreneurs and their communication strategies",
    category: "Professional Skills"
  }
]

const categories = Array.from(new Set(resources.map(r => r.category)))

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Interview Skills': 'from-blue-500 to-indigo-600',
      'Speaking Skills': 'from-purple-500 to-violet-600',
      'Public Speaking': 'from-orange-500 to-amber-600',
      'Debate Skills': 'from-emerald-500 to-teal-600',
      'Professional Skills': 'from-pink-500 to-rose-600',
      'Communication Skills': 'from-cyan-500 to-blue-600'
    }
    return colors[category] || 'from-gray-500 to-gray-600'
  }

  return (
    <>
      <SEO 
        title="The Rretoriq Guide - Learning Materials | Rretoriq"
        description="Access our comprehensive collection of communication, interview, and public speaking resources. Download guides, tips, and strategies to enhance your skills."
        keywords="communication resources, interview guides, public speaking materials, learning resources, professional development"
      />

      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              The Rretoriq Guide
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium">
              Explore our curated collection of guides, tips, and strategies to enhance your communication, interview, and public speaking skills.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              All Resources
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                {/* PDF Preview */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(resource.category)} opacity-20`}></div>
                  <iframe
                    src={`/resources/${encodeURIComponent(resource.filename)}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full pointer-events-none"
                    title={resource.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button
                      onClick={() => setSelectedResource(resource)}
                      className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      View Full PDF
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${getCategoryColor(resource.category)} mb-3`}>
                    {resource.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {resource.description}
                  </p>
                  
                  <button
                    onClick={() => setSelectedResource(resource)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>

      {/* Full PDF Viewer Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-6xl max-h-[95vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-xl font-bold text-gray-900 truncate">{selectedResource.title}</h2>
                <p className="text-sm text-gray-600 mt-1 truncate">{selectedResource.description}</p>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden min-h-0">
              <iframe
                src={`/resources/${encodeURIComponent(selectedResource.filename)}#toolbar=0&navpanes=0&view=FitH`}
                className="w-full h-full"
                title={selectedResource.title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
