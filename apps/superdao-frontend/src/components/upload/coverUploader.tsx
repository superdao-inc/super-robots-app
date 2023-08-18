import { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import { Label1 } from 'src/components/text';
import { useUploadWidget } from 'src/hooks';
import { getOptimizedFileUrl } from 'src/utils/upload';
import { UploadOverlay } from './uploadOverlay';
import { DEFAULT_COVER_FILE_ID } from 'src/constants/cover';

type Props = {
	label: string;
	currentCover?: string | null;
	onChange: (file: string) => void;
};

export const CoverUploader = (props: Props) => {
	const { label, currentCover, onChange } = props;

	const { t } = useTranslation();

	const [files, uploadWidget] = useUploadWidget({ imagesOnly: true, crop: '12:2' });
	const lastUploadedCover = files[files.length - 1];

	useEffect(() => {
		if (lastUploadedCover) {
			onChange(lastUploadedCover);
		}
	}, [lastUploadedCover, onChange]);

	const background = useMemo(() => {
		if (lastUploadedCover) {
			return `url(${getOptimizedFileUrl(lastUploadedCover)})`;
		}

		return `url(${getOptimizedFileUrl(currentCover || DEFAULT_COVER_FILE_ID)})`;
	}, [currentCover, lastUploadedCover]);

	return (
		<div className="flex flex-1 flex-col gap-3 lg:flex-col-reverse lg:gap-2" data-testid={'CoverUploader__block'}>
			<div className="group relative overflow-hidden rounded-xl" onClick={() => uploadWidget.open()}>
				<div className="h-[90px] !bg-cover !bg-center" style={{ background }} data-testid={'Cover__image'} />
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
