import React, { useState, useEffect, useRef, useContext } from 'react'
import { Text, Transformer } from 'react-konva'


const DynamicText = (props) => {
    const { setDisplayFontSizeInStore, text, x, y, width, height, setCanvas, align, fontFamily, fontSize, fontWeight, fill, onClick, isSelected, onDragEndGrp } = props
    const trRef = useRef()
    const [fontsize, setFontSize] = useState(props.fontDisplaySize)
    const textRef = useRef()
    useEffect(() => {
        console.log("Display font size", props.fontDisplaySize)
    }, [])
    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([textRef.current])
            trRef.current.getLayer().batchDraw()
        }
    }, [isSelected])

    useEffect(() => {
        console.log("DFS", props.fontDisplaySize)
        let node = textRef.current
        let textAll = ''
        node.textArr.forEach(text => {
            textAll += text.text
        })
        console.log(textAll.replace(/\s/g, ''), text.replace(/\s/g, ''),)
        if (textAll.replace(' ', '') !== text.replace(' ', '')) {
            let f = fontsize
            setFontSize(prev => prev - 3)
            if (textAll.replace(/\s/g, '') === text.replace(/\s/g, '')) {
                setFontSize(f)
                setDisplayFontSizeInStore(f)
            }
            if (fontsize < 15) {
                setFontSize(15)
                setDisplayFontSizeInStore(fontsize)
            }
        } else {
            console.log("False")
        }
    }, [fontsize])

    useEffect(() => {
        setFontSize(parseInt(fontSize))
    }, [fontSize])

    return (
        <>
            <Text
                draggable
                x={x}
                y={y}
                width={width}
                height={height}
                onClick={onClick}
                align={align}
                text={text}
                fontSize={parseInt(fontsize) || fontSize}
                verticalAlign="middle"
                fontFamily={fontFamily}
                fontWeight={fontWeight}
                fill={fill}
                ref={textRef}
                rotation={props.rotation || 0}
                onDragEnd={e => onDragEndGrp({ x: e.target.x(), y: e.target.y() })}
                onTransform={e => {
                    let node = textRef.current
                    node.setAttrs({
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(node.width() * node.scaleX(), 10),
                        height: Math.max(node.height() * node.scaleY(), 10),
                        scaleX: 1,
                        scaleY: 1,
                    })
                }}
                onTransformEnd={e => {
                    setCanvas({ s: e.target.x(), y: e.target.y(), width: e.target.width(), height: e.target.height() })
                    let node = textRef.current
                    let textAll = ''
                    node.textArr.forEach(text => {
                        textAll += text.text
                    })
                    if (textAll.replace(' ', '') !== textRef.current.attrs.text.replace(' ', '')) {
                        setFontSize(parseInt(props.fontDisplaySize * 1.1))
                    }
                    else {
                        setFontSize(fontSize)
                    }
                }}
            />

            {isSelected && <Transformer
                ref={trRef}
                keepRatio={false}
                rotateEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 100 || newBox.height < 20) {
                        return oldBox
                    }
                    return newBox
                }}
            />}
        </>
    )
}
export default DynamicText

