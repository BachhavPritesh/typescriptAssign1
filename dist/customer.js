"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuest = createGuest;
exports.createMember = createMember;
// Create a guest
function createGuest(id, name, phone, city, area) {
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
function createMember(id, name, phone, city, area, membershipId, membershipLevel) {
    let discountPercentage = 0;
    if (membershipLevel === "silver") {
        discountPercentage = 5;
    }
    else if (membershipLevel === "gold") {
        discountPercentage = 10;
    }
    else if (membershipLevel === "platinum") {
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
