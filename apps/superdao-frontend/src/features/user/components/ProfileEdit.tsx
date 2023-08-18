import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { getPathnameFromUrl, shrinkWallet } from '@sd/superdao-shared';

import { UpdateUserRequest, updateUserResolver } from 'src/validators/users';
import { AvatarUploader } from 'src/components/upload/avatarUploader';
import { CoverUploader } from 'src/components/upload/coverUploader';
import { Button } from 'src/components/button';
import { Input, Label } from 'src/components/input';
import { InstagramIcon, LinkIcon, TelegramIcon, TwitterIcon } from 'src/components/assets/icons';
import { Textarea, Title1, toast } from 'src/components';
import { CustomHead } from 'src/components/head';
import { AppError } from 'src/services/errors';
import { colors } from 'src/style';
import { parseGqlErrorMessage } from 'src/utils/errors';
import { UserAPI } from '../API';
import { PublicUserFragment } from 'src/gql/user.generated';

type Props = {
	currentUser: PublicUserFragment;
	hostname: string;
};

export const ProfileEdit = ({ currentUser, hostname }: Props) => {
	const router = useRouter();
	const { t } = useTranslation();
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdateUserLoading } = UserAPI.useUpdateUserMutation();

	useEffect(() => {
		const section = window.location.hash.replace('#', '');

		const socialLinksSectionEl = socialLinksSectionRef.current;

		if (socialLinksSectionEl && section === socialLinksSectionEl.id) {
			// Set focus to the first input
			socialLinksSectionEl.querySelector<HTMLInputElement>('input')?.focus();
		}
	}, []);

	const formProps = useMemo(() => {
		const { id, displayName, bio, avatar, cover, links, slug } = currentUser;

		return {
			resolver: updateUserResolver,
			mode: 'onChange' as const,
			defaultValues: {
				id,
				displayName,
				bio: bio ?? '',
				avatar,
				cover,
				site: links.site,
				telegram: getPathnameFromUrl(links.telegram),
				instagram: getPathnameFromUrl(links.instagram),
				discord: getPathnameFromUrl(links.discord),
				twitter: getPathnameFromUrl(links.twitter),
				slug: slug || id
			}
		};
	}, [currentUser]);
	const { register, handleSubmit, setValue, formState } = useForm<UpdateUserRequest>(formProps);

	const socialLinksSectionRef = useRef<HTMLFieldSetElement>(null);

	const onSubmit = handleSubmit((data) => {
		updateUser(
			{ updateUserData: { ...data } },
			{
				onSuccess: async (result) => {
					const { slug } = result.updateUser;

					queryClient.setQueryData('CurrentUser', { currentUser: result.updateUser });
					queryClient.setQueryData(['UserBySlug', { userslug: slug }], { userBySlug: result.updateUser });

					router.push(`/u/${slug}`);
				},
				onError: (error) => {
					AppError.capture(error, {
						payload: { tags: { team: 'CORE', section: 'User' } },
						display: () => {
							toast.error(parseGqlErrorMessage(error) || t('errors.unknownServerError'));
						}
					});
				}
			}
		);
	});

	const { walletAddress, displayName, ens, id, avatar, cover } = currentUser;
	const { isValid, errors } = formState;
	const disabledSubmit = !isValid || isUpdateUserLoading;
	const name = displayName || shrinkWallet(ens || walletAddress);

	return (
		<div className="xs:pb-[64px] relative mx-auto flex min-w-[320px] max-w-[608px] flex-1 justify-center pb-[40px] lg:pb-0">
			<CustomHead main={name} additional={'Profile edition'} description={'Superdao profile edition'} />

			<div className="bg-backgroundPrimary xs:bg-backgroundSecondary xs:rounded-lg xs:pt-5 w-full px-6 pb-6">
				<Title1 className="mb-6 hidden lg:flex">{t('pages.editProfile.title')}</Title1>

				<Form onSubmit={onSubmit} className="">
					<div className="flex w-full flex-col-reverse gap-7 lg:flex-row">
						<AvatarUploader
							label={t('upload.avatarLabel')}
							seed={id}
							currentAvatar={avatar}
							onChange={(file) => {
								setValue('avatar', file);
							}}
						/>

						<CoverUploader
							label={t('upload.coverLabel')}
							currentCover={cover}
							onChange={(file) => {
								setValue('cover', file);
							}}
						/>
					</div>

					<Input
						label={t('components.user.displayName.label')}
						placeholder={t('components.user.displayName.placeholder')}
						error={errors.displayName?.message}
						{...register('displayName')}
					/>
					<Input
						label={t('components.user.slug.label')}
						placeholder={t('components.user.slug.placeholder')}
						prefix={`${hostname}/u/`}
						prefixClassName="max-w-[161px]"
						className="w-full"
						error={errors.slug?.message}
						{...register('slug')}
					/>

					<Textarea
						label={t('components.user.bio.label')}
						placeholder={t('components.user.bio.placeholder')}
						error={errors.bio?.message}
						{...register('bio')}
					/>

					<Links id="social-links" ref={socialLinksSectionRef}>
						<Label>{t('components.user.links.label')}</Label>
						<Input
							leftIcon={<LinkIcon fill={colors.foregroundSecondary} />}
							placeholder={t('components.user.links.sitePlaceholder')}
							className="w-full"
							// error={errors.site?.message}
							{...register('site')}
						/>
						<Input
							leftIcon={<TwitterIcon fill={colors.foregroundSecondary} />}
							placeholder={t('components.user.links.twitterPlaceholder')}
							prefix="twitter.com/"
							prefixClassName="max-w-[130px]"
							className="w-full"
							// error={errors.twitter?.message}
							{...register('twitter')}
						/>
						<Input
							leftIcon={<InstagramIcon fill={colors.foregroundSecondary} />}
							placeholder={t('components.user.links.instagramPlaceholder')}
							prefix="instagram.com/"
							prefixClassName="max-w-[130px]"
							className="w-full"
							// error={errors.instagram?.message}
							{...register('instagram')}
						/>
						<Input
							leftIcon={<TelegramIcon fill={colors.foregroundSecondary} />}
							placeholder={t('components.user.links.telegramPlaceholder')}
							prefix="t.me/"
							prefixClassName="max-w-[130px]"
							className="w-full"
							// error={errors.telegram?.message}
							{...register('telegram')}
						/>
					</Links>

					<div className="bg-backgroundPrimary fixed bottom-0 left-0 w-full py-6 lg:relative lg:mb-0 lg:w-auto lg:py-0">
						<Button
							color="accentPrimary"
							size="lg"
							type="submit"
							label={t('actions.labels.save')}
							disabled={disabledSubmit}
							data-testid="ProfileEdit__saveButton"
							className="mx-4 w-[calc(100%-32px)] lg:mx-0 lg:w-auto"
						/>
					</div>
				</Form>
			</div>
		</div>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 28px;
`;

const Links = styled.fieldset`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 8px;

	margin: 0;
	padding: 0;
	border: none;
`;
