"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const customer_1 = require("./customer");
const cart_1 = require("./cart");
const payment_1 = require("./payment");
const billing_1 = require("./billing");
const order_1 = require("./order");
// ------------------------------
// MAIN PROGRAM
// ------------------------------
console.log("====================================");
console.log("       FOOD ORDERING SYSTEM");
console.log("====================================");
// ------------------------------
// SHOW FOOD MENU
// ------------------------------
console.log("\nFOOD MENU");
data_1.foodItems.forEach(function (item) {
    if (item.isAvailable) {
        console.log(item.id +
            ". " +
            item.name +
            " - ₹" +
            item.price);
    }
});
// ------------------------------
// CREATE CUSTOMER
// ------------------------------
// Change this to create a guest if needed
const customer = (0, customer_1.createMember)(1, "Rahul", "9876543210", "Ahmedabad", "Satellite", "MEM001", "gold");
console.log("\nCUSTOMER");
console.log("Name:", customer.name);
if ("membershipLevel" in customer) {
    console.log("Membership:", customer.membershipLevel);
    console.log("Discount:", customer.discountPercentage + "%");
}
else {
    console.log("Membership: Guest");
}
// ------------------------------
// CREATE CART
// ------------------------------
let cart = [];
// ------------------------------
// ADD ITEMS
// ------------------------------
const pizza = data_1.foodItems.find(function (item) {
    return item.id === 1;
});
const burger = data_1.foodItems.find(function (item) {
    return item.id === 3;
});
const coffee = data_1.foodItems.find(function (item) {
    return item.id === 5;
});
if (pizza) {
    cart = (0, cart_1.addToCart)(cart, pizza, 2);
}
if (burger) {
    cart = (0, cart_1.addToCart)(cart, burger, 1);
}
if (coffee) {
    cart = (0, cart_1.addToCart)(cart, coffee, 2);
}
// ------------------------------
// VIEW CART
// ------------------------------
console.log("\nCART");
cart.forEach(function (item) {
    console.log(item.name +
        " x " +
        item.quantity +
        " = ₹" +
        item.price * item.quantity);
});
// ------------------------------
// UPDATE QUANTITY
// ------------------------------
// Change pizza quantity to 3
cart = (0, cart_1.updateQuantity)(cart, 1, 3);
console.log("\nCART AFTER UPDATE");
cart.forEach(function (item) {
    console.log(item.name +
        " x " +
        item.quantity);
});
// ------------------------------
// REMOVE ITEM
// ------------------------------
// Example:
// cart = removeFromCart(cart, 5);
// ------------------------------
// PAYMENT
// ------------------------------
const payment = {
    method: "upi",
    transactionId: "UPI928374"
};
// ------------------------------
// GENERATE BILL
// ------------------------------
const bill = (0, billing_1.generateBill)(1001, customer, cart, payment);
// ------------------------------
// DISPLAY BILL
// ------------------------------
console.log("\n====================================");
console.log("           ORDER SUMMARY");
console.log("====================================");
if (bill.status === "success") {
    console.log("Order ID:", bill.orderId);
    console.log("Customer:", bill.customer.name);
    console.log("\nItems:");
    bill.cartItems.forEach(function (item) {
        console.log(item.name +
            " x " +
            item.quantity +
            " = ₹" +
            item.price * item.quantity);
    });
    console.log("\nSubtotal:", "₹" + bill.subtotal);
    console.log("Discount:", "₹" + bill.discount.toFixed(2));
    console.log("GST:", "₹" + bill.tax.toFixed(2));
    console.log("Final Amount:", "₹" + bill.finalAmount.toFixed(2));
    // ------------------------------
    // PROCESS PAYMENT
    // ------------------------------
    console.log("\nPAYMENT");
    const paymentSuccessful = (0, payment_1.processPayment)(bill.payment, bill.finalAmount);
    // ------------------------------
    // ORDER STATUS
    // ------------------------------
    let orderStatus = "pending";
    if (paymentSuccessful) {
        orderStatus =
            (0, order_1.updateOrderStatus)(orderStatus, "confirmed");
    }
    console.log((0, order_1.displayOrderStatus)(orderStatus));
}
else {
    console.log("Error:", bill.message);
}
console.log("\n====================================");
console.log("       THANK YOU FOR ORDERING!");
console.log("====================================");
