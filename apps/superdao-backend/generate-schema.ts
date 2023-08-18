import * as glob from 'glob';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import * as path from 'path';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';

export interface Type<T = any> extends Function {
	new (...args: any[]): T;
}

const resolved: string[] = [];

async function getAllResolvers(): Promise<Type[]> {
	const matches = glob.sync('src/**/*.resolver.ts', { cwd: __dirname });
	const resolverClasses: Type[] = [];

	for (let match of matches) {
		const resolverName = /\/(\w+)\.resolver/.exec(match)?.[1];
		if (!resolverName) throw new Error('No resolver for match ' + match);
		const className = resolverName[0].toUpperCase() + resolverName.slice(1) + 'Resolver';

		const { [className]: classObject } = require(path.join(__dirname, match));
		resolved.push(path.join(__dirname, match));
		if (!classObject) {
			throw new Error(`Cannot parse file ${match}`);
		}
		resolverClasses.push(classObject);
	}

	resolved.forEach((path) => delete require.cache[require.resolve(path)]);

	return resolverClasses;
}

export default async function generateSchema() {
	const app = await NestFactory.create(GraphQLSchemaBuilderModule);
	await app.init();
	const resolvers = await getAllResolvers();
	const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
	const schema = await gqlSchemaFactory.create(resolvers);
	const schemaStr = printSchema(schema!);
	writeFileSync(path.join(__dirname, 'schema.gql'), schemaStr);
}

generateSchema();
