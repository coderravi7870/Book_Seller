import {streamText} from 'ai'

import {createGoogleGenerativeAI} from "@ai-sdk/google"
import { initialMessage } from '@/lib/data';

const google = createGoogleGenerativeAI({
    apiKey : process.env.GOOGLE_API_KEY || "",
});

export const runtime = 'edge';

const generatedId = ()=> Math.random().toString(36).slice(2,15);

const buildGoogleGenAIPompt = (messages)=>[
    {
        id: generatedId(),
        role: "user",
        content: initialMessage.content,
    },
    ...messages.map((message)=>({
        id: message.id || generatedId(),
        role: message.role,
        content: message.content
    })),
]

export async function POST(request) {
    const {messages} = await request.json();

    const stream = await streamText({
        model:google("gemini-1.5-flash-latest"),
        messages: buildGoogleGenAIPompt(messages),
        temperature: 0.7,
    });

    // console.log(stream)

    return stream?.toDataStreamResponse();
}



