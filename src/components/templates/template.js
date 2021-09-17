import React, { useEffect, useState, useContext } from 'react'
import '../../App.css'
import Context from '../../store/context.js'
import * as api from '../../api/templates'
import { templateActions, setLoading as setAppLoading } from '../../store'
import CanvasContainer from '../builder/canvasContainer'
import getCurrentTemplate from '../getCurrentTemplate'
import CreateTemplate from './createTemplate'
function Template() {
    const { store, dispatch } = useContext(Context)
    const [templateNames, setTemplateNames] = useState([])
    const [loading, setloading] = useState({
        templates: true,
        currentTemplate: false
    })
    const [isEditing, setIsEditing] = useState(false)
    const [createTemplate, setCreateTemplate] = useState(false)
    useEffect(() => {
        if (loading.templates || loading.currentTemplate)
            dispatch(setAppLoading(true))
        else
            dispatch(setAppLoading(false))
        console.log("Loadingxrw:", loading)
    }, [loading])

    useEffect(() => {
        getUploadedTemplates()
            .then(() => setloading({ ...loading, templates: false }))
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
                    res.forEach(template => {
                        names.push(template.data.name.toLowerCase().replace(/ /g, '-'))
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
            setIsEditing(true)
            setloading({ ...loading, currentTemplate: false })
        })

    }

    return (
        <>
            {store.templates.currentTemplate.id && isEditing ?
                <div>
                    {/* <button className='btn-xs btn-primary' onClick={() => setIsEditing(false)}>
                        Go back to Templates
                    </button> */}
                    <CanvasContainer />
                </div>
                :
                <div>
                    {
                        store.app.isLoading ? <h1 className="text-xl">Loading...</h1> :
                            <>
                                <button className='btn btn-primary m-3' onClick={createTemplateForm}>Create Template</button>
                                {createTemplate && <CreateTemplate uid={store.user.uid} names={templateNames} />}
                                <div>
                                    <div class="overflow-x-auto">
                                        <table class="table w-full ">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Number of certificates</th>
                                                    <th>Cost</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {store.templates.userTemplates.map((template, i) => {
                                                    return (
                                                        <tr
                                                            className={store.templates.currentTemplate.id === template.id ? 'active' : 'hover'}
                                                            onClick={() => setCurrentTemplate(template)}
                                                        >
                                                            <th>{i + 1}</th>
                                                            <td>
                                                                <button className='btn btn-neutral'>
                                                                    {template.data.name}
                                                                </button>
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
                            </>
                    }
                </div>
            }
        </>
    )
}

export default Template
