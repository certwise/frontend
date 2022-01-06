import React, { useRef, useEffect } from "react";
import { focusHandling } from "cruip-js-toolkit";

import {
	Chart,
	DoughnutController,
	ArcElement,
	TimeScale,
	Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig } from "../utils/Utils";

Chart.register(DoughnutController, ArcElement, TimeScale, Tooltip);

function DoughnutChart({ data, width, height }: any) {
	const canvas = useRef<any>(null);
	const legend = useRef<any>(null);

	useEffect(() => {
		const ctx = canvas.current;
		// eslint-disable-next-line no-unused-vars
		const chart = new Chart(ctx, {
			type: "doughnut",
			data: data,
			options: {
				cutout: "80%",
				layout: {
					padding: 24,
				},
				plugins: {
					legend: {
						display: false,
					},
				},
				interaction: {
					intersect: false,
					mode: "nearest",
				},
				animation: {
					duration: 500,
				},
				maintainAspectRatio: false,
				resizeDelay: 200,
			},
			plugins: [
				{
					id: "htmlLegend",
					afterUpdate(c: any, args, options) {
						const ul: any = legend.current;
						if (!ul) return;
						// Remove old legend items
						while (ul.firstChild) {
							ul.firstChild.remove();
						}
						// Reuse the built-in legendItems generator
						const items: any = [];
						items.forEach((item: any) => {
							const li = document.createElement("li");
							li.style.margin = (tailwindConfig() as any).theme.margin[1];
							// Button element
							const button = document.createElement("button");
							button.classList.add("btn-xs");
							button.style.backgroundColor = (
								tailwindConfig() as any
							).theme.colors.white;
							button.style.borderWidth = (
								tailwindConfig() as any
							).theme.borderWidth[1];
							button.style.borderColor = (
								tailwindConfig() as any
							).theme.colors.gray[200];
							button.style.color = (
								tailwindConfig() as any
							).theme.colors.gray[500];
							button.style.boxShadow = (
								tailwindConfig() as any
							).theme.boxShadow.md;
							button.style.opacity = item.hidden ? ".3" : "";
							button.onclick = () => {
								c.toggleDataVisibility(item.index, !item.index);
								c.update();
								focusHandling();
							};
							// Color box
							const box = document.createElement("span");
							box.style.display = "block";
							box.style.width = (tailwindConfig() as any).theme.width[2];
							box.style.height = (tailwindConfig() as any).theme.height[2];
							box.style.backgroundColor = item.fillStyle;
							box.style.borderRadius = (
								tailwindConfig() as any
							).theme.borderRadius.sm;
							box.style.marginRight = (tailwindConfig() as any).theme.margin[1];
							box.style.pointerEvents = "none";
							// Label
							const label = document.createElement("span");
							label.style.display = "flex";
							label.style.alignItems = "center";
							const labelText = document.createTextNode(item.text);
							label.appendChild(labelText);
							li.appendChild(button);
							button.appendChild(box);
							button.appendChild(label);
							ul.appendChild(li);
						});
					},
				},
			],
		});
		return () => chart.destroy();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex-grow flex flex-col justify-center">
			<div>
				<canvas ref={canvas} width={width} height={height}></canvas>
			</div>
			<div className="px-5 pt-2 pb-6">
				<ul ref={legend} className="flex flex-wrap justify-center -m-1"></ul>
			</div>
		</div>
	);
}

export default DoughnutChart;
