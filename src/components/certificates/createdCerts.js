import React, { useEffect, useState } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as api from '../../api/templates'
import Context from '../../store/context.js';
import Modal from 'react-modal'

function CreatedCertificates() {

    Modal.setAppElement(document.getElementById('root'))
    const { store } = React.useContext(Context)
    const [currentCertificate, setCurrentCertificate] = useState({ id: null })
    const [certificates, setCertificates] = useState([])
    useEffect(() => {
        api.getCertificates(store.user.uid).then(res => {
            console.log(res.data)
            setCertificates(res)
        })
        return () => setCurrentCertificate({ id: null })
    }, [])

    const setCurrentCertificateFunc = cert => {
        let imgRef = ref(getStorage(), `${store.user.uid}/certificates/${cert.data.name}`)
        getDownloadURL(imgRef).then(url => {
            setCurrentCertificate({ cert, url })
        })
    }


    return (
        <div>
            <div className='mt-3 text-2xl text-primary'>
                Created Certificates:
                <div>
                    <div className="overflow-x-auto">
                        <table className="table w-full ">
                            <thead>
                                <tr>
                                    <th style={{ zIndex: -5 }} className=''>No</th>
                                    <th>Name of receiver</th>
                                    <th>Number of certificates</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certificates.map((cert, i) => {
                                    return (
                                        <tr
                                            key={i}
                                            className={currentCertificate.id === cert.id ? 'active' : 'hover'}
                                            onClick={() => {
                                                setCurrentCertificateFunc(cert)
                                                console.log(cert)
                                            }}

                                        >
                                            <th style={{ zIndex: -5 }}>{i + 1}</th>
                                            <td >
                                                <div >
                                                    <label className="p-3 btn btn-primary w-2/3  shadow ">{cert.data.receiverName}</label>
                                                </div>
                                            </td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>

                    <Modal
                        style={{ zIndex: 101 }}
                        onRequestClose={() => setCurrentCertificate({ id: null })}
                        onClick={() => setCurrentCertificate({ id: null })}
                        isOpen={currentCertificate.url ? true : false}
                        style={{
                            overlay: {
                                background: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                background: 'none',
                                border: 'none'
                            }
                        }}
                    >
                        <button className='btn btn-error' onClick={() => {
                            setCurrentCertificate({ id: null })
                            console.log(currentCertificate)
                        }
                        }>Close</button>
                        <div className='flex h-full flex-row justify-center'>
                            <img onClick={() => setCurrentCertificate({ id: null })}
                                className='h-full'
                                src={currentCertificate.url}
                                alt="Certificate" />
                        </div>
                    </Modal>
                </div>

            </div>
        </div>
    )
}

export default CreatedCertificates
