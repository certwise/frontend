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
                    <div>
                        <div className="border-b-2 border-gray-300 pb-2" />
                        <div className='mt-2 border-b-2 border-gray-300 pb-2'>
                            <div>
                                <span className='font-bold'>Width:</span>
                                <span className='font-bold text-primary'>{items.find(i => i.id === activeItem.id).width}</span>
                            </div>
                            <div>
                                <span className='font-bold'>Height:</span>
                                <span className='font-bold text-primary'>{items.find(i => i.id === activeItem.id).height}</span>
                            </div>
                        </div>
                        <div className='mb-2 mt-2 font-bold'>Change Image</div>

                        <div className='rounded w-full border-b-2 border-gray-300 pb-2 '>
                            <label className='btn-sm rounded btn-primary btn-outline'><img src="https://img.icons8.com/material-outlined/24/000000/add-image.png" />
                                <span className='ml-2'>Select Image</span>
                                <input
                                    className="hidden"
                                    type='file'
                                    accept='image/*'
                                    onChange={(e) => onChangeImg(e.target.files[0])}
                                />
                            </label>
                            {image ?
                                <div>
                                    <img className='border-2 border-secondary mt-2' style={{ height: '100px' }} src={image} />
                                    <div>{imageBlob.name}</div>
                                    <button className='btn-xs w-1/3 rounded btn-primary mt-2 mb-3'
                                        onClick={() => setBaseImage(image)}>Set image</button>
                                    <button className='ml-1 btn-xs w-1/3 rounded btn-error mt-2 mb-3'
                                        onClick={() => setImageState(null)}>Cancel</button>
                                </div>
                                :
                                <span className='font-bold text-md ml-2'>No image selected</span>
                            }

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