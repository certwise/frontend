import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as api from '../../api/templates'
import { env } from '../../config.js'
import Context from '../../store/context';
import TemplateCard from '../templates/templateCard';
import { useParams } from 'react-router';


function CreateCertificate() {

    const { store } = React.useContext(Context)
    const [fields, setfields] = useState({})
    const [receiverName, setReceiverName] = useState(null)
    const [email, setEmail] = useState(null)
    const [template, setTemplate] = useState()
    const [templateFields, setTemplateFields] = useState([])
    const { name } = useParams()
    useEffect(() => {
        api.getTemplateByName(name).then(res => {
            setTemplate(res)
            console.log("Template:", res)
            let url = `${env.url}/template/fields/${res.id}`
            return axios.get(url)
        }).then(fields => {
            console.log("axios data:", fields.data)
            setTemplateFields(fields.data)
        }).catch(err => {
            console.log(err)
        })

    }, [])
    const createCertificate = (e) => {
        e.preventDefault()
        let req = {
            uid: store.user.uid,
            templateId: template.id,
            receiverName,
            receiverEmail: email,
            fields: fields,
        }
        let urls = `${env.url}/certificate/one`
        console.log("create certificate:", urls, req)
        axios.post(urls, req)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log("Error:", err)
            })
    }
    return (
        <div>
            {templateFields && template &&
                <div>
                    <form className='mt-5 p-2 border-2 border-primary w-1/2'>
                        <div className='text-3xl font-bold p-2 text-primary mt-4'>Fill fields of {template.data.name || name}:</div>
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
                            templateFields.map(field => {
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
