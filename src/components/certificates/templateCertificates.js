import React, { useEffect } from 'react'

function TemplateCertificates() {
    useEffect(() => {

        return () => {

        }
    }, [input])
    return (
        <div>
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
        </div>
    )
}

export default TemplateCertificates
