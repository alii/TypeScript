/// <reference path='fourslash.ts' />

// @module: esnext
// @moduleResolution: bundler

// Test pattern matching with different attributes

////declare module "*.css" with { type: "css" } {
////    const styles: CSSStyleSheet;
////    export default styles;
////}
////
////declare module "*.css" with { type: "text" } {
////    const content: string;
////    export default content;
////}
////
////declare module "*.css" {
////    const defaultExport: { [className: string]: string };
////    export default defaultExport;
////}
////
////import cssSheet from "./styles.css" with { type: "css" };
////import cssText from "./theme.css" with { type: "text" };
////import cssModule from "./module.css";
////
////cssSheet./*1*/;
////cssText./*2*/;
////cssModule./*3*/;

// Verify cssSheet is CSSStyleSheet
verify.completions({
    marker: "1",
    includes: [
        { name: "cssRules", kind: "property" },
        { name: "insertRule", kind: "method" },
        { name: "deleteRule", kind: "method" },
    ]
});

// Verify cssText is string
verify.completions({
    marker: "2",
    includes: [
        { name: "charAt", kind: "method" },
        { name: "length", kind: "property" },
        { name: "split", kind: "method" },
    ]
});

// Verify cssModule is the default (object with string index)
verify.completions({
    marker: "3",
    excludes: [
        { name: "charAt" },
        { name: "cssRules" },
    ]
});