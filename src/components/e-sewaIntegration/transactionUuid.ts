function generateTransactionUUID(): string {
    // Generate random numbers for the transaction UUID parts
    const part1 = Math.floor(Math.random() * 100);  // Random number between 0 and 99
    const part2 = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    const part3 = Math.floor(Math.random() * 100);  // Random number between 0 and 99

    // Format the transaction UUID as "XX-XXX-XX"
    return `${part1}-${part2}-${part3}`;
}

export default generateTransactionUUID;
