import { suggestion } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({ onSelectOption }: any) {
  return (
    <div className='mt-4 sm:mt-6 lg:mt-7 px-2 sm:px-4'>
      <h2 className='font-bold text-xl sm:text-2xl lg:text-3xl text-center leading-tight'>Start Planning new <strong className='text-primary'>Trip</strong> using AI</h2>
      <p className='text-center text-gray-400 mt-2 text-sm sm:text-base'>Chat with our AI to create a personalized travel itinerary.</p>
    
    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-6 lg:mt-7">
              {suggestion.map((suggestions, index) => (
                <div
                  key={index}
                  onClick={() => onSelectOption(suggestions.title)}
                  className="flex items-center space-x-2 gap-2 border rounded-xl p-3 sm:p-4 cursor-pointer hover:border-primary/80 transition-all hover:text-primary"
                >
                  <span className="flex-shrink-0">{suggestions.icon}</span>
                  <h2 className="text-sm sm:text-base lg:text-lg">{suggestions.title}</h2>
                </div>
              ))}
            </div>
    </div>
  )
}

export default EmptyBoxState
