import { Logo } from 'src/features/topMenu/logo';
import { Navigation } from 'src/features/topMenu/navigation';
import { AuthButton } from './authButton';

export const TopMenu = () => {
	return (
		<div className="flex items-center justify-between py-6">
			<div className="xs:px-0 flex items-center gap-7 px-4 md:gap-11">
				<Logo />
				<Navigation />
			</div>
			<AuthButton />
		</div>
	);
};
