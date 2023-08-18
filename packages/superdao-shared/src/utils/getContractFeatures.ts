const baseFeatures = {
	setName: false,
	setSymbol: false
};

export type ContractFeatures = typeof baseFeatures;

export const availableFeatures: Record<keyof ContractFeatures, { from: string }> = {
	setName: {
		from: '1.0.1'
	},
	setSymbol: {
		from: '1.0.1'
	}
} as const;

const numberRegEx = new RegExp(/\d/g);

const stringToNumber = (str?: string) => (str ? Number(str.match(numberRegEx)?.join('')) : 0);
const isValidVersion = (str?: string) => !!str && numberRegEx.test(str);
const isVersionAfterOrEq = (v1?: string, v2?: string) => !!v1 && !!v2 && stringToNumber(v1) >= stringToNumber(v2);

export const getContractFeatures = (erc721semver: string | undefined) => {
	return isValidVersion(erc721semver)
		? (Object.fromEntries(
				Object.keys(baseFeatures).map((featureName) => [
					featureName,
					isVersionAfterOrEq(erc721semver, availableFeatures[featureName as keyof ContractFeatures].from)
				])
		  ) as ContractFeatures)
		: undefined;
};
