import { CustomerType } from "./types";

// Create a guest
function createGuest(
    id: number,
    name: string,
    phone: string | undefined,
    city: string,
    area: string
): CustomerType {

    return {
        id: id,
        name: name,
        phone: phone,
        address: {
            city: city,
            area: area
        },
        customerType: "guest"
    };
}

// Create a member
function createMember(
    id: number,
    name: string,
    phone: string | undefined,
    city: string,
    area: string,
    membershipId: string,
    membershipLevel: "silver" | "gold" | "platinum"
): CustomerType {

    let discountPercentage = 0;

    if (membershipLevel === "silver") {
        discountPercentage = 5;
    } else if (membershipLevel === "gold") {
        discountPercentage = 10;
    } else if (membershipLevel === "platinum") {
        discountPercentage = 15;
    }

    return {
        id: id,
        name: name,
        phone: phone,
        address: {
            city: city,
            area: area
        },
        customerType: "member",
        membershipId: membershipId,
        discountPercentage: discountPercentage,
        membershipLevel: membershipLevel
    };
}

export {
    createGuest,
    createMember
};