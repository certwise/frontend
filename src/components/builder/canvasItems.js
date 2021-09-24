import React, { useEffect, useState, useContext } from 'react'
import Context from '../../store/context';
import { setLoading, templateActions } from '../../store'
import * as api from '../../api/templates';
import { loadFonts, loadFontFromCSS } from './fontLoader'
import { setActiveItem } from '../../store/templates/actions';
import FontSelector from './fontSelector';


function CanvasItems() {
    const { store, dispatch } = useContext(Context)
    const [image, setImageState] = useState()
    const [imageBlob, setImageBlob] = useState()
    const [numberOfFonts, setNumberOfFonts] = useState(100)
    const items = store.templates.currentTemplate.canvas.items
    const activeItem = store.templates.currentTemplate.canvas.activeItem
    const [isFontsOpen, setIsFontsOpen] = useState(false)
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
        console.log(ref)
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
    useEffect(() => {
        dispatch(templateActions.setFontsLoading(true))
        loadFonts('popularity').then(fonts => {
            fonts = fonts.slice(0, numberOfFonts)
            for (let i in fonts) {
                try {
                    let apiUrl = [];
                    apiUrl.push('https://fonts.googleapis.com/css?family=');
                    apiUrl.push(fonts[i].family.replace(/ /g, '+'));
                    var url = apiUrl.join('');
                    let style = document.createElement('link');
                    style.href = url;
                    style.rel = 'stylesheet';
                    document.head.appendChild(style);
                }
                catch {
                    console.log('font error')
                }
            }
            dispatch(templateActions.setFonts(fonts))
            dispatch(templateActions.setFontsLoading(false))
        })
    }, [numberOfFonts])

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
            className=''
            onKeyDown={(e) => {
                if (e.key == 'Delete') {
                    deleteActiveItem()
                }
            }}

            style={{ margin: '8px' }}>

            <div className=' font-bold mb-2'>
                {activeItem.name}
            </div>
            <div className='border-b-2 pb-3 border-gray-300'>
                {
                    activeItem.type !== 'base-image' && activeItem.id !== 'none' &&

                    <label className="cursor-pointer label">
                        <span className="label-text">Is this field constant?</span>
                        <input className='checkbox checkbox-md checkbox-primary ml-2 mr-auto' type='checkbox' defaultChecked={items.find(i => i.id === activeItem.id).isConstant} onChange={(e) => editActiveItem(e, 'check')} />
                    </label>
                }
            </div>
            {
                activeItem.type === 'text' ?
                    <div style={{ marginTop: "5px" }}>
                        <div className=' font-bold   border-b-2 pb-3 border-gray-300'>
                            <label className='mt-2'>Name of field</label>
                            <input className='mt-2 input-sm input ml-2 input-primary'
                                value={items.find(item => item.id === activeItem.id).name}
                                onChange={(e) => editActiveItem(e, 'name')}
                            />
                        </div>
                        <div className='mt-3 font-bold border-b-2 pb-3 border-gray-300'>
                            <label className='align-top'>Text to display</label>
                            <textarea className='input-sm input ml-2 input-primary'
                                type='textarea'
                                value={items.find(item => item.id === activeItem.id).value}
                                onChange={(e) => editActiveItem(e, 'val')}
                            />
                        </div>
                        <div className=' font-bold border-b-2 pb-1 border-gray-300 ' >
                            <label className=' align-top'> Font Color
                                <input className='align-middle m-2 mb-1' type="color" defaultValue={activeItem.fill || activeItem.color}
                                    onChangeCapture={(e) => {
                                        let p = [...items]
                                        p.map(item => {
                                            if (item.id === activeItem.id) {
                                                item['fill'] = e.target.value
                                                item['color'] = e.target.value
                                            }
                                            return item
                                        })
                                        dispatch(templateActions.editCanvas(p))
                                    }}
                                //onChangeCapture
                                />
                            </label>

                        </div>
                        <div className='font-bold  border-b-2 pb-3 border-gray-300' >Font Size
                            <input className='input-sm input ml-2 mt-3 input-sm input-primary'
                                type='number' min='6' max='400' defaultValue={activeItem.attr.fontSize || 25}
                                onChange={
                                    (e) => {
                                        let p = [...items]
                                        p.map(item => {
                                            if (item.id === activeItem.id) {
                                                item['attr']['fontSize'] = e.target.value
                                            }
                                            return item
                                        })
                                        dispatch(templateActions.editCanvas(p))
                                    }}
                            />
                        </div>
                        <div className=' mt-2 mb-2 border-b-2 pb-2 border-gray-300 ' style={{ overflow: "hidden" }}>
                            <button className='btn-sm btn-primary'
                                onClick={() => { setIsFontsOpen(i => !i) }}>Font Families</button>
                            <FontSelector
                                isOpen={isFontsOpen}
                                close={() => { setIsFontsOpen(false) }}
                                fonts={store.templates.fonts}
                                styles={{ width: '450px', height: window.innerHeight }}
                                activeItem={activeItem}
                                items={items}
                                loadMoreFonts={() => setNumberOfFonts(prev => prev + 30)}

                            />
                        </div>

                        <div className='font-bold  border-b-2 pb-4 border-gray-300'>
                            <label className='pb-2 mr-2 align-middle'>Align</label>
                            <button
                                className={`btn-ghost rounded p-1 bg-gray-200 ${items.find(i => i.id === activeItem.id).attr.align === 'left' ? 'border-b-2 border-red-500' : ''}`}
                                onClick={() => {
                                    let p = [...items]
                                    p.find(item => item.id === activeItem.id).attr.align = 'left'
                                    dispatch(templateActions.editCanvas(p))
                                }}
                            ><img style={{ height: "20px" }} src="https://img.icons8.com/material/48/000000/align-left--v2.png" /></button>
                            <button
                                className={`btn-ghost rounded p-1 bg-gray-200 ml-2 ${items.find(i => i.id === activeItem.id).attr.align === 'center' ? 'border-b-2 border-red-500' : ''}`}
                                onClick={() => {
                                    let p = [...items]
                                    p.find(item => item.id === activeItem.id).attr.align = 'center'

                                    dispatch(templateActions.editCanvas(p))

                                }}
                            ><img style={{ height: "20px" }} src="https://img.icons8.com/material/48/000000/align-center--v1.png" /></button>
                            <button
                                className={`btn-ghost rounded p-1 bg-gray-200 ml-2 ${items.find(i => i.id === activeItem.id).attr.align === 'right' ? 'border-b-2 border-red-500' : ''}`}
                                onClick={() => {
                                    let p = [...items]
                                    p.find(item => item.id === activeItem.id).attr.align = 'right'
                                    dispatch(templateActions.editCanvas(p))

                                }}
                            ><img style={{ height: "20px" }} src="https://img.icons8.com/material/48/000000/align-right--v1.png" /></button>
                        </div>

                    </div> : null
            }

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
                activeItem.type === 'image' ?

                    <div>
                        <div className='mb-2  font-bold'>Image name:</div>
                        <div >
                            <input className='input input-primary mb-3' defaultValue={activeItem.name}
                                onChange={(e) => editActiveItem(e, 'img')}
                            />
                        </div>
                        <div className='mb-2  font-bold'>Change Image</div>

                        <div className='p-2 rounded w-full border-2 border-primary '>
                            <input className='text-sm' type='file' onChange={(e) => onChangeImg(e.target.files[0])} />
                            {image ? <img style={{ height: '100px' }} src={image} /> : null}
                            <div>
                                <button className='btn-sm rounded btn-primary mt-2 mb-3' onClick={() => setImage(image)}>Set image</button>
                            </div>
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