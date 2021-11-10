import React, { useEffect, useContext, useRef, useState } from "react";
import { Stage, Layer, Image, Line, Group } from "react-konva";
import Context from "../../../store/context";
import { templateActions } from "../../../store";
import DynamicImage from "./imageComponent/resizeableImage";
import DynamicText from "./textComponent/dynamicText";
import { getStorage, ref, uploadBytes } from "@firebase/storage";
import * as api from "../../../api/templates";
import { item, text } from "../../../store/templates/types";
import Grid from "./grid/grid";
function Canvas() {
	const { store, dispatch } = useContext(Context);
	const stageRef = useRef<any>(null);
	const items = store.templates.currentTemplate.canvas.items;
	const activeItem = store.templates.currentTemplate.canvas.activeItem;
	const width: number = store.templates.currentTemplate.canvas.width;
	const height: number = store.templates.currentTemplate.canvas.height;
	const ratio = width / height;
	const [dimensions, setDimensions] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});
	useEffect(() => {
		dispatch(templateActions.isEditingTemplate(true));
		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		}
		window.addEventListener("resize", handleResize);
		return () => {
			dispatch(templateActions.isEditingTemplate(false));
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	let stageWidth = dimensions.width * 0.5;
	if (ratio < 1) {
		stageWidth *= ratio * 0.8;
	}
	if (stageWidth / ratio > window.innerHeight * 0.8) {
		stageWidth /= stageWidth / ratio / (window.innerHeight * 0.8);
	}

	const setActiveItem = (item: item) => {
		dispatch(templateActions.setActiveItem(item));
	};

	useEffect(() => {
		async function downloadURI() {
			if (stageRef) {
				let name = "template_image.jpeg";
				let img = stageRef.current.toDataURL({
					pixelRatio: 1,
					mimeType: "image/jpeg",
				});
				let data = img.replace(/^data:image\/\w+;base64,/, "");
				let buffer = Buffer.from(data, "base64");
				let pathref = `${store.user.uid}/templates/${store.templates.currentTemplate.id}/example/${name}`;
				await uploadBytes(ref(getStorage(), pathref), buffer);
				return "Success";
			} else {
				alert("Please create a stageRef first");
				return "Nope";
			}
		}
		async function asyncFunc() {
			if (store.templates.currentTemplate.downloadCurrentTemplate) {
				await downloadURI();
				//const x = store.templates.currentTemplate;
				await api.editTemplate({ ...store.templates.currentTemplate });
				dispatch(templateActions.downloadCurrentTemplate(false));
				window.location.reload();
			}
		}
		asyncFunc();
	}, [store.templates.currentTemplate.downloadCurrentTemplate]);

	return (
		<div>
			<div className=" border border-gray-300 shadow-xl">
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
								case "image":
									return (
										<DynamicImage
											id={item.id}
											item={item}
											key={i}
											shapeProps={item}
											isSelected={item.id === activeItem?.id}
											onClick={() => setActiveItem(item)}
											onChange={(newAttrs: any) => {
												let p = items;
												p[i] = { ...p[i], ...newAttrs };
												dispatch(templateActions.editCanvas(p));
											}}
											onDragStart={() => {
												setActiveItem(item);
											}}
											snapPoints={store.templates.snapPoints}
											grid={store.templates.grid}
										/>
									);

								case "text":
									return (
										<DynamicText
											item={item}
											key={i}
											isSelected={item.id === activeItem?.id}
											onClick={() => setActiveItem(item)}
											onDragStart={() => {
												setActiveItem(item);
											}}
											setCanvas={(obj: any) => {
												let p = items;
												p[i] = { ...p[i], ...obj };
												dispatch(templateActions.editCanvas(p));
											}}
											onDragEndGrp={(position: { x: number; y: number }) => {
												let p = items;
												p[i] = { ...p[i], x: position.x, y: position.y };
												dispatch(templateActions.editCanvas(p));
											}}
											setDisplayFontSizeInStore={(fontSize: number) => {
												let p = items;
												p[i] = { ...p[i], fontDisplaySize: fontSize } as text;
												dispatch(templateActions.editCanvas(p));
											}}
											grid={store.templates.grid}
											snapPoints={store.templates.snapPoints}
										/>
									);
								default:
									return null;
							}
						})}
						{store.templates.grid.isEnabled && <Grid />}
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

export default Canvas;
