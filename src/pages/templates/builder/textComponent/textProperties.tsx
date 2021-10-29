import { useContext, useState } from "react";
import { templateActions } from "../../../../store";
import Context from "../../../../store/context";
import { text } from "../../../../store/templates/types";
import FontSelector from "./fontSelector";

function TextProperties() {
	const { store, dispatch } = useContext(Context);
	const items = store.templates.currentTemplate.canvas.items;
	const activeItem = store.templates.currentTemplate.canvas.activeItem;
	const [isFontsOpen, setIsFontsOpen] = useState(false);

	const editActiveItem = (e: any, val: any) => {
		switch (val) {
			case "val": {
				let p = items;
				p.map((item) => {
					if (item.id === activeItem?.id && item.type === "text") {
						item.text = e.target.value;
					}
					return null;
				});
				dispatch(templateActions.editCanvas(p));

				break;
			}
			case "name": {
				let p = items;
				p.map((item) => {
					if (item.id === activeItem?.id) {
						item.name = e.target.value;
					}
					return null;
				});
				dispatch(templateActions.editCanvas(p));

				break;
			}
			case "img": {
				let p = items;
				p.map((item) => {
					if (item.id === activeItem?.id) {
						item.name = e.target.value;
					}
					return null;
				});
				dispatch(templateActions.editCanvas(p));
				break;
			}
			case "check": {
				let p = items;
				p.map((item) => {
					if (item.id === activeItem?.id) {
						item["isConstant"] = e.target.checked;
					}
					return null;
				});
				dispatch(templateActions.editCanvas(p));
				break;
			}

			default:
				break;
		}
	};
	return (
		<div>
			{activeItem?.type === "text" ? (
				<div style={{ marginTop: "5px" }}>
					<div className="border-b-2 pb-1 border-gray-100">
						{activeItem.id !== "none" && (
							<label className="cursor-pointer label">
								<span className="label-text">Is this field constant?</span>
								<input
									className="checkbox checkbox-sm checkbox-primary ml-2 mr-auto"
									type="checkbox"
									defaultChecked={
										items.find((i) => i.id === activeItem.id)?.isConstant
									}
									onChange={(e) => editActiveItem(e, "check")}
								/>
							</label>
						)}
					</div>
					<div className=" font-bold mt-1 border-b-2 pb-2 border-gray-100">
						<label className="mt-1 w-1/6 p-1">x</label>
						<input
							type="number"
							className="mt-1 input-xs w-2/6 input  input-primary"
							value={items.find((item) => item.id === activeItem.id)?.x}
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id) {
										item.x = parseFloat(e.target.value);
									}
									return item;
								});
								dispatch(templateActions.editCanvas(p));
							}}
						/>
						<label className="mt-1 w-1/6 ml-2 p-1">y</label>
						<input
							type="number"
							className="mt-1 input-xs w-2/6 input  input-primary"
							value={items.find((item) => item.id === activeItem.id)?.y}
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id) {
										item.y = parseFloat(e.target.value);
									}
									return item;
								});
								dispatch(templateActions.editCanvas(p));
							}}
						/>
					</div>
					<div className=" font-bold  border-b-2 pb-2 pt-1 border-gray-100">
						<label className="mt-2 w-2/6 ">Opacity</label>
						<input
							style={{ height: "80" }}
							defaultValue={
								(items.find((item) => item.id === activeItem.id)
									?.opacity as number) * 100 || 100
							}
							type="range"
							min={1}
							max={100}
							className="range pt-1 range-xs range-primary ml-2 mt-1 w-2/3"
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id) {
										item["opacity"] = parseInt(e.target.value) / 100;
									}
									return item;
								});
								dispatch(templateActions.editCanvas(p));
							}}
						/>
					</div>
					<div className=" font-bold  border-b-2 pb-2 pt-1 border-gray-100">
						<label className="mt-1 w-2/6 ">Name</label>
						<input
							className="mt-1 input-xs w-4/6 input ml-2 input-primary"
							value={items.find((item) => item.id === activeItem.id)?.name}
							onChange={(e) => editActiveItem(e, "name")}
						/>
					</div>
					<div className="mt-2 font-bold border-b-2 pb-1 border-gray-100">
						<label className="align-top w-2/6">Content</label>
						<textarea
							className="input-xs input w-4/6 ml-2 input-primary"
							value={
								(items.find((item) => item.id === activeItem.id) as any).text
							}
							onChange={(e) => editActiveItem(e, "val")}
						/>
					</div>
					<div className="mt-1 font-bold border-b-2 pb-1 border-gray-100 ">
						<label className=" align-middle">Font Color</label>
						<input
							className="align-middle ml-2 mb-1"
							type="color"
							defaultValue={activeItem.fill}
							onChange={(e) => {
								let p = [...items];
								p.map((item: any) => {
									if (item.id === activeItem.id) {
										item["fill"] = e.target.value;
									}
									return item;
								});
								dispatch(templateActions.editCanvas(p));
							}}
						/>
					</div>
					<div className="font-bold  border-b-2 pb-2 border-gray-100">
						Max Font Size
						<input
							className="w-1/3 input-xs input ml-2 mt-2  input-primary"
							type="number"
							min="6"
							max="400"
							value={
								(items.find((item) => item.id === activeItem.id) as text)
									.fontSize
							}
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id && item.type === "text") {
										item.fontSize = parseInt(e.target.value);
									}
									return item;
								});
								dispatch(templateActions.editCanvas(p));
							}}
						/>
					</div>
					<div
						className=" mt-2 mb-2 border-b-2 pb-2 border-gray-100  bg-transparent "
						style={{ overflow: "hidden" }}
					>
						<label className="font-bold mr-2 w-2/6">
							Font Family:
							<span className="text-primary">
								{(items.find((i) => i.id === activeItem.id) as text)
									.fontFamily || "Default"}
							</span>
						</label>
						<button
							className="btn-xs btn-primary rounded-md"
							onClick={() => {
								setIsFontsOpen((i) => !i);
							}}
						>
							Change
						</button>
						<FontSelector
							isOpen={isFontsOpen}
							close={() => {
								setIsFontsOpen(false);
							}}
							styles={{ width: "450px", height: window.innerHeight }}
							loadMoreFonts={() => {
								console.log("load more fonts tP");
								dispatch(
									templateActions.setNumberOfFonts(
										store.templates.numberOfFonts + 30
									)
								);
								console.log(store.templates.numberOfFonts);
							}}
						/>
					</div>

					<div className="font-bold  border-b-2 pb-2 border-gray-100">
						<label className="pb-2 mr-2 align-middle">Align</label>
						<button
							className={`btn-ghost rounded p-1 bg-gray-200 ${
								(items.find((i) => i.id === activeItem.id) as text)
									.textAlign === "left"
									? "border-b-2"
									: ""
							}`}
							onClick={() => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id && item.type === "text") {
										item.textAlign = "left";
									}
									return item;
								});
								dispatch(templateActions.editCanvas(p));
							}}
						>
							<img
								style={{ height: "20px" }}
								src="https://img.icons8.com/material/48/000000/align-left--v2.png"
								alt="left"
							/>
						</button>
						<button
							className={`btn-ghost rounded p-1 bg-gray-200 ml-2 ${
								(items.find((i) => i.id === activeItem.id) as text)
									.textAlign === "center"
									? "border-b-2"
									: ""
							}`}
							onClick={() => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id && item.type === "text") {
										item.textAlign = "center";
									}
									return item;
								});

								dispatch(templateActions.editCanvas(p));
							}}
						>
							<img
								style={{ height: "20px" }}
								src="https://img.icons8.com/material/48/000000/align-center--v1.png"
								alt="center"
							/>
						</button>
						<button
							className={`btn-ghost rounded p-1 bg-gray-200 ml-2 ${
								(items.find((i) => i.id === activeItem.id) as text)
									.textAlign === "right"
									? "border-b-2"
									: ""
							}`}
							onClick={() => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id && item.type === "text") {
										item.textAlign = "right";
									}
									return item;
								});
								dispatch(templateActions.editCanvas(p));
							}}
						>
							<img
								style={{ height: "20px" }}
								src="https://img.icons8.com/material/48/000000/align-right--v1.png"
								alt="right"
							/>
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default TextProperties;
