import React, { useEffect, useState, useContext } from 'react'
import '../../App.css'
import Context from '../../store/context.js'
import * as api from '../../api/templates'
import { templateActions, setLoading as setAppLoading } from '../../store'
import getCurrentTemplate from './getCurrentTemplate'
import CreateTemplate from './createTemplate'
import { loadFontIntoCSS } from '../builder/fontLoader'
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
        console.log("Loadingxrw:", loading)
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
            let templates = []
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

    const setCurrentTemplate = srcTemplate => {
        dispatch(templateActions.setCurrentTemplateNull())
        setloading({ ...loading, currentTemplate: true })
        let { id, data } = srcTemplate
        getCurrentTemplate(data.canvas.items).then(res => {
            for (let i in res) {
                let imgItem = res[i]
                data.canvas.items.map(item => {
                    if (item.id === imgItem.id)
                        return imgItem
                    else
                        return item

                })
                data.canvas.items.forEach(item => {
                    if (item.type === 'text') {
                        if (item.attr.fontFamily) {
                            loadFontIntoCSS(item.attr.fontFamily)
                        }
                    }
                })
            }
            let template = {
                id,
                ...data,
                canvas: {
                    ...data.canvas,
                    items: data.canvas.items,
                    activeItem: data.canvas.items[0]
                },
            }
            dispatch(templateActions.setCurrentTemplate(template))
            console.log(store.templates)
            setloading({ ...loading, currentTemplate: false })
        })
    }


    return (
        <>

            <div>
                {
                    store.app.isLoading ? <h1 className="text-xl">Loading...</h1> :
                        <>
                            <div className='m-5 text-4xl font-bold'>Templates</div>
                            <button className='btn btn-primary m-5' onClick={createTemplateForm}>Create New Template</button>
                            {createTemplate && <CreateTemplate uid={store.user.uid} names={templateNames} />}
                            <div className='m-5  text-xl font-bold'>Your Templates</div>
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
