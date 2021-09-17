import React, { useEffect, useState, useContext } from 'react'
import Canvas from './canvas'
import CanvasItems from './canvasItems'
import Context from '../../store/context.js'
import CanvasLayers from './canvasLayers'

function BuilderContainer() {
    const { store } = useContext(Context)

    return (
        <div className='bg-white text-black' style={{ overflow: "hidden" }}>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                <div
                    className='w-1/6 bg-gray-200 scrollbar-hide border-r border-gray-600'
                    style={{ height: window.innerHeight, overflowY: "scroll", }}>
                    <CanvasLayers />
                </div>
                {!store.app.isLoading && <div
                    className="w-2/3 p-2 bg-gray-100"
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        height: window.innerHeight,

                    }}>
                    <Canvas />
                </div>}
                <div
                    className="w-1/5 h-full scrollbar-hide p-2 pt-3 bg-gray-200 rounded text-dark "
                    style={{
                        overflowY: "scroll",
                        overflowX: "hidden",
                        height: window.innerHeight,
                    }}
                >
                    <CanvasItems />
                </div>
            </div >
        </div>
    )
}

export default BuilderContainer
