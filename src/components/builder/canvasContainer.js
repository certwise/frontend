import React from 'react'
import Canvas from './canvas'
import CanvasItems from './canvasItems'
import CanvasLayers from './canvasLayers'

function BuilderContainer() {
    return (
        <div className='bg-white ' style={{ overflow: "hidden" }}>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                <div
                    className='w-1/6  scrollbar-hide border-r border-gray-600'
                    style={{ height: window.innerHeight, overflowY: "scroll", }}>
                    <CanvasLayers />
                </div>
                <div
                    className="w-2/3 p-2 bg-gray-100"
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        height: window.innerHeight,

                    }}>
                    <Canvas />
                </div>
                <div
                    className="w-1/5 h-full scrollbar-hide p-2 pt-3 rounded "
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
