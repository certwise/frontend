import React, { useState, useEffect } from 'react'
import * as api from '../../api/templates'
function CreateTemplate(props) {
    const { names, uid } = props
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isValid, setIsvalid] = useState(false)
    const createTemplate = async () => {
        const names = await api.getCertificateNames(uid)
        if (name in names) {
            setIsvalid(false)
        } else {
            const info = {
                uid,
                name,
                description,
            }
            const res = await api.createTemplate(info)
            console.log(res)
            window.location.reload()
        }
    }
    useEffect(() => {
        if (names.includes(name.toLowerCase().replace(/ /g, '-')) || name.length < 5) {
            setIsvalid(false)
        } else {
            setIsvalid(true)
        }
    }, [name])
    return (
        <div className='w-1/3 m-4 border-2 rounded-xl border-primary p-3'>
            <div class="form-control ">
                <label class="label">
                    <span class="label-text">Template Name</span>
                </label>
                <input type="textarea" onChange={e => setName(e.target.value)} placeholder="Template name" class="input input-primary input-bordered" />
                <label class="label">
                    <span class="label-text">Template Description</span>
                </label>
                <textarea type="text" onChange={e => setDescription(e.target.value)} placeholder="Template description" class="input input-primary input-bordered" />
            </div>
            <button onClick={() => createTemplate()} className="btn btn-primary mt-4" disabled={!isValid}>Create Template</button>
            {!isValid && <div class="text-sm text-red">Invalid template name.</div>}
        </div>
    )
}

export default CreateTemplate
