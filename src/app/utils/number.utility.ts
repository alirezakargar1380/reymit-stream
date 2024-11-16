export const random_auth_code = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

export const random_ticket_code = () => {
    return Math.floor(10000 + Math.random() * 90000);
}