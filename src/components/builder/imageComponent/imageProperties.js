import React, { useContext, useState } from 'react'
import { templateActions } from '../../../store'
import Context from '../../../store/context'
import * as api from '../../../api/templates'
function ImageProperties() {
    const { store, dispatch } = useContext(Context)
    const items = store.templates.currentTemplate.canvas.items
    const activeItem = store.templates.currentTemplate.canvas.activeItem
    const [image, setImageState] = useState()
    const [imageBlob, setImageBlob] = useState()

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
    const editActiveItem = (e, val) => {
        switch (val) {
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
    return (
        <div>
            <div className='border-b-2 pb-1 border-gray-300'>
                {
                    activeItem.type !== 'base-image' && activeItem.id !== 'none' &&

                    <label className="cursor-pointer label">
                        <span className="label-text">Is this field constant?</span>
                        <input className='checkbox checkbox-sm checkbox-primary ml-2 mr-auto'
                            type='checkbox'
                            defaultChecked={items.find(i => i.id === activeItem.id).isConstant}
                            onChange={(e) => editActiveItem(e, 'check')} />
                    </label>
                }
            </div>
            <div className=' font-bold mt-1 border-b-2 pb-2 border-gray-300'>
                <label className='mt-2 w-1/6 p-1'>x</label>
                <input
                    type='number'
                    className='mt-1 input-xs w-2/6 input  input-primary'
                    value={parseInt(items.find(item => item.id === activeItem.id).x)}
                    onChange={(e) => {
                        let p = [...items]
                        p.map(item => {
                            if (item.id === activeItem.id) {
                                item.x = parseFloat(e.target.value)
                            }
                            return item

                        })
                        dispatch(templateActions.editCanvas(p))
                    }}
                />
                <label className='mt-1 w-1/6 ml-2 p-1'>y</label>
                <input
                    type='number'
                    className='mt-1 input-xs w-2/6 input  input-primary'
                    value={parseInt(items.find(item => item.id === activeItem.id).y)}
                    onChange={(e) => {
                        let p = [...items]
                        p.map(item => {
                            if (item.id === activeItem.id) {
                                item.y = parseFloat(e.target.value)
                            }
                            return item
                        })
                        dispatch(templateActions.editCanvas(p))
                    }}
                />
            </div>
            <div className=' font-bold  border-b-2 pb-2 pt-1 border-gray-300'>
                <label className='mt-1 w-2/6 '>Name</label>
                <input className='mt-1 input-xs w-4/6 input ml-2 input-primary'
                    value={items.find(item => item.id === activeItem.id).name}
                    onChange={(e) => editActiveItem(e, 'img')}
                />
            </div>
            <div className=' font-bold  border-b-2 pb-2 pt-1 border-gray-300'>
                <label className='mt-2 w-2/6 '>Opacity</label>
                <input
                    style={{ height: '80' }}
                    defaultValue={items.find(item => item.id === activeItem.id).opacity * 100 || 100}
                    type="range"
                    min={1}
                    max={100}
                    className="range pt-1 range-xs range-primary ml-2 mt-1 w-2/3"
                    onChange={(e) => {
                        let p = [...items]
                        p.map(item => {
                            if (item.id === activeItem.id) {
                                item['opacity'] = parseInt(e.target.value) / 100
                            }
                            return item
                        })
                        dispatch(templateActions.editCanvas(p))
                    }} />
            </div>
            <div className=' font-bold  border-b-2 pb-2 pt-1 border-gray-300'>
                <label className='mt-2 w-2/6 '>Rotation</label>
                <input
                    style={{ height: '80' }}
                    defaultValue={items.find(item => item.id === activeItem.id).rotation * 100 || 100}
                    type="range"
                    min={0}
                    max={360}
                    className="range pt-1 range-xs range-primary ml-2 mt-1 w-2/3"
                    onChange={(e) => {
                        let p = [...items]
                        p.map(item => {
                            if (item.id === activeItem.id) {
                                item['rotation'] = parseInt(e.target.value)
                            }
                            return item
                        })
                        dispatch(templateActions.editCanvas(p))
                    }} />
            </div>
            <div className='mb-2  font-bold'>Change Image</div>

            <div className='p-2 rounded w-full border-2 border-primary '>
                <input className='text-sm' type='file' onChange={(e) => onChangeImg(e.target.files[0])} />
                {image ? <img style={{ height: '100px' }} src={image} /> : null}
                <div>
                    <button className='btn-sm rounded btn-primary mt-2 mb-3' onClick={() => setImage(image)}>Set image</button>
                </div>
            </div>
        </div>
    )
}

export default ImageProperties

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