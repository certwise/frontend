import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import CreatedCertedficates from './createdCerts';
import UserTemplates from './userTemplates.js';
function Certificate() {
    Modal.setAppElement(document.getElementById('root'))
    const [page, setPage] = useState(1)

    return (
        <div className='p-4'>
            {page && <div className=' flex flex-row'>
                <div className="tabs">
                    <div
                        onClick={() => setPage(1)}
                        className={`tab tab-lg text-primary font-bold tab-lifted  ${page == 1 ? 'tab-active' : ''}`}
                    >
                        Your Certificates</div>
                    <div
                        onClick={() => setPage(2)}
                        className={`tab tab-lg text-primary font-bold tab-lifted  ${page == 2 ? 'tab-active' : ''}`}
                    >
                        Create Certificates</div>
                    <div
                        onClick={() => setPage(3)}
                        className={`tab tab-lg text-primary font-bold tab-lifted  ${page == 3 ? 'tab-active' : ''}`}
                    >
                        View Certificates by template</div>
                </div>
            </div>}
            {page === 1 && <CreatedCertedficates />}
            {page === 2 && <UserTemplates />}
        </div>
    )
}

export default Certificate
