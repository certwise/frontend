import { useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { templateActions } from "../../../../store";
import Context from "../../../../store/context";
import { item } from "../../../../store/templates/types";
import { CgMore } from "react-icons/cg";
import css from "./card.module.css";
const ItemTypes = {
	CARD: "card",
};

export const Card = ({ id, index, moveCard, item }: any) => {
	const { store, dispatch } = useContext(Context);
	const ref = useRef<any>(null);
	const [{ handlerId }, drop] = useDrop({
		accept: ItemTypes.CARD,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: any, monitor: any) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: () => {
			return { id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const setActiveItem = (item: item) => {
		dispatch(templateActions.setActiveItem(item));
	};

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	return (
		<div
			data-handler-id={handlerId}
			ref={ref}
			style={{ opacity }}
			className={`flex flex-row ${
				css.layerCard
			} card border bg-white border-gray-300 p-1 rounded-none my-1 
								${
									store.templates.currentTemplate.canvas.activeItem?.id ===
									item.id
										? "border-primary text-primary "
										: "border-gray-400"
								}`}
			onClick={() => setActiveItem(item)}
		>
			<div className="text-left w-11/12  hover:cursor-pointer h-full align-middle pt-1 ">
				{item.name}
			</div>
			<div className={`${css.selector} right-0 pt-1`}>
				<CgMore />
			</div>
		</div>
	);
};
