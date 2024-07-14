/* eslint-disable @next/next/no-img-element */
import Replicate from "replicate";

export async function generateImage(caption: string): Promise<string> {
  /* const apiKey = process.env.NEXT_PUBLIC_REPLICATE_API_KEY; // Replace with your actual key
  const modelUrl = "https://replicate.com/lucataco/dreamshaper-xl-turbo/api"; // Replace with your model URL

  const response = await fetch(modelUrl, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: caption }),
  });

  const data = await response.json();
  return data.generated_images[0];  */ // Assuming the first image is desired

  const replicate = new Replicate();

  const input = {
    prompt: caption,
    negative_prompt: "real , noisy , 3d ",
  };

  const output: RunOutput = await replicate.run(
    "lucataco/dreamshaper-xl-turbo:0a1710e0187b01a255302738ca0158ff02a22f4638679533e111082f9dd1b615",
    { input }
  );

  return (
    <div>
      <img src={output.generated_images[0]} alt={caption} />
      <p>{caption}</p>
    </div>
  );
}
