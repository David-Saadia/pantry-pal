import { GoogleGenerativeAI } from "@google/generative-ai";


const prompt =`You are an expert receipt-reading AI. Your task is to analyze the provided image of a grocery receipt and extract only the food and grocery items purchased.
Follow these rules strictly:
1.Identify and list only the purchasable grocery items.
2.CRITICAL: Extract the item's core NAME only.
EXCLUDE all quantities (e.g., '2x', '3 units', 'x5').
EXCLUDE all weights (e.g., '1kg', '500g', '1.5lb').
EXCLUDE all volumes (e.g., '2L', '750ml').
EXCLUDE any other measurement, price, or count.
SUM duplicates (example : if the receipt has a couple of 3 rows of tuna, sum it to 3 tuna).

HANDLING RETURNS/REFUNDS (Items with NEGATIVE prices indicated by minus sign "-"):
- If an item has a NEGATIVE price (e.g., "-$5.99" or "-5.99"), it represents a RETURN or REFUND.
- You MUST check if there is a matching item with a POSITIVE price for the SAME item name.
- If YES (negative price matches a positive price for the same item): EXCLUDE BOTH from the final list - they cancel each other out.
- If NO (negative price with no matching positive price): EXCLUDE ONLY the negative item - do NOT include it in the final list.
- NEVER include returned/refunded items in your output.

Example Scenarios:
Scenario 1 (Cancellation):
Receipt shows: "Milk $4.99" and "Milk -$4.99"
Result: Exclude BOTH. Do NOT include "Milk" in the output.

Scenario 2 (Standalone Refund):
Receipt shows: "Bread -$3.50" (no matching positive price for Bread)
Result: Exclude the refund. Do NOT include "Bread" in the output.

Scenario 3 (Multiple with one refund):
Receipt shows: "Eggs $5.00", "Eggs $5.00", and "Eggs -$5.00"
Result: Include only ONE "Eggs" in the output (2 positive - 1 negative = 1 net purchase).

Scenario 4 (Discount - NOT a refund):
Receipt shows: "Cheese $6.99" and "Store Discount -$1.00" or "Member Savings -$2.00"
Result: Include "Cheese" in the output. IGNORE the discount line as it's not a product.

Example: If the receipt says "Organic Milk 2% 1.5L", you must extract only "Organic Milk 2%". If it says "Bananas 1.2kg", you must extract only "Bananas".
3.Translate: All item names MUST be in English. If a receipt item is in Hebrew (e.g., "מלפפון"), provide the English translation of its core name (e.g., "Cucumber").
4.Ignore: IGNORE all other information: store name, address, date, time, prices, discounts, taxes, totals, payment methods, and non-grocery items (e.g., 'Reusable Bag').
5.Format: Your entire output MUST be a single, valid JSON object.
6.Structure: The JSON object must have a single key named "ingredients". The value must be an array of strings (the extracted, normalized, and translated names).
7.No extra text: Do not add any summary, explanation, or conversational text before or after the JSON object.

    Example Output Format:
{
    "ingredients": [
    "Organic Milk",
    "Dozen Large Eggs",
    "Whole Wheat Bread",
    "Roma Tomatoes",
    "Avocado"
]
}`

export async function POST (request){
    try{
        //getting access to gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const { receipt } = await request.json();
        if (!receipt){
            return new Response(JSON.stringify({ error: "Image is required" }), { status: 400 });
        }

        //getting the data needed to send to gemini
        const base64Data = receipt.split(',')[1];
        const mimeType = receipt.match(/data:(.*?);/)?.[1] || 'image/jpeg';

        //choosing the model to use
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType
            }
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        let text = response.text();

        //gemini returns the object wrapped in another json object so we need to remove the outer one
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        console.log (text);
        return new Response(text, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    }catch (e) {
        console.error("Error analyzing image:", e);
        return new Response(JSON.stringify({ error: "Failed to analyze image", details: e.message }), { status: 500 });
    }
}