import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Context from '../../store/context';
import { Container } from './cardContainer';
import { templateActions } from '../../store'
import * as api from '../../api/templates'
function CanvasLayers() {
    const { store, dispatch } = React.useContext(Context)
    const [state, setstate] = React.useState({ saved: false, isSaved: false, downloaded: false, saving: false })
    const goBack = () => {
        dispatch(templateActions.setCurrentTemplateNull())
    }
    const saveCanvas = () => {
        setstate({ ...state, saving: true })
        let currentTemplate = store.templates.currentTemplate
        console.log(currentTemplate)
        api.editTemplateItems(store.templates.currentTemplate.id, store.templates.currentTemplate.canvas.items).then(() => {
            setstate({ ...state, saved: true })
            setTimeout(() => {
                setstate({ ...state, isSaved: false, saving: false })
                dispatch(templateActions.setCurrentTemplate(currentTemplate))
            }, 2000)
            console.log(store.templates)
        })
    }
    const deleteTemplate = () => {
        api.deleteTemplate(store.templates.currentTemplate.id).then(() => window.location.reload())
    }
    const addText = () => {
        dispatch(templateActions.createTextItem('text'))

    }

    const addImg = async () => {
        api.addImg().then(res => {
            dispatch(templateActions.createImageItem(res))
        })
    }
    return (
        <div className='p-2 overflow-y-auto' >
            <div className='pt-2 pb-2
             text-2xl text-primary font-bold'>
                Layers
            </div>
            <DndProvider backend={HTML5Backend}>
                <Container />
            </DndProvider>
            <div className='flex row'>
                <button className='btn-sm btn-primary mt-1 mb-2 mr-1 w-full' onClick={addText}>Add text</button>
                <button className='btn-sm btn-primary mt-1 mb-2 ml-1 w-full' onClick={addImg} >Add Img</button>
            </div>
            <button className={`btn btn-primary m-2 w-11/12 ${state.saving ? 'loading' : ''}`} onClick={saveCanvas}>Save Template</button>
            {
                state.saved && alert("Templated successfully saved!")
            }
            <button className="btn btn-warning mt-2 m-2 w-11/12" onClick={goBack}>Exit Editor</button>
            <button className="btn btn-error m-2 w-11/12" onClick={deleteTemplate}>
                Delete Template
            </button>

        </div>
    )
}

export default CanvasLayers

const alert = (msg) => {
    return (
        <div class="alert">
            <div class="text-sm text-success">
                {msg}
            </div>
        </div>
    )
}