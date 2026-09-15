"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.updateQuantity = updateQuantity;
exports.calculateItemTotal = calculateItemTotal;
exports.calculateSubtotal = calculateSubtotal;
// Add food to cart
function addToCart(cart, foodItem, quantity, specialInstruction) {
    const existingItem = cart.find(function (item) {
        return item.id === foodItem.id;
    });
    // If item already exists
    if (existingItem) {
        existingItem.quantity = existingItem.quantity + quantity;
        return cart;
    }
    // If item does not exist
    const newItem = {
        ...foodItem,
        quantity: quantity,
        specialInstruction: specialInstruction
    };
    cart.push(newItem);
    return cart;
}
// Remove food from cart
function removeFromCart(cart, foodId) {
    return cart.filter(function (item) {
        return item.id !== foodId;
    });
}
// Update quantity
function updateQuantity(cart, foodId, quantity) {
    const item = cart.find(function (item) {
        return item.id === foodId;
    });
    if (item) {
        item.quantity = quantity;
    }
    return cart;
}
// Calculate total for one item
function calculateItemTotal(item) {
    return item.price * item.quantity;
}
// Calculate subtotal
function calculateSubtotal(cart) {
    return cart.reduce(function (total, item) {
        return total + calculateItemTotal(item);
    }, 0);
}
