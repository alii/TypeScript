/// <reference path='fourslash.ts' />

// @module: esnext

// Test that modules with same name but different attributes are treated as separate

////declare module "data.json" with { type: "json" } {
////    const jsonValue: object;
////    export default jsonValue;
////}
////
////declare module "data.json" with { type: "text" } {
////    const textValue: string;
////    export default textValue;
////}
////
////// Without attributes - should be separate from the above
////declare module "data.json" {
////    const defaultValue: number;
////    export default defaultValue;
////}
////
////import json from "data.json" with { type: "json" };
////import text from "data.json" with { type: "text" };
////import def from "data.json";
////
////const j: object = json;
////const t: string = text;
////const d: number = def;
////
////// These should all error - wrong types
////const /*1*/wrongJson: string = json;
////const /*2*/wrongText: object = text;
////const /*3*/wrongDef: string = def;

verify.numberOfErrorsInCurrentFile(3);
verify.errorExistsBetweenMarkers("1", "2");
verify.errorExistsBetweenMarkers("2", "3");