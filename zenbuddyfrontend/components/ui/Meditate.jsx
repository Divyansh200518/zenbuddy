import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

const Meditate = () => {
	const router = useRouter();

	return (
		<div className="breath-theme-body-wrapper">
			<Button
				onClick={() => {
					router.push("/dashboard");
				}}
				type="ghost"
				style={{ position: "absolute", top: "0", left: "0" }}>
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M30.0792 31.7044C28.895 32.1615 27.4694 32.0839 26.3856 31.5033L1.49674 18.17C0.562359 17.6694 0.00781226 16.8612 0.00781226 16C0.00781226 15.1388 0.562359 14.3306 1.49674 13.83L26.3856 0.49672C27.4694 -0.0838788 28.895 -0.161515 30.0792 0.295561C31.2635 0.752641 32.0078 1.66778 32.0078 2.66667V29.3333C32.0078 30.3322 31.2635 31.2474 30.0792 31.7044Z"
						fill="var(--textColor)"
					/>
				</svg>
			</Button>
			<div className="breath-theme-body-heading">
				<h2 className="breath-theme-body-heading1">BREATHE IN</h2>
				<h2 className="breath-theme-body-heading2">HOLD</h2>
				<h2 className="breath-theme-body-heading3">BREATHE OUT</h2>
			</div>
			<div className="breath-theme-body-circles">
				<div className="breath-theme-body-outer-circle"></div>
				<div className="breath-theme-body-middle-circle"></div>
				<div className="breath-theme-body-inner-circle"></div>
			</div>
			<div className="breath-theme-body-mute">
				<button>
					<svg
						width="51"
						height="51"
						viewBox="0 0 51 51"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M36.7695 44.6601C41.6725 39.7571 44.7051 32.9837 44.7051 25.5019C44.7051 18.0202 41.6725 11.2468 36.7695 6.34375L34.5156 8.59765C38.8418 12.9238 41.5176 18.9004 41.5176 25.5019C41.5176 32.1035 38.8418 38.08 34.5156 42.4062L36.7695 44.6601Z"
							fill="#778E65"
						/>
						<path
							d="M32.2617 40.1523C36.0111 36.4029 38.3301 31.2232 38.3301 25.5019C38.3301 19.7806 36.0111 14.6009 32.2617 10.8516L30.0078 13.1055C33.1803 16.278 35.1426 20.6608 35.1426 25.5019C35.1426 30.343 33.1803 34.7259 30.0078 37.8984L32.2617 40.1523Z"
							fill="#778E65"
						/>
						<path
							d="M27.7539 35.6445C30.3496 33.0488 31.9551 29.4628 31.9551 25.5019C31.9551 21.541 30.3496 17.9551 27.7539 15.3594L25.5 17.6133C27.5189 19.6321 28.7676 22.4212 28.7676 25.5019C28.7676 28.5826 27.5189 31.3717 25.5 33.3906L27.7539 35.6445Z"
							fill="#778E65"
						/>
						<path
							d="M21.4091 11.3155C21.9613 11.5809 22.3125 12.1393 22.3125 12.7519V38.2519C22.3125 38.8646 21.9613 39.423 21.4091 39.6884C20.857 39.9538 20.2015 39.8792 19.7231 39.4964L12.1909 33.4707H4.78125C3.90105 33.4707 3.1875 32.7571 3.1875 31.8769V19.1269C3.1875 18.2467 3.90105 17.5332 4.78125 17.5332H12.1909L19.7231 11.5074C20.2015 11.1247 20.857 11.0501 21.4091 11.3155Z"
							fill="#778E65"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Meditate;
