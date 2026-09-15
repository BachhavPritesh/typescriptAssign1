// Food categories
type FoodCategory = "pizza" | "burger" | "drink" | "dessert";

// Order statuses
type OrderStatus =
    | "pending"
    | "confirmed"
    | "preparing"
    | "delivered"
    | "cancelled";

// Food item
interface FoodItem {
    id: number;
    name: string;
    category: FoodCategory;
    price: number;
    isAvailable: boolean;
}

// Address
interface Address {
    city: string;
    area: string;
}

// Basic customer
interface Customer {
    id: number;
    name: string;
    phone?: string;
    address: Address;
}

// Guest customer
interface Guest extends Customer {
    customerType: "guest";
}

// Member customer
interface Member extends Customer {
    customerType: "member";
    membershipId: string;
    discountPercentage: number;
    membershipLevel: "silver" | "gold" | "platinum";
}

// Guest OR Member
type CustomerType = Guest | Member;

// Extra information for cart
interface OrderInformation {
    quantity: number;
    specialInstruction?: string;
}

// FoodItem + OrderInformation
type CartItem = FoodItem & OrderInformation;

// Cash payment
interface CashPayment {
    method: "cash";
    receivedAmount: number;
}

// Card payment
interface CardPayment {
    method: "card";
    last4Digits: string;
}

// UPI payment
interface UpiPayment {
    method: "upi";
    transactionId: string;
}

// Cash OR Card OR UPI
type Payment = CashPayment | CardPayment | UpiPayment;

// Successful bill
interface SuccessBill {
    status: "success";
    orderId: number;
    customer: CustomerType;
    cartItems: CartItem[];
    subtotal: number;
    discount: number;
    tax: number;
    finalAmount: number;
    payment: Payment;
}

// Error bill
interface ErrorBill {
    status: "error";
    message: string;
}

// Success OR Error
type BillResult = SuccessBill | ErrorBill;

// This function helps check all cases
function assertNever(value: never): never {
    throw new Error(`Unhandled value: ${value}`);
}

export {
    FoodCategory,
    OrderStatus,
    FoodItem,
    Address,
    Customer,
    Guest,
    Member,
    CustomerType,
    OrderInformation,
    CartItem,
    CashPayment,
    CardPayment,
    UpiPayment,
    Payment,
    SuccessBill,
    ErrorBill,
    BillResult,
    assertNever
};