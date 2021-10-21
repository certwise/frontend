import { useEffect, useState, useContext } from 'react'
import '../../App.css'
import Context from '../../store/context.js'
import * as api from '../../api/templates'
import { templateActions, setLoading as setAppLoading } from '../../store'
import TemplateCard from '../templates/templateCard'

function UserTemplates() {
    const { store, dispatch } = useContext(Context)
    const [templateNames, setTemplateNames] = useState([])
    const [loading, setloading] = useState({
        templates: true,
        currentTemplate: false
    })
    const [templateQuery, setTemplateQuery] = useState('')

    useEffect(() => {
        if (store.templates.userTemplates.length === 0) {
            getUploadedTemplates()
                .then(() => {
                    setloading({ ...loading, templates: false })
                })
                .catch(err => {
                    setloading({ ...loading, templates: false })
                    console.log(err)
                })
        } else {
            setloading({ ...loading, templates: false })
        }
    }, [])

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


    return (
        <>

            <div>

                <div className='m-5  text-4xl font-bold'>Templates</div>
                <div className='m-5  text-xl font-bold'>Your Templates</div>
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
                                    type='certificate'
                                />
                            )
                        else return null
                    })
                    }
                </div>

            </div>

        </>
    )
}

export default UserTemplates
