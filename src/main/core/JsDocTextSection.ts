/**
 * A section from the .d.ts file that is a JsDoc. 
 */
interface JsDocTextSection {
	/**
	 * The line where the initial / * * is.
	 */
	startingLine : number;
	
	/**
	 * The line where the final * / is.
	 */
	endingLine : number;
	
	/**
	 * The raw content of the JsDoc, including the indent, stars
	 * and slashes.
	 */
	content : string;
}
