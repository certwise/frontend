import React, { useState, useEffect, useRef } from 'react'
import { Group, Layer, Text, Rect, Circle, Transformer } from 'react-konva'

const DynamicText = ({ text, x, y, width, height, setCanvas, align, fontFamily, fontSize, fontWeight, fill, onClick, isSelected, onDragEndGrp }) => {
    const [box, setBox] = useState([x, y, width, height])
    const [sbox, setsbox] = useState(box)
    const [drag, setDrag] = useState(false);
    const [isCircleBeingDragged, setIsCircleBeingDragged] = useState(false)
    const trRef = useRef()
    const textRef = useRef()
    return (
        <>
            <Group
                draggable
                x={box[0]}
                y={box[1]}
                width={box[2]}
                height={box[3]}
                onClick={() => {
                    onClick()
                }}
                onDblClick={() => {
                    setDrag(!drag)
                }}
                onDragStart={() => {
                    console.log("Group onDrag Start")
                }}
                onDragEnd={
                    e => {
                        console.log("Group onDragEnd")
                        console.log(e.target.x(), e.target.y())
                        !isCircleBeingDragged && onDragEndGrp({ x: e.target.x(), y: e.target.y() })
                        setIsCircleBeingDragged(false)
                    }

                }
            >
                <Text
                    width={box[2]}
                    height={box[3]}
                    align={align}
                    text={text}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    fontWeight={fontWeight}
                    fill={fill}
                />
                {isSelected && <>

                    <Rect
                        width={sbox[2]}
                        height={sbox[3]}
                        stroke="#26abff"
                    />
                    <Circle
                        x={box[2]}
                        y={box[3]}
                        draggable
                        radius={8}
                        stroke="#999999"
                        onDragMove={(e) => {
                            setsbox(prev => {
                                if (e.target.attrs.x < box[0] + 50 && e.target.attrs.y < box[1] + 10) {
                                    {
                                        console.log(prev)
                                        return prev
                                    }
                                } else {
                                    return [
                                        prev[0],
                                        prev[1],
                                        parseInt(e.target.x()),
                                        parseInt(e.target.y()),
                                    ]
                                }
                            })
                            e.target.getStage().container().style.cursor = 'nw-resize'
                        }
                        }
                        onDragStart={() => {
                            console.log("Circle onDrag Start")
                            setIsCircleBeingDragged(true)
                        }}
                        onDragEnd={(e) => {
                            console.log("Circle onDragEnd")
                            console.log("Sbox", sbox)
                            setBox(sbox)
                            setCanvas({ x: sbox[0], y: sbox[1], width: sbox[2], height: sbox[3] })
                            e.target.getStage().container().style.cursor = 'nw-resize'
                        }}
                        onMouseOver={(e) => {
                            e.target.getStage().container().style.cursor = 'nw-resize'
                        }}
                        onMouseLeave={e => {
                            const container = e.target.getStage().container();
                            container.style.cursor = "default";
                        }}
                    />
                </>}
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox
                        }
                        return newBox
                    }}
                />
            </Group>
        </>
    )
}
export default DynamicText

