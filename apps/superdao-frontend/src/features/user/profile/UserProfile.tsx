import { memo } from 'react';

import { PublicUserFragment } from 'src/gql/user.generated';
import { UserProfileHead } from 'src/features/user/profile/head';
import { UserAPI } from 'src/features/user/API';

type UserProfileProps = {
	user: PublicUserFragment;
};

const UserProfile = (props: UserProfileProps) => {
	const { user } = props;
	const { id } = user;

	const isCurrentUserProfile = UserAPI.useIsCurrentUser(id);

	return (
		<>
			<UserProfileHead user={user} isCurrentUserProfile={isCurrentUserProfile} />
		</>
	);
};

export default memo(UserProfile);
