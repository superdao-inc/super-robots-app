import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	BigDecimal: any;
	BigInt: any;
	Bytes: any;
};

export type AdminOption = {
	__typename?: 'AdminOption';
	controller: Controller;
	id: Scalars['ID'];
	user?: Maybe<User>;
};

export type AdminOption_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	controller?: InputMaybe<Scalars['String']>;
	controller_?: InputMaybe<Controller_Filter>;
	controller_contains?: InputMaybe<Scalars['String']>;
	controller_contains_nocase?: InputMaybe<Scalars['String']>;
	controller_ends_with?: InputMaybe<Scalars['String']>;
	controller_ends_with_nocase?: InputMaybe<Scalars['String']>;
	controller_gt?: InputMaybe<Scalars['String']>;
	controller_gte?: InputMaybe<Scalars['String']>;
	controller_in?: InputMaybe<Array<Scalars['String']>>;
	controller_lt?: InputMaybe<Scalars['String']>;
	controller_lte?: InputMaybe<Scalars['String']>;
	controller_not?: InputMaybe<Scalars['String']>;
	controller_not_contains?: InputMaybe<Scalars['String']>;
	controller_not_contains_nocase?: InputMaybe<Scalars['String']>;
	controller_not_ends_with?: InputMaybe<Scalars['String']>;
	controller_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	controller_not_in?: InputMaybe<Array<Scalars['String']>>;
	controller_not_starts_with?: InputMaybe<Scalars['String']>;
	controller_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	controller_starts_with?: InputMaybe<Scalars['String']>;
	controller_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	user?: InputMaybe<Scalars['String']>;
	user_?: InputMaybe<User_Filter>;
	user_contains?: InputMaybe<Scalars['String']>;
	user_contains_nocase?: InputMaybe<Scalars['String']>;
	user_ends_with?: InputMaybe<Scalars['String']>;
	user_ends_with_nocase?: InputMaybe<Scalars['String']>;
	user_gt?: InputMaybe<Scalars['String']>;
	user_gte?: InputMaybe<Scalars['String']>;
	user_in?: InputMaybe<Array<Scalars['String']>>;
	user_lt?: InputMaybe<Scalars['String']>;
	user_lte?: InputMaybe<Scalars['String']>;
	user_not?: InputMaybe<Scalars['String']>;
	user_not_contains?: InputMaybe<Scalars['String']>;
	user_not_contains_nocase?: InputMaybe<Scalars['String']>;
	user_not_ends_with?: InputMaybe<Scalars['String']>;
	user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	user_not_in?: InputMaybe<Array<Scalars['String']>>;
	user_not_starts_with?: InputMaybe<Scalars['String']>;
	user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	user_starts_with?: InputMaybe<Scalars['String']>;
	user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum AdminOption_OrderBy {
	Controller = 'controller',
	Id = 'id',
	User = 'user'
}

export type Attribute = {
	__typename?: 'Attribute';
	id: Scalars['ID'];
	key?: Maybe<Scalars['String']>;
	propertyKey?: Maybe<Scalars['String']>;
	propertyValue?: Maybe<Scalars['String']>;
	tier: Tier;
	value?: Maybe<Scalars['String']>;
};

export type Attribute_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	key?: InputMaybe<Scalars['String']>;
	key_contains?: InputMaybe<Scalars['String']>;
	key_contains_nocase?: InputMaybe<Scalars['String']>;
	key_ends_with?: InputMaybe<Scalars['String']>;
	key_ends_with_nocase?: InputMaybe<Scalars['String']>;
	key_gt?: InputMaybe<Scalars['String']>;
	key_gte?: InputMaybe<Scalars['String']>;
	key_in?: InputMaybe<Array<Scalars['String']>>;
	key_lt?: InputMaybe<Scalars['String']>;
	key_lte?: InputMaybe<Scalars['String']>;
	key_not?: InputMaybe<Scalars['String']>;
	key_not_contains?: InputMaybe<Scalars['String']>;
	key_not_contains_nocase?: InputMaybe<Scalars['String']>;
	key_not_ends_with?: InputMaybe<Scalars['String']>;
	key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	key_not_in?: InputMaybe<Array<Scalars['String']>>;
	key_not_starts_with?: InputMaybe<Scalars['String']>;
	key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	key_starts_with?: InputMaybe<Scalars['String']>;
	key_starts_with_nocase?: InputMaybe<Scalars['String']>;
	propertyKey?: InputMaybe<Scalars['String']>;
	propertyKey_contains?: InputMaybe<Scalars['String']>;
	propertyKey_contains_nocase?: InputMaybe<Scalars['String']>;
	propertyKey_ends_with?: InputMaybe<Scalars['String']>;
	propertyKey_ends_with_nocase?: InputMaybe<Scalars['String']>;
	propertyKey_gt?: InputMaybe<Scalars['String']>;
	propertyKey_gte?: InputMaybe<Scalars['String']>;
	propertyKey_in?: InputMaybe<Array<Scalars['String']>>;
	propertyKey_lt?: InputMaybe<Scalars['String']>;
	propertyKey_lte?: InputMaybe<Scalars['String']>;
	propertyKey_not?: InputMaybe<Scalars['String']>;
	propertyKey_not_contains?: InputMaybe<Scalars['String']>;
	propertyKey_not_contains_nocase?: InputMaybe<Scalars['String']>;
	propertyKey_not_ends_with?: InputMaybe<Scalars['String']>;
	propertyKey_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	propertyKey_not_in?: InputMaybe<Array<Scalars['String']>>;
	propertyKey_not_starts_with?: InputMaybe<Scalars['String']>;
	propertyKey_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	propertyKey_starts_with?: InputMaybe<Scalars['String']>;
	propertyKey_starts_with_nocase?: InputMaybe<Scalars['String']>;
	propertyValue?: InputMaybe<Scalars['String']>;
	propertyValue_contains?: InputMaybe<Scalars['String']>;
	propertyValue_contains_nocase?: InputMaybe<Scalars['String']>;
	propertyValue_ends_with?: InputMaybe<Scalars['String']>;
	propertyValue_ends_with_nocase?: InputMaybe<Scalars['String']>;
	propertyValue_gt?: InputMaybe<Scalars['String']>;
	propertyValue_gte?: InputMaybe<Scalars['String']>;
	propertyValue_in?: InputMaybe<Array<Scalars['String']>>;
	propertyValue_lt?: InputMaybe<Scalars['String']>;
	propertyValue_lte?: InputMaybe<Scalars['String']>;
	propertyValue_not?: InputMaybe<Scalars['String']>;
	propertyValue_not_contains?: InputMaybe<Scalars['String']>;
	propertyValue_not_contains_nocase?: InputMaybe<Scalars['String']>;
	propertyValue_not_ends_with?: InputMaybe<Scalars['String']>;
	propertyValue_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	propertyValue_not_in?: InputMaybe<Array<Scalars['String']>>;
	propertyValue_not_starts_with?: InputMaybe<Scalars['String']>;
	propertyValue_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	propertyValue_starts_with?: InputMaybe<Scalars['String']>;
	propertyValue_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tier?: InputMaybe<Scalars['String']>;
	tier_?: InputMaybe<Tier_Filter>;
	tier_contains?: InputMaybe<Scalars['String']>;
	tier_contains_nocase?: InputMaybe<Scalars['String']>;
	tier_ends_with?: InputMaybe<Scalars['String']>;
	tier_ends_with_nocase?: InputMaybe<Scalars['String']>;
	tier_gt?: InputMaybe<Scalars['String']>;
	tier_gte?: InputMaybe<Scalars['String']>;
	tier_in?: InputMaybe<Array<Scalars['String']>>;
	tier_lt?: InputMaybe<Scalars['String']>;
	tier_lte?: InputMaybe<Scalars['String']>;
	tier_not?: InputMaybe<Scalars['String']>;
	tier_not_contains?: InputMaybe<Scalars['String']>;
	tier_not_contains_nocase?: InputMaybe<Scalars['String']>;
	tier_not_ends_with?: InputMaybe<Scalars['String']>;
	tier_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	tier_not_in?: InputMaybe<Array<Scalars['String']>>;
	tier_not_starts_with?: InputMaybe<Scalars['String']>;
	tier_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tier_starts_with?: InputMaybe<Scalars['String']>;
	tier_starts_with_nocase?: InputMaybe<Scalars['String']>;
	value?: InputMaybe<Scalars['String']>;
	value_contains?: InputMaybe<Scalars['String']>;
	value_contains_nocase?: InputMaybe<Scalars['String']>;
	value_ends_with?: InputMaybe<Scalars['String']>;
	value_ends_with_nocase?: InputMaybe<Scalars['String']>;
	value_gt?: InputMaybe<Scalars['String']>;
	value_gte?: InputMaybe<Scalars['String']>;
	value_in?: InputMaybe<Array<Scalars['String']>>;
	value_lt?: InputMaybe<Scalars['String']>;
	value_lte?: InputMaybe<Scalars['String']>;
	value_not?: InputMaybe<Scalars['String']>;
	value_not_contains?: InputMaybe<Scalars['String']>;
	value_not_contains_nocase?: InputMaybe<Scalars['String']>;
	value_not_ends_with?: InputMaybe<Scalars['String']>;
	value_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	value_not_in?: InputMaybe<Array<Scalars['String']>>;
	value_not_starts_with?: InputMaybe<Scalars['String']>;
	value_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	value_starts_with?: InputMaybe<Scalars['String']>;
	value_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Attribute_OrderBy {
	Id = 'id',
	Key = 'key',
	PropertyKey = 'propertyKey',
	PropertyValue = 'propertyValue',
	Tier = 'tier',
	Value = 'value'
}

export type BlockChangedFilter = {
	number_gte: Scalars['Int'];
};

export type Block_Height = {
	hash?: InputMaybe<Scalars['Bytes']>;
	number?: InputMaybe<Scalars['Int']>;
	number_gte?: InputMaybe<Scalars['Int']>;
};

export type Collection = {
	__typename?: 'Collection';
	id: Scalars['ID'];
	isNative: Scalars['Boolean'];
	name?: Maybe<Scalars['String']>;
	nfts?: Maybe<Array<Nft>>;
	openseaOwner?: Maybe<Scalars['Bytes']>;
	symbol?: Maybe<Scalars['String']>;
	tiers?: Maybe<Array<Tier>>;
	url?: Maybe<Scalars['String']>;
};

export type CollectionNftsArgs = {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Nft_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<Nft_Filter>;
};

export type CollectionTiersArgs = {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Tier_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<Tier_Filter>;
};

