import { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import { UserAvatar } from 'src/components/common/avatar';
import { Label1 } from 'src/components/text';
import { useUploadWidget } from 'src/hooks';
import { getOptimizedFileUrl } from 'src/utils/upload';
import { UploadOverlay } from './uploadOverlay';

type Props = {
	label: string;
	seed: string;
	currentAvatar?: string | null;
	onChange: (file: string) => void;
};

export const AvatarUploader = (props: Props) => {
	const { label, seed, currentAvatar, onChange } = props;

	const { t } = useTranslation();

	const [files, uploadWidget] = useUploadWidget({ imagesOnly: true, crop: '1:1' });
	const lastUploadedAvatar = files?.at?.(-1);

	useEffect(() => {
		if (lastUploadedAvatar) {
			onChange(lastUploadedAvatar);
		}
	}, [lastUploadedAvatar, onChange]);

	const avatarUrl = useMemo(() => {
		if (lastUploadedAvatar) {
			return getOptimizedFileUrl(lastUploadedAvatar);
		}

		return currentAvatar ? getOptimizedFileUrl(currentAvatar) : undefined;
	}, [lastUploadedAvatar, currentAvatar]);

	return (
		<div
			className="flex flex-row items-center gap-4 lg:flex-col-reverse lg:gap-2"
			data-testid={'AvatarUploader__block'}
		>
			<div className="group relative min-w-[90px] overflow-hidden rounded-full" onClick={uploadWidget.open}>
				<UserAvatar seed={seed} src={avatarUrl} size="90" />
				<UploadOverlay />
			</div>

			<div>
				<Label1>{label}</Label1>
				<Label1 className="text-foregroundTertiary lg:hidden">{t('upload.maxSize')}</Label1>
			</div>

			{uploadWidget.render()}
		</div>
	);
};
