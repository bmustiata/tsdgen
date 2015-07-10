/**
 * An exported class or function.
 */
interface ExportedItem {
	modules : Array<string>; // the module names where the item is exported.
	item : string; // the parsed string content of the exported item.
}
