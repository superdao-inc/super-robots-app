import { PipeTransform, Injectable } from '@nestjs/common';
import { transformSocialLink } from '@sd/superdao-shared';

interface ISocialPipe {
	telegram: string | null | undefined;
	twitter: string | null | undefined;
	instagram: string | null | undefined;
	discord: string | null | undefined;
	facebook: string | null | undefined;
}

@Injectable()
export class SocialPipe implements PipeTransform {
	transform(value: ISocialPipe) {
		return {
			...value,
			telegram: transformSocialLink('telegram')(value.telegram),
			twitter: transformSocialLink('twitter')(value.twitter),
			instagram: transformSocialLink('instagram')(value.instagram),
			discord: transformSocialLink('discord')(value.discord),
			facebook: transformSocialLink('facebook')(value.facebook)
		};
	}
}
