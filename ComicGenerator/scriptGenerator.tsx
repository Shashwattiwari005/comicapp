"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Groq from "groq-sdk";
import React, { useState } from "react";
import ScriptLines from "./scriptLines";
import { useAppContext } from "../context/context";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ScriptGenerator() {
  const [title, setTitle] = useState("");
  const { scriptLines, setScriptLines } = useAppContext(); // Stores script lines

  function Query() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `give me a story for kids in lines with title : ${title} , it should not contain the title or any other text , there should only be paragraph of the story with minimum 300 words. Also the lines should be separated by full stop. it should not contain any text like here is your story etc give me only text of the story`,
        },
      ],
      model: "llama3-8b-8192",
    });
  }

  async function GetScript() {
    const response = await Query();
    const storyText = response.choices[0].message.content;

    // Separate story into lines based on full stops (periods)
    const lines = storyText!.split(".");

    // Remove empty lines and potential double periods
    const scriptLines = lines
      .filter((line: string) => line.trim() !== "")
      .map((line: string) => line.trim());

    setScriptLines(scriptLines); // Update state with script lines

    console.log(response.choices[0].message.content);
  }

  const handleTitleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <h1>{title}</h1>
      <Input
        value={title}
        required
        placeholder="Plot of the story"
        onChange={handleTitleChange}
      />
      <Button onClick={GetScript}>Submit</Button>
      <div>
        <h2>Script Lines:</h2>
        <ScriptLines />
      </div>
    </div>
  );
}
