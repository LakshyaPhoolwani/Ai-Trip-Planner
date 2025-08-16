import React from 'react'
export const SelectBudgetOptions = [

    {

        id: 1,

        title: 'Cheap',

        desc: 'Stay conscious of costs',

        icon: '💵',

        color: 'bg-green-100 text-green-600'

    },

    {

        id: 2,

        title: 'Moderate',

        desc: 'Keep cost on the average side',

        icon: '💰',

        color: 'bg-yellow-100 text-yellow-600'

    },

    {

        id: 3,

        title: 'Luxury',

        desc: 'Don’t worry about cost',

        icon: '💸',

        color: 'bg-purple-100 text-purple-600'

    },

]


function BudgetUi({ onSelectOption = (v: string) => {} }: { onSelectOption?: any }) {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 items-center mt-2 sm:mt-3'>
            {SelectBudgetOptions.map((item,index) => (
              <div key={index} className='p-3 sm:p-4 border rounded-2xl bg-white hover:border-primary cursor-pointer flex flex-col items-center text-center transition-all hover:shadow-md'
              onClick={()=> onSelectOption(item.title+": "+item.desc)}>

                <div className={`text-2xl sm:text-3xl p-2 sm:p-3 rounded-full ${item.color}`}>{item.icon}</div>
                <h2 className='text-base sm:text-lg font-semibold mt-2'>{item.title}</h2>
                <p className='text-xs sm:text-sm text-gray-500 mt-1'>{item.desc}</p>
              </div>
            ))}
          </div>
    </div>
  )
}

export default BudgetUi
