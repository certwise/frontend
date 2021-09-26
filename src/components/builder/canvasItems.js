import React, { useEffect, useState, useContext } from 'react'
import Context from '../../store/context';
import { setLoading, templateActions } from '../../store'
import * as api from '../../api/templates';
import TextProperties from './textComponent/textProperties';
import ImageProperties from './imageComponent/imageProperties';

function CanvasItems() {
    const { store, dispatch } = useContext(Context)
    const [image, setImageState] = useState()
    const [imageBlob, setImageBlob] = useState()
    const items = store.templates.currentTemplate.canvas.items
    const activeItem = store.templates.currentTemplate.canvas.activeItem
    const setImage = async src => {
        let im = new window.Image()
        im.src = src
        let oldWidth = im.width
        let newWidth = window.innerHeight / 4
        let ratio = oldWidth / newWidth
        im.width = newWidth
        im.height = im.height / ratio
        const id = makeid()
        const ref = `${store.user.uid}/${store.templates.currentTemplate.id}/${id}_${imageBlob.name}`
        await api.uploadImage(imageBlob, ref)
        let p = [...items]
        p = p.map(item => {
            if (item.id === activeItem.id) {
                item['height'] = im.height
                item['width'] = im.width
                item['src'] = im
                item['storageRef'] = ref
            }
            return item
        })
        dispatch(templateActions.editCanvas(p))
        setImageState(null)
        setImageBlob(null)
    }

    const setBaseImage = async src => {
        let im = new window.Image()
        im.src = src
        const id = makeid()
        const ref = `${store.user.uid}/${store.templates.currentTemplate.id}/${imageBlob.name}_${id}.jpg`
        await api.uploadImage(imageBlob, ref)
        let p = [...items]
        p = p.map(item => {
            if (item.id === activeItem.id) {
                item['height'] = im.height
                item['width'] = im.width
                item['src'] = im
                item['storageRef'] = ref
            }
            return item
        })
        dispatch(templateActions.editCanvas(p))
        setImageState(null)
        setImageBlob(null)
    }

    const editActiveItem = (e, val) => {
        switch (val) {
            case 'val':
                {
                    let p = items
                    p.map(item => {
                        if (item.id === activeItem.id) {
                            item.value = e.target.value
                        }
                        return null
                    })
                    dispatch(templateActions.editCanvas(p))

                    break
                }
            case 'name':
                {
                    let p = items
                    p.map(item => {
                        if (item.id === activeItem.id) {
                            item.name = e.target.value
                        }
                        return null
                    })
                    dispatch(templateActions.editCanvas(p))

                    break
                }
            case 'img':
                {
                    let p = items
                    p.map(item => {
                        if (item.id === activeItem.id) {
                            item.name = e.target.value
                        }
                        return null
                    })
                    dispatch(templateActions.editCanvas(p))
                    break
                }
            case 'check':
                {
                    let p = items
                    p.map(item => {
                        if (item.id === activeItem.id) {
                            item['isConstant'] = e.target.checked
                        }
                        return null
                    })
                    dispatch(templateActions.editCanvas(p))
                    break;
                }

            default:
                break
        }
    }

    const onChangeImg = file => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImageState(reader.result)
        }
        setImageBlob(file)
    }
    // deleteActiveItem function
    const deleteActiveItem = () => {
        let p = [...items]
        let x = p.filter(item => item.id !== activeItem.id)
        dispatch(templateActions.editCanvas(x))
        dispatch(templateActions.setActiveItem({ id: 'none' }))
    }


    return (
        <div
            className='text-sm'
            onKeyDown={(e) => {
                if (e.key == 'Delete') {
                    deleteActiveItem()
                }
            }}
            style={{ margin: '4px' }}
        >

            <div className='font-bold mb-1'>
                {activeItem.name}
            </div>

            {activeItem.type === 'text' && <TextProperties />}
            {activeItem.type === 'image' && <ImageProperties />}

            {
                activeItem.type === 'base-image' ?
                    <div >
                        <div className='mb-2  font-bold'>Change Image</div>
                        <div className='border-2 border-primary p-2'>
                            <input className='mb-3 text-xs' type='file' onChange={(e) => onChangeImg(e.target.files[0])} />
                            {image ? <img className='mb-3 border-2 border-secondary ' style={{ height: '100px' }} src={image} /> : null}
                        </div>
                        <div>
                            {image ? <button className='btn btn-primary mt-2 mb-3' onClick={() => setBaseImage(image)}>Set image</button> : null}
                        </div>
                    </div> : null
            }
            {
                activeItem.id !== 'none' ?
                    <button
                        className='btn-sm rounded btn-primary mt-2  w-1/3'
                        onClick={() => {
                            dispatch(templateActions.setActiveItem({ id: 'none' }))
                            setImageState(null)
                        }
                        }>
                        Deselect
                    </button>
                    : <div className='text-red-400 font-bold'>
                        No layer is selected
                    </div>
            }
            {
                activeItem.type !== 'base-image' && activeItem.id !== 'none' &&
                <button className='btn-sm rounded btn-error mt-2 ml-3  w-1/3' onClick={deleteActiveItem}>Delete</button>
            }
        </div >
    )
}

export default CanvasItems

const makeid = () => {
    let length = 12
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }
    return result
}