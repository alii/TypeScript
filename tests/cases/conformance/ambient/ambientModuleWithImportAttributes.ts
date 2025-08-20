// @module: esnext
// @moduleResolution: bundler

// Basic ambient module declarations with import attributes
declare module "*.txt" with { type: "text" } {
    const content: string;
    export default content;
}

declare module "*.txt" with { type: "bytes" } {
    const content: Uint8Array;
    export default content;
}

// Concrete module with attributes
declare module "specific.json" with { type: "json" } {
    export const data: { version: string; name: string };
}

// Pattern module without attributes (should still work)
declare module "*.legacy" {
    const value: any;
    export = value;
}

// Usage
import textContent from "./readme.txt" with { type: "text" };
import bytesContent from "./data.txt" with { type: "bytes" };
import { data } from "specific.json" with { type: "json" };
import legacyModule = require("./old.legacy");

// Type assertions to verify correct types
const _1: string = textContent;
const _2: Uint8Array = bytesContent;
const _3: { version: string; name: string } = data;
const _4: any = legacyModule;