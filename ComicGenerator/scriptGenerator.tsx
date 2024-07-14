/* "use client";
import React, { useContext, useState } from "react";
import {
  AppContext,
  AppContextProvider,
  useAppContext,
} from "../context/context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Groq from "groq-sdk";
import { storeComicData } from "../Supabase/storeComicData";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ScriptGenerator() {
  const [title, setTitle] = useState("");

  function Query() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `give me a story in lines with title : ${title}`,
        },
      ],
      model: "llama3-8b-8192",
    });
  }

  async function GetScript() {
    const response = await Query();

    console.log(response.choices[0].message.content);

    await storeComicData(title, "", storyLines, imageUrls);
  }

  const handleTitleChange = (event: { target: { value: string } }) => {
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
    </div>
  );
}
 */

"use client";
import React, { useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Groq from "groq-sdk";
import processScript from "./lineSeparator"; // Assuming lineSeparator.js in same directory
import { generateImage } from "./replicate"; // Assuming replicate.js in same directory
import { storeComicData } from "../Supabase/storeComicData";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ScriptGenerator() {
  const [title, setTitle] = useState("");
  const [storyLines, setStoryLines] = useState([]); // To store processed lines
  const [imageUrls, setImageUrls] = useState([]); // To store image URLs

  // Replace this function with your actual script generation logic
  // This example retrieves a pre-defined script (modify as needed)
  function Query() {
    const script = `This is a pre-defined script for demonstration purposes. 
                      Replace this with your logic to generate a script based on the title.`;
    return script;
  }

  async function GetScript() {
    const script = Query();

    // Process the script into lines
    //@ts-ignore
    const processedLines = processScript(script);
    //@ts-ignore
    setStoryLines(processedLines);

    // Generate images for each line (consider asynchronous approach)
    const imageUrls = [];
    for (const line of processedLines) {
      //@ts-ignore
      const image = await generateImage(line);
      imageUrls.push(image);
    }
    //@ts-ignore
    setImageUrls(imageUrls);

    // Store comic data in Supabase
    await storeComicData(title, "", storyLines, imageUrls);
  }

  //@ts-ignore
  const handleTitleChange = (event) => {
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
    </div>
  );
}
