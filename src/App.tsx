import React from "react";

import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useFela } from "react-fela";

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

	const { css } = useFela();

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
					className={css(slider)}
				>
					<animated.div
						style={{ scale, backgroundImage: `url(${pages[i]})` } as any}
						className={css(sliderItem)}
					/>
				</animated.div>
			))}

			<div className={css(text)} >
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

const slider = () => ({
	position: 'absolute',
	width: '100vw',
	height: '100vh',
	willChange: 'transform',
	zIndex: 1
} as any);

const sliderItem = () => ({
	zIndex: 1,
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center center',
	width: '100%',
	height: '100%',
	willChange: 'transform',
	boxShadow: '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)'
} as any);

const text = () => ({
	marginTop: '100px',
	marginLeft: '50px',
	zIndex: 10,
	position: 'relative',
	color: '#fff',
	pointerEvents: 'none',
	'> h4': {
		fontSize: '30px',
		color: '#fff',
		margin: 0,
		padding: 0
	},
	'> ul': {
		listStyleType: 'decimal',
		marginTop: '20px',
		maxWidth: '780px',
		'> li': {
			fontSize: '18px',
			lineHeight: 1.6,
			marginBottom: '20px',
			padddingLeft: '10px'
		}
	}
} as any);