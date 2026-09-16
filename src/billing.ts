import {
    CartItem,
    CustomerType,
    Payment,
    BillResult
} from "./types";

import { calculateSubtotal } from "./cart";

function calculateDiscount(
    customer: CustomerType,
    subtotal: number
): number {

    let membershipDiscount = 0;

    if ("discountPercentage" in customer) {

        membershipDiscount =
            subtotal * customer.discountPercentage / 100;
    }

    let additionalDiscount = 0;

    if (subtotal > 2000) {

        additionalDiscount = subtotal * 5 / 100;
    }

    const totalDiscount =
        membershipDiscount + additionalDiscount;

    return totalDiscount;
}

function calculateTax(amountAfterDiscount: number): number {

    return amountAfterDiscount * 5 / 100;
}

function calculateFinalAmount(
    subtotal: number,
    discount: number,
    tax: number
): number {

    return subtotal - discount + tax;
}

function generateBill(
    orderId: number,
    customer: CustomerType,
    cartItems: CartItem[],
    payment: Payment
): BillResult {

    if (cartItems.length === 0) {

        return {
            status: "error",
            message: "Cart is empty."
        };
    }

    const subtotal = calculateSubtotal(cartItems);

    const discount =
        calculateDiscount(customer, subtotal);

    const amountAfterDiscount =
        subtotal - discount;

    const tax =
        calculateTax(amountAfterDiscount);

    const finalAmount =
        calculateFinalAmount(
            subtotal,
            discount,
            tax
        );

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

export {
    calculateDiscount,
    calculateTax,
    calculateFinalAmount,
    generateBill
};