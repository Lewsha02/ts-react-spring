import React from "react";

import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import "./index.css";

const pages: string[] = [
	"https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
	"https://images.unsplash.com/photo-1511553677255-ba939e5537e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1682&q=80",
	"https://images.unsplash.com/photo-1534577403868-27b805ca4b9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3319&q=80",
	"https://images.unsplash.com/photo-1516707349512-54781082cf08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
	"https://images.unsplash.com/photo-1602183245419-82ae4ff801d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
];

export const App: React.FC = () => {
	const clamp = (num: number, clamp: number, higher: number): number => {
		return higher
			? Math.min(Math.max(num, clamp), higher)
			: Math.min(num, clamp);
	};

	const index = React.useRef<number>(0);
	const [props, set] = useSprings(pages.length, (i) => ({
		x: i * window.innerWidth,
		scale: 1,
		display: "block",
	}));
	const bind = useDrag(
		({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
			if (down && distance > window.innerWidth / 6)
				cancel(
					(index.current = clamp(
						index.current + (xDir > 0 ? -1 : 1),
						0,
						pages.length - 1
					))
				);
			set((i) => {
				if (i < index.current - 1 || i > index.current + 1)
					return { display: "none" };
				const x = (i - index.current) * window.innerWidth + (down ? mx : 0);
				const scale = down ? 1 - distance / window.innerWidth / 2 : 1;
				return { x, scale, display: "block" };
			});
		}
	);
	return (
		<>
			{props.map(({ x, display, scale }, i) => (
				<animated.div
					{...bind()}
					key={i}
					style={{ display, x } as any}
					className='slider'
				>
					<animated.div
						style={{ scale, backgroundImage: `url(${pages[i]})` } as any}
						className='slider-item'
					/>
				</animated.div>
			))}
			<div className='text'>
				<h4>Лес</h4>
				<ul>
					<li>
						Множество дикорастущих деревьев, расположенных на большом
						пространстве; пространство, обильно проросшее деревьями.
					</li>
					<li>Большое количество, множетсва (о вызвышающихся предметах).</li>
				</ul>
			</div>
		</>
	);
};
