import React, { useEffect, useState, useContext } from 'react'
import '../../App.css'
import Context from '../../store/context.js'
import * as api from '../../api/templates'
import { templateActions, setLoading as setAppLoading } from '../../store'
import CreateTemplate from './createTemplate'
import TemplateCard from './templateCard'
function Template() {
    const { store, dispatch } = useContext(Context)
    const [templateNames, setTemplateNames] = useState([])
    const [loading, setloading] = useState({
        templates: true,
        currentTemplate: false
    })
    const [createTemplate, setCreateTemplate] = useState(false)
    const [templateQuery, setTemplateQuery] = useState('')
    useEffect(() => {
        if (loading.templates || loading.currentTemplate)
            dispatch(setAppLoading(true))
        else
            dispatch(setAppLoading(false))
    }, [loading])

    useEffect(() => {
        getUploadedTemplates()
            .then(() => {
                setloading({ ...loading, templates: false })
            })
            .catch(err => {
                setloading({ ...loading, templates: false })
                console.log(err)
            })

    }, [])


    const createTemplateForm = async () => {
        setCreateTemplate(prev => !prev)
    }
    const getUploadedTemplates = () => {
        setloading({ ...loading, templates: true })
        return new Promise((resolve, reject) => {
            console.log("UID in templates", store.user.uid)
            api.getTemplates(store.user.uid)
                .then(res => {
                    let names = []
                    res.forEach(async template => {
                        names.push(template.data.name.toLowerCase().replace(/ /g, '-'))
                    })
                    res.sort((a, b) => {
                        let da = a.data.name,
                            db = b.data.name;
                        return da - db;
                    })
                    setTemplateNames(names)
                    dispatch(templateActions.setUserTemplates(res))
                    console.log("Get templates():", res)
                    setloading({ ...loading, templates: false })

                    resolve()
                })
        })
    }
    return (
        <>

            <div>
                {
                    store.app.isLoading ?
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", alignItems: "center", height: window.innerHeight * 0.9 }}>
                            <button style={{ width: "200", height: "200" }} class="btn btn-xl btn-circle loading"></button>
                        </div>
                        :
                        <>
                            {/* <div className='mt-5 ml-5 text-4xl font-bold'>Templates</div> */}
                            <button className='btn btn-primary mt-5 ml-5' onClick={createTemplateForm}>Create New Template</button>
                            {createTemplate && <CreateTemplate uid={store.user.uid} names={templateNames} />}
                            <div className='mt-5 ml-5 text-xl font-bold'>Your Templates</div>
                            <input type='text' placeholder='Search templates by name' className='w-1/5 m-4 input input-primary' onChange={(e) => setTemplateQuery(e.target.value)} />
                            <div className="m-4">
                                {store.templates.userTemplates.map((template, i) => {
                                    if (template.data.name.includes(templateQuery))
                                        return (
                                            <TemplateCard
                                                key={i}
                                                template={template.data}
                                                id={template.id}
                                                url={''}
                                                uid={store.user.uid}
                                            />
                                        )
                                    else return null
                                })
                                }
                            </div>
                        </>
                }
            </div>

        </>
    )
}

export default Template
