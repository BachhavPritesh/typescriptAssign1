import { foodItems } from "./data";

import {
    createGuest,
    createMember
} from "./customer";

import {
    addToCart,
    removeFromCart,
    updateQuantity
} from "./cart";

import {
    processPayment
} from "./payment";

import {
    generateBill
} from "./billing";

import {
    updateOrderStatus,
    displayOrderStatus
} from "./order";

import {
    CartItem,
    CustomerType,
    Payment,
    OrderStatus
} from "./types";


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

foodItems.forEach(function (item) {

    if (item.isAvailable) {

        console.log(
            item.id +
            ". " +
            item.name +
            " - ₹" +
            item.price
        );
    }
});


// ------------------------------
// CREATE CUSTOMER
// ------------------------------

// Change this to create a guest if needed
const customer: CustomerType = createMember(
    1,
    "Rahul",
    "9876543210",
    "Ahmedabad",
    "Satellite",
    "MEM001",
    "gold"
);

console.log("\nCUSTOMER");
console.log("Name:", customer.name);

if ("membershipLevel" in customer) {

    console.log(
        "Membership:",
        customer.membershipLevel
    );

    console.log(
        "Discount:",
        customer.discountPercentage + "%"
    );
} else {

    console.log("Membership: Guest");
}


// ------------------------------
// CREATE CART
// ------------------------------

let cart: CartItem[] = [];


// ------------------------------
// ADD ITEMS
// ------------------------------

const pizza = foodItems.find(function (item) {
    return item.id === 1;
});

const burger = foodItems.find(function (item) {
    return item.id === 3;
});

const coffee = foodItems.find(function (item) {
    return item.id === 5;
});


if (pizza) {

    cart = addToCart(
        cart,
        pizza,
        2
    );
}


if (burger) {

    cart = addToCart(
        cart,
        burger,
        1
    );
}


if (coffee) {

    cart = addToCart(
        cart,
        coffee,
        2
    );
}


// ------------------------------
// VIEW CART
// ------------------------------

console.log("\nCART");

cart.forEach(function (item) {

    console.log(
        item.name +
        " x " +
        item.quantity +
        " = ₹" +
        item.price * item.quantity
    );
});


// ------------------------------
// UPDATE QUANTITY
// ------------------------------

// Change pizza quantity to 3
cart = updateQuantity(
    cart,
    1,
    3
);

console.log("\nCART AFTER UPDATE");

cart.forEach(function (item) {

    console.log(
        item.name +
        " x " +
        item.quantity
    );
});


// ------------------------------
// REMOVE ITEM
// ------------------------------

// Example:
// cart = removeFromCart(cart, 5);


// ------------------------------
// PAYMENT
// ------------------------------

const payment: Payment = {
    method: "upi",
    transactionId: "UPI928374"
};


// ------------------------------
// GENERATE BILL
// ------------------------------

const bill = generateBill(
    1001,
    customer,
    cart,
    payment
);


// ------------------------------
// DISPLAY BILL
// ------------------------------

console.log("\n====================================");
console.log("           ORDER SUMMARY");
console.log("====================================");


if (bill.status === "success") {

    console.log("Order ID:", bill.orderId);

    console.log(
        "Customer:",
        bill.customer.name
    );

    console.log("\nItems:");

    bill.cartItems.forEach(function (item) {

        console.log(
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            item.price * item.quantity
        );
    });

    console.log("\nSubtotal:", "₹" + bill.subtotal);

    console.log(
        "Discount:",
        "₹" + bill.discount.toFixed(2)
    );

    console.log(
        "GST:",
        "₹" + bill.tax.toFixed(2)
    );

    console.log(
        "Final Amount:",
        "₹" + bill.finalAmount.toFixed(2)
    );


    // ------------------------------
    // PROCESS PAYMENT
    // ------------------------------

    console.log("\nPAYMENT");

    const paymentSuccessful =
        processPayment(
            bill.payment,
            bill.finalAmount
        );


    // ------------------------------
    // ORDER STATUS
    // ------------------------------

    let orderStatus: OrderStatus = "pending";

    if (paymentSuccessful) {

        orderStatus =
            updateOrderStatus(
                orderStatus,
                "confirmed"
            );
    }

    console.log(
        displayOrderStatus(orderStatus)
    );


} else {

    console.log(
        "Error:",
        bill.message
    );
}


console.log("\n====================================");
console.log("       THANK YOU FOR ORDERING!");
console.log("====================================");