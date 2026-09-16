type FoodCategory = "pizza" | "burger" | "drink" | "dessert";

type OrderStatus =
    | "pending"
    | "confirmed"
    | "preparing"
    | "delivered"
    | "cancelled";

interface FoodItem {
    id: number;
    name: string;
    category: FoodCategory;
    price: number;
    isAvailable: boolean;
}

interface Address {
    city: string;
    area: string;
}

interface Customer {
    id: number;
    name: string;
    phone?: string;
    address: Address;
}

interface Guest extends Customer {
    customerType: "guest";
}

interface Member extends Customer {
    customerType: "member";
    membershipId: string;
    discountPercentage: number;
    membershipLevel: "silver" | "gold" | "platinum";
}

type CustomerType = Guest | Member;

interface OrderInformation {
    quantity: number;
    specialInstruction?: string;
}

type CartItem = FoodItem & OrderInformation;

interface CashPayment {
    method: "cash";
    receivedAmount: number;
}

interface CardPayment {
    method: "card";
    last4Digits: string;
}

interface UpiPayment {
    method: "upi";
    transactionId: string;
}

type Payment = CashPayment | CardPayment | UpiPayment;

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

interface ErrorBill {
    status: "error";
    message: string;
}

type BillResult = SuccessBill | ErrorBill;

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