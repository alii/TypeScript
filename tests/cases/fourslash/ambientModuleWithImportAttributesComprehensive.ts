/// <reference path='fourslash.ts' />

// @module: esnext
// @moduleResolution: bundler

//// [types.d.ts]
////declare module "*.css" {
////    const styles: Record<string, string>;
////    export default styles;
////}
////
////declare module "*.css" with { type: "raw" } {
////    const css: string;
////    export default css;
////}
////
////declare module "*.json" with { type: "json" } {
////    const value: any;
////    export default value;
////}
////
////declare module "*.txt" with { type: "bytes" } {
////    const content: ArrayBuffer;
////    export default content;
////}

//// [test.ts]
////import styles from "./styles.css";
////import rawCss from "./styles.css" with { type: "raw" };
////import config from "./config.json" with { type: "json" };
////import data from "./data.txt" with { type: "bytes" };
////
////styles./*1*/;
////rawCss./*2*/;
////config./*3*/;
////data./*4*/;

// Test that different import attributes resolve to different module declarations
verify.completions({
    marker: "1",
    includes: [],
    excludes: ["charAt", "charCodeAt"] // Should be Record<string, string>, not string
});

verify.completions({
    marker: "2",
    includes: ["charAt", "charCodeAt"], // Should be string
    excludes: []
});

// The json import should resolve to any
verify.completions({
    marker: "3",
    includes: [], // any type has no completions
    excludes: []
});

// The bytes import should resolve to ArrayBuffer
verify.completions({
    marker: "4",
    includes: ["byteLength", "slice"], // ArrayBuffer methods
    excludes: ["charAt"]
});

// Verify the types
verify.quickInfoAt("1", "const styles: Record<string, string>");
verify.quickInfoAt("2", "const rawCss: string");
verify.quickInfoAt("3", "const config: any");
verify.quickInfoAt("4", "const data: ArrayBuffer");