import { useContext } from "react";
import { Context } from "../../../store";
import { actions } from "../../../store";
import TextProperties from "./textComponent/textProperties";
import ImageProperties from "./imageComponent/imageProperties";

function CanvasItems() {
	const { store, dispatch } = useContext(Context);
	const items = store.templates.currentTemplate.canvas.items;
	const activeItem = store.templates.currentTemplate.canvas.activeItem;

	// deleteActiveItem function
	const deleteActiveItem = () => {
		let p = [...items];
		let x = p.filter((item) => item.id !== activeItem?.id);
		dispatch(actions.templates.editCanvas(x));
		dispatch(actions.templates.setActiveItem(undefined));
	};

	return (
		<div
			className="text-sm "
			onKeyDown={(e) => {
				if (e.key === "Delete") {
					deleteActiveItem();
				}
			}}
			style={{ margin: "4px" }}
		>
			<div className="font-bold mb-1">{activeItem?.name}</div>

			{activeItem?.type === "text" && <TextProperties />}
			{activeItem?.type === "image" && <ImageProperties />}

			{activeItem ? (
				<div>
					<button
						className="btn text-blue-500 border-blue-500 hover:bg-blue-600 hover:text-white mt-2 p-1 text-xs w-1/3"
						onClick={() => {
							dispatch(actions.templates.setActiveItem(undefined));
						}}
					>
						Deselect
					</button>
					<button
						className="btn text-blue-500 border-blue-500 hover:bg-blue-600 hover:text-white mt-2 ml-3 p-1 text-xs w-1/3"
						onClick={deleteActiveItem}
					>
						Delete
					</button>
				</div>
			) : (
				<div className="text-blue-600 font-bold">No layer is selected</div>
			)}
		</div>
	);
}

export default CanvasItems;

export const ItemProperty = (props: {
	name: string | any;
	children: any;
	cWidth?: string;
}) => {
	const { name } = props;
	return (
		<div className="text-xs my-3 flex flex-shrink-0  flex-row items-stretch justify-items-stretch border border-gray-200 ">
			<div className={props.cWidth + " bg-gray-100 border p-0.5 px-3 "}>
				{name}
			</div>
			<div className="flex-grow bg-white pr-2">{props.children}</div>
		</div>
	);
};
