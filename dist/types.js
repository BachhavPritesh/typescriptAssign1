"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNever = assertNever;
// This function helps check all cases
function assertNever(value) {
    throw new Error(`Unhandled value: ${value}`);
}
