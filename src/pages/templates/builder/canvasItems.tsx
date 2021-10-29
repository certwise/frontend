import { useState, useContext } from "react";
import Context from "../../../store/context";
import { templateActions } from "../../../store";
import * as api from "../../../api/templates";
import TextProperties from "./textComponent/textProperties";
import ImageProperties from "./imageComponent/imageProperties";
import { BsCardImage } from "react-icons/bs";

function CanvasItems() {
	const { store, dispatch } = useContext(Context);
	const [image, setImageState] = useState<any>();
	const [imageBlob, setImageBlob] = useState<any>();
	const items = store.templates.currentTemplate.canvas.items;
	const activeItem = store.templates.currentTemplate.canvas.activeItem;

	const setBaseImage = async (src: any) => {
		let im = new window.Image();
		im.src = src;
		const id = makeid();
		const ref = `${store.user.uid}/${store.templates.currentTemplate.id}/${imageBlob.name}_${id}.jpg`;
		await api.uploadImage(imageBlob, ref);
		let p = [...items];
		p = p.map((item) => {
			if (item.id === activeItem?.id && item.type !== "text") {
				item["height"] = im.height;
				item["width"] = im.width;
				item["src"] = im;
				item["imageStorageRef"] = ref;
			}
			return item;
		});
		dispatch(templateActions.editCanvas(p));
		setImageState(null);
		setImageBlob(null);
	};

	const onChangeImg = (file: any) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImageState(reader.result);
		};
		setImageBlob(file);
	};
	// deleteActiveItem function
	const deleteActiveItem = () => {
		let p = [...items];
		let x = p.filter((item) => item.id !== activeItem?.id);
		dispatch(templateActions.editCanvas(x));
		dispatch(templateActions.setActiveItem(undefined));
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

			{activeItem?.id !== "none" ? (
				<button
					className="btn-sm rounded btn-primary mt-2  w-1/3"
					onClick={() => {
						dispatch(templateActions.setActiveItem(undefined));
						setImageState(null);
					}}
				>
					Deselect
				</button>
			) : (
				<div className="text-red-400 font-bold">No layer is selected</div>
			)}

			<button
				className="btn-sm rounded btn-primary btn-outline mt-2 ml-3  w-1/3"
				onClick={deleteActiveItem}
			>
				Delete
			</button>
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

const makeid = () => {
	let length = 12;
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
