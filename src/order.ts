import { OrderStatus, assertNever } from "./types";


// Change order status
function updateOrderStatus(
    currentStatus: OrderStatus,
    newStatus: OrderStatus
): OrderStatus {

    console.log(
        "Order status changed from",
        currentStatus,
        "to",
        newStatus
    );

    return newStatus;
}


// Display status
function displayOrderStatus(
    status: OrderStatus
): string {

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
            return assertNever(status);
    }
}

export {
    updateOrderStatus,
    displayOrderStatus
};