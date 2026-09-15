"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = calculateDiscount;
exports.calculateTax = calculateTax;
exports.calculateFinalAmount = calculateFinalAmount;
exports.generateBill = generateBill;
const cart_1 = require("./cart");
// Calculate discount
function calculateDiscount(customer, subtotal) {
    let membershipDiscount = 0;
    // Check if customer is a member
    if ("discountPercentage" in customer) {
        membershipDiscount =
            subtotal * customer.discountPercentage / 100;
    }
    let additionalDiscount = 0;
    // Extra 5% discount above ₹2000
    if (subtotal > 2000) {
        additionalDiscount = subtotal * 5 / 100;
    }
    const totalDiscount = membershipDiscount + additionalDiscount;
    return totalDiscount;
}
// Calculate GST
function calculateTax(amountAfterDiscount) {
    return amountAfterDiscount * 5 / 100;
}
// Calculate final amount
function calculateFinalAmount(subtotal, discount, tax) {
    return subtotal - discount + tax;
}
// Generate bill
function generateBill(orderId, customer, cartItems, payment) {
    // Check empty cart
    if (cartItems.length === 0) {
        return {
            status: "error",
            message: "Cart is empty."
        };
    }
    const subtotal = (0, cart_1.calculateSubtotal)(cartItems);
    const discount = calculateDiscount(customer, subtotal);
    const amountAfterDiscount = subtotal - discount;
    const tax = calculateTax(amountAfterDiscount);
    const finalAmount = calculateFinalAmount(subtotal, discount, tax);
    return {
        status: "success",
        orderId: orderId,
        customer: customer,
        cartItems: cartItems,
        subtotal: subtotal,
        discount: discount,
        tax: tax,
        finalAmount: finalAmount,
        payment: payment
    };
}
