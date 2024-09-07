import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#E1DABF] mb-0 mt-12">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div className="flex flex-wrap -m-6">
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                <div className="flex flex-col justify-between h-full">
                <div className="inline-flex items-center text-center mb-4">
                    <Logo width="100px" />
                </div>
                <div>
                    <p className="text-sm text-black">
                    &copy; Copyright 2024. All Rights Reserved by H-KEEP.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Footer