import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Context from '../../store/context'
import { Container } from './layerStack/cardContainer'
import { templateActions } from '../../store'
import * as api from '../../api/templates'
function CanvasLayers() {
    const { store, dispatch } = React.useContext(Context)
    const [state, setstate] = React.useState({ saved: false, isSaved: false, downloaded: false, saving: false })
    const goBack = () => {
        dispatch(templateActions.isEditingTemplate(false))
        window.location.href = '/templates'
    }
    const saveCanvas = () => {
        setstate({ ...state, saving: true })
        let currentTemplate = store.templates.currentTemplate
        console.log(currentTemplate)
        dispatch(templateActions.downloadCurrentTemplate(true))
    }

    const addText = () => {
        dispatch(templateActions.createTextItem('text'))
    }

    const addImg = async () => {
        let base = store.templates.currentTemplate.canvas.items.find(item => item.type === 'base-image')
        api.addImg(base.width / 4, base.height / 4).then(res => {
            console.log("Add image res:", res)
            dispatch(templateActions.createImageItem(res))
        })
    }
    return (
        <div className='p-2 overflow-y-auto' >
            <div className='pt-2 pb-2 text-2xl font-bold'>
                Layers
            </div>
            <DndProvider backend={HTML5Backend}>
                <Container />
            </DndProvider>
            <div className='flex row'>
                <button className='btn-sm btn-primary rounded mt-1 mb-2 mr-1 w-full' onClick={addText}>Add text</button>
                <button className='btn-sm btn-primary rounded mt-1 mb-2 ml-1 w-full' onClick={addImg} >Add Img</button>
            </div>
            <div>
                <button className={`btn btn-primary m-2 w-11/12  ${state.saving ? 'loading' : ''}`} onClick={saveCanvas}>Save Template</button>
            </div>
            {
                state.saved && alert("Templated successfully saved!")
            }
            <div>
                <button className="btn btn-warning mt-2 m-2 w-11/12 " onClick={goBack}>Exit Editor</button>
            </div>


        </div>
    )
}

export default CanvasLayers

const alert = (msg) => {
    return (
        <div className="alert">
            <div className="text-sm text-success">
                {msg}
            </div>
        </div>
    )
}