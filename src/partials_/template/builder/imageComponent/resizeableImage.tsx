import React from "react";
import { Image, Rect, Transformer } from "react-konva";

const DynamicImage = ({
	shapeProps,
	isSelected,
	onClick,
	onChange,
	item,
	onDragStart,
	snapPoints,
	grid,
}: any) => {
	const [isDragging, setisDragging] = React.useState<boolean>();
	const [draggingPos, setdraggingPos] = React.useState({ x: 0, y: 0 });
	const shapeRef = React.useRef<any>();
	const trRef = React.useRef<any>();

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

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
				onDragStart={onDragStart}
				onDragEnd={(e) => {
					setisDragging(false);

					const pos = { x: e.target.x(), y: e.target.y() };
					let newPos = pos;
					if (snapPoints.isEnabled) {
						newPos = {
							x: Math.round(pos.x / grid.width) * grid.width,
							y: Math.round(pos.y / grid.height) * grid.height,
						};
						e.target.x(newPos.x);
						e.target.y(newPos.y);
					}
					onChange({ ...shapeProps, ...newPos });
				}}
				onDblClick={() => {
					onChange({
						...shapeProps,
						rotation: 0,
					});
				}}
				onDragMove={(e) => {
					setdraggingPos({ x: e.target.x(), y: e.target.y() });
					setisDragging(true);
				}}
				onTransformEnd={(e) => {
					// transformer is changing scale of the node
					// and NOT its width or height
					// but in the store we have only width and height
					// to match the data better we will reset scale on transform end
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					// we will reset it back
					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...shapeProps,
						x: node.x(),
						y: node.y(),
						rotation: node.rotation(),
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY),
					});
				}}
			/>
			{isSelected && (
				<Transformer
					//rotateEnabled={false}
					ref={trRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
			{isDragging && snapPoints.isEnabled && (
				<Rect
					x={Math.round(draggingPos.x / grid.width) * grid.width}
					y={Math.round(draggingPos.y / grid.height) * grid.height}
					width={item.width}
					height={item.height}
					fill="transparent"
					stroke="#999"
					rotation={item.rotation}
				/>
			)}
		</React.Fragment>
	);
};
export default DynamicImage;
