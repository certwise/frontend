import React, { useContext } from 'react'
import Context from '../../../store/context'
import { templateActions } from '../../../store'
import Modal from 'react-modal'

function FontSelector({ isOpen, close, styles, fonts, items, activeItem, loadMoreFonts }) {
    const { store, dispatch } = useContext(Context)
    return (
        <div>
            <Modal
                onRequestClose={close}
                onClick={close}
                isOpen={isOpen}
                style={{
                    overlay: {
                        background: 'rgba(0, 0, 0, 0)',
                    },
                    content: {
                        background: 'none',
                        border: 'none'
                    },
                }}
                className='flex'
                appElement={document.getElementById('root')}
            >
                <div className='w-11/12'></div>
                <ul
                    style={{
                        overflow: "auto",
                        paddingRight: "16px",
                        background: 'rgba(0, 0, 0, 0.8)',
                        ...styles
                    }}
                    className="p-2 border-2 shadow-lg shadow menu w-1/6">
                    <div className='ml-auto mr-5 pr-5'>
                        <div className='btn btn-error btn-circle mb-5'
                            style={{ position: 'absolute', marginLeft: 'auto' }}
                            onClick={close}
                        >X</div>
                    </div>
                    {
                        fonts.map((font, i) => {
                            return <li
                                key={i}
                                style={{ fontFamily: font.family }}
                                className='text-white text-xl'
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
                        <button className='btn-xs btn-primary' onClick={loadMoreFonts}>Load More</button>
                    </li>
                </ul>
            </Modal>
        </div>
    )
}

export default FontSelector
