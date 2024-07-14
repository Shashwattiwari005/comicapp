import Groq from "groq-sdk";
import { AppContext, useAppContext } from "../context/context";
import { useContext } from "react";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export function Query() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `give me a story with title : ${title}`,
      },
    ],
    model: "llama3-8b-8192",
  });
}

export async function GetScript() {
  const response = await Query();

  console.log(response);
}
