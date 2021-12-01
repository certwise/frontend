import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Context } from "../../../store";
import { Container } from "./layerStack/cardContainer";
import { actions } from "../../../store";
import { Redirect } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import css from "./builder.module.css";
import Dropdown from "react-dropdown";
import { ItemProperty } from "./canvasItems";
import { FaUndo, FaRedo } from "react-icons/fa";
import { useAddImage } from "../../../api/template";
import { useUpdate } from "../../../api/template";

function CanvasLayers() {
	const addImage = useAddImage();
	const addLayerDummyValue = "";
	const { store, dispatch } = React.useContext(Context);
	const [exit, setExit] = React.useState<boolean>(false);
	const saveTemplate = useUpdate();
	useEffect(() => {
		return () => {
			dispatch(actions.templates.isEditingTemplate(false));
		};
	}, []);
	const canvas = store.templates.currentTemplate.canvas;
	const saveCanvas = (e: any) => {
		e.preventDefault();
		if (store.templates.currentTemplate) {
			dispatch(
				actions.templates.setGrid({ ...store.templates.grid, isEnabled: false })
			);
			dispatch(actions.templates.setActiveItem(undefined));
			dispatch(actions.templates.downloadCurrentTemplate(true));
			dispatch(actions.templates.setTemplateSaving(true));
			saveTemplate.mutate(store.templates.currentTemplate);
		}
	};

	const addText = () => {
		dispatch(actions.templates.createTextItem());
	};

	if (exit) return <Redirect to="/templates" />;
	else
		return (
			!exit && (
				<div className="p-2 px-3 h-screen text-xs scrollbar-hidden ">
					<div>
						<button
							disabled={store.templates.isSaving && saveTemplate.isLoading}
							className={`mt-5 btn  py-1 w-11/12 ml-1.5 rounded-sm p-1 ${
								store.templates.isSaving && saveTemplate.isLoading
									? "text-white bg-blue-200 btn-disabled border-none"
									: "text-white bg-blue-500 hover:bg-blue-600"
							}`}
							onClick={(e) => saveCanvas(e)}
						>
							Save Template
						</button>
					</div>
					<div>
						<button
							className="mt-3 mb-5 btn p-1 text-blue-500 w-11/12 border-blue-500 hover:bg-blue-600 hover:text-white ml-1.5 bg-white rounded-sm "
							onClick={() => setExit(true)}
						>
							Exit Editor
						</button>
					</div>
					<div className="pb-4 border-t border-gray-300 pt-2">
						<div className="mb-1 font-bold ">
							Template name
							<span className="ml-2 input input-primary font-medium input-sm rounded-none w-full">
								{store.templates.currentTemplate.name}
							</span>
						</div>
						<ItemProperty name="Width">
							<input
								type="number"
								className="w-full h-full align-middle pl-2"
								value={canvas.width}
								onChange={(e) => {
									let p = canvas;
									p.width = parseInt(e.target.value);
									dispatch(actions.templates.editWholeCanvas(p));
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
									dispatch(actions.templates.editWholeCanvas(p));
								}}
							/>
						</ItemProperty>
					</div>
					<div className="border-t border-gray-300 pt-2 pb-4">
						<div className="font-bold">Variables</div>
						<ol>
							{store.templates.currentTemplate.templateFields?.map((field) => {
								return (
									<li key={field.name} className="font-bold text-blue-600 my-1">
										-&gt; {field.name}
									</li>
								);
							})}
						</ol>
					</div>
					<div className="flex flexrow pb-2 border-t border-gray-300 pt-2">
						<div className="w-11/12 font-bold mt-2">Layers</div>
						<div
							data-tip="Add Layer"
							className={`${css.addLayer} tooltip tooltip-left z-10`}
							style={{ zIndex: 10 }}
						>
							<Dropdown
								className="relative z-10"
								menuClassName="fixed mr-64 bg-gray-800 py-3 px-0.5 bg-opacity-75 rounded"
								placeholderClassName="hidden"
								options={[
									{
										value: "text",
										label: "",
										className:
											"btn m-2 btn text-white bg-blue-500 hover:bg-blue-600 block w-48 z-10",
									},
									{
										value: "image",
										label: "",
										className:
											"btn m-2 btn text-white bg-blue-500 hover:bg-blue-600 block w-48 z-10",
									},
								]}
								arrowClosed={
									<MdAddCircleOutline
										className="mt-1 text-blue-500"
										size={24}
									/>
								}
								arrowOpen={
									<MdAddCircleOutline
										className="mt-1 text-blue-500"
										size={24}
									/>
								}
								placeholder={addLayerDummyValue}
								value={addLayerDummyValue}
								onChange={(e) => {
									if (e.value === "text") addText();
									else if (e.value === "image") addImage.mutate();
								}}
							/>
						</div>
					</div>

					<DndProvider backend={HTML5Backend}>
						<Container />
					</DndProvider>
					<div className="mt-5 flex flex-row border-t pt-2 border-gray-300">
						<label
							htmlFor="isEnabledGrid"
							className="font-bold mt-2 mr-3 w-11/12"
						>
							Grid Lines
						</label>
						<input
							id="isEnabledGrid"
							type="checkbox"
							className="checkbox checkbox-primary mt-2 align-bottom"
							checked={store.templates.grid.isEnabled}
							onChange={(e) => {
								const grid = { ...store.templates.grid };
								grid.isEnabled = e.target.checked;
								grid.stroke = "#aaa";
								dispatch(actions.templates.setGrid(grid));
							}}
						/>
					</div>
					{store.templates.grid.isEnabled && (
						<div>
							<ItemProperty name="Width">
								<input
									type="number"
									className="h-full input-primary w-full border-none pl-2"
									value={store.templates.grid.width}
									onChange={(e) => {
										const grid = store.templates.grid;
										grid.width = parseInt(e.target.value);
										dispatch(actions.templates.setGrid(grid));
									}}
								/>
							</ItemProperty>
							<ItemProperty name="Height">
								<input
									type="number"
									className="h-full input-primary w-full border-none pl-2"
									value={store.templates.grid.height}
									onChange={(e) => {
										const grid = store.templates.grid;
										grid.height = parseInt(e.target.value);
										dispatch(actions.templates.setGrid(grid));
									}}
								/>
							</ItemProperty>
							<div className="mt-1 flex flex-row">
								<label
									htmlFor="isEnabledSnap"
									className="font-bold mr-3 w-11/12"
								>
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
										dispatch(actions.templates.setSnap(snapPoints));
									}}
								/>
							</div>
						</div>
					)}
					<div className="mt-5 border-t pt-2 border-gray-300"></div>
					<div className="flex flex-row w-full">
						<div className="flex-grow w-full my-2 mr-1">
							<button className="btn p-1 text-blue-500 w-11/12 border-blue-500 hover:bg-blue-600 hover:text-white rounded-none">
								<FaUndo className="mr-2" />
								Undo
							</button>
						</div>
						<div className="flex-grow w-full my-2 ml-1">
							<button className="btn p-1 text-blue-500 w-11/12 border-blue-500 hover:bg-blue-600 hover:text-white rounded-none">
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