export type Collection_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	isNative?: InputMaybe<Scalars['Boolean']>;
	isNative_in?: InputMaybe<Array<Scalars['Boolean']>>;
	isNative_not?: InputMaybe<Scalars['Boolean']>;
	isNative_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
	name?: InputMaybe<Scalars['String']>;
	name_contains?: InputMaybe<Scalars['String']>;
	name_contains_nocase?: InputMaybe<Scalars['String']>;
	name_ends_with?: InputMaybe<Scalars['String']>;
	name_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_gt?: InputMaybe<Scalars['String']>;
	name_gte?: InputMaybe<Scalars['String']>;
	name_in?: InputMaybe<Array<Scalars['String']>>;
	name_lt?: InputMaybe<Scalars['String']>;
	name_lte?: InputMaybe<Scalars['String']>;
	name_not?: InputMaybe<Scalars['String']>;
	name_not_contains?: InputMaybe<Scalars['String']>;
	name_not_contains_nocase?: InputMaybe<Scalars['String']>;
	name_not_ends_with?: InputMaybe<Scalars['String']>;
	name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_not_in?: InputMaybe<Array<Scalars['String']>>;
	name_not_starts_with?: InputMaybe<Scalars['String']>;
	name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	name_starts_with?: InputMaybe<Scalars['String']>;
	name_starts_with_nocase?: InputMaybe<Scalars['String']>;
	nfts_?: InputMaybe<Nft_Filter>;
	openseaOwner?: InputMaybe<Scalars['Bytes']>;
	openseaOwner_contains?: InputMaybe<Scalars['Bytes']>;
	openseaOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
	openseaOwner_not?: InputMaybe<Scalars['Bytes']>;
	openseaOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
	openseaOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
	symbol?: InputMaybe<Scalars['String']>;
	symbol_contains?: InputMaybe<Scalars['String']>;
	symbol_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_ends_with?: InputMaybe<Scalars['String']>;
	symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_gt?: InputMaybe<Scalars['String']>;
	symbol_gte?: InputMaybe<Scalars['String']>;
	symbol_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_lt?: InputMaybe<Scalars['String']>;
	symbol_lte?: InputMaybe<Scalars['String']>;
	symbol_not?: InputMaybe<Scalars['String']>;
	symbol_not_contains?: InputMaybe<Scalars['String']>;
	symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with?: InputMaybe<Scalars['String']>;
	symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
	symbol_not_starts_with?: InputMaybe<Scalars['String']>;
	symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	symbol_starts_with?: InputMaybe<Scalars['String']>;
	symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tiers_?: InputMaybe<Tier_Filter>;
	url?: InputMaybe<Scalars['String']>;
	url_contains?: InputMaybe<Scalars['String']>;
	url_contains_nocase?: InputMaybe<Scalars['String']>;
	url_ends_with?: InputMaybe<Scalars['String']>;
	url_ends_with_nocase?: InputMaybe<Scalars['String']>;
	url_gt?: InputMaybe<Scalars['String']>;
	url_gte?: InputMaybe<Scalars['String']>;
	url_in?: InputMaybe<Array<Scalars['String']>>;
	url_lt?: InputMaybe<Scalars['String']>;
	url_lte?: InputMaybe<Scalars['String']>;
	url_not?: InputMaybe<Scalars['String']>;
	url_not_contains?: InputMaybe<Scalars['String']>;
	url_not_contains_nocase?: InputMaybe<Scalars['String']>;
	url_not_ends_with?: InputMaybe<Scalars['String']>;
	url_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	url_not_in?: InputMaybe<Array<Scalars['String']>>;
	url_not_starts_with?: InputMaybe<Scalars['String']>;
	url_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	url_starts_with?: InputMaybe<Scalars['String']>;
	url_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Collection_OrderBy {
	Id = 'id',
	IsNative = 'isNative',
	Name = 'name',
	Nfts = 'nfts',
	OpenseaOwner = 'openseaOwner',
	Symbol = 'symbol',
	Tiers = 'tiers',
	Url = 'url'
}

export type Controller = {
	__typename?: 'Controller';
	admins: Array<AdminOption>;
	id: Scalars['ID'];
};

export type ControllerAdminsArgs = {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<AdminOption_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<AdminOption_Filter>;
};

export type Controller_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	admins_?: InputMaybe<AdminOption_Filter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Controller_OrderBy {
	Admins = 'admins',
	Id = 'id'
}

export type Dao = {
	__typename?: 'Dao';
	collection?: Maybe<Collection>;
	controller: Controller;
	id: Scalars['ID'];
	openSale?: Maybe<OpenSaleApp>;
	privateSale?: Maybe<PrivateSaleApp>;
	safes?: Maybe<Array<Scalars['Bytes']>>;
	treasury?: Maybe<Scalars['Bytes']>;
};

export type Dao_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	collection?: InputMaybe<Scalars['String']>;
	collection_?: InputMaybe<Collection_Filter>;
	collection_contains?: InputMaybe<Scalars['String']>;
	collection_contains_nocase?: InputMaybe<Scalars['String']>;
	collection_ends_with?: InputMaybe<Scalars['String']>;
	collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
	collection_gt?: InputMaybe<Scalars['String']>;
	collection_gte?: InputMaybe<Scalars['String']>;
	collection_in?: InputMaybe<Array<Scalars['String']>>;
	collection_lt?: InputMaybe<Scalars['String']>;
	collection_lte?: InputMaybe<Scalars['String']>;
	collection_not?: InputMaybe<Scalars['String']>;
	collection_not_contains?: InputMaybe<Scalars['String']>;
	collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
	collection_not_ends_with?: InputMaybe<Scalars['String']>;
	collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	collection_not_in?: InputMaybe<Array<Scalars['String']>>;
	collection_not_starts_with?: InputMaybe<Scalars['String']>;
	collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	collection_starts_with?: InputMaybe<Scalars['String']>;
	collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
	controller?: InputMaybe<Scalars['String']>;
	controller_?: InputMaybe<Controller_Filter>;
	controller_contains?: InputMaybe<Scalars['String']>;
	controller_contains_nocase?: InputMaybe<Scalars['String']>;
	controller_ends_with?: InputMaybe<Scalars['String']>;
	controller_ends_with_nocase?: InputMaybe<Scalars['String']>;
	controller_gt?: InputMaybe<Scalars['String']>;
	controller_gte?: InputMaybe<Scalars['String']>;
	controller_in?: InputMaybe<Array<Scalars['String']>>;
	controller_lt?: InputMaybe<Scalars['String']>;
	controller_lte?: InputMaybe<Scalars['String']>;
	controller_not?: InputMaybe<Scalars['String']>;
	controller_not_contains?: InputMaybe<Scalars['String']>;
	controller_not_contains_nocase?: InputMaybe<Scalars['String']>;
	controller_not_ends_with?: InputMaybe<Scalars['String']>;
	controller_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	controller_not_in?: InputMaybe<Array<Scalars['String']>>;
	controller_not_starts_with?: InputMaybe<Scalars['String']>;
	controller_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	controller_starts_with?: InputMaybe<Scalars['String']>;
	controller_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	openSale?: InputMaybe<Scalars['String']>;
	openSale_?: InputMaybe<OpenSaleApp_Filter>;
	openSale_contains?: InputMaybe<Scalars['String']>;
	openSale_contains_nocase?: InputMaybe<Scalars['String']>;
	openSale_ends_with?: InputMaybe<Scalars['String']>;
	openSale_ends_with_nocase?: InputMaybe<Scalars['String']>;
	openSale_gt?: InputMaybe<Scalars['String']>;
	openSale_gte?: InputMaybe<Scalars['String']>;
	openSale_in?: InputMaybe<Array<Scalars['String']>>;
	openSale_lt?: InputMaybe<Scalars['String']>;
	openSale_lte?: InputMaybe<Scalars['String']>;
	openSale_not?: InputMaybe<Scalars['String']>;
	openSale_not_contains?: InputMaybe<Scalars['String']>;
	openSale_not_contains_nocase?: InputMaybe<Scalars['String']>;
	openSale_not_ends_with?: InputMaybe<Scalars['String']>;
	openSale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	openSale_not_in?: InputMaybe<Array<Scalars['String']>>;
	openSale_not_starts_with?: InputMaybe<Scalars['String']>;
	openSale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	openSale_starts_with?: InputMaybe<Scalars['String']>;
	openSale_starts_with_nocase?: InputMaybe<Scalars['String']>;
	privateSale?: InputMaybe<Scalars['String']>;
	privateSale_?: InputMaybe<PrivateSaleApp_Filter>;
	privateSale_contains?: InputMaybe<Scalars['String']>;
	privateSale_contains_nocase?: InputMaybe<Scalars['String']>;
	privateSale_ends_with?: InputMaybe<Scalars['String']>;
	privateSale_ends_with_nocase?: InputMaybe<Scalars['String']>;
	privateSale_gt?: InputMaybe<Scalars['String']>;
	privateSale_gte?: InputMaybe<Scalars['String']>;
	privateSale_in?: InputMaybe<Array<Scalars['String']>>;
	privateSale_lt?: InputMaybe<Scalars['String']>;
	privateSale_lte?: InputMaybe<Scalars['String']>;
	privateSale_not?: InputMaybe<Scalars['String']>;
	privateSale_not_contains?: InputMaybe<Scalars['String']>;
	privateSale_not_contains_nocase?: InputMaybe<Scalars['String']>;
	privateSale_not_ends_with?: InputMaybe<Scalars['String']>;
	privateSale_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	privateSale_not_in?: InputMaybe<Array<Scalars['String']>>;
	privateSale_not_starts_with?: InputMaybe<Scalars['String']>;
	privateSale_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	privateSale_starts_with?: InputMaybe<Scalars['String']>;
	privateSale_starts_with_nocase?: InputMaybe<Scalars['String']>;
	safes?: InputMaybe<Array<Scalars['Bytes']>>;
	safes_contains?: InputMaybe<Array<Scalars['Bytes']>>;
	safes_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
	safes_not?: InputMaybe<Array<Scalars['Bytes']>>;
	safes_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
	safes_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
	treasury?: InputMaybe<Scalars['Bytes']>;
	treasury_contains?: InputMaybe<Scalars['Bytes']>;
	treasury_in?: InputMaybe<Array<Scalars['Bytes']>>;
	treasury_not?: InputMaybe<Scalars['Bytes']>;
	treasury_not_contains?: InputMaybe<Scalars['Bytes']>;
	treasury_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Dao_OrderBy {
	Collection = 'collection',
	Controller = 'controller',
	Id = 'id',
	OpenSale = 'openSale',
	PrivateSale = 'privateSale',
	Safes = 'safes',
	Treasury = 'treasury'
}

