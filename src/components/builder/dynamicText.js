import React, { useState, useEffect, useRef } from 'react'
import { Group, Layer, Text, Rect, Circle, Transformer } from 'react-konva'

const DynamicText = ({ text, x, y, width, height, setCanvas, align, fontFamily, fontSize, fontWeight, fill, onClick, isSelected, onDragEndGrp }) => {
    const [box, setBox] = useState([x, y, width, height])
    const [sbox, setsbox] = useState(box)
    const [drag, setDrag] = useState(false);
    const [isCircleBeingDragged, setIsCircleBeingDragged] = useState(false)
    const trRef = useRef()
    const [fontsize, setFontSize] = useState(fontSize)
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
                    console.log("text ref:", textRef.current)
                }}
                onDblClick={() => {
                    setDrag(!drag)
                }}
                onDragStart={() => {
                    //console.log("Group onDrag Start")
                }}
                onDragEnd={
                    e => {
                        //console.log("Group onDragEnd")
                        console.log(e.target.x(), e.target.y())
                        !isCircleBeingDragged && onDragEndGrp({ x: e.target.x(), y: e.target.y() })
                        setIsCircleBeingDragged(false)
                    }
                }
            >
                <Text
                    width={sbox[2]}
                    height={sbox[3]}
                    align={align}
                    text={text}
                    fontSize={fontsize}
                    fontFamily={fontFamily}
                    fontWeight={fontWeight}
                    fill={fill}
                    ref={textRef}
                />
                {isSelected && <>

                    <Rect
                        width={sbox[2]}
                        height={sbox[3]}
                        stroke="#26abff"
                        strokeWidth={1}
                    />
                    <Circle
                        x={box[2]}
                        y={box[3]}
                        draggable
                        radius={10}
                        strokeWidth={1}
                        stroke="#777777"
                        onDragMove={(e) => {
                            setsbox(prev => {
                                return [
                                    prev[0],
                                    prev[1],
                                    parseInt(e.target.x()),
                                    parseInt(e.target.y()),
                                ]

                            })
                            e.target.getStage().container().style.cursor = 'nw-resize'
                            // let textAll = ''
                            // textRef.current.textArr.forEach(text => {
                            //     textAll += text.text
                            // })
                            // if (textAll.replace(' ', '') !== textRef.current.attrs.text.replace(' ', '')) {
                            //     let count = 20
                            //     while (textAll.replace(' ', '') !== textRef.current.attrs.text.replace(' ', '') && count > 0) {
                            //         console.log("While")
                            //         setFontSize(p => p - 1)
                            //         count--
                            //     }
                            // } else {
                            //     let prev = fontsize
                            //     setFontSize(fontSize)
                            //     if (textAll.replace(' ', '') !== textRef.current.attrs.text.replace(' ', '')) setFontSize(prev)
                            // }
                        }}
                        onDragStart={() => {
                            //console.log("Circle onDrag Start")
                            setIsCircleBeingDragged(true)
                        }}
                        onDragEnd={(e) => {
                            //console.log("Circle onDragEnd")
                            console.log("Sbox", sbox)
                            setBox(sbox)
                            setCanvas({ x: sbox[0], y: sbox[1], width: sbox[2], height: sbox[3] })
                            e.target.getStage().container().style.cursor = 'nw-resize'
                            let textAll = ''
                            textRef.current.textArr.forEach(text => {
                                textAll += text.text
                            })
                            if (textAll.replace(' ', '') !== textRef.current.attrs.text.replace(' ', '')) {
                                let count = 70
                                while (textAll.replace(' ', '') !== textRef.current.attrs.text.replace(' ', '') && count > 0) {
                                    console.log("While")
                                    setFontSize(p => p - 1)
                                    count--
                                }
                            } else {
                                setFontSize(fontSize)
                                if (textAll.replace(' ', '') !== textRef.current.attrs.text.replace(' ', '')) {
                                    let count = 70
                                    while (textAll.replace(' ', '') !== textRef.current.attrs.text.replace(' ', '') && count > 0) {
                                        console.log("While")
                                        setFontSize(p => p - 1)
                                        count--
                                    }
                                }
                            }

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

            </Group>
        </>
    )
}
export default DynamicText

