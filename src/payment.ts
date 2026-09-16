import { Payment, assertNever } from "./types";

function processPayment(payment: Payment, finalAmount: number): boolean {

    switch (payment.method) {

        case "cash":

            if (payment.receivedAmount >= finalAmount) {

                const change = payment.receivedAmount - finalAmount;

                console.log("Payment successful.");
                console.log("Change:", change);

                return true;
            }

            console.log("Not enough cash.");
            return false;


        case "card":

            console.log("Card payment successful.");
            console.log("Card ending:", payment.last4Digits);

            return true;


        case "upi":

            console.log("UPI payment successful.");
            console.log("Transaction ID:", payment.transactionId);

            return true;


        default:

            return assertNever(payment);
    }
}

export {
    processPayment
};