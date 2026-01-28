import React from 'react';
import { useScrollAnimation } from '../hooks/useGSAPAnimation';

export const BeforeAfter: React.FC = () => {
  const ref = useScrollAnimation('fadeIn');

  const items = [
    {
      title: 'Before Rretoriq',
      icon: (
        <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      ),
      points: [
        'Struggling with interview anxiety',
        'Unclear communication',
        'Lack of confidence',
        'Missed job opportunities'
      ],
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600'
    },
    {
      title: 'After Rretoriq',
      icon: (
        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ),
      points: [
        'Confident and composed interviews',
        'Clear and impactful communication',
        'Strong professional presence',
        'More job offers and career growth'
      ],
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
            Transform Your Professional Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the difference Rretoriq can make in your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl p-8 border-2 ${item.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  {item.icon}
                </div>
                <h3 className={`text-2xl font-semibold ${item.textColor} mb-6`}>
                  {item.title}
                </h3>
                <ul className="space-y-4 text-left w-full">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full ${item.bgColor} flex items-center justify-center mr-3 mt-0.5`}>
                        {item.title === 'Before Rretoriq' ? (
                          <span className={`w-2 h-2 rounded-full ${item.textColor}`}></span>
                        ) : (
                          <svg className={`w-3 h-3 ${item.textColor}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-blue-600/5 backdrop-blur-sm px-8 py-4 rounded-2xl border border-indigo-200/50">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 font-medium">
              Join thousands of professionals who transformed their careers with Rretoriq
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