export type Nft = {
	__typename?: 'Nft';
	artworkID?: Maybe<Scalars['Int']>;
	collection: Collection;
	id: Scalars['ID'];
	owner: User;
	tier?: Maybe<Tier>;
	tokenID: Scalars['BigInt'];
	transferredAt?: Maybe<Scalars['BigInt']>;
};

export type Nft_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	artworkID?: InputMaybe<Scalars['Int']>;
	artworkID_gt?: InputMaybe<Scalars['Int']>;
	artworkID_gte?: InputMaybe<Scalars['Int']>;
	artworkID_in?: InputMaybe<Array<Scalars['Int']>>;
	artworkID_lt?: InputMaybe<Scalars['Int']>;
	artworkID_lte?: InputMaybe<Scalars['Int']>;
	artworkID_not?: InputMaybe<Scalars['Int']>;
	artworkID_not_in?: InputMaybe<Array<Scalars['Int']>>;
	collection?: InputMaybe<Scalars['String']>;
	collection_?: InputMaybe<Collection_Filter>;
	collection_contains?: InputMaybe<Scalars['String']>;
	collection_contains_nocase?: InputMaybe<Scalars['String']>;
	collection_ends_with?: InputMaybe<Scalars['String']>;
	collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
	collection_gt?: InputMaybe<Scalars['String']>;
	collection_gte?: InputMaybe<Scalars['String']>;
	collection_in?: InputMaybe<Array<Scalars['String']>>;
	collection_lt?: InputMaybe<Scalars['String']>;
	collection_lte?: InputMaybe<Scalars['String']>;
	collection_not?: InputMaybe<Scalars['String']>;
	collection_not_contains?: InputMaybe<Scalars['String']>;
	collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
	collection_not_ends_with?: InputMaybe<Scalars['String']>;
	collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	collection_not_in?: InputMaybe<Array<Scalars['String']>>;
	collection_not_starts_with?: InputMaybe<Scalars['String']>;
	collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	collection_starts_with?: InputMaybe<Scalars['String']>;
	collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	owner?: InputMaybe<Scalars['String']>;
	owner_?: InputMaybe<User_Filter>;
	owner_contains?: InputMaybe<Scalars['String']>;
	owner_contains_nocase?: InputMaybe<Scalars['String']>;
	owner_ends_with?: InputMaybe<Scalars['String']>;
	owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
	owner_gt?: InputMaybe<Scalars['String']>;
	owner_gte?: InputMaybe<Scalars['String']>;
	owner_in?: InputMaybe<Array<Scalars['String']>>;
	owner_lt?: InputMaybe<Scalars['String']>;
	owner_lte?: InputMaybe<Scalars['String']>;
	owner_not?: InputMaybe<Scalars['String']>;
	owner_not_contains?: InputMaybe<Scalars['String']>;
	owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
	owner_not_ends_with?: InputMaybe<Scalars['String']>;
	owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	owner_not_in?: InputMaybe<Array<Scalars['String']>>;
	owner_not_starts_with?: InputMaybe<Scalars['String']>;
	owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	owner_starts_with?: InputMaybe<Scalars['String']>;
	owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tier?: InputMaybe<Scalars['String']>;
	tier_?: InputMaybe<Tier_Filter>;
	tier_contains?: InputMaybe<Scalars['String']>;
	tier_contains_nocase?: InputMaybe<Scalars['String']>;
	tier_ends_with?: InputMaybe<Scalars['String']>;
	tier_ends_with_nocase?: InputMaybe<Scalars['String']>;
	tier_gt?: InputMaybe<Scalars['String']>;
	tier_gte?: InputMaybe<Scalars['String']>;
	tier_in?: InputMaybe<Array<Scalars['String']>>;
	tier_lt?: InputMaybe<Scalars['String']>;
	tier_lte?: InputMaybe<Scalars['String']>;
	tier_not?: InputMaybe<Scalars['String']>;
	tier_not_contains?: InputMaybe<Scalars['String']>;
	tier_not_contains_nocase?: InputMaybe<Scalars['String']>;
	tier_not_ends_with?: InputMaybe<Scalars['String']>;
	tier_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	tier_not_in?: InputMaybe<Array<Scalars['String']>>;
	tier_not_starts_with?: InputMaybe<Scalars['String']>;
	tier_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tier_starts_with?: InputMaybe<Scalars['String']>;
	tier_starts_with_nocase?: InputMaybe<Scalars['String']>;
	tokenID?: InputMaybe<Scalars['BigInt']>;
	tokenID_gt?: InputMaybe<Scalars['BigInt']>;
	tokenID_gte?: InputMaybe<Scalars['BigInt']>;
	tokenID_in?: InputMaybe<Array<Scalars['BigInt']>>;
	tokenID_lt?: InputMaybe<Scalars['BigInt']>;
	tokenID_lte?: InputMaybe<Scalars['BigInt']>;
	tokenID_not?: InputMaybe<Scalars['BigInt']>;
	tokenID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
	transferredAt?: InputMaybe<Scalars['BigInt']>;
	transferredAt_gt?: InputMaybe<Scalars['BigInt']>;
	transferredAt_gte?: InputMaybe<Scalars['BigInt']>;
	transferredAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
	transferredAt_lt?: InputMaybe<Scalars['BigInt']>;
	transferredAt_lte?: InputMaybe<Scalars['BigInt']>;
	transferredAt_not?: InputMaybe<Scalars['BigInt']>;
	transferredAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Nft_OrderBy {
	ArtworkId = 'artworkID',
	Collection = 'collection',
	Id = 'id',
	Owner = 'owner',
	Tier = 'tier',
	TokenId = 'tokenID',
	TransferredAt = 'transferredAt'
}

export type OpenSaleApp = {
	__typename?: 'OpenSaleApp';
	id: Scalars['ID'];
	isActive: Scalars['Boolean'];
	isNative: Scalars['Boolean'];
	tierIds?: Maybe<Array<Scalars['String']>>;
	tierPrices?: Maybe<Array<Scalars['String']>>;
};

export type OpenSaleApp_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	isActive?: InputMaybe<Scalars['Boolean']>;
	isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
	isActive_not?: InputMaybe<Scalars['Boolean']>;
	isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
	isNative?: InputMaybe<Scalars['Boolean']>;
	isNative_in?: InputMaybe<Array<Scalars['Boolean']>>;
	isNative_not?: InputMaybe<Scalars['Boolean']>;
	isNative_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
	tierIds?: InputMaybe<Array<Scalars['String']>>;
	tierIds_contains?: InputMaybe<Array<Scalars['String']>>;
	tierIds_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
	tierIds_not?: InputMaybe<Array<Scalars['String']>>;
	tierIds_not_contains?: InputMaybe<Array<Scalars['String']>>;
	tierIds_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
	tierPrices?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_contains?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_not?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_not_contains?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum OpenSaleApp_OrderBy {
	Id = 'id',
	IsActive = 'isActive',
	IsNative = 'isNative',
	TierIds = 'tierIds',
	TierPrices = 'tierPrices'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
	Asc = 'asc',
	Desc = 'desc'
}

export type PrivateSaleApp = {
	__typename?: 'PrivateSaleApp';
	id: Scalars['ID'];
	isActive: Scalars['Boolean'];
	isNative: Scalars['Boolean'];
	tierIds?: Maybe<Array<Scalars['String']>>;
	tierPrices?: Maybe<Array<Scalars['String']>>;
};

export type PrivateSaleApp_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	isActive?: InputMaybe<Scalars['Boolean']>;
	isActive_in?: InputMaybe<Array<Scalars['Boolean']>>;
	isActive_not?: InputMaybe<Scalars['Boolean']>;
	isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
	isNative?: InputMaybe<Scalars['Boolean']>;
	isNative_in?: InputMaybe<Array<Scalars['Boolean']>>;
	isNative_not?: InputMaybe<Scalars['Boolean']>;
	isNative_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
	tierIds?: InputMaybe<Array<Scalars['String']>>;
	tierIds_contains?: InputMaybe<Array<Scalars['String']>>;
	tierIds_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
	tierIds_not?: InputMaybe<Array<Scalars['String']>>;
	tierIds_not_contains?: InputMaybe<Array<Scalars['String']>>;
	tierIds_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
	tierPrices?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_contains?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_not?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_not_contains?: InputMaybe<Array<Scalars['String']>>;
	tierPrices_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
};

export enum PrivateSaleApp_OrderBy {
	Id = 'id',
	IsActive = 'isActive',
	IsNative = 'isNative',
	TierIds = 'tierIds',
	TierPrices = 'tierPrices'
}

export type Query = {
	__typename?: 'Query';
	/** Access to subgraph metadata */
	_meta?: Maybe<_Meta_>;
	adminOption?: Maybe<AdminOption>;
	adminOptions: Array<AdminOption>;
	attribute?: Maybe<Attribute>;
	attributes: Array<Attribute>;
	collection?: Maybe<Collection>;
	collections: Array<Collection>;
	controller?: Maybe<Controller>;
	controllers: Array<Controller>;
	dao?: Maybe<Dao>;
	daos: Array<Dao>;
	nft?: Maybe<Nft>;
	nfts: Array<Nft>;
	openSaleApp?: Maybe<OpenSaleApp>;
	openSaleApps: Array<OpenSaleApp>;
	privateSaleApp?: Maybe<PrivateSaleApp>;
	privateSaleApps: Array<PrivateSaleApp>;
	tier?: Maybe<Tier>;
	tiers: Array<Tier>;
	user?: Maybe<User>;
	users: Array<User>;
};

export type Query_MetaArgs = {
	block?: InputMaybe<Block_Height>;
};

export type QueryAdminOptionArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAdminOptionsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<AdminOption_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<AdminOption_Filter>;
};

export type QueryAttributeArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAttributesArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Attribute_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Attribute_Filter>;
};

export type QueryCollectionArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCollectionsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Collection_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Collection_Filter>;
};

export type QueryControllerArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryControllersArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Controller_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Controller_Filter>;
};

export type QueryDaoArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDaosArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Dao_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Dao_Filter>;
};

export type QueryNftArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryNftsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Nft_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Nft_Filter>;
};

export type QueryOpenSaleAppArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryOpenSaleAppsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<OpenSaleApp_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<OpenSaleApp_Filter>;
};

export type QueryPrivateSaleAppArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPrivateSaleAppsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PrivateSaleApp_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<PrivateSaleApp_Filter>;
};

export type QueryTierArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTiersArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Tier_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Tier_Filter>;
};

export type QueryUserArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUsersArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<User_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<User_Filter>;
};

