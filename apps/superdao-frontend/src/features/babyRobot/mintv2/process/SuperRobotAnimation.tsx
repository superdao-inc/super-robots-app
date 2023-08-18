import cn from 'classnames';

export const SuperRobotAnimation = () => {
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	return (
		<div className="z-2 1280:z-0 1280:top-0 1280:bottom-0 1280:left-0 1280:h-[calc(100vh-56px)] 1280:w-screen 744:h-[720px] 744:w-[720px] 744:bottom-[116px] 744:left-[calc(50%-360px)] 1280:flex 1280:justify-end 1280:items-center absolute left-[calc(50%-160px)] bottom-[104px] h-[320px] w-[320px]">
			{
				// safari
			}
			<video
				className={cn('1280:w-max 1440:w-[calc(100vw-530px)] h-full max-h-[720px] w-full object-contain', {
					hidden: !isSafari
				})}
				autoPlay
				playsInline
				loop
				muted
			>
				<source src="/video/robot-landing-animation-full.mov" />
			</video>
			{
				// normal browsers
			}
			<video
				className={cn('1280:w-max 1440:w-[calc(100vw-530px)] h-full max-h-[720px] w-full object-contain', {
					hidden: isSafari
				})}
				autoPlay
				loop
				muted
				playsInline
			>
				<source src="/video/robot-landing-animation-full.webm" />
			</video>
		</div>
	);
};
