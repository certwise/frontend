import { getDownloadURL, getStorage, ref } from '@firebase/storage'
import React, { useState } from 'react'
import moment from 'moment'
import { deleteTemplate, renameTemplate } from '../../api/templates'

function TemplateCard({ template, uid, id, type }) {
    const [url, seturl] = React.useState('')
    React.useEffect(() => {
        getDownloadURL(ref(getStorage(), `${uid}/templates/${id}/example/template_image.jpeg`))
            .then(
                urls => seturl(urls)
            ).catch(async () => {
                let def = await getDownloadURL(ref(getStorage(), `default_template_images/base.jpg`))
                seturl(def)
            })

    }, [])
    const [isRenaming, setisRenaming] = useState(false)
    const [name, setname] = useState(template.name)
    return (
        <>
            <div className="card shadow-lg border-2 border-gray-300 flex flex-row mt-5 mb-6">
                <div className='m-2 '>
                    <Image url={url} name={template.name} />
                </div>
                <div className="w-3/12 card-body place-items-center place-content-center">
                    {!isRenaming ? <div className='card-title '>
                        {name}
                        <button className='btn-xs'
                            onClick={() => setisRenaming(true)}
                        >
                            {!type && <img style={{ width: 20 }}
                                src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-edit-interface-kiranshastry-lineal-kiranshastry-2.png"
                            />}
                        </button>
                    </div>
                        :
                        <div>
                            <input className='input input-primary mb-1' type='text' defaultValue={name} onChange={e => setname(e.target.value)} />
                            <button className='btn-xs btn-primary ml-3 rounded' onClick={async () => {
                                await renameTemplate(id, name)
                                setisRenaming(false)
                            }}>Rename</button>
                            <button className='btn-xs btn-error ml-1 rounded' onClick={() => { setisRenaming(false); setname(template.name) }} >Cancel</button>
                        </div>
                    }
                    <div className='place-items-center place-content-center'>
                        <div>
                            {type !== 'certificate' ?
                                <button
                                    className='btn-sm btn-primary m-1 mt-3 rounded w-full'
                                    onClick={
                                        () => { window.location.href = '/template/' + template.name.toLowerCase().replace(/\s/g, '') }
                                    }
                                >Edit
                                </button>
                                :
                                <button
                                    className='btn-sm btn-primary m-1 mt-3 rounded w-full'
                                    onClick={
                                        () => { window.location.href = '/certificate/' + 'create/' + template.name.toLowerCase().replace(/\s/g, '') }
                                    }
                                >Create Certificate
                                </button>
                            }
                        </div>
                        <div data-tip={template.description} className="tooltip tooltip-right">
                            <button className="btn-xs btn-info m-1 rounded w-full">Description</button>

                        </div>
                    </div>
                </div>

                <div className="w-full shadow stats">
                    <div className="stat place-items-center place-content-center">
                        <div className="stat-title">Number of Certificates</div>
                        <div className="stat-value mb-5">{template.numberOfCertificates || 0}</div>
                        <div className="stat-desc font-bold">Created at: {moment(template.createdAt).format("DD MMM YYYY HH:mm:ss")}</div>
                    </div>
                    <div className="stat place-items-center place-content-center">
                        <div className="stat-title">Current Plan</div>
                        <div className="stat-value text-success">Free tier</div>
                        <div className="stat-desc text-success"></div>
                    </div>
                    {type !== 'certificate' && <div className="stat place-items-center place-content-center">
                        <div
                            className="btn btn-error"
                            onClick={() => {
                                deleteTemplate(id).then(() => window.location.reload())
                            }}
                        >Delete</div>
                        <div className="stat-value text-error"></div>
                        <div className="stat-desc text-error"></div>
                    </div>}
                </div>
            </div >
        </>
    )
}

export default TemplateCard

const Image = (props) => {
    const [loaded, setLoaded] = useState(false)
    const [ratio, setRatio] = useState()
    let img = document.createElement('img')
    img.src = props.url
    img.onload = () => {
        setTimeout(() => setLoaded(true), 700)
        setRatio(img.width / img.height)
    }
    return <div >
        {loaded && loaded ?
            <div style={{ minHeight: window.innerHeight / 3.7 }} className="w-72 flex flex-row mt-5 mb-6">
                <div className='flex align-center justify-center'>
                    <img
                        className='object-scale-down'
                        src={props.url} alt={props.name} />
                </div>
            </div>
            :
            <div style={{ minHeight: window.innerHeight / 3.7 }} className="w-72 flex flex-row mt-5 mb-6">
                <div className='flex align-center justify-center'>
                    <button className="btn btn-primary btn-lg btn-circle loading m-5" />
                </div>
            </div>
        }
    </div>
}