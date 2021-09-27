import React, { useContext, useEffect, useState } from 'react'
import { templateActions } from '../../../store'
import Context from '../../../store/context'
import { loadFonts } from './fontLoader'
import FontSelector from './fontSelector'

function TextProperties() {
    const { store, dispatch } = useContext(Context)
    const items = store.templates.currentTemplate.canvas.items
    const activeItem = store.templates.currentTemplate.canvas.activeItem
    const [isFontsOpen, setIsFontsOpen] = useState(false)
    const [numberOfFonts, setNumberOfFonts] = useState(100)
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
    return (
        <div>
            {
                activeItem.type === 'text' ?
                    <div style={{ marginTop: "5px" }}>
                        <div className='border-b-2 pb-1 border-gray-100'>
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
                        <div className=' font-bold mt-1 border-b-2 pb-2 border-gray-100'>
                            <label className='mt-1 w-1/6 p-1'>x</label>
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
                        <div className=' font-bold  border-b-2 pb-2 pt-1 border-gray-100'>
                            <label className='mt-2 w-2/6 '>Opacity</label>
                            <input
                                style={{ height: '80' }}
                                defaultValue={items.find(item => item.id === activeItem.id).attr.opacity * 100 || 100}
                                type="range"
                                min={1}
                                max={100}
                                className="range pt-1 range-xs range-primary ml-2 mt-1 w-2/3"
                                onChange={(e) => {
                                    let p = [...items]
                                    p.map(item => {
                                        if (item.id === activeItem.id) {
                                            item.attr['opacity'] = parseInt(e.target.value) / 100
                                        }
                                        return item
                                    })
                                    dispatch(templateActions.editCanvas(p))
                                }} />
                        </div>
                        {/* <div className=' font-bold  border-b-2 pb-2 pt-1 border-gray-100'>
                            <label className='mt-2 w-2/6 '>Rotation</label>
                            <input
                                style={{ height: '80' }}
                                value={items.find(item => item.id === activeItem.id).rotation || 0}
                                type="range"
                                min={0}
                                max={360}
                                className="range pt-1 range-xs range-primary ml-2 mt-1 w-2/3"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    let p = [...items]
                                    p.map(item => {
                                        if (item.id === activeItem.id) {
                                            item['rotation'] = parseInt(e.target.value)
                                        }
                                        return item
                                    })
                                    dispatch(templateActions.editCanvas(p))
                                }} />
                        </div> */}
                        <div className=' font-bold  border-b-2 pb-2 pt-1 border-gray-100'>
                            <label className='mt-1 w-2/6 '>Name</label>
                            <input className='mt-1 input-xs w-4/6 input ml-2 input-primary'
                                value={items.find(item => item.id === activeItem.id).name}
                                onChange={(e) => editActiveItem(e, 'name')}
                            />
                        </div>
                        <div className='mt-2 font-bold border-b-2 pb-1 border-gray-100'>
                            <label className='align-top w-2/6'>Content</label>
                            <textarea className='input-xs input w-4/6 ml-2 input-primary'
                                type='textarea'
                                value={items.find(item => item.id === activeItem.id).value}
                                onChange={(e) => editActiveItem(e, 'val')}
                            />
                        </div>
                        <div className='mt-1 font-bold border-b-2 pb-1 border-gray-100 ' >
                            <label className=' align-middle'>Font Color</label>
                            <input className='align-middle ml-2 mb-1' type="color" defaultValue={activeItem.fill || activeItem.color}
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
                            />
                        </div>
                        <div className='font-bold  border-b-2 pb-2 border-gray-100' >Max Font Size
                            <input className='w-1/3 input-xs input ml-2 mt-2 input-sm input-primary'
                                type='number' min='6' max='400'
                                value={items.find(item => item.id === activeItem.id).attr.fontSize}
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
                        <div className=' mt-2 mb-2 border-b-2 pb-2 border-gray-100 ' style={{ overflow: "hidden" }}>
                            <label className='font-bold mr-2 w-2/6'>Font Family:
                                <span className='text-primary'> {items.find(i => i.id === activeItem.id).attr.fontFamily || "Default"}</span>
                            </label>
                            <button className='btn-xs btn-primary rounded-md'
                                onClick={() => { setIsFontsOpen(i => !i) }}>Change</button>
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

                        <div className='font-bold  border-b-2 pb-2 border-gray-100'>
                            <label className='pb-2 mr-2 align-middle'>Align</label>
                            <button
                                className={`btn-ghost rounded p-1 bg-gray-200 ${items.find(i => i.id === activeItem.id).attr.align === 'left' ? 'border-b-2' : ''}`}
                                onClick={() => {
                                    let p = [...items]
                                    p.find(item => item.id === activeItem.id).attr.align = 'left'
                                    dispatch(templateActions.editCanvas(p))
                                }}
                            ><img style={{ height: "20px" }} src="https://img.icons8.com/material/48/000000/align-left--v2.png" /></button>
                            <button
                                className={`btn-ghost rounded p-1 bg-gray-200 ml-2 ${items.find(i => i.id === activeItem.id).attr.align === 'center' ? 'border-b-2' : ''}`}
                                onClick={() => {
                                    let p = [...items]
                                    p.find(item => item.id === activeItem.id).attr.align = 'center'

                                    dispatch(templateActions.editCanvas(p))

                                }}
                            ><img style={{ height: "20px" }} src="https://img.icons8.com/material/48/000000/align-center--v1.png" /></button>
                            <button
                                className={`btn-ghost rounded p-1 bg-gray-200 ml-2 ${items.find(i => i.id === activeItem.id).attr.align === 'right' ? 'border-b-2' : ''}`}
                                onClick={() => {
                                    let p = [...items]
                                    p.find(item => item.id === activeItem.id).attr.align = 'right'
                                    dispatch(templateActions.editCanvas(p))

                                }}
                            ><img style={{ height: "20px" }} src="https://img.icons8.com/material/48/000000/align-right--v1.png" /></button>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default TextProperties
