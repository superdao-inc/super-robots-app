import { ReactNode } from 'react';
import cn from 'classnames';
import { Body, Loader, Title2 } from 'src/components';

type AuthorisationWaitingProps = {
	title: string | ReactNode;
	description: string | ReactNode;
	className?: string;
};

/**
 * Wrapper for any components that display waiting process during authorisation.
 */
export const AuthenticationWaiting = (props: AuthorisationWaitingProps) => {
	const { title, description, className = '' } = props;

	return (
		<div className={cn('relative flex flex-col items-center', className)}>
			<Loader size="xl" />

			<Title2 className="mt-6">{title}</Title2>

			<Body className="text-foregroundSecondary mt-1 whitespace-pre-line text-center tracking-wide">{description}</Body>
		</div>
	);
};
