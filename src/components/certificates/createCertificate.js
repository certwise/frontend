import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as api from '../../api/templates'
import { env } from '../../config.js'
import Context from '../../store/context';


function CreateCertificate() {

    const { store } = React.useContext(Context)
    const [fields, setfields] = useState({})
    const [receiverName, setReceiverName] = useState(null)
    const [email, setEmail] = useState(null)
    const [templates, setTemplates] = useState([])
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const getTemplates = () => {
        api.getTemplates(store.user.uid).then(res => {
            setTemplates(res)
        })
    }
    useEffect(() => {
        api.getTemplates(store.user.uid).then(res => {
            setTemplates(res)
        })
    }, [])
    const setFieldsFromSelectedTemplate = template => {
        let url = `${env.url}/template/fields/${template.id}`
        axios.get(url).then(res => {
            setSelectedTemplate({ fields: res.data, template: template })
            console.log("axiosdata", selectedTemplate)
        })
    }
    const createCertificate = (e) => {
        e.preventDefault()
        let req = {
            uid: store.user.uid,
            templateId: selectedTemplate.id,
            receiverName,
            receiverEmail: email,
            fields: fields
        }
        let urls = `${env.url}/certificate/one`
        console.log(urls)
        axios.post(urls, req)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log("Error:", err)
            })
    }
    return (
        <div>
            {
                templates &&
                <div>
                    {templates.map(template => {
                        return (
                            <div key={template.id}>
                                <div className='text-3xl font-bold p-2 text-primary mt-4'>{template.data.name}</div>
                                <button className='btn btn-primary' onClick={() => {
                                    setFieldsFromSelectedTemplate(template)
                                }}>Create certificate from {template.data.name}</button>
                            </div>
                        )
                    }
                    )}
                </div>
            }
            {
                selectedTemplate &&
                <div>
                    <form className='mt-5 p-2 border-2 border-primary w-1/2'>
                        <div className='text-3xl font-bold p-2 text-primary mt-4'>Fill fields of {selectedTemplate.template.data.name}:</div>
                        <div className='m-2  '>
                            <div className='text-xl font-bold ml-1 text-primary'>
                                <label className='w-5'>Name of receiver</label>
                            </div>
                            <input className='input  border-2 border-primary' type="text" placeholder="Name"
                                onChange={(e) => {
                                    setReceiverName(e.target.value)
                                }}
                            />
                        </div>
                        <div className='m-2  '>
                            <div className='text-xl font-bold ml-1 text-primary'><label className='w-5'>Email of receiver</label></div>
                            <input className=' input  border-2 border-primary' type="text" placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                        {
                            selectedTemplate.fields.map(field => {
                                return (
                                    <div
                                        className='m-2 '
                                        key={field}>
                                        <div className='text-xl font-bold ml-1 text-primary'>
                                            <label className='w-screen'>{field}</label>
                                        </div>
                                        <input className=' input  border-2 border-primary'
                                            type="text"
                                            placeholder={field}
                                            onChange={(e) => {
                                                setfields({ ...fields, [field]: e.target.value })
                                            }}
                                        />
                                    </div>
                                )
                            })
                        }
                        <button className='m-5 btn btn-primary' onClick={(e) => createCertificate(e)}>Create certificate</button>
                    </form>
                </div >
            }
        </div>
    )
}

export default CreateCertificate
