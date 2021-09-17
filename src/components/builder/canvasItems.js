import React, { useEffect, useState, useContext } from 'react'
import Context from '../../store/context';
import { setLoading, templateActions } from '../../store'
import * as api from '../../api/templates';
import { loadFonts } from './fontLoader'


function CanvasItems() {
    const { store, dispatch } = useContext(Context)
    const [image, setImageState] = useState()
    const [imageBlob, setImageBlob] = useState()
    const [numberOfFonts, setNumberOfFonts] = useState(25)
    const items = store.templates.currentTemplate.canvas.items
    const activeItem = store.templates.currentTemplate.canvas.activeItem
    const [isLoading, setIsLoading] = useState(true)
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
        dispatch(setLoading(true))
        loadFonts('popularity').then(fonts => {
            for (let i in fonts) {
                let apiUrl = [];
                apiUrl.push('https://fonts.googleapis.com/css?family=');
                apiUrl.push(fonts[i].family.replace(/ /g, '+'));
                var url = apiUrl.join('');
                let style = document.createElement('link');
                style.href = url;
                style.rel = 'stylesheet';
                //console.log("Styleee:", style)
                document.head.appendChild(style);
            }
            dispatch(templateActions.setFonts(fonts))
            dispatch(setLoading(false))
        })
    }, [])
    const editActiveItem = (e, val) => {
        switch (val) {
            case 'val':
                {
                    let p = items
                    p.map(item => {
                        if (item.id === activeItem.id) {
                            item.value = e.target.value
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
            className='text-black'
            onKeyDown={(e) => {
                if (e.key == 'Delete') {
                    deleteActiveItem()
                }
            }}

            style={{ margin: '8px' }}>

            <div className='text-2xl mb-1 font-bold text-primary'>Layer</div>
            <div className='text-primary font-bold mb-2'>
                {activeItem.name}
            </div>
            <div className='border-b-2 pb-3 border-gray-400'>
                {
                    activeItem.type !== 'base-image' && activeItem.id !== 'none' &&
                    <div>
                        Is this field constant?
                        <input type='checkbox' defaultChecked={activeItem.isConstant || true} onChange={(e) => editActiveItem(e, 'check')} />
                    </div>
                }
            </div>
            {
                activeItem.type === 'text' ?
                    <div style={{ marginTop: "5px" }}>
                        <div className=' font-bold text-primary border-b-2 pb-3 border-gray-400'>
                            <div>Name of field</div>
                            <input style={{ padding: "5px" }} defaultValue={activeItem.name}
                                onChange={(e) => editActiveItem(e, 'val')}
                            />
                        </div>
                        <div className=' font-bold border-b-2 pb-1 border-gray-400 text-primary' style={{ marginTop: "9px" }}>Font Color :
                            <div className='m-2'>
                                <input type="color" defaultValue={activeItem.color}
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
                            </div>

                        </div>
                        <div className='font-bold text-primary border-b-2 pb-4 border-gray-400' style={{ marginTop: "5px" }}>Font Size :
                            <input className='number' type='number' min='6' max='400' defaultValue={activeItem.attr.fontSize || 25}
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
                        <div className='text-primary mt-2 mb-2 ' style={{ overflow: "hidden" }}>
                            <div className='font-bold'>Fonts</div>
                            <ul
                                tabindex="0"
                                className="p-3 text-black shadow menu dropdown-content bg-gray-300  w-full"
                                style={{ height: "200px", overflow: "auto", paddingRight: "16px" }}
                            >
                                {
                                    store.templates.fonts.slice(0, numberOfFonts).map((font, i) => {
                                        return <li
                                            key={i}
                                            style={{ fontFamily: font.family }}
                                            onChange={(e) => { }}
                                            onClick={() => {
                                                let p = [...items]
                                                p.map(item => {
                                                    if (item.id === activeItem.id) {
                                                        item['attr'] = {
                                                            ...item.attr,
                                                            fontFamily: font.family,
                                                            fileLink: font.files.regular
                                                        }
                                                    }
                                                    return item
                                                })
                                                dispatch(templateActions.editCanvas(p))

                                            }}>{font.family} </li>
                                    })
                                }
                                <li>
                                    <button className='btn-xs rounded m-2 btn-primary' onClick={() => setNumberOfFonts(prev => prev + 25)}>Load more fonts</button>
                                </li>
                            </ul>

                        </div>
                    </div> : null
            }

            {
                activeItem.type === 'base-image' ?
                    <div >
                        <div className='mb-2 text-primary font-bold'>Change Image</div>
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
                        <div >Image name
                            <input style={{ padding: "5px" }} defaultValue={activeItem.name}
                                onChange={(e) => editActiveItem(e, 'img')}
                            />
                        </div>
                        <div className='mb-2 text-primary font-bold'>Change Image</div>

                        <div className='p-2 rounded w-full border-2 border-primary '>
                            <input className='text-sm' type='file' onChange={(e) => onChangeImg(e.target.files[0])} />
                            {image ? <img style={{ height: '100px' }} src={image} /> : null}
                            <div>
                                <button className='btn btn-primary mt-2 mb-3' onClick={() => setImage(image)}>Set image</button>
                            </div>
                        </div>
                    </div> : null
            } {
                activeItem.type !== 'base-image' && activeItem.id !== 'none' ?
                    <div><button className='btn btn-primary mt-2  w-1/2' onClick={deleteActiveItem}>Delete</button></div> : null
            }
            {
                activeItem.id !== 'none' ?
                    <div>
                        <button
                            className='btn btn-primary mt-2  w-1/2'
                            onClick={() => {
                                dispatch(templateActions.setActiveItem({ id: 'none' }))
                                setImageState(null)
                            }
                            }>
                            Deselect
                        </button>
                    </div>
                    : <div className='text-red-400 font-bold'>
                        No layer is selected
                    </div>

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