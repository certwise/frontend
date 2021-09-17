import React, { useEffect, useContext, useRef, useState } from 'react'
import { Stage, Layer, Image, Text, Group, Rect, Transformer } from 'react-konva';
import Context from '../../store/context';
import { templateActions } from '../../store'
import DynamicImage from './resizeableImage';

function Canvas() {

    const { store, dispatch } = useContext(Context)
    const stageRef = useRef(null)
    const textRef = useRef(null)
    const items = store.templates.currentTemplate.canvas.items
    const activeItem = store.templates.currentTemplate.canvas.activeItem
    const width = items.find(item => item.type === 'base-image')['width']
    const height = items.find(item => item.type === 'base-image')['height']
    const ratio = width / height
    const drag = (e, id) => {
        let items_ = [...items]
        let x = e.target._lastPos.x
        let y = e.target._lastPos.y
        x = e.target.x()
        y = e.target.y()
        items_.map(item => {
            if (item.id === id) {
                item.x = x
                item.y = y
            }
            return item
        })
        dispatch(templateActions.editCanvas(items))
    }

    const setActiveItem = item => {
        dispatch(templateActions.setActiveItem({ id: 'none' }))
        dispatch(templateActions.setActiveItem(item))
        console.log(items)

    }
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize)
    }, [])
    function downloadURI() {
        if (stageRef) {
            let uri = stageRef.current.toDataURL({
                pixelRatio: 1,
            })
            let name = "ex.png"
            let link = document.createElement('a');
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            link = null
        } else {
            alert("Please create a stageRef first")
        }
    }
    const trRef = React.useRef()


    return (
        <div>
            <div className="">
                <Stage
                    ref={stageRef}
                    width={window.innerWidth * 0.56}
                    height={window.innerWidth * 0.56 / ratio}
                    scaleX={window.innerWidth * 0.56 / width}
                    scaleY={window.innerWidth * 0.56 / ratio / height}
                >
                    <Layer>
                        {items.map((item, i) => {
                            switch (item.type) {
                                case 'base-image':
                                    return <Image
                                        key={i}
                                        image={item.src}
                                        onClick={() => setActiveItem(item)}
                                        x={0}
                                        y={0}
                                        width={width}
                                        height={height}
                                        src={item.src}
                                    />
                                case 'image':
                                    return <DynamicImage
                                        x={item.x}
                                        y={item.y}
                                        src={item.src}
                                        item={item}
                                        key={i}
                                        image={item.src}
                                        shapeProps={item}
                                        draggable
                                        isSelected={item.id === activeItem.id}
                                        onClick={() => setActiveItem(item)}
                                        onChange={newAttrs => {
                                            let p = items
                                            p[i] = { ...p[i], ...newAttrs, width: newAttrs.width, height: newAttrs.height }
                                            dispatch(templateActions.editCanvas(p));
                                            console.log(p[i])
                                        }}
                                        onDragEnd={e => drag(e, item.id)}
                                        onDragMove={e => {
                                            e.target.y(Math.max(e.target.y(), 0))
                                            e.target.x(Math.max(e.target.x(), 0))
                                        }}
                                    />

                                case 'text':
                                    return <Group
                                        x={item.x}
                                        y={item.y}
                                        draggable
                                        onDragEnd={e => drag(e, item.id)}
                                        onDragMove={e => {
                                            e.target.y(Math.max(e.target.y(), 0))
                                            e.target.x(Math.max(e.target.x(), 0))
                                        }}
                                        onClick={() => setActiveItem(item)}
                                        key={i}
                                        ref={textRef}
                                    >
                                        <Text
                                            fill={item.color || item.fill}
                                            text={item.value}
                                            {...item.attr}
                                            textDecoration={item.id === activeItem.id ? 'underline' : ''}
                                        />
                                    </Group>

                                default:
                                    return null

                            }
                        })
                        }
                    </Layer>
                </Stage >
            </div>
        </div >
    )
}

export default Canvas
