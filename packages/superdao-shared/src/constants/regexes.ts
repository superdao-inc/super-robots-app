export const TELEGRAM_REGEX = /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9/+_-]*)\/?$/;
export const OPENSEA_REGEX = /(https?:\/\/)?(www[.])?opensea\.io\/collection\/([a-zA-Z0-9/+_-]+)\/?$/;
export const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g;
export const ALL_BESIDES_URL_CHARS_REGEX = /[^a-z\d\-_]/gi;
export const SLUG_REGEX = /^[a-zA-Z\d\-_]+$/;
export const NUMBERS_REGEX = /^[0-9]*$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// \P{Emoji} matches numbers, so we use Emoji_Presentation
// for more complex case look at https://www.npmjs.com/package/emoji-regex
export const NO_EMOJI_REGEX = /^(?:\P{Emoji_Presentation})+$/u;
