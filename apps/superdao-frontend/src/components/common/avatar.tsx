import { HTMLAttributes } from 'react';
import BoringAvatar from 'boring-avatars';
import styled from '@emotion/styled';

import { getOptimizedFileUrl } from 'src/utils/upload';
import { generateCoverGradient } from 'src/utils/cover-generator';
import { WithChildren } from 'src/types/type.utils';

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type AvatarSize = Sizes | string;

type Props = HTMLAttributes<HTMLDivElement> & {
	size: AvatarSize;
	src?: string;
	fileId?: string | null;
	seed?: string;
};

const sizes: Record<AvatarSize, string> = {
	xxs: '20',
	xs: '24',
	sm: '32',
	md: '40',
	lg: '56',
	xl: '72',
	xxl: '77',
	xxxl: '96'
};

type BaseAvatarProps = HTMLAttributes<HTMLDivElement> & {
	size: AvatarSize;
};

const getAvatarSize = (size: AvatarSize): string => sizes[size] ?? size;

const BaseAvatar = (props: WithChildren<BaseAvatarProps>) => {
	const { size, children, ...rest } = props;

	return (
		<Wrapper size={getAvatarSize(size)} data-testid={'Avatar__wrapper'} {...rest}>
			{children}
		</Wrapper>
	);
};

const errorImg = (source: any) => {
	source.target.src = '/assets/broken-image-avatar.jpg';
};

export const Avatar = (props: Props) => {
	const { fileId, src, seed, ...rest } = props;

	const imageUrl = fileId ? getOptimizedFileUrl(fileId) : src;

	return (
		<BaseAvatar {...rest}>
			<Image
				src={imageUrl}
				onError={(e) => {
					errorImg(e);
				}}
				seed={seed}
				data-testid={'Avatar__image'}
			/>
		</BaseAvatar>
	);
};

const BORING_AVATAR_COLORS = ['#77E6FF', '#FE8FC9', '#A055FF', '#FF8135', '#CEF868'];

export const UserAvatar = (props: Props) => {
	const { fileId, src, seed = '', size, ...rest } = props;

	const imageUrl = fileId ? getOptimizedFileUrl(fileId) : src;
	const avatarSize = getAvatarSize(size);

	return (
		<BaseAvatar size={avatarSize} {...rest}>
			{imageUrl ? (
				<Image
					src={imageUrl}
					onError={(e) => {
						errorImg(e);
					}}
					seed={seed}
				/>
			) : (
				<UserAvatarStub seed={seed} size={avatarSize} />
			)}
		</BaseAvatar>
	);
};

type UserAvatarStubProps = {
	size: AvatarSize;
	seed: string;
};

export const UserAvatarStub = (props: UserAvatarStubProps) => {
	const { size, seed } = props;
	return <BoringAvatar name={seed} variant="beam" size={size} colors={BORING_AVATAR_COLORS} />;
};

const Wrapper = styled.div<Props>`
	display: block;
	width: ${(props) => props.size}px;
	height: ${(props) => props.size}px;
	border-radius: 50%;
	overflow: hidden;
	box-sizing: content-box;
	background-color: #1d1d1d;
`;

const Image = styled.img<Pick<Props, 'seed'>>`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
	object-position: center;

	&:not([src]) {
		background: ${({ seed }) => (seed ? generateCoverGradient(seed.split('').reverse().join()) : 'peachpuff')};
		/* https://stackoverflow.com/a/36367724/8428436 */
		content: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
	}
`;