export type Subscription = {
	__typename?: 'Subscription';
	/** Access to subgraph metadata */
	_meta?: Maybe<_Meta_>;
	adminOption?: Maybe<AdminOption>;
	adminOptions: Array<AdminOption>;
	attribute?: Maybe<Attribute>;
	attributes: Array<Attribute>;
	collection?: Maybe<Collection>;
	collections: Array<Collection>;
	controller?: Maybe<Controller>;
	controllers: Array<Controller>;
	dao?: Maybe<Dao>;
	daos: Array<Dao>;
	nft?: Maybe<Nft>;
	nfts: Array<Nft>;
	openSaleApp?: Maybe<OpenSaleApp>;
	openSaleApps: Array<OpenSaleApp>;
	privateSaleApp?: Maybe<PrivateSaleApp>;
	privateSaleApps: Array<PrivateSaleApp>;
	tier?: Maybe<Tier>;
	tiers: Array<Tier>;
	user?: Maybe<User>;
	users: Array<User>;
};

export type Subscription_MetaArgs = {
	block?: InputMaybe<Block_Height>;
};

export type SubscriptionAdminOptionArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAdminOptionsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<AdminOption_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<AdminOption_Filter>;
};

export type SubscriptionAttributeArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAttributesArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Attribute_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Attribute_Filter>;
};

export type SubscriptionCollectionArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCollectionsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Collection_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Collection_Filter>;
};

export type SubscriptionControllerArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionControllersArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Controller_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Controller_Filter>;
};

export type SubscriptionDaoArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDaosArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Dao_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Dao_Filter>;
};

export type SubscriptionNftArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionNftsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Nft_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Nft_Filter>;
};

export type SubscriptionOpenSaleAppArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionOpenSaleAppsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<OpenSaleApp_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<OpenSaleApp_Filter>;
};

export type SubscriptionPrivateSaleAppArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPrivateSaleAppsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PrivateSaleApp_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<PrivateSaleApp_Filter>;
};

export type SubscriptionTierArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTiersArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Tier_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Tier_Filter>;
};

export type SubscriptionUserArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars['ID'];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUsersArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<User_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<User_Filter>;
};

export type Tier = {
	__typename?: 'Tier';
	Nfts?: Maybe<Array<Nft>>;
	attributes?: Maybe<Array<Attribute>>;
	collection: Collection;
	id: Scalars['ID'];
	name: Scalars['String'];
	nativeID: Scalars['String'];
};

export type TierNftsArgs = {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Nft_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<Nft_Filter>;
};

export type TierAttributesArgs = {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Attribute_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<Attribute_Filter>;
};

export type Tier_Filter = {
	Nfts_?: InputMaybe<Nft_Filter>;
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	attributes_?: InputMaybe<Attribute_Filter>;
	collection?: InputMaybe<Scalars['String']>;
	collection_?: InputMaybe<Collection_Filter>;
	collection_contains?: InputMaybe<Scalars['String']>;
	collection_contains_nocase?: InputMaybe<Scalars['String']>;
	collection_ends_with?: InputMaybe<Scalars['String']>;
	collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
	collection_gt?: InputMaybe<Scalars['String']>;
	collection_gte?: InputMaybe<Scalars['String']>;
	collection_in?: InputMaybe<Array<Scalars['String']>>;
	collection_lt?: InputMaybe<Scalars['String']>;
	collection_lte?: InputMaybe<Scalars['String']>;
	collection_not?: InputMaybe<Scalars['String']>;
	collection_not_contains?: InputMaybe<Scalars['String']>;
	collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
	collection_not_ends_with?: InputMaybe<Scalars['String']>;
	collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	collection_not_in?: InputMaybe<Array<Scalars['String']>>;
	collection_not_starts_with?: InputMaybe<Scalars['String']>;
	collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	collection_starts_with?: InputMaybe<Scalars['String']>;
	collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	name?: InputMaybe<Scalars['String']>;
	name_contains?: InputMaybe<Scalars['String']>;
	name_contains_nocase?: InputMaybe<Scalars['String']>;
	name_ends_with?: InputMaybe<Scalars['String']>;
	name_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_gt?: InputMaybe<Scalars['String']>;
	name_gte?: InputMaybe<Scalars['String']>;
	name_in?: InputMaybe<Array<Scalars['String']>>;
	name_lt?: InputMaybe<Scalars['String']>;
	name_lte?: InputMaybe<Scalars['String']>;
	name_not?: InputMaybe<Scalars['String']>;
	name_not_contains?: InputMaybe<Scalars['String']>;
	name_not_contains_nocase?: InputMaybe<Scalars['String']>;
	name_not_ends_with?: InputMaybe<Scalars['String']>;
	name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	name_not_in?: InputMaybe<Array<Scalars['String']>>;
	name_not_starts_with?: InputMaybe<Scalars['String']>;
	name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	name_starts_with?: InputMaybe<Scalars['String']>;
	name_starts_with_nocase?: InputMaybe<Scalars['String']>;
	nativeID?: InputMaybe<Scalars['String']>;
	nativeID_contains?: InputMaybe<Scalars['String']>;
	nativeID_contains_nocase?: InputMaybe<Scalars['String']>;
	nativeID_ends_with?: InputMaybe<Scalars['String']>;
	nativeID_ends_with_nocase?: InputMaybe<Scalars['String']>;
	nativeID_gt?: InputMaybe<Scalars['String']>;
	nativeID_gte?: InputMaybe<Scalars['String']>;
	nativeID_in?: InputMaybe<Array<Scalars['String']>>;
	nativeID_lt?: InputMaybe<Scalars['String']>;
	nativeID_lte?: InputMaybe<Scalars['String']>;
	nativeID_not?: InputMaybe<Scalars['String']>;
	nativeID_not_contains?: InputMaybe<Scalars['String']>;
	nativeID_not_contains_nocase?: InputMaybe<Scalars['String']>;
	nativeID_not_ends_with?: InputMaybe<Scalars['String']>;
	nativeID_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
	nativeID_not_in?: InputMaybe<Array<Scalars['String']>>;
	nativeID_not_starts_with?: InputMaybe<Scalars['String']>;
	nativeID_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
	nativeID_starts_with?: InputMaybe<Scalars['String']>;
	nativeID_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Tier_OrderBy {
	Nfts = 'Nfts',
	Attributes = 'attributes',
	Collection = 'collection',
	Id = 'id',
	Name = 'name',
	NativeId = 'nativeID'
}

export type User = {
	__typename?: 'User';
	adminOf: Array<AdminOption>;
	id: Scalars['ID'];
	nfts: Array<Nft>;
};

export type UserAdminOfArgs = {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<AdminOption_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<AdminOption_Filter>;
};

export type UserNftsArgs = {
	first?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Nft_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars['Int']>;
	where?: InputMaybe<Nft_Filter>;
};

export type User_Filter = {
	/** Filter for the block changed event. */
	_change_block?: InputMaybe<BlockChangedFilter>;
	adminOf_?: InputMaybe<AdminOption_Filter>;
	id?: InputMaybe<Scalars['ID']>;
	id_gt?: InputMaybe<Scalars['ID']>;
	id_gte?: InputMaybe<Scalars['ID']>;
	id_in?: InputMaybe<Array<Scalars['ID']>>;
	id_lt?: InputMaybe<Scalars['ID']>;
	id_lte?: InputMaybe<Scalars['ID']>;
	id_not?: InputMaybe<Scalars['ID']>;
	id_not_in?: InputMaybe<Array<Scalars['ID']>>;
	nfts_?: InputMaybe<Nft_Filter>;
};

export enum User_OrderBy {
	AdminOf = 'adminOf',
	Id = 'id',
	Nfts = 'nfts'
}

export type _Block_ = {
	__typename?: '_Block_';
	/** The hash of the block */
	hash?: Maybe<Scalars['Bytes']>;
	/** The block number */
	number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
	__typename?: '_Meta_';
	/**
	 * Information about a specific subgraph block. The hash of the block
	 * will be null if the _meta field has a block constraint that asks for
	 * a block number. It will be filled if the _meta field has no block constraint
	 * and therefore asks for the latest  block
	 */
	block: _Block_;
	/** The deployment ID */
	deployment: Scalars['String'];
	/** If `true`, the subgraph encountered indexing errors at some past block */
	hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
	/** Data will be returned even if the subgraph has indexing errors */
	Allow = 'allow',
	/** If the subgraph has indexing errors, data will be omitted. The default. */
	Deny = 'deny'
}

export type GetDaoTreasuryQueryVariables = Exact<{
	daoAddress: Scalars['ID'];
}>;

export type GetDaoTreasuryQuery = { __typename?: 'Query'; daos: Array<{ __typename?: 'Dao'; treasury?: any | null }> };

export type GetDaosAdminsQueryVariables = Exact<{
	first: Scalars['Int'];
	skip: Scalars['Int'];
	where?: InputMaybe<Dao_Filter>;
}>;

export type GetDaosAdminsQuery = {
	__typename?: 'Query';
	daos: Array<{
		__typename?: 'Dao';
		id: string;
		controller: {
			__typename?: 'Controller';
			admins: Array<{ __typename?: 'AdminOption'; user?: { __typename?: 'User'; id: string } | null }>;
		};
	}>;
};

export type GetDaoMembersByNftQueryVariables = Exact<{
	daoAddress: Scalars['ID'];
	firstNfts: Scalars['Int'];
	skipNfts: Scalars['Int'];
}>;

export type GetDaoMembersByNftQuery = {
	__typename?: 'Query';
	daos: Array<{
		__typename?: 'Dao';
		collection?: {
			__typename?: 'Collection';
			nfts?: Array<{
				__typename?: 'Nft';
				owner: { __typename?: 'User'; id: string };
				tier?: { __typename?: 'Tier'; nativeID: string } | null;
			}> | null;
		} | null;
	}>;
};

export type GetCollectionNftsQueryVariables = Exact<{
	collectionId: Scalars['ID'];
	first: Scalars['Int'];
	skipNfts: Scalars['Int'];
}>;

export type GetCollectionNftsQuery = {
	__typename?: 'Query';
	collection?: {
		__typename?: 'Collection';
		nfts?: Array<{
			__typename?: 'Nft';
			owner: { __typename?: 'User'; id: string };
			tier?: { __typename?: 'Tier'; nativeID: string } | null;
		}> | null;
	} | null;
};

export type GraphDaoFragment = {
	__typename?: 'Dao';
	id: string;
	treasury?: any | null;
	safes?: Array<any> | null;
	controller: { __typename?: 'Controller'; id: string };
	collection?: { __typename?: 'Collection'; id: string } | null;
	openSale?: { __typename?: 'OpenSaleApp'; id: string } | null;
	privateSale?: { __typename?: 'PrivateSaleApp'; id: string } | null;
};

export type GetGraphDaoQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphDaoQuery = {
	__typename?: 'Query';
	dao?: {
		__typename?: 'Dao';
		id: string;
		treasury?: any | null;
		safes?: Array<any> | null;
		controller: { __typename?: 'Controller'; id: string };
		collection?: { __typename?: 'Collection'; id: string } | null;
		openSale?: { __typename?: 'OpenSaleApp'; id: string } | null;
		privateSale?: { __typename?: 'PrivateSaleApp'; id: string } | null;
	} | null;
};

export type GetGraphDaosQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Dao_OrderBy>;
	where?: InputMaybe<Dao_Filter>;
}>;

