import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <>

            <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content ">
                <div className="flex-1 px-2 mx-2">
                    <span className="text-3xl">
                        Certify
                    </span>
                </div>
                <div className="flex-none hidden px-2 mx-2 lg:flex">
                    <div className="flex items-stretch">
                        <Link to='/' className="btn btn-ghost btn-sm rounded-btn">
                            Home
                        </Link>
                        <Link to='/templates' className="btn btn-ghost btn-sm rounded-btn">
                            Templates
                        </Link>
                        <Link to='/certificates' className="btn btn-ghost btn-sm rounded-btn">
                            Certificates
                        </Link>
                        <Link to='/signin' className="btn btn-ghost btn-sm rounded-btn">
                            user
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
