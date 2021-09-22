import React, { useEffect, useContext, useRef, useState } from 'react'
import { Stage, Layer, Image, Text, Group, Rect, Transformer, Circle } from 'react-konva';
import Context from '../../store/context';
import { templateActions } from '../../store'
import DynamicImage from './resizeableImage';
import DynamicText from './dynamicText';
import { getStorage, ref, uploadBytes } from '@firebase/storage';
import * as api from '../../api/templates'
function Canvas() {

    const { store, dispatch } = useContext(Context)
    const [draggableText, setDraggableText] = useState(true)
    const stageRef = useRef(null)
    const textRef = useRef(null)
    const items = store.templates.currentTemplate.canvas.items
    const activeItem = store.templates.currentTemplate.canvas.activeItem
    const width = items.find(item => item.type === 'base-image')['width']
    const height = items.find(item => item.type === 'base-image')['height']
    const ratio = width / height
    let stageWidth = window.innerWidth * 0.56
    if (ratio < 1.1) {
        stageWidth *= ratio * 0.8
    }
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
    async function downloadURI() {
        if (stageRef) {
            let name = "template_image.jpeg"
            let img = stageRef.current.toDataURL({ pixelRatio: 1, mimeType: 'image/jpeg' })
            let data = img.replace(/^data:image\/\w+;base64,/, "")
            let buffer = Buffer.from(data, 'base64')
            let pathref = `${store.user.uid}/templates/${store.templates.currentTemplate.id}/example/${name}`
            await uploadBytes(ref(getStorage(), pathref), buffer)
            return "Success"
        } else {
            alert("Please create a stageRef first")
            return 'Nope'
        }
    }
    useEffect(async () => {
        if (store.templates.currentTemplate.downloadCurrentTemplate) {
            await downloadURI()
            await api.editTemplateItems(store.templates.currentTemplate.id, store.templates.currentTemplate.canvas.items)
            dispatch(templateActions.downloadCurrentTemplate(false))
            window.location.reload()
        }
    }, [store.templates.currentTemplate.downloadCurrentTemplate])


    return (
        <div>
            {store.templates.currentTemplate.fontLoading ? <div>Fonts loading</div> : <div className="">
                <Stage
                    ref={stageRef}
                    width={stageWidth}
                    height={stageWidth / ratio}
                    scaleX={stageWidth / width}
                    scaleY={stageWidth / ratio / height}
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

                                    return <DynamicText
                                        key={i}
                                        x={item.x}
                                        y={item.y}
                                        width={item.width || 400}
                                        height={item.height || 200}
                                        text={item.value}
                                        fill={item.color || item.fill}
                                        align={item.attr.align || 'center'}
                                        fontSize={item.attr.fontSize}
                                        fontFamily={item.attr.fontFamily}
                                        fontWeight={item.attr.fontWeight}
                                        setCanvas={
                                            obj => {
                                                console.log("Object in canvas:", obj)
                                                let p = items
                                                p[i] = { ...p[i], ...obj }
                                                console.log("Obj:", obj, "p[i] :", p[i])
                                                dispatch(templateActions.editCanvas(p))
                                            }
                                        }
                                        onDragEndGrp={
                                            (position) => {
                                                let p = items
                                                p[i] = { ...p[i], x: position.x, y: position.y }
                                                console.log("Change position Obj:", position, "p[i] :", p[i])
                                                dispatch(templateActions.editCanvas(p))
                                            }
                                        }
                                        onClick={() => setActiveItem(item)}
                                        isSelected={item.id === activeItem.id}
                                    />
                                default:
                                    return null

                            }
                        })
                        }
                    </Layer>
                </Stage >
            </div>}
        </div >
    )
}

export default Canvas