export type GetGraphDaosQuery = {
	__typename?: 'Query';
	daos: Array<{
		__typename?: 'Dao';
		id: string;
		treasury?: any | null;
		safes?: Array<any> | null;
		controller: { __typename?: 'Controller'; id: string };
		collection?: { __typename?: 'Collection'; id: string } | null;
		openSale?: { __typename?: 'OpenSaleApp'; id: string } | null;
		privateSale?: { __typename?: 'PrivateSaleApp'; id: string } | null;
	}>;
};

export type GraphControllerFragment = {
	__typename?: 'Controller';
	id: string;
	admins: Array<{ __typename?: 'AdminOption'; id: string; user?: { __typename?: 'User'; id: string } | null }>;
};

export type GetGraphControllerQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphControllerQuery = {
	__typename?: 'Query';
	controller?: {
		__typename?: 'Controller';
		id: string;
		admins: Array<{ __typename?: 'AdminOption'; id: string; user?: { __typename?: 'User'; id: string } | null }>;
	} | null;
};

export type GetGraphControllersQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Controller_OrderBy>;
	where?: InputMaybe<Controller_Filter>;
}>;

export type GetGraphControllersQuery = {
	__typename?: 'Query';
	controllers: Array<{
		__typename?: 'Controller';
		id: string;
		admins: Array<{ __typename?: 'AdminOption'; id: string; user?: { __typename?: 'User'; id: string } | null }>;
	}>;
};

export type GraphAttributeFragment = {
	__typename?: 'Attribute';
	id: string;
	key?: string | null;
	value?: string | null;
	propertyKey?: string | null;
	propertyValue?: string | null;
};

export type GraphTierNftFragment = {
	__typename?: 'Nft';
	id: string;
	tokenID: any;
	artworkID?: number | null;
	transferredAt?: any | null;
	tier?: { __typename?: 'Tier'; nativeID: string } | null;
	owner: { __typename?: 'User'; id: string };
	collection: { __typename?: 'Collection'; id: string };
};

export type GraphTierFragment = {
	__typename?: 'Tier';
	id: string;
	name: string;
	nativeID: string;
	attributes?: Array<{
		__typename?: 'Attribute';
		id: string;
		key?: string | null;
		value?: string | null;
		propertyKey?: string | null;
		propertyValue?: string | null;
	}> | null;
	Nfts?: Array<{
		__typename?: 'Nft';
		id: string;
		tokenID: any;
		artworkID?: number | null;
		transferredAt?: any | null;
		tier?: { __typename?: 'Tier'; nativeID: string } | null;
		owner: { __typename?: 'User'; id: string };
		collection: { __typename?: 'Collection'; id: string };
	}> | null;
};

export type GraphNftFragment = {
	__typename?: 'Nft';
	id: string;
	tokenID: any;
	artworkID?: number | null;
	transferredAt?: any | null;
	tier?: {
		__typename?: 'Tier';
		id: string;
		name: string;
		nativeID: string;
		attributes?: Array<{
			__typename?: 'Attribute';
			id: string;
			key?: string | null;
			value?: string | null;
			propertyKey?: string | null;
			propertyValue?: string | null;
		}> | null;
		Nfts?: Array<{
			__typename?: 'Nft';
			id: string;
			tokenID: any;
			artworkID?: number | null;
			transferredAt?: any | null;
			tier?: { __typename?: 'Tier'; nativeID: string } | null;
			owner: { __typename?: 'User'; id: string };
			collection: { __typename?: 'Collection'; id: string };
		}> | null;
	} | null;
	owner: { __typename?: 'User'; id: string };
	collection: { __typename?: 'Collection'; id: string };
};

export type GraphCollectionFragment = {
	__typename?: 'Collection';
	id: string;
	isNative: boolean;
	name?: string | null;
	symbol?: string | null;
	url?: string | null;
	openseaOwner?: any | null;
	nfts?: Array<{
		__typename?: 'Nft';
		id: string;
		tokenID: any;
		artworkID?: number | null;
		transferredAt?: any | null;
		tier?: {
			__typename?: 'Tier';
			id: string;
			name: string;
			nativeID: string;
			attributes?: Array<{
				__typename?: 'Attribute';
				id: string;
				key?: string | null;
				value?: string | null;
				propertyKey?: string | null;
				propertyValue?: string | null;
			}> | null;
			Nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: { __typename?: 'Tier'; nativeID: string } | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
		} | null;
		owner: { __typename?: 'User'; id: string };
		collection: { __typename?: 'Collection'; id: string };
	}> | null;
	tiers?: Array<{
		__typename?: 'Tier';
		id: string;
		name: string;
		nativeID: string;
		attributes?: Array<{
			__typename?: 'Attribute';
			id: string;
			key?: string | null;
			value?: string | null;
			propertyKey?: string | null;
			propertyValue?: string | null;
		}> | null;
		Nfts?: Array<{
			__typename?: 'Nft';
			id: string;
			tokenID: any;
			artworkID?: number | null;
			transferredAt?: any | null;
			tier?: { __typename?: 'Tier'; nativeID: string } | null;
			owner: { __typename?: 'User'; id: string };
			collection: { __typename?: 'Collection'; id: string };
		}> | null;
	}> | null;
};

export type GetGraphCollectionQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphCollectionQuery = {
	__typename?: 'Query';
	collection?: {
		__typename?: 'Collection';
		id: string;
		isNative: boolean;
		name?: string | null;
		symbol?: string | null;
		url?: string | null;
		openseaOwner?: any | null;
		nfts?: Array<{
			__typename?: 'Nft';
			id: string;
			tokenID: any;
			artworkID?: number | null;
			transferredAt?: any | null;
			tier?: {
				__typename?: 'Tier';
				id: string;
				name: string;
				nativeID: string;
				attributes?: Array<{
					__typename?: 'Attribute';
					id: string;
					key?: string | null;
					value?: string | null;
					propertyKey?: string | null;
					propertyValue?: string | null;
				}> | null;
				Nfts?: Array<{
					__typename?: 'Nft';
					id: string;
					tokenID: any;
					artworkID?: number | null;
					transferredAt?: any | null;
					tier?: { __typename?: 'Tier'; nativeID: string } | null;
					owner: { __typename?: 'User'; id: string };
					collection: { __typename?: 'Collection'; id: string };
				}> | null;
			} | null;
			owner: { __typename?: 'User'; id: string };
			collection: { __typename?: 'Collection'; id: string };
		}> | null;
		tiers?: Array<{
			__typename?: 'Tier';
			id: string;
			name: string;
			nativeID: string;
			attributes?: Array<{
				__typename?: 'Attribute';
				id: string;
				key?: string | null;
				value?: string | null;
				propertyKey?: string | null;
				propertyValue?: string | null;
			}> | null;
			Nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: { __typename?: 'Tier'; nativeID: string } | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
		}> | null;
	} | null;
};

export type GetGraphCollectionsQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Collection_OrderBy>;
	where?: InputMaybe<Collection_Filter>;
}>;

export type GetGraphCollectionsQuery = {
	__typename?: 'Query';
	collections: Array<{
		__typename?: 'Collection';
		id: string;
		isNative: boolean;
		name?: string | null;
		symbol?: string | null;
		url?: string | null;
		openseaOwner?: any | null;
		nfts?: Array<{
			__typename?: 'Nft';
			id: string;
			tokenID: any;
			artworkID?: number | null;
			transferredAt?: any | null;
			tier?: {
				__typename?: 'Tier';
				id: string;
				name: string;
				nativeID: string;
				attributes?: Array<{
					__typename?: 'Attribute';
					id: string;
					key?: string | null;
					value?: string | null;
					propertyKey?: string | null;
					propertyValue?: string | null;
				}> | null;
				Nfts?: Array<{
					__typename?: 'Nft';
					id: string;
					tokenID: any;
					artworkID?: number | null;
					transferredAt?: any | null;
					tier?: { __typename?: 'Tier'; nativeID: string } | null;
					owner: { __typename?: 'User'; id: string };
					collection: { __typename?: 'Collection'; id: string };
				}> | null;
			} | null;
			owner: { __typename?: 'User'; id: string };
			collection: { __typename?: 'Collection'; id: string };
		}> | null;
		tiers?: Array<{
			__typename?: 'Tier';
			id: string;
			name: string;
			nativeID: string;
			attributes?: Array<{
				__typename?: 'Attribute';
				id: string;
				key?: string | null;
				value?: string | null;
				propertyKey?: string | null;
				propertyValue?: string | null;
			}> | null;
			Nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: { __typename?: 'Tier'; nativeID: string } | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
		}> | null;
	}>;
};

export type GetGraphDaoCollectionQueryVariables = Exact<{
	daoId: Scalars['ID'];
}>;

export type GetGraphDaoCollectionQuery = {
	__typename?: 'Query';
	dao?: {
		__typename?: 'Dao';
		collection?: {
			__typename?: 'Collection';
			id: string;
			isNative: boolean;
			name?: string | null;
			symbol?: string | null;
			url?: string | null;
			openseaOwner?: any | null;
			nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: {
					__typename?: 'Tier';
					id: string;
					name: string;
					nativeID: string;
					attributes?: Array<{
						__typename?: 'Attribute';
						id: string;
						key?: string | null;
						value?: string | null;
						propertyKey?: string | null;
						propertyValue?: string | null;
					}> | null;
					Nfts?: Array<{
						__typename?: 'Nft';
						id: string;
						tokenID: any;
						artworkID?: number | null;
						transferredAt?: any | null;
						tier?: { __typename?: 'Tier'; nativeID: string } | null;
						owner: { __typename?: 'User'; id: string };
						collection: { __typename?: 'Collection'; id: string };
					}> | null;
				} | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
			tiers?: Array<{
				__typename?: 'Tier';
				id: string;
				name: string;
				nativeID: string;
				attributes?: Array<{
					__typename?: 'Attribute';
					id: string;
					key?: string | null;
					value?: string | null;
					propertyKey?: string | null;
					propertyValue?: string | null;
				}> | null;
				Nfts?: Array<{
					__typename?: 'Nft';
					id: string;
					tokenID: any;
					artworkID?: number | null;
					transferredAt?: any | null;
					tier?: { __typename?: 'Tier'; nativeID: string } | null;
					owner: { __typename?: 'User'; id: string };
					collection: { __typename?: 'Collection'; id: string };
				}> | null;
			}> | null;
		} | null;
	} | null;
};

