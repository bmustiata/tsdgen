interface ITag {
	title: string,
	description: string,
	type: any
}

interface IDescription {
	description: string,
	tags: Array<ITag>
}

declare module "doctrine" {
	export function parse(unwrappedComment : string) : IDescription;
	export function unwrapComment(comment: string) : string;
}