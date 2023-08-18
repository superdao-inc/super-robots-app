// @test @123 and so on
export const MENTION_PATTERN = /\B@[a-z0-9_-]+/gi;

// @test @123 and so on but with keeping delimeter for split
export const MENTION_DELIMETER_PATTERN = /(\B@[a-z0-9_-]+)/gi;
