import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// get specific post
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");

        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch prompts", { status: 500 });
    }
};

// patch (update) specific post
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 });
    }
};

// delete specific post
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findByIdAndDelete(params.id);

        return new Response(
            "Delete success", 
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            "Failed to delete prompt", 
            { status: 500 }
        );
    }
};
