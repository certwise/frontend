import { useContext, useState } from "react";
import { actions } from "../../../../store";
import { Context } from "../../../../store";
import { ItemProperty } from "../canvasItems";
import { BsCardImage } from "react-icons/bs";
import { getStorage, ref, uploadBytes } from "firebase/storage";
function ImageProperties() {
	const { store, dispatch } = useContext(Context);
	const items = store.templates.currentTemplate.canvas.items;
	const activeItem = store.templates.currentTemplate.canvas.activeItem;
	const [image, setImageState] = useState();
	const [imageBlob, setImageBlob] = useState<any>();
	const uploadImage = async (image: any, refs: any) => {
		//upload image to firebase storage
		const storage = getStorage();
		const imageRef = ref(storage, refs);
		const result = await uploadBytes(imageRef, image);
		return result;
	};
	const setImage = async (src: string) => {
		let im = new window.Image();
		im.src = src;
		let oldWidth = im.width;
		let newWidth = window.innerHeight / 4;
		let ratio = oldWidth / newWidth;
		im.width = newWidth;
		im.height = im.height / ratio;
		const id = makeid();
		const ref = `${store.user.organization}/${store.templates.currentTemplate._id}/${id}_${imageBlob.name}`;
		await uploadImage(imageBlob, ref);
		let p = [...items];
		p = p.map((item) => {
			if (item.id === activeItem?.id && item.type === "image") {
				item["height"] = im.height;
				item["width"] = im.width;
				item["storageRef"] = ref;
				item["src"] = im;
			}
			return item;
		});
		dispatch(actions.templates.editCanvas(p));
		setImageState(undefined);
		setImageBlob(undefined);
	};
	const editActiveItem = (e: any, val: "img" | "check") => {
		switch (val) {
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
						item["isConstant"] = e.target.checked;
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

	const onChangeImg = (file: any | null) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setImageState(reader.result as any);
		};
		setImageBlob(file);
	};
	return (
		<div>
			<ItemProperty name="Name">
				<input
					type="text"
					className="pl-1 h-full w-full"
					value={items.find((item) => item.id === activeItem?.id)?.name}
					onChange={(e) => editActiveItem(e, "img")}
				/>
			</ItemProperty>
			<ItemProperty name="Variable Field ">
				{activeItem?.id !== "none" && (
					<select
						className="w-full h-full"
						defaultChecked={
							items.find((i) => i.id === activeItem?.id)?.isConstant
						}
						onChange={(e) => editActiveItem(e, "check")}
					>
						<option value="true">Constant</option>
						<option value="false">Variable</option>
					</select>
				)}
			</ItemProperty>
			<ItemProperty name="x">
				<input
					type="number"
					className="w-full h-full align-middle pl-2"
					value={items.find((item) => item.id === activeItem?.id)?.x.toFixed(0)}
					onChange={(e) => {
						let p = [...items];
						p.map((item) => {
							if (item.id === activeItem?.id) {
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
					value={items.find((item) => item.id === activeItem?.id)?.y.toFixed(0)}
					onChange={(e) => {
						let p = [...items];
						p.map((item) => {
							if (item.id === activeItem?.id) {
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
						.find((item) => item.id === activeItem?.id)
						?.width.toFixed(0)}
					onChange={(e) => {
						let p = [...items];
						p.map((item) => {
							if (item.id === activeItem?.id) {
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
						.find((item) => item.id === activeItem?.id)
						?.height.toFixed(0)}
					onChange={(e) => {
						let p = [...items];
						p.map((item) => {
							if (item.id === activeItem?.id) {
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
						(items.find((item) => item.id === activeItem?.id)
							?.opacity as number) * 100 || 100
					}
					type="range"
					min={1}
					max={100}
					className="range range-xs px-2 align-middle bg-white h-full"
					onChange={(e) => {
						let p = [...items];
						p.map((item) => {
							if (item.id === activeItem?.id) {
								item["opacity"] = parseInt(e.target.value) / 100;
							}
							return item;
						});
						dispatch(actions.templates.editCanvas(p));
					}}
				/>
			</ItemProperty>

			<div className="rounded w-full border-b-2 border-t-2  border-gray-300 py-2 ">
				<div className="mb-1  font-bold ">Change Image</div>
				<label
					className="btn-sm text-xs rounded bg-white text-blue-600 
				hover:bg-blue-600 hover:text-white border border-blue-500 hover:cursor-pointer"
				>
					<BsCardImage size={20} />
					<span className="ml-2  hover:cursor-pointer">Select Image</span>
					<input
						className="hidden  hover:cursor-pointer"
						type="file"
						accept="image/*"
						onChange={(e: any) => onChangeImg(e.target.files[0])}
					/>
				</label>
				{image ? (
					<div>
						<img
							className="border-2 border-secondary mt-2"
							style={{ height: "100px" }}
							src={image}
							alt="selected img"
						/>
						<div>{imageBlob.name}</div>
						<button
							className="btn-sm text-xs  bg-white text-blue-600 
										hover:bg-blue-600 hover:text-white border 
										border-blue-500 hover:cursor-pointer
											w-1/3 rounded btn-primary mt-2 mb-3"
							onClick={() => setImage(image)}
						>
							Set image
						</button>
						<button
							className="btn-sm text-xs  bg-white text-yellow-600 
										hover:bg-yellow-400 hover:text-black border 
										border-yellow-500 hover:cursor-pointer
											w-1/3 rounded btn-primary mt-2 mb-3 ml-3"
							onClick={() => setImageState(undefined)}
						>
							Cancel
						</button>
					</div>
				) : (
					<span className="font-bold text-md ml-2">No image selected</span>
				)}
			</div>
		</div>
	);
}

export default ImageProperties;

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
