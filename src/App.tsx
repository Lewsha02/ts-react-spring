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

export function App() {
	const clamp = (num: number, clamp: number, higher: number): number => {
		return higher ? Math.min(Math.max(num, clamp), higher) : Math.min(num, clamp);
	};

	const index = React.useRef(0);
	const [props, set] = useSprings(pages.length, (i) => ({
		x: i * window.innerWidth,
		scale: 1,
		display: "block",
	}));
	const bind = useDrag(
		({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
			if (active && distance > window.innerWidth / 2)
				cancel: void(
					(index.current = clamp(
						index.current + (xDir > 0 ? -1 : 1),
						0,
						pages.length - 1
					))
				);
			set((i) => {
				if (i < index.current - 1 || i > index.current + 1)
					return { display: "none" };
				const x = (i - index.current) * window.innerWidth + (active ? mx : 0);
				const scale = active ? 1 - distance / window.innerWidth / 2 : 1;
				return { x, scale, display: "block" };
			});
		}
	);
	return props.map(({ x, display, scale }, i) => (
		<animated.div {...bind()} key={i} style={{ display, x }}>
			<animated.div style={{ scale, backgroundImage: `url(${pages[i]})` }} />
		</animated.div>
	));
}
