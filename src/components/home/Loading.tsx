function Loading() {
	return (
		<div className="relative inline-block h-20 w-20">
			<div className="animation-delay-240 absolute left-2 inline-block w-4 animate-juggle rounded-sm bg-primaryBlue"></div>
			<div className="animation-delay-120 absolute left-8 inline-block w-4 animate-juggle rounded-sm bg-primaryBlue"></div>
			<div className="absolute left-14 inline-block w-4 animate-juggle rounded-sm bg-primaryBlue delay-0"></div>
		</div>
	);
}

export default Loading;
