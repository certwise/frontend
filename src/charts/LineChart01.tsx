import React, { useRef, useEffect } from "react";

import {
	Chart,
	LineController,
	LineElement,
	Filler,
	PointElement,
	LinearScale,
	TimeScale,
	Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig, formatValue } from "../utils/Utils";

Chart.register(
	LineController,
	LineElement,
	Filler,
	PointElement,
	LinearScale,
	TimeScale,
	Tooltip
);

function LineChart01({ data, width, height }: any) {
	const canvas = useRef<any>(null);

	useEffect(() => {
		const ctx = canvas.current;
		// eslint-disable-next-line no-unused-vars
		const chart: any = new Chart(ctx, {
			type: "line",
			data: data,
			options: {
				chartArea: {
					backgroundColor: (tailwindConfig() as any).theme.colors.gray[50],
				},
				layout: {
					padding: 20,
				},
				scales: {
					y: {
						display: false,
						beginAtZero: true,
					},
					x: {
						type: "time",
						time: {
							parser: "MM-DD-YYYY",
							unit: "month",
						},
						display: false,
					},
				},
				plugins: {
					tooltip: {
						callbacks: {
							title: () => "", // Disable tooltip title
							label: (context: any) => formatValue(context.parsed.y),
						},
					},
					legend: {
						display: false,
					},
				},
				interaction: {
					intersect: false,
					mode: "nearest",
				},
				maintainAspectRatio: false,
				resizeDelay: 200,
			},
		} as any);
		return () => chart.destroy();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <canvas ref={canvas} width={width} height={height}></canvas>;
}

export default LineChart01;
