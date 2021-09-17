import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as api from '../../api/templates'
import Context from '../../store/context.js';
import { env } from '../../config.js'
import Modal from 'react-modal'
import CreatedCertedficates from './createdCerts';
import CreateCertificate from './createCertificate';
function Certificate() {
    Modal.setAppElement(document.getElementById('root'))
    const [page, setPage] = useState(1)

    return (
        <div className='p-4'>
            {page && <div className=' flex flex-row'>
                <div className="tabs tabs-boxed">
                    <button
                        onClick={() => setPage(1)}
                        className={`tab  ${page == 1 ? 'tab-active' : ''}`}
                    >
                        Your Certificates</button>
                    <button
                        onClick={() => setPage(2)}
                        className={`tab  ${page == 2 ? 'tab-active' : ''}`}
                    >
                        Create Certificates</button>
                </div>
            </div>}
            {page === 1 && <CreatedCertedficates />}
            {page === 2 && <CreateCertificate />}
        </div>
    )
}

export default Certificate
