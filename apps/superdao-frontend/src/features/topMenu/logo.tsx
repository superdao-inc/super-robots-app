import Link from 'next/link';

export const Logo = () => (
	<Link href="/" passHref>
		<a>
			<img src="/logo.svg" alt="Superdao" width={39} className="block cursor-pointer" />
		</a>
	</Link>
);
