import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Context from "../../../store/context";
import { Container } from "./layerStack/cardContainer";
import { templateActions } from "../../../store";
import * as api from "../../../api/templates";
import { Redirect } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import css from "./builder.module.css";
import Dropdown from "react-dropdown";
import { ItemProperty } from "./canvasItems";
import { FaUndo, FaRedo } from "react-icons/fa";
function CanvasLayers() {
	const addLayerDummyValue = "";
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
	const canvas = store.templates.currentTemplate.canvas;
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
		let base = store.templates.currentTemplate.canvas;
		api.addImg(base.width / 4, base.height / 4).then((res) => {
			console.log("Add image res:", res);
			dispatch(templateActions.createImageItem(res));
		});
	};
	if (exit) return <Redirect to="/templates" />;
	else
		return (
			!exit && (
				<div className="p-2 overflow-y-auto  h-screen text-xs">
					<div className="">
						<button
							className={`mt-5 btn btn-sm btn-primary border-2-primary m-1.5 w-11/12  rounded p-0 ${
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
							className="mt-3 mb-5 btn btn-sm btn-primary btn-outline bg-white m-1.5 w-11/12  rounded p-0 "
							onClick={() => setExit(true)}
						>
							Exit Editor
						</button>
					</div>
					<div className="pb-4 border-t border-gray-300 pt-2">
						<div className="mb-1 font-bold ">Template name</div>
						<div>
							<div className="input input-primary input-sm rounded-none w-full">
								{store.templates.currentTemplate.name}
							</div>
						</div>
						<ItemProperty name="Width">
							<input
								type="number"
								className="w-full h-full align-middle pl-2"
								value={canvas.width}
								onChange={(e) => {
									let p = canvas;
									p.width = parseInt(e.target.value);
									dispatch(templateActions.editWholeCanvas(p));
								}}
							/>
						</ItemProperty>
						<ItemProperty name="Height">
							<input
								type="number"
								className="w-full h-full align-middle pl-2"
								value={canvas.height}
								onChange={(e) => {
									let p = canvas;
									p.height = parseInt(e.target.value);
									dispatch(templateActions.editWholeCanvas(p));
								}}
							/>
						</ItemProperty>
					</div>
					<div className="flex flexrow pb-2 border-t border-gray-300 pt-2">
						<div className="text-lg w-11/12 font-bold">Layers</div>
						<div
							data-tip="Add Layer"
							className={`${css.addLayer} tooltip tooltip-left z-10`}
							style={{ zIndex: 10 }}
						>
							<Dropdown
								className="fixed z-10"
								menuClassName="mr-64 bg-gray-800 py-3 px-0.5 bg-opacity-75 rounded"
								placeholderClassName="hidden"
								options={[
									{
										value: "text",
										label: "",
										className: "btn m-2 btn btn-primary block w-48 z-10",
									},
									{
										value: "image",
										label: "",
										className: "btn m-2 btn btn-primary block w-48 z-10",
									},
								]}
								arrowClosed={<MdAddCircleOutline className="mt-1" size={24} />}
								arrowOpen={<MdAddCircleOutline className="mt-1" size={24} />}
								placeholder={addLayerDummyValue}
								value={addLayerDummyValue}
								onChange={(e) => {
									if (e.value === "text") addText();
									else if (e.value === "image") addImg();
								}}
							/>
						</div>
					</div>
					<DndProvider backend={HTML5Backend}>
						<Container />
					</DndProvider>
					<div className="mt-5 flex flex-row border-t pt-2 border-gray-300">
						<label htmlFor="isEnabledGrid" className="mr-3 w-11/12">
							Grid Lines
						</label>
						<input
							id="isEnabledGrid"
							type="checkbox"
							className="checkbox checkbox-primary mt-2 align-bottom"
							checked={store.templates.grid.isEnabled}
							onChange={(e) => {
								const grid = store.templates.grid;
								grid.isEnabled = e.target.checked;
								dispatch(templateActions.setGrid(grid));
								const snapPoints = store.templates.snapPoints;
								snapPoints.isEnabled = false;
								dispatch(templateActions.setSnap(snapPoints));
							}}
						/>
					</div>
					{store.templates.grid.isEnabled && (
						<div>
							<ItemProperty name="Grid width">
								<input
									type="number"
									className="h-full input-primary w-full border-none pl-2"
									value={store.templates.grid.width}
									onChange={(e) => {
										const grid = store.templates.grid;
										grid.width = parseInt(e.target.value);
										dispatch(templateActions.setGrid(grid));
									}}
								/>
							</ItemProperty>
							<ItemProperty name="Grid Height">
								<input
									type="number"
									className="h-full input-primary w-full border-none pl-2"
									value={store.templates.grid.height}
									onChange={(e) => {
										const grid = store.templates.grid;
										grid.height = parseInt(e.target.value);
										dispatch(templateActions.setGrid(grid));
									}}
								/>
							</ItemProperty>
							<div className="mt-1 flex flex-row">
								<label htmlFor="isEnabledSnap" className="mr-3 w-11/12">
									Snap
								</label>
								<input
									id="isEnabledSnap"
									type="checkbox"
									className="checkbox checkbox-primary mt-2 align-bottom"
									checked={store.templates.snapPoints.isEnabled}
									onChange={(e) => {
										const snapPoints = store.templates.snapPoints;
										snapPoints.isEnabled = e.target.checked;
										dispatch(templateActions.setSnap(snapPoints));
									}}
								/>
							</div>
						</div>
					)}
					<div className="mt-5 border-t pt-2 border-gray-300"></div>
					<div className="flex flex-row w-full">
						<div className="flex-grow w-full my-2 mr-1">
							<button className="btn btn-sm btn-primary btn-outline w-full  bg-white rounded-none p-0">
								<FaUndo className="mr-2" />
								Undo
							</button>
						</div>
						<div className="flex-grow w-full my-2 ml-1">
							<button className="btn btn-sm btn-primary btn-outline w-full  bg-white rounded-none p-0">
								<FaRedo className="mr-2" />
								Redo
							</button>
						</div>
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
