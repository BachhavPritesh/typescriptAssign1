import { CartItem, FoodItem } from "./types";

// Add food to cart
function addToCart(
    cart: CartItem[],
    foodItem: FoodItem,
    quantity: number,
    specialInstruction?: string
): CartItem[] {

    const existingItem = cart.find(function (item) {
        return item.id === foodItem.id;
    });

    // If item already exists
    if (existingItem) {
        existingItem.quantity = existingItem.quantity + quantity;

        return cart;
    }

    // If item does not exist
    const newItem: CartItem = {
        ...foodItem,
        quantity: quantity,
        specialInstruction: specialInstruction
    };

    cart.push(newItem);

    return cart;
}

// Remove food from cart
function removeFromCart(
    cart: CartItem[],
    foodId: number
): CartItem[] {

    return cart.filter(function (item) {
        return item.id !== foodId;
    });
}

// Update quantity
function updateQuantity(
    cart: CartItem[],
    foodId: number,
    quantity: number
): CartItem[] {

    const item = cart.find(function (item) {
        return item.id === foodId;
    });

    if (item) {
        item.quantity = quantity;
    }

    return cart;
}

// Calculate total for one item
function calculateItemTotal(item: CartItem): number {
    return item.price * item.quantity;
}

// Calculate subtotal
function calculateSubtotal(cart: CartItem[]): number {

    return cart.reduce(function (total, item) {

        return total + calculateItemTotal(item);

    }, 0);
}

export {
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateItemTotal,
    calculateSubtotal
};