import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Context from "../../store/context";
import { Container } from "./layerStack/cardContainer";
import { templateActions } from "../../store";
import * as api from "../../api/templates";
import { Link, Redirect } from "react-router-dom";
function CanvasLayers() {
	const { store, dispatch } = React.useContext(Context);
	const [state, setstate] = React.useState({
		saved: false,
		isSaved: false,
		downloaded: false,
		saving: false,
	});
	const [exit, setExit] = React.useState<boolean>(false);
	useEffect(() => {
		return () => {
			dispatch(templateActions.isEditingTemplate(false));
		};
	}, []);
	const saveCanvas = () => {
		setstate({ ...state, saving: true });
		let currentTemplate = store.templates.currentTemplate;
		console.log(currentTemplate);
		dispatch(templateActions.downloadCurrentTemplate(true));
	};

	const addText = () => {
		dispatch(templateActions.createTextItem());
	};

	const addImg = async () => {
		let base = store.templates.currentTemplate.canvas.items.find(
			(item) => item.type === "base-image"
		) as any;
		api.addImg(base.width / 4, base.height / 4).then((res) => {
			console.log("Add image res:", res);
			dispatch(templateActions.createImageItem(res));
		});
	};
	if (exit) return <Redirect to="/templates" />;
	else
		return (
			!exit && (
				<div className="p-2 overflow-y-auto">
					<div className="">
						<button
							className={`mt-5 btn-sm btn-primary border-2-primary m-2 w-11/12  rounded-none p-0 ${
								state.saving ? "btn loading" : ""
							}`}
							onClick={saveCanvas}
						>
							Save Template
						</button>
					</div>
					{state.saved && alert("Templated successfully saved!")}
					<div>
						<button
							className="mt-3 btn-sm btn-primary m-2 w-11/12  rounded-none p-0 "
							onClick={() => setExit(true)}
						>
							Exit Editor
							{/* <Link
						component={ExitButton}
						//className="mt-3 btn-sm btn-primary m-2 w-11/12 rounded-none p-0 "
						//style={{ width: "100%", height: "100%" }}
						//to="/templates"
					></Link> */}
						</button>
					</div>
					<div className="pt-2 pb-2 text-lg font-bold">Layers</div>
					<DndProvider backend={HTML5Backend}>
						<Container />
					</DndProvider>
					<div className="flex row">
						<button
							className="mt-2 btn-sm btn-primary rounded mb-2 mr-1 w-full"
							onClick={addText}
						>
							Add text
						</button>
						<button
							className="mt-2 btn-sm btn-primary rounded mb-2 ml-1 w-full"
							onClick={addImg}
						>
							Add Img
						</button>
					</div>
				</div>
			)
		);
}

export default CanvasLayers;

const alert = (msg: string) => {
	return (
		<div className="alert">
			<div className="text-sm text-success">{msg}</div>
		</div>
	);
};
const ExitButton = () => (
	<div className="mt-3 btn-sm btn-primary m-2 w-full rounded-none p-0 ">
		Exit Editor
	</div>
);
