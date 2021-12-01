import { useContext, useState } from "react";
import { Context, actions } from "../../../../store";
import { CustomField, text } from "../../../../store/types";
import FontSelector from "./fontSelector";
import { ImFont } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";
import { ItemProperty } from "../canvasItems";
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
				dispatch(actions.templates.editCanvas(p));

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
				dispatch(actions.templates.editCanvas(p));

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
				dispatch(actions.templates.editCanvas(p));
				break;
			}
			case "check": {
				let p = items;
				p.map((item) => {
					if (item.id === activeItem?.id) {
						item["isConstant"] = e.target.value === "true" ? true : false;
					}
					return null;
				});
				dispatch(actions.templates.editCanvas(p));

				break;
			}

			default:
				break;
		}
	};
	return (
		<div>
			{activeItem?.type === "text" ? (
				<div className="mt-3 text-xs">
					<ItemProperty name="Name">
						<input
							type="text"
							className="input-xs pl-1 h-full w-full"
							value={items.find((item) => item.id === activeItem.id)?.name}
							onChange={(e) => editActiveItem(e, "name")}
						/>
					</ItemProperty>

					<ItemProperty name="Content">
						<textarea
							className="pl-2 w-full"
							value={
								(items.find((item) => item.id === activeItem.id) as any).text
							}
							onChange={(e) => {
								let allContent = "";
								store.templates.currentTemplate.canvas.items.forEach((item) => {
									if (item.type === "text" && item.id !== activeItem.id)
										allContent += item.text;
								});
								allContent += e.target.value;
								const currentFields = getFieldsFromString(allContent);
								const fields: CustomField[] = [];
								currentFields.forEach((field) => {
									if (!fields.find((f) => f.name === field)) {
										fields.push({
											name: field.replace(/ /g, ""),
											type: "text",
										});
									}
								});
								const unique: CustomField[] = [];
								fields.forEach((field) => {
									if (!unique.find((f) => f.name === field.name)) {
										unique.push(field);
									}
								});
								dispatch(actions.templates.setFields([...unique]));
								editActiveItem(e, "val");
							}}
						/>
					</ItemProperty>

					<ItemProperty name="Variable Field ">
						{activeItem.id !== "none" && (
							<select
								style={{ background: "#fff" }}
								className="w-full h-full bg-white"
								defaultChecked={
									items.find((i) => i.id === activeItem.id)?.isConstant
								}
								onChange={(e) => {
									let p = [...items];
									p.map((item) => {
										if (item.id === activeItem.id) {
											item.isConstant =
												e.target.value === "true" ? true : false;
										}
										return item;
									});
									dispatch(actions.templates.editCanvas(p));
								}}
							>
								<option
									style={{ background: "#fff" }}
									className="bg-white"
									value="true"
								>
									Constant
								</option>
								<option
									style={{ background: "#fff" }}
									className="bg-white"
									value="false"
								>
									Variable
								</option>
							</select>
						)}
					</ItemProperty>

					<ItemProperty name="x">
						<input
							type="number"
							className="w-full h-full align-middle pl-2"
							value={items
								.find((item) => item.id === activeItem.id)
								?.x.toFixed(0)}
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id) {
										item.x = parseInt(e.target.value);
									}
									return item;
								});
								dispatch(actions.templates.editCanvas(p));
							}}
						/>
					</ItemProperty>

					<ItemProperty name="y">
						<input
							type="number"
							className="w-full h-full align-middle pl-2"
							value={items
								.find((item) => item.id === activeItem.id)
								?.y.toFixed(0)}
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id) {
										item.y = parseInt(e.target.value);
									}
									return item;
								});
								dispatch(actions.templates.editCanvas(p));
							}}
						/>
					</ItemProperty>

					<ItemProperty name="Width">
						<input
							type="number"
							className="w-full h-full align-middle pl-2"
							value={items
								.find((item) => item.id === activeItem.id)
								?.width.toFixed(0)}
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id) {
										item.width = parseInt(e.target.value);
									}
									return item;
								});
								dispatch(actions.templates.editCanvas(p));
							}}
						/>
					</ItemProperty>

					<ItemProperty name="Height">
						<input
							type="number"
							className="w-full h-full align-middle pl-2"
							value={items
								.find((item) => item.id === activeItem.id)
								?.height.toFixed(0)}
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id) {
										item.height = parseInt(e.target.value);
									}
									return item;
								});
								dispatch(actions.templates.editCanvas(p));
							}}
						/>
					</ItemProperty>

					<ItemProperty name="Opacity">
						<input
							defaultValue={
								(items.find((item) => item.id === activeItem.id)
									?.opacity as number) * 100 || 100
							}
							type="range"
							min={1}
							max={100}
							className="range range-xs px-2 align-middle bg-white h-full"
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id) {
										item["opacity"] = parseInt(e.target.value) / 100;
									}
									return item;
								});
								dispatch(actions.templates.editCanvas(p));
							}}
						/>
					</ItemProperty>

					<ItemProperty name="Font Color">
						<input
							className="align-middle h-full p-1 pl-1 w-24"
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
								dispatch(actions.templates.editCanvas(p));
							}}
						/>
					</ItemProperty>

					<ItemProperty cWidth="w-36" name="Max Font Size">
						<input
							className="pl-2 w-full h-full"
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
								dispatch(actions.templates.editCanvas(p));
							}}
						/>
					</ItemProperty>

					<ItemProperty name={<ImFont size={16} />}>
						<button
							onClick={() => {
								setIsFontsOpen((i) => !i);
							}}
							className="focus:border-primary border border-none font-bold w-full px-2 pt-1 flex flex-row align-middle p-0.5 hover:text-blue-500"
						>
							{(items.find((i) => i.id === activeItem.id) as text).fontFamily ||
								"Default"}
							<AiFillCaretDown className="pt-1 text-right" size={16} />
						</button>

						<FontSelector
							isOpen={isFontsOpen}
							close={() => {
								setIsFontsOpen(false);
							}}
							styles={{ width: "450px", height: window.innerHeight }}
							loadMoreFonts={() => {
								dispatch(
									actions.templates.setNumberOfFonts(
										store.templates.numberOfFonts + 30
									)
								);
							}}
						/>
					</ItemProperty>

					<ItemProperty name="Horizontal Align">
						<select
							className="w-full h-full align-middle"
							value={
								(
									store.templates.currentTemplate.canvas.items.find(
										(i) => i.id === activeItem.id
									) as text
								)?.horizontalAlign
							}
							onChange={(e) => {
								let p = [...items];
								p.map((item) => {
									if (item.id === activeItem.id && item.type === "text") {
										const align = e.target.value as "left" | "center" | "right";
										item.horizontalAlign = align;
									}
									return item;
								});
								dispatch(actions.templates.editCanvas(p));
							}}
						>
							<option
								className="text-gray-800 bg-transparent hover:bg-gray-300"
								value="left"
							>
								Left
							</option>
							<option
								className="text-gray-800 bg-transparent hover:bg-gray-300"
								value="center"
							>
								Center
							</option>
							<option
								className="text-gray-800 bg-transparent hover:bg-gray-300"
								value="right"
							>
								Right
							</option>
						</select>
					</ItemProperty>
				</div>
			) : null}
		</div>
	);
}

export default TextProperties;

export const getFieldsFromString = (string: string): string[] => {
	const results = [];
	const re = /{{([^}]+)}}/g;
	let text;
	while ((text = re.exec(string))) {
		results.push(text[1]);
	}
	const unique: string[] = [];
	results.forEach((field) => {
		if (!unique.find((f) => f === field)) {
			unique.push(field);
		}
	});
	return unique;
};