export type GetGraphDaoCollectionNftsQueryVariables = Exact<{
	daoId: Scalars['ID'];
	first?: InputMaybe<Scalars['Int']>;
}>;

export type GetGraphDaoCollectionNftsQuery = {
	__typename?: 'Query';
	dao?: {
		__typename?: 'Dao';
		collection?: {
			__typename?: 'Collection';
			nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: {
					__typename?: 'Tier';
					id: string;
					name: string;
					nativeID: string;
					attributes?: Array<{
						__typename?: 'Attribute';
						id: string;
						key?: string | null;
						value?: string | null;
						propertyKey?: string | null;
						propertyValue?: string | null;
					}> | null;
					Nfts?: Array<{
						__typename?: 'Nft';
						id: string;
						tokenID: any;
						artworkID?: number | null;
						transferredAt?: any | null;
						tier?: { __typename?: 'Tier'; nativeID: string } | null;
						owner: { __typename?: 'User'; id: string };
						collection: { __typename?: 'Collection'; id: string };
					}> | null;
				} | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
		} | null;
	} | null;
};

export type GetGraphDaoCollectionOwnerNftsQueryVariables = Exact<{
	daoId: Scalars['ID'];
	ownerId: Scalars['ID'];
}>;

export type GetGraphDaoCollectionOwnerNftsQuery = {
	__typename?: 'Query';
	dao?: {
		__typename?: 'Dao';
		collection?: {
			__typename?: 'Collection';
			nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: {
					__typename?: 'Tier';
					id: string;
					name: string;
					nativeID: string;
					attributes?: Array<{
						__typename?: 'Attribute';
						id: string;
						key?: string | null;
						value?: string | null;
						propertyKey?: string | null;
						propertyValue?: string | null;
					}> | null;
					Nfts?: Array<{
						__typename?: 'Nft';
						id: string;
						tokenID: any;
						artworkID?: number | null;
						transferredAt?: any | null;
						tier?: { __typename?: 'Tier'; nativeID: string } | null;
						owner: { __typename?: 'User'; id: string };
						collection: { __typename?: 'Collection'; id: string };
					}> | null;
				} | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
		} | null;
	} | null;
};

export type GetGraphDaoCollectionOwnersQueryVariables = Exact<{
	daoId: Scalars['ID'];
}>;

export type GetGraphDaoCollectionOwnersQuery = {
	__typename?: 'Query';
	dao?: {
		__typename?: 'Dao';
		collection?: {
			__typename?: 'Collection';
			id: string;
			nfts?: Array<{
				__typename?: 'Nft';
				owner: {
					__typename?: 'User';
					id: string;
					nfts: Array<{
						__typename?: 'Nft';
						id: string;
						tokenID: any;
						artworkID?: number | null;
						transferredAt?: any | null;
						tier?: {
							__typename?: 'Tier';
							id: string;
							name: string;
							nativeID: string;
							attributes?: Array<{
								__typename?: 'Attribute';
								id: string;
								key?: string | null;
								value?: string | null;
								propertyKey?: string | null;
								propertyValue?: string | null;
							}> | null;
							Nfts?: Array<{
								__typename?: 'Nft';
								id: string;
								tokenID: any;
								artworkID?: number | null;
								transferredAt?: any | null;
								tier?: { __typename?: 'Tier'; nativeID: string } | null;
								owner: { __typename?: 'User'; id: string };
								collection: { __typename?: 'Collection'; id: string };
							}> | null;
						} | null;
						owner: { __typename?: 'User'; id: string };
						collection: { __typename?: 'Collection'; id: string };
					}>;
				};
			}> | null;
			tiers?: Array<{
				__typename?: 'Tier';
				id: string;
				name: string;
				nativeID: string;
				attributes?: Array<{
					__typename?: 'Attribute';
					id: string;
					key?: string | null;
					value?: string | null;
					propertyKey?: string | null;
					propertyValue?: string | null;
				}> | null;
				Nfts?: Array<{
					__typename?: 'Nft';
					id: string;
					tokenID: any;
					artworkID?: number | null;
					transferredAt?: any | null;
					tier?: { __typename?: 'Tier'; nativeID: string } | null;
					owner: { __typename?: 'User'; id: string };
					collection: { __typename?: 'Collection'; id: string };
				}> | null;
			}> | null;
		} | null;
	} | null;
};

export type GraphAdminOptionFragment = {
	__typename?: 'AdminOption';
	id: string;
	user?: { __typename?: 'User'; id: string } | null;
	controller: { __typename?: 'Controller'; id: string };
};

export type GetGraphAdminOptionQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphAdminOptionQuery = {
	__typename?: 'Query';
	adminOption?: {
		__typename?: 'AdminOption';
		id: string;
		user?: { __typename?: 'User'; id: string } | null;
		controller: { __typename?: 'Controller'; id: string };
	} | null;
};

export type GetGraphAdminOptionsQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<AdminOption_OrderBy>;
	where?: InputMaybe<AdminOption_Filter>;
}>;

export type GetGraphAdminOptionsQuery = {
	__typename?: 'Query';
	adminOptions: Array<{
		__typename?: 'AdminOption';
		id: string;
		user?: { __typename?: 'User'; id: string } | null;
		controller: { __typename?: 'Controller'; id: string };
	}>;
};

export type GraphUserFragment = {
	__typename?: 'User';
	id: string;
	nfts: Array<{
		__typename?: 'Nft';
		id: string;
		tokenID: any;
		artworkID?: number | null;
		transferredAt?: any | null;
		tier?: {
			__typename?: 'Tier';
			id: string;
			name: string;
			nativeID: string;
			attributes?: Array<{
				__typename?: 'Attribute';
				id: string;
				key?: string | null;
				value?: string | null;
				propertyKey?: string | null;
				propertyValue?: string | null;
			}> | null;
			Nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: { __typename?: 'Tier'; nativeID: string } | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
		} | null;
		owner: { __typename?: 'User'; id: string };
		collection: { __typename?: 'Collection'; id: string };
	}>;
	adminOf: Array<{
		__typename?: 'AdminOption';
		id: string;
		user?: { __typename?: 'User'; id: string } | null;
		controller: { __typename?: 'Controller'; id: string };
	}>;
};

export type GetGraphUserQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphUserQuery = {
	__typename?: 'Query';
	user?: {
		__typename?: 'User';
		id: string;
		nfts: Array<{
			__typename?: 'Nft';
			id: string;
			tokenID: any;
			artworkID?: number | null;
			transferredAt?: any | null;
			tier?: {
				__typename?: 'Tier';
				id: string;
				name: string;
				nativeID: string;
				attributes?: Array<{
					__typename?: 'Attribute';
					id: string;
					key?: string | null;
					value?: string | null;
					propertyKey?: string | null;
					propertyValue?: string | null;
				}> | null;
				Nfts?: Array<{
					__typename?: 'Nft';
					id: string;
					tokenID: any;
					artworkID?: number | null;
					transferredAt?: any | null;
					tier?: { __typename?: 'Tier'; nativeID: string } | null;
					owner: { __typename?: 'User'; id: string };
					collection: { __typename?: 'Collection'; id: string };
				}> | null;
			} | null;
			owner: { __typename?: 'User'; id: string };
			collection: { __typename?: 'Collection'; id: string };
		}>;
		adminOf: Array<{
			__typename?: 'AdminOption';
			id: string;
			user?: { __typename?: 'User'; id: string } | null;
			controller: { __typename?: 'Controller'; id: string };
		}>;
	} | null;
};

export type GetGraphUsersQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<User_OrderBy>;
	where?: InputMaybe<User_Filter>;
}>;

export type GetGraphUsersQuery = {
	__typename?: 'Query';
	users: Array<{
		__typename?: 'User';
		id: string;
		nfts: Array<{
			__typename?: 'Nft';
			id: string;
			tokenID: any;
			artworkID?: number | null;
			transferredAt?: any | null;
			tier?: {
				__typename?: 'Tier';
				id: string;
				name: string;
				nativeID: string;
				attributes?: Array<{
					__typename?: 'Attribute';
					id: string;
					key?: string | null;
					value?: string | null;
					propertyKey?: string | null;
					propertyValue?: string | null;
				}> | null;
				Nfts?: Array<{
					__typename?: 'Nft';
					id: string;
					tokenID: any;
					artworkID?: number | null;
					transferredAt?: any | null;
					tier?: { __typename?: 'Tier'; nativeID: string } | null;
					owner: { __typename?: 'User'; id: string };
					collection: { __typename?: 'Collection'; id: string };
				}> | null;
			} | null;
			owner: { __typename?: 'User'; id: string };
			collection: { __typename?: 'Collection'; id: string };
		}>;
		adminOf: Array<{
			__typename?: 'AdminOption';
			id: string;
			user?: { __typename?: 'User'; id: string } | null;
			controller: { __typename?: 'Controller'; id: string };
		}>;
	}>;
};

export type GetGraphNftQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphNftQuery = {
	__typename?: 'Query';
	nft?: {
		__typename?: 'Nft';
		id: string;
		tokenID: any;
		artworkID?: number | null;
		transferredAt?: any | null;
		tier?: {
			__typename?: 'Tier';
			id: string;
			name: string;
			nativeID: string;
			attributes?: Array<{
				__typename?: 'Attribute';
				id: string;
				key?: string | null;
				value?: string | null;
				propertyKey?: string | null;
				propertyValue?: string | null;
			}> | null;
			Nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: { __typename?: 'Tier'; nativeID: string } | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
		} | null;
		owner: { __typename?: 'User'; id: string };
		collection: { __typename?: 'Collection'; id: string };
	} | null;
};

export type GetGraphNftsQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Nft_OrderBy>;
	where?: InputMaybe<Nft_Filter>;
}>;

export type GetGraphNftsQuery = {
	__typename?: 'Query';
	nfts: Array<{
		__typename?: 'Nft';
		id: string;
		tokenID: any;
		artworkID?: number | null;
		transferredAt?: any | null;
		tier?: {
			__typename?: 'Tier';
			id: string;
			name: string;
			nativeID: string;
			attributes?: Array<{
				__typename?: 'Attribute';
				id: string;
				key?: string | null;
				value?: string | null;
				propertyKey?: string | null;
				propertyValue?: string | null;
			}> | null;
			Nfts?: Array<{
				__typename?: 'Nft';
				id: string;
				tokenID: any;
				artworkID?: number | null;
				transferredAt?: any | null;
				tier?: { __typename?: 'Tier'; nativeID: string } | null;
				owner: { __typename?: 'User'; id: string };
				collection: { __typename?: 'Collection'; id: string };
			}> | null;
		} | null;
		owner: { __typename?: 'User'; id: string };
		collection: { __typename?: 'Collection'; id: string };
	}>;
};

