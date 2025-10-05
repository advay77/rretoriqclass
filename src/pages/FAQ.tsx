import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I get started with Rretoriq?',
          answer: 'Simply create an account, choose your practice type (IELTS or Interview), and start with our guided setup process. We\'ll help you configure your goals and preferences to personalize your learning experience.'
        },
        {
          question: 'Can I see a demo before subscribing?',
          answer: 'Yes! We offer interactive demos and detailed walkthroughs of our platform features. You can explore our mock interview scenarios and see AI feedback examples before choosing your subscription plan.'
        },
        {
          question: 'What devices can I use Rretoriq on?',
          answer: 'Rretoriq works on any device with a web browser - desktop, laptop, tablet, or smartphone. For the best experience with voice features, we recommend using Chrome or Safari browsers.'
        }
      ]
    },
    {
      category: 'IELTS Practice',
      questions: [
        {
          question: 'How accurate is the AI scoring for IELTS?',
          answer: 'Our AI scoring system has been trained on thousands of IELTS responses and maintains 95%+ accuracy compared to certified IELTS examiners. It provides detailed feedback on grammar, vocabulary, pronunciation, and fluency.'
        },
        {
          question: 'Can I practice all four IELTS skills?',
          answer: 'Currently, we focus on Speaking practice with comprehensive AI feedback. Reading, Writing, and Listening modules are in development and will be available soon.'
        },
        {
          question: 'How many practice sessions can I do per day?',
          answer: 'With our subscription plans, you get unlimited practice sessions with comprehensive AI feedback and detailed performance analytics.'
        }
      ]
    },
    {
      category: 'Interview Practice',
      questions: [
        {
          question: 'What types of interviews can I practice?',
          answer: 'We offer HR/Behavioral, Technical, and Aptitude interview practice. Each type has industry-specific questions and tailored AI feedback to help you excel in your target role.'
        },
        {
          question: 'Can I practice for specific companies?',
          answer: 'Yes! Our question bank includes company-specific interview questions for major tech companies, consulting firms, and various industries. You can filter by company or role type.'
        },
        {
          question: 'How does the real-time feedback work?',
          answer: 'Our AI analyzes your speech in real-time, providing instant feedback on pace, clarity, confidence level, and content quality. You\'ll see suggestions for improvement during and after your response.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'I\'m having microphone issues, what should I do?',
          answer: 'First, ensure your browser has microphone permissions enabled. Check your device\'s audio settings and try refreshing the page. If issues persist, contact our support team for personalized troubleshooting.'
        },
        {
          question: 'Why is the AI feedback taking too long to generate?',
          answer: 'AI processing typically takes 10-30 seconds. Longer delays may indicate high server load or connectivity issues. Try refreshing the page or check your internet connection. Premium users get priority processing.'
        },
        {
          question: 'Can I download my practice reports?',
          answer: 'Yes, all practice reports and progress analytics can be downloaded as PDF files from your Progress dashboard. This helps you track improvement over time.'
        }
      ]
    },
    {
      category: 'Billing & Plans',
      questions: [
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your current billing period.'
        },
        {
          question: 'Do you offer student discounts?',
          answer: 'Yes! We offer 30% student discounts with valid student ID verification. Contact our support team with your student credentials to apply the discount.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, PayPal, and UPI payments for Indian users. All payments are processed securely through Stripe with 256-bit SSL encryption.'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-3 sm:mb-4 px-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Find answers to common questions about Rretoriq's AI-powered practice platform.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-transparent text-gray-900 text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ Content */}
        {filteredFAQ.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600">Try a different search term or browse all categories below.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 1000 + itemIndex;
                    const isExpanded = expandedItems.includes(globalIndex);
                    
                    return (
                      <div
                        key={itemIndex}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-4 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">
                            {item.question}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you succeed.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:support@rretoriq.com"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;