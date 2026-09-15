"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = updateOrderStatus;
exports.displayOrderStatus = displayOrderStatus;
const types_1 = require("./types");
// Change order status
function updateOrderStatus(currentStatus, newStatus) {
    console.log("Order status changed from", currentStatus, "to", newStatus);
    return newStatus;
}
// Display status
function displayOrderStatus(status) {
    switch (status) {
        case "pending":
            return "Order is pending.";
        case "confirmed":
            return "Order is confirmed.";
        case "preparing":
            return "Order is being prepared.";
        case "delivered":
            return "Order has been delivered.";
        case "cancelled":
            return "Order has been cancelled.";
        default:
            return (0, types_1.assertNever)(status);
    }
}
