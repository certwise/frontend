import { useContext } from "react";
import { Context } from "../../../../store";
import { actions } from "../../../../store";
import Modal from "react-modal";
import { items } from "../../../../store/types";

function FontSelector({ isOpen, close, styles, loadMoreFonts }: any) {
	const { store, dispatch } = useContext(Context);
	const items = store.templates.currentTemplate.canvas.items;
	const activeItem = store.templates.currentTemplate.canvas.activeItem;
	const fonts = store.templates.fonts;
	return (
		<div className="bg-transparent">
			<Modal
				onRequestClose={close}
				isOpen={isOpen}
				style={{
					overlay: {
						background: "rgba(0, 0, 0, 0.2)",
					},
					content: {
						background: "none",
						border: "none",
					},
				}}
				className="flex"
				appElement={document.getElementById("root") as any}
			>
				<div className="w-full bg-transparent"></div>
				<ul
					style={{
						overflow: "auto",
						paddingRight: "16px",
						background: "rgba(0, 0, 0, 0.8)",
						...styles,
					}}
					className="p-2 border-2 shadow-lg  menu w-1/5  bg-transparent"
				>
					<div className="ml-auto mr-5 pr-5  bg-transparent">
						<div
							className="btn btn-error btn-circle mb-5"
							style={{ position: "absolute", marginLeft: "auto" }}
							onClick={close}
						>
							X
						</div>
					</div>
					{fonts.map((font: any, i: number) => {
						return (
							<li
								key={i}
								style={{ fontFamily: font.family }}
								className="block text-white  text-left text-lg btn bg-transparent border-none hover:bg-gray-500"
								onChange={(e) => {}}
								onClick={() => {
									let p: items = [...items];
									p.map((item) => {
										if (item.id === activeItem?.id && item.type === "text") {
											item.fontFamily = font.family;
											item.fontFileLink = font.files.regular;
											return item;
										} else {
											return item;
										}
									});
									dispatch(actions.templates.editCanvas(p));
								}}
							>
								{font.family}{" "}
							</li>
						);
					})}
					<li>
						<button className="btn-xs btn-primary" onClick={loadMoreFonts}>
							Load More
						</button>
					</li>
				</ul>
			</Modal>
		</div>
	);
}

export default FontSelector;
