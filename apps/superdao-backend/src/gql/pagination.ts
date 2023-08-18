/* eslint-disable max-classes-per-file,no-shadow */
import { ArgsType, Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Type } from '@nestjs/common';

@ArgsType()
export class PaginationArgs {
	@Field(() => Int)
	@Min(0)
	offset?: number = 0;

	@Field(() => Int)
	@Min(1)
	limit?: number = 20;
}

@ArgsType()
export class PaginationWithSearch extends PaginationArgs {
	@Field(() => String)
	search?: string = '';
}

export enum SortProperty {
	name = 'name'
}

export enum SortOrder {
	Asc = 'ASC',
	Desc = 'DESC'
}

registerEnumType(SortProperty, { name: 'SortProperty' });
registerEnumType(SortOrder, { name: 'SortOrder' });

export interface ClassType<T = any> {
	new (...args: any[]): T;
}

@ArgsType()
export class PaginationWithSort extends PaginationWithSearch {
	@Field(() => SortProperty)
	sortProperty: SortProperty = SortProperty.name;

	@Field(() => SortOrder)
	sortOrder: SortOrder = SortOrder.Desc;
}

export default function PaginatedResponse<TItemsFieldValue>(itemsFieldValue: Type<TItemsFieldValue>) {
	// `isAbstract` decorator option is mandatory to prevent registering in schema
	@ObjectType({ isAbstract: true })
	abstract class PaginatedResponseClass1 {
		@Field(() => [itemsFieldValue])
		items: TItemsFieldValue[];

		@Field(() => Int)
		count: number;
	}

	return PaginatedResponseClass1;
}
