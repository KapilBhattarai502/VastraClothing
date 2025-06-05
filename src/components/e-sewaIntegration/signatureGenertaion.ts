export async function generateSignature(secretKey: string, data: string): Promise<string> {
    // Convert secretKey and data to Uint8Array
    const key = new TextEncoder().encode(secretKey);  // Encoding the secret key
    const message = new TextEncoder().encode(data);   // Encoding the data string

    // Create a crypto key from the secret key
    const cryptoKey = await crypto.subtle.importKey(
        "raw",                    // Raw key material
        key,                      // The secret key as Uint8Array
        { name: "HMAC", hash: "SHA-256" }, // HMAC with SHA-256
        false,                    // Non-exportable key
        ["sign"]                  // Allowed operation is sign
    );

    // Sign the message
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, message);

    // Convert the signature to a Base64 string
    const base64Signature = arrayBufferToBase64(signature);

    return base64Signature;
}

// Utility function to convert an ArrayBuffer to a Base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const uint8Array = new Uint8Array(buffer);
    let binary = '';
    uint8Array.forEach((byte) => binary += String.fromCharCode(byte));
    return btoa(binary);
}


