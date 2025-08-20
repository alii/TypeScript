/// <reference path='fourslash.ts' />

// @module: esnext
// @moduleResolution: bundler

//// [module.d.ts]
////declare module "*.worker.js" {
////    const workerUrl: string;
////    export default workerUrl;
////}
////
////declare module "*.worker.js" with { type: "module" } {
////    export default class Worker {
////        constructor();
////        postMessage(msg: any): void;
////        terminate(): void;
////    }
////}
////
////declare module "*.worker.js" with { type: "inline" } {
////    const workerCode: string;
////    export { workerCode };
////}

//// [test.ts]
////import workerUrl from "./my.worker.js";
////import WorkerClass from "./my.worker.js" with { type: "module" };
////import { workerCode } from "./my.worker.js" with { type: "inline" };
////
////const url: string = workerUrl/*1*/;
////const worker = new WorkerClass/*2*/();
////const code: string = workerCode/*3*/;
////
////worker./*4*/;

// Test that each import resolves to the correct module declaration
verify.quickInfoAt("1", "const workerUrl: string");
verify.quickInfoAt("2", "import WorkerClass");
verify.quickInfoAt("3", "const workerCode: string");

// Test that the Worker class has the expected methods
verify.completions({
    marker: "4",
    includes: ["postMessage", "terminate"],
    excludes: []
});