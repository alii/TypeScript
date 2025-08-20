/// <reference path='fourslash.ts' />

// @module: esnext
// @moduleResolution: bundler

// Test that ambient module declarations with import attributes work correctly

////declare module "*.txt" with { type: "text" } {
////    const content: string;
////    export default content;
////}
////
////declare module "*.txt" with { type: "bytes" } {
////    const content: Uint8Array;
////    export default content;
////}
////
////declare module "*.json" with { type: "json" } {
////    const value: any;
////    export default value;
////}
////
////import textContent from "./data.txt" with { type: "text" };
////import bytesContent from "./data.txt" with { type: "bytes" };
////import jsonData from "./config.json" with { type: "json" };
////
////textContent./*1*/;
////bytesContent./*2*/;
////jsonData./*3*/;
////
////const t: string = textContent;
////const b: Uint8Array = bytesContent;
////const j: any = jsonData;
////
////// Should error - wrong types
////const wrongType1: number = /*4*/textContent;
////const wrongType2: string = /*5*/bytesContent;

// Verify that textContent is treated as string
verify.completions({
    marker: "1",
    includes: [
        { name: "charAt", kind: "method" },
        { name: "charCodeAt", kind: "method" },
        { name: "concat", kind: "method" },
        { name: "indexOf", kind: "method" },
        { name: "length", kind: "property" },
        { name: "slice", kind: "method" },
        { name: "split", kind: "method" },
        { name: "substring", kind: "method" },
        { name: "toLowerCase", kind: "method" },
        { name: "toUpperCase", kind: "method" },
        { name: "trim", kind: "method" },
    ]
});

// Verify that bytesContent is treated as Uint8Array
verify.completions({
    marker: "2",
    includes: [
        { name: "buffer", kind: "property" },
        { name: "byteLength", kind: "property" },
        { name: "byteOffset", kind: "property" },
        { name: "BYTES_PER_ELEMENT", kind: "property" },
        { name: "length", kind: "property" },
        { name: "slice", kind: "method" },
        { name: "subarray", kind: "method" },
        { name: "set", kind: "method" },
    ]
});

// Verify type errors
verify.errorExistsBetweenMarkers("4", "5");