import React, { useContext, useEffect, useState } from 'react'
import * as api from '../api/templates'
import Context from '../store/context'
import { useParams } from 'react-router-dom'
import CanvasContainer from './builder/canvasContainer.js'
import { setLoading, templateActions } from '../store'
import getCurrentTemplate from './templates/getCurrentTemplate'
import { loadFontIntoCSS } from './builder/textComponent/fontLoader'
function TemplateCanvas() {
    const { store, dispatch } = useContext(Context)
    const { templateId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [isValidUrl, setIsValidUrl] = useState(true)
    useEffect(() => {
        dispatch(templateActions.isEditingTemplate(true))
        setIsLoading(true)
        api.getTemplateByName(templateId, store.user.uid)
            .then(template => {
                console.log("1920:", template)
                if (template) {
                    setIsValidUrl(true)
                    return setCurrentTemplate(template)
                }
            }).then(() => {
                setIsLoading(false)
            })
        return () => {
            dispatch(templateActions.isEditingTemplate(false))
        }
    }, [])
    const setCurrentTemplate = srcTemplate => {
        console.log("setting current template")
        return new Promise((resolve, reject) => {
            dispatch(templateActions.setCurrentTemplateNull())
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
                data.canvas.items.forEach(item => {
                    if (item.type === 'text') {
                        if (item.attr.fontFamily) {
                            loadFontIntoCSS(item.attr.fontFamily)
                        }
                    }
                })
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
                resolve()
            })
        })
    }
    return (
        <>  {isLoading && <div className='w-screen h-screen loading'>Loading</div>}
            {!isLoading && isValidUrl && <CanvasContainer />}
        </>
    )
}

export default TemplateCanvas
