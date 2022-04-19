// FIXME
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Rect, Text, Transformer } from "react-konva";
import { grid, snapPoints, text } from "../../../../store/types";

type dTProps = {
	setDisplayFontSizeInStore: any;
	setCanvas: any;
	onClick: any;
	isSelected: any;
	onDragEndGrp: any;
	onDragStart: any;
	item: text;
	grid: grid;
	snapPoints: snapPoints;
};
const DynamicText = ({
	setDisplayFontSizeInStore,
	setCanvas,
	onClick,
	isSelected,
	onDragEndGrp,
	onDragStart,
	item,
	grid,
	snapPoints,
}: dTProps) => {
	const [isDragging, setisDragging] = useState<boolean>();
	const [draggingPos, setdraggingPos] = useState({ x: 0, y: 0 });
	const trRef = useRef<any>();
	const textRef = useRef<any>();
	const [fontsize, setFontSize] = useState<number | undefined>(
		item.fontDisplaySize
	);
	useEffect(() => {}, []);
	useEffect(() => {
		if (isSelected) {
			trRef.current.nodes([textRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	useEffect(() => {
		let node = textRef.current;
		let textAll = "";
		node.textArr.forEach((text: any) => {
			textAll += text.text;
		});
		if (textAll.replace(" ", "") !== item.text.replace(" ", "")) {
			let f = fontsize;
			setFontSize((prev) => (prev as number) - 3);
			if (textAll.replace(/\s/g, "") === item.text.replace(/\s/g, "")) {
				setFontSize(f);
				setDisplayFontSizeInStore(f);
			}
			if ((fontsize as number) < 15) {
				setFontSize(15);
				setDisplayFontSizeInStore(fontsize);
			}
		} else {
		}
	}, [fontsize]);

	useEffect(() => {
		setFontSize(item.fontSize);
	}, [item.fontSize]);
	const [rotation, setrotation] = useState(item.rotation);
	useEffect(() => {
		setrotation(item.rotation);
	}, [item.rotation]);
	return (
		<>
			<Text
				draggable
				x={item.x}
				y={item.y}
				width={item.width}
				height={item.height}
				onClick={onClick}
				align={item.horizontalAlign}
				text={item.text}
				opacity={item.opacity || 1}
				fontSize={fontsize || item.fontSize}
				verticalAlign="middle"
				fontFamily={item.fontFamily}
				fontWeight={item.weight}
				fill={item.fill}
				ref={textRef}
				rotation={rotation}
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
					onDragEndGrp(newPos);
				}}
				onTransform={(e) => {
					let node = textRef.current;
					node.setAttrs({
						x: node.x(),
						y: node.y(),
						width: Math.max(node.width() * node.scaleX(), 10),
						height: Math.max(node.height() * node.scaleY(), 10),
						scaleX: 1,
						scaleY: 1,
					});
				}}
				onTransformEnd={(e) => {
					setCanvas({
						x: e.target.x(),
						y: e.target.y(),
						width: e.target.width(),
						height: e.target.height(),
						rotation: e.target.rotation(),
					});
					let node = textRef.current;
					let textAll = "";
					node.textArr.forEach((text: any) => {
						textAll += text.text;
					});
					if (
						textAll.replace(" ", "") !==
						textRef.current.attrs.text.replace(" ", "")
					) {
						setFontSize((item.fontDisplaySize as number) * 1.1);
					} else {
						setFontSize(item.fontSize);
					}
				}}
				onDblClick={(e) => {
					setrotation(0);
					setCanvas({ rotation: 0 });
				}}
				onDragMove={(e) => {
					setdraggingPos({ x: e.target.x(), y: e.target.y() });
					setisDragging(true);
				}}
			/>

			{isSelected && (
				<Transformer
					ref={trRef}
					keepRatio={false}
					//rotateEnabled={false}
					boundBoxFunc={(oldBox, newBox) => {
						if (newBox.width < 100 || newBox.height < 20) {
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
					rotation={rotation}
				/>
			)}
		</>
	);
};
export default DynamicText;
