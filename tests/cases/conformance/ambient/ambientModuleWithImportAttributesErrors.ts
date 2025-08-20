// @module: esnext
// @moduleResolution: bundler

// Test error cases for ambient modules with import attributes

declare module "*.txt" with { type: "text" } {
    const content: string;
    export default content;
}

// This should error - trying to declare the same module pattern with different exports but same attributes
declare module "*.txt" with { type: "text" } {
    const different: number;  // @error
    export default different;
}

// This is OK - same pattern but different attributes
declare module "*.txt" with { type: "binary" } {
    const buffer: ArrayBuffer;
    export default buffer;
}

// Import with wrong attributes should fail to resolve
import wrongImport from "./file.txt" with { type: "unknown" }; // @error

// Import without attributes when attributes are required
import textContent from "./file.txt"; // Should match the no-attributes version if one exists

// Module augmentation with attributes - should this be allowed?
declare module "*.txt" with { type: "text" } {
    export const extraExport: string; // @error - augmentation might not be allowed
}