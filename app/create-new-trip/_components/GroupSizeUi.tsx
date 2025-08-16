import { div } from 'motion/react-client'
import React from 'react'
export const SelectTravelesList = [

    {

        id: 1,

        title: 'Just Me',

        desc: 'A sole traveles in exploration',

        icon: '✈️',

        people: '1'

    },

    {

        id: 2,

        title: 'Couple',

        desc: 'Two traveles in tandem',

        icon: '🥂',

        people: '2 People'

    },

    {

        id: 3,

        title: 'Family',

        desc: 'A group of fun loving adv',

        icon: '🏡',

        people: '3 to 5 People'

    },

    {

        id: 4,

        title: 'Friends',

        desc: 'A bunch of thrill-seekes',

        icon: '⛵',

        people: '5 to 10 People'

    },

]


function GroupSizeUi({ onSelectOption = (v: string) => {} }: { onSelectOption?: any }) {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 items-center mt-2 sm:mt-3'>
      {SelectTravelesList.map((item,index) => (
        <div key={index} className='p-2 sm:p-3 border rounded-2xl bg-white hover:border-primary cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center'
        onClick={()=> onSelectOption(item.title+": "+item.people)}>

          <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{item.icon}</div>
          <h2 className="text-sm sm:text-base font-medium">{item.title}</h2>
          <p className="text-xs text-gray-500 mt-1">{item.people}</p>
        </div>
      ))}
    </div>
  )
}

export default GroupSizeUi
