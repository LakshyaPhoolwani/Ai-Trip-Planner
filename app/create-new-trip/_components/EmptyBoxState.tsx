import { suggestion } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({ onSelectOption }: any) {
  return (
    <div className='mt-7'>
      <h2 className='font-bold text-3xl text-center'>Start Planning new <strong className='text-primary'>Trip</strong> using AI</h2>
      <p className='text-center text-grey-400 mt-2'>Chat with our AI to create a personalized travel itinerary.</p>
    
    <div className="flex flex-col gap-5 mt-7">
              {suggestion.map((suggestions, index) => (
                <div
                  key={index}
                  onClick={() => onSelectOption(suggestions.title)}
                  className="flex items-center space-x-2 gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary/80 transition-all hover:text-primary"
                >
                  {suggestions.icon}
                  <h2 className="text-lg">{suggestions.title}</h2>
                </div>
              ))}
            </div>
    </div>
  )
}

export default EmptyBoxState
