import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <>
            <div className="navbar pd-2 shadow-lg ">
                <div className="flex-1 px-2 mx-2">
                    <span className="text-3xl">
                        Certify
                    </span>
                </div>
                <div className="flex-none hidden px-2 mx-2 lg:flex">
                    <div className="flex items-stretch">
                        <Link to='/' className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium">
                            Home
                        </Link>
                        <Link to='/templates' className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium">
                            Templates
                        </Link>
                        <Link to='/certificates' className="m-2 text-sm  uppercase hover:bg-gray-200 p-2 rounded-md font-medium">
                            Certificates
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