export type GetGraphTierQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphTierQuery = {
	__typename?: 'Query';
	tier?: {
		__typename?: 'Tier';
		id: string;
		name: string;
		nativeID: string;
		attributes?: Array<{
			__typename?: 'Attribute';
			id: string;
			key?: string | null;
			value?: string | null;
			propertyKey?: string | null;
			propertyValue?: string | null;
		}> | null;
		Nfts?: Array<{
			__typename?: 'Nft';
			id: string;
			tokenID: any;
			artworkID?: number | null;
			transferredAt?: any | null;
			tier?: { __typename?: 'Tier'; nativeID: string } | null;
			owner: { __typename?: 'User'; id: string };
			collection: { __typename?: 'Collection'; id: string };
		}> | null;
	} | null;
};

export type GetGraphTiersQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Tier_OrderBy>;
	where?: InputMaybe<Tier_Filter>;
}>;

export type GetGraphTiersQuery = {
	__typename?: 'Query';
	tiers: Array<{
		__typename?: 'Tier';
		id: string;
		name: string;
		nativeID: string;
		attributes?: Array<{
			__typename?: 'Attribute';
			id: string;
			key?: string | null;
			value?: string | null;
			propertyKey?: string | null;
			propertyValue?: string | null;
		}> | null;
		Nfts?: Array<{
			__typename?: 'Nft';
			id: string;
			tokenID: any;
			artworkID?: number | null;
			transferredAt?: any | null;
			tier?: { __typename?: 'Tier'; nativeID: string } | null;
			owner: { __typename?: 'User'; id: string };
			collection: { __typename?: 'Collection'; id: string };
		}> | null;
	}>;
};

export type GetGraphAttributeQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphAttributeQuery = {
	__typename?: 'Query';
	attribute?: {
		__typename?: 'Attribute';
		id: string;
		key?: string | null;
		value?: string | null;
		propertyKey?: string | null;
		propertyValue?: string | null;
	} | null;
};

export type GetGraphAttributesQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<Attribute_OrderBy>;
	where?: InputMaybe<Attribute_Filter>;
}>;

export type GetGraphAttributesQuery = {
	__typename?: 'Query';
	attributes: Array<{
		__typename?: 'Attribute';
		id: string;
		key?: string | null;
		value?: string | null;
		propertyKey?: string | null;
		propertyValue?: string | null;
	}>;
};

export type GraphOpenSaleAppFragment = {
	__typename?: 'OpenSaleApp';
	id: string;
	isNative: boolean;
	isActive: boolean;
	tierIds?: Array<string> | null;
	tierPrices?: Array<string> | null;
};

export type GetGraphOpenSaleAppQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphOpenSaleAppQuery = {
	__typename?: 'Query';
	openSaleApp?: {
		__typename?: 'OpenSaleApp';
		id: string;
		isNative: boolean;
		isActive: boolean;
		tierIds?: Array<string> | null;
		tierPrices?: Array<string> | null;
	} | null;
};

export type GetGraphOpenSaleAppsQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<OpenSaleApp_OrderBy>;
	where?: InputMaybe<OpenSaleApp_Filter>;
}>;

export type GetGraphOpenSaleAppsQuery = {
	__typename?: 'Query';
	openSaleApps: Array<{
		__typename?: 'OpenSaleApp';
		id: string;
		isNative: boolean;
		isActive: boolean;
		tierIds?: Array<string> | null;
		tierPrices?: Array<string> | null;
	}>;
};

export type GraphPrivateSaleAppFragment = {
	__typename?: 'PrivateSaleApp';
	id: string;
	isNative: boolean;
	isActive: boolean;
	tierIds?: Array<string> | null;
	tierPrices?: Array<string> | null;
};

export type GetGraphPrivateSaleAppQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetGraphPrivateSaleAppQuery = {
	__typename?: 'Query';
	privateSaleApp?: {
		__typename?: 'PrivateSaleApp';
		id: string;
		isNative: boolean;
		isActive: boolean;
		tierIds?: Array<string> | null;
		tierPrices?: Array<string> | null;
	} | null;
};

export type GetGraphPrivateSaleAppsQueryVariables = Exact<{
	first?: InputMaybe<Scalars['Int']>;
	skip?: InputMaybe<Scalars['Int']>;
	orderBy?: InputMaybe<PrivateSaleApp_OrderBy>;
	where?: InputMaybe<PrivateSaleApp_Filter>;
}>;

export type GetGraphPrivateSaleAppsQuery = {
	__typename?: 'Query';
	privateSaleApps: Array<{
		__typename?: 'PrivateSaleApp';
		id: string;
		isNative: boolean;
		isActive: boolean;
		tierIds?: Array<string> | null;
		tierPrices?: Array<string> | null;
	}>;
};

