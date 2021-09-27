import React from 'react'
import { Image, Transformer } from 'react-konva'

const DynamicImage = ({ shapeProps, isSelected, onClick, onChange, item }) => {

    const shapeRef = React.useRef()
    const trRef = React.useRef()

    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current])
            trRef.current.getLayer().batchDraw()
        }
    }, [isSelected])

    return (
        <React.Fragment>
            <Image
                key={item.id}
                image={item.src}
                onClick={onClick}
                onTap={onClick}
                height={item.height}
                width={item.width}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    console.log(e)
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                        rotation: e.target.rotation(),
                    })
                }}
                onDblClick={() => {
                    onChange({
                        ...shapeProps,
                        rotation: 0,
                    })
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current
                    const scaleX = node.scaleX()
                    const scaleY = node.scaleY()

                    // we will reset it back
                    node.scaleX(1)
                    node.scaleY(1)
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        rotation: node.rotation(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    })
                }}
            />
            {isSelected && (
                <Transformer
                    //rotateEnabled={false}
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox
                        }
                        return newBox
                    }}
                />
            )}
        </React.Fragment>
    )
}
export default DynamicImage