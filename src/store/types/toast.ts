export interface Toast {
	message: string;
	duration: "long" | "short" | "eternal";
	type: "success" | "error" | "info" | "warning";
	positionX?: "left" | "center" | "right";
	positionY?: "top" | "center" | "bottom";
}