export const GraphDaoFragmentDoc = gql`
	fragment GraphDao on Dao {
		id
		controller {
			id
		}
		collection {
			id
		}
		openSale {
			id
		}
		privateSale {
			id
		}
		treasury
		safes
	}
`;
export const GraphControllerFragmentDoc = gql`
	fragment GraphController on Controller {
		id
		admins {
			id
			user {
				id
			}
		}
	}
`;
export const GraphAttributeFragmentDoc = gql`
	fragment GraphAttribute on Attribute {
		id
		key
		value
		propertyKey
		propertyValue
	}
`;
export const GraphTierNftFragmentDoc = gql`
	fragment GraphTierNft on Nft {
		id
		tokenID
		artworkID
		transferredAt
		tier {
			nativeID
		}
		owner {
			id
		}
		collection {
			id
		}
	}
`;
export const GraphTierFragmentDoc = gql`
	fragment GraphTier on Tier {
		id
		name
		nativeID
		attributes {
			...GraphAttribute
		}
		Nfts {
			...GraphTierNft
		}
	}
	${GraphAttributeFragmentDoc}
	${GraphTierNftFragmentDoc}
`;
export const GraphNftFragmentDoc = gql`
	fragment GraphNft on Nft {
		id
		tokenID
		artworkID
		transferredAt
		tier {
			...GraphTier
		}
		owner {
			id
		}
		collection {
			id
		}
	}
	${GraphTierFragmentDoc}
`;
export const GraphCollectionFragmentDoc = gql`
	fragment GraphCollection on Collection {
		id
		isNative
		name
		symbol
		url
		openseaOwner
		nfts {
			...GraphNft
		}
		tiers {
			...GraphTier
		}
	}
	${GraphNftFragmentDoc}
	${GraphTierFragmentDoc}
`;
export const GraphAdminOptionFragmentDoc = gql`
	fragment GraphAdminOption on AdminOption {
		id
		user {
			id
		}
		controller {
			id
		}
	}
`;
export const GraphUserFragmentDoc = gql`
	fragment GraphUser on User {
		id
		nfts {
			...GraphNft
		}
		adminOf {
			...GraphAdminOption
		}
	}
	${GraphNftFragmentDoc}
	${GraphAdminOptionFragmentDoc}
`;
export const GraphOpenSaleAppFragmentDoc = gql`
	fragment GraphOpenSaleApp on OpenSaleApp {
		id
		isNative
		isActive
		tierIds
		tierPrices
	}
`;
export const GraphPrivateSaleAppFragmentDoc = gql`
	fragment GraphPrivateSaleApp on PrivateSaleApp {
		id
		isNative
		isActive
		tierIds
		tierPrices
	}
`;
export const GetDaoTreasuryDocument = gql`
	query getDaoTreasury($daoAddress: ID!) {
		daos(where: { id: $daoAddress }) {
			treasury
		}
	}
`;
export const GetDaosAdminsDocument = gql`
	query getDaosAdmins($first: Int!, $skip: Int!, $where: Dao_filter) {
		daos(first: $first, skip: $skip, where: $where) {
			id
			controller {
				admins {
					user {
						id
					}
				}
			}
		}
	}
`;
export const GetDaoMembersByNftDocument = gql`
	query getDaoMembersByNft($daoAddress: ID!, $firstNfts: Int!, $skipNfts: Int!) {
		daos(where: { id: $daoAddress }) {
			collection {
				nfts(first: $firstNfts, skip: $skipNfts) {
					owner {
						id
					}
					tier {
						nativeID
					}
				}
			}
		}
	}
`;
export const GetCollectionNftsDocument = gql`
	query getCollectionNfts($collectionId: ID!, $first: Int!, $skipNfts: Int!) {
		collection(id: $collectionId) {
			nfts(first: $first, skip: $skipNfts) {
				owner {
					id
				}
				tier {
					nativeID
				}
			}
		}
	}
`;
export const GetGraphDaoDocument = gql`
	query getGraphDao($id: ID!) {
		dao(id: $id) {
			...GraphDao
		}
	}
	${GraphDaoFragmentDoc}
`;
export const GetGraphDaosDocument = gql`
	query getGraphDaos($first: Int, $skip: Int, $orderBy: Dao_orderBy, $where: Dao_filter) {
		daos(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphDao
		}
	}
	${GraphDaoFragmentDoc}
`;
export const GetGraphControllerDocument = gql`
	query getGraphController($id: ID!) {
		controller(id: $id) {
			...GraphController
		}
	}
	${GraphControllerFragmentDoc}
`;
export const GetGraphControllersDocument = gql`
	query getGraphControllers($first: Int, $skip: Int, $orderBy: Controller_orderBy, $where: Controller_filter) {
		controllers(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphController
		}
	}
	${GraphControllerFragmentDoc}
`;
export const GetGraphCollectionDocument = gql`
	query getGraphCollection($id: ID!) {
		collection(id: $id) {
			...GraphCollection
		}
	}
	${GraphCollectionFragmentDoc}
`;
export const GetGraphCollectionsDocument = gql`
	query getGraphCollections($first: Int, $skip: Int, $orderBy: Collection_orderBy, $where: Collection_filter) {
		collections(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphCollection
		}
	}
	${GraphCollectionFragmentDoc}
`;
export const GetGraphDaoCollectionDocument = gql`
	query getGraphDaoCollection($daoId: ID!) {
		dao(id: $daoId) {
			collection {
				...GraphCollection
			}
		}
	}
	${GraphCollectionFragmentDoc}
`;
export const GetGraphDaoCollectionNftsDocument = gql`
	query getGraphDaoCollectionNfts($daoId: ID!, $first: Int) {
		dao(id: $daoId) {
			collection {
				nfts(first: $first) {
					...GraphNft
				}
			}
		}
	}
	${GraphNftFragmentDoc}
`;
export const GetGraphDaoCollectionOwnerNftsDocument = gql`
	query getGraphDaoCollectionOwnerNfts($daoId: ID!, $ownerId: ID!) {
		dao(id: $daoId) {
			collection {
				nfts(where: { owner_: { id: $ownerId } }) {
					...GraphNft
				}
			}
		}
	}
	${GraphNftFragmentDoc}
`;
export const GetGraphDaoCollectionOwnersDocument = gql`
	query getGraphDaoCollectionOwners($daoId: ID!) {
		dao(id: $daoId) {
			collection {
				id
				nfts {
					owner {
						id
						nfts {
							...GraphNft
						}
					}
				}
				tiers {
					...GraphTier
				}
			}
		}
	}
	${GraphNftFragmentDoc}
	${GraphTierFragmentDoc}
`;
export const GetGraphAdminOptionDocument = gql`
	query getGraphAdminOption($id: ID!) {
		adminOption(id: $id) {
			...GraphAdminOption
		}
	}
	${GraphAdminOptionFragmentDoc}
`;
export const GetGraphAdminOptionsDocument = gql`
	query getGraphAdminOptions($first: Int, $skip: Int, $orderBy: AdminOption_orderBy, $where: AdminOption_filter) {
		adminOptions(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphAdminOption
		}
	}
	${GraphAdminOptionFragmentDoc}
`;
export const GetGraphUserDocument = gql`
	query getGraphUser($id: ID!) {
		user(id: $id) {
			...GraphUser
		}
	}
	${GraphUserFragmentDoc}
`;
export const GetGraphUsersDocument = gql`
	query getGraphUsers($first: Int, $skip: Int, $orderBy: User_orderBy, $where: User_filter) {
		users(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphUser
		}
	}
	${GraphUserFragmentDoc}
`;
export const GetGraphNftDocument = gql`
	query getGraphNft($id: ID!) {
		nft(id: $id) {
			...GraphNft
		}
	}
	${GraphNftFragmentDoc}
`;
export const GetGraphNftsDocument = gql`
	query getGraphNfts($first: Int, $skip: Int, $orderBy: Nft_orderBy, $where: Nft_filter) {
		nfts(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphNft
		}
	}
	${GraphNftFragmentDoc}
`;
export const GetGraphTierDocument = gql`
	query getGraphTier($id: ID!) {
		tier(id: $id) {
			...GraphTier
		}
	}
	${GraphTierFragmentDoc}
`;
export const GetGraphTiersDocument = gql`
	query getGraphTiers($first: Int, $skip: Int, $orderBy: Tier_orderBy, $where: Tier_filter) {
		tiers(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphTier
		}
	}
	${GraphTierFragmentDoc}
`;
export const GetGraphAttributeDocument = gql`
	query getGraphAttribute($id: ID!) {
		attribute(id: $id) {
			...GraphAttribute
		}
	}
	${GraphAttributeFragmentDoc}
`;
export const GetGraphAttributesDocument = gql`
	query getGraphAttributes($first: Int, $skip: Int, $orderBy: Attribute_orderBy, $where: Attribute_filter) {
		attributes(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphAttribute
		}
	}
	${GraphAttributeFragmentDoc}
`;
export const GetGraphOpenSaleAppDocument = gql`
	query getGraphOpenSaleApp($id: ID!) {
		openSaleApp(id: $id) {
			...GraphOpenSaleApp
		}
	}
	${GraphOpenSaleAppFragmentDoc}
`;
export const GetGraphOpenSaleAppsDocument = gql`
	query getGraphOpenSaleApps($first: Int, $skip: Int, $orderBy: OpenSaleApp_orderBy, $where: OpenSaleApp_filter) {
		openSaleApps(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphOpenSaleApp
		}
	}
	${GraphOpenSaleAppFragmentDoc}
`;
export const GetGraphPrivateSaleAppDocument = gql`
	query getGraphPrivateSaleApp($id: ID!) {
		privateSaleApp(id: $id) {
			...GraphPrivateSaleApp
		}
	}
	${GraphPrivateSaleAppFragmentDoc}
`;
export const GetGraphPrivateSaleAppsDocument = gql`
	query getGraphPrivateSaleApps(
		$first: Int
		$skip: Int
		$orderBy: PrivateSaleApp_orderBy
		$where: PrivateSaleApp_filter
	) {
		privateSaleApps(first: $first, skip: $skip, orderBy: $orderBy, where: $where) {
			...GraphPrivateSaleApp
		}
	}
	${GraphPrivateSaleAppFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
	action: (requestHeaders?: Record<string, string>) => Promise<T>,
	operationName: string,
	operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
	return {
		getDaoTreasury(
			variables: GetDaoTreasuryQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetDaoTreasuryQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetDaoTreasuryQuery>(GetDaoTreasuryDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getDaoTreasury',
				'query'
			);
		},
		getDaosAdmins(
			variables: GetDaosAdminsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetDaosAdminsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetDaosAdminsQuery>(GetDaosAdminsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getDaosAdmins',
				'query'
			);
		},
		getDaoMembersByNft(
			variables: GetDaoMembersByNftQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetDaoMembersByNftQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetDaoMembersByNftQuery>(GetDaoMembersByNftDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getDaoMembersByNft',
				'query'
			);
		},
		getCollectionNfts(
			variables: GetCollectionNftsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetCollectionNftsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetCollectionNftsQuery>(GetCollectionNftsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getCollectionNfts',
				'query'
			);
		},
		getGraphDao(
			variables: GetGraphDaoQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphDaoQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphDaoQuery>(GetGraphDaoDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphDao',
				'query'
			);
		},
		getGraphDaos(
			variables?: GetGraphDaosQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphDaosQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphDaosQuery>(GetGraphDaosDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphDaos',
				'query'
			);
		},
		getGraphController(
			variables: GetGraphControllerQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphControllerQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphControllerQuery>(GetGraphControllerDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphController',
				'query'
			);
		},
		getGraphControllers(
			variables?: GetGraphControllersQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphControllersQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphControllersQuery>(GetGraphControllersDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphControllers',
				'query'
			);
		},
		getGraphCollection(
			variables: GetGraphCollectionQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphCollectionQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphCollectionQuery>(GetGraphCollectionDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphCollection',
				'query'
			);
		},
		getGraphCollections(
			variables?: GetGraphCollectionsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphCollectionsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphCollectionsQuery>(GetGraphCollectionsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphCollections',
				'query'
			);
		},
		getGraphDaoCollection(
			variables: GetGraphDaoCollectionQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphDaoCollectionQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphDaoCollectionQuery>(GetGraphDaoCollectionDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphDaoCollection',
				'query'
			);
		},
		getGraphDaoCollectionNfts(
			variables: GetGraphDaoCollectionNftsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphDaoCollectionNftsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphDaoCollectionNftsQuery>(GetGraphDaoCollectionNftsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphDaoCollectionNfts',
				'query'
			);
		},
		getGraphDaoCollectionOwnerNfts(
			variables: GetGraphDaoCollectionOwnerNftsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphDaoCollectionOwnerNftsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphDaoCollectionOwnerNftsQuery>(GetGraphDaoCollectionOwnerNftsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphDaoCollectionOwnerNfts',
				'query'
			);
		},
		getGraphDaoCollectionOwners(
			variables: GetGraphDaoCollectionOwnersQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphDaoCollectionOwnersQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphDaoCollectionOwnersQuery>(GetGraphDaoCollectionOwnersDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphDaoCollectionOwners',
				'query'
			);
		},
		getGraphAdminOption(
			variables: GetGraphAdminOptionQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphAdminOptionQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphAdminOptionQuery>(GetGraphAdminOptionDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphAdminOption',
				'query'
			);
		},
		getGraphAdminOptions(
			variables?: GetGraphAdminOptionsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphAdminOptionsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphAdminOptionsQuery>(GetGraphAdminOptionsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphAdminOptions',
				'query'
			);
		},
		getGraphUser(
			variables: GetGraphUserQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphUserQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphUserQuery>(GetGraphUserDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphUser',
				'query'
			);
		},
		getGraphUsers(
			variables?: GetGraphUsersQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphUsersQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphUsersQuery>(GetGraphUsersDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphUsers',
				'query'
			);
		},
		getGraphNft(
			variables: GetGraphNftQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphNftQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphNftQuery>(GetGraphNftDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphNft',
				'query'
			);
		},
		getGraphNfts(
			variables?: GetGraphNftsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphNftsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphNftsQuery>(GetGraphNftsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphNfts',
				'query'
			);
		},
		getGraphTier(
			variables: GetGraphTierQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphTierQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphTierQuery>(GetGraphTierDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphTier',
				'query'
			);
		},
		getGraphTiers(
			variables?: GetGraphTiersQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphTiersQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphTiersQuery>(GetGraphTiersDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphTiers',
				'query'
			);
		},
		getGraphAttribute(
			variables: GetGraphAttributeQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphAttributeQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphAttributeQuery>(GetGraphAttributeDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphAttribute',
				'query'
			);
		},
		getGraphAttributes(
			variables?: GetGraphAttributesQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphAttributesQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphAttributesQuery>(GetGraphAttributesDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphAttributes',
				'query'
			);
		},
		getGraphOpenSaleApp(
			variables: GetGraphOpenSaleAppQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphOpenSaleAppQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphOpenSaleAppQuery>(GetGraphOpenSaleAppDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphOpenSaleApp',
				'query'
			);
		},
		getGraphOpenSaleApps(
			variables?: GetGraphOpenSaleAppsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphOpenSaleAppsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphOpenSaleAppsQuery>(GetGraphOpenSaleAppsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphOpenSaleApps',
				'query'
			);
		},
		getGraphPrivateSaleApp(
			variables: GetGraphPrivateSaleAppQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphPrivateSaleAppQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphPrivateSaleAppQuery>(GetGraphPrivateSaleAppDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphPrivateSaleApp',
				'query'
			);
		},
		getGraphPrivateSaleApps(
			variables?: GetGraphPrivateSaleAppsQueryVariables,
			requestHeaders?: Dom.RequestInit['headers']
		): Promise<GetGraphPrivateSaleAppsQuery> {
			return withWrapper(
				(wrappedRequestHeaders) =>
					client.request<GetGraphPrivateSaleAppsQuery>(GetGraphPrivateSaleAppsDocument, variables, {
						...requestHeaders,
						...wrappedRequestHeaders
					}),
				'getGraphPrivateSaleApps',
				'query'
			);
		}
	};
}
export type Sdk = ReturnType<typeof getSdk>;
