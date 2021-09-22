import React from 'react'

function TextProperties() {
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
    return (
        <div>
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
                                tabIndex="0"
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

                    </div> : null
            }
        </div>
    )
}

export default TextProperties
