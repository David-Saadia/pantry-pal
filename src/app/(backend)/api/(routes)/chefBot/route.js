import {supabase} from "@/lib/supabaseClient";
import {checkRateLimit} from "@/lib/rateLimiter";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prompt=""; //to be added

export async function POST (request){
    const {data:{user}}=await supabase.auth.getUser();

    const rateLimitResult=checkRateLimit(user?.id);
    if (!rateLimitResult.allowed){
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { 'Retry-After': rateLimitResult.retryAfter } });
    }
    //TO DO : add gemini api call to generate a response for a recipe.
    //it should include the ingredients we have in my fridge
    //should have an image,image alt,,title, short description, cook time,servings, prep time, instructions
    //in the front - add the option to save the recipe to my favorites
}