import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Pricing() {
  return (
    <div className='mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-6 lg:px-8'>
        <h2 className='font-bold text-2xl sm:text-3xl my-4 sm:my-5 text-center'>AI-Powered Travel Planning</h2>
      <div className="max-w-sm sm:max-w-md mx-auto">
        <PricingTable />
      </div>
    </div>
  )
}

export default Pricing
