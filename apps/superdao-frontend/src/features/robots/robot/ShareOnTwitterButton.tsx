import { useRouter } from 'next/router';
import { TwitterShareButton } from 'src/components';
import { useRobotDataContext } from '../context/robotDataContext';

type Props = {
	disabled: boolean;
};

export const ShareOnTwitterButton = (props: Props) => {
	const { asPath } = useRouter();
	const { protocol, hostname } = useRobotDataContext();

	return (
		<TwitterShareButton
			className="min-h-[56px] w-full p-4 backdrop-blur-lg"
			btnText="Share"
			twitterText="Check out this Super Robot!"
			url={`${protocol}${hostname}${asPath}`}
			{...props}
		/>
	);
};
