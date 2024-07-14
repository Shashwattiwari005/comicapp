import { supabase } from "./supabase";

export async function storeComicData(
  { comicTitle }: any,
  { description }: any,
  { storyLines }: any,
  { imageUrls }: any
) {
  try {
    // 1. Insert comic data into the "comics" table
    const { data, error } = await supabase.from("comics").insert({
      title: comicTitle,
      description: description,
    });

    if (error) {
      throw new Error("Error creating comic: " + error.message);
    }

    //@ts-ignore
    const comicId = data[0].id; // Get the ID of the created comic

    // 2. Insert comic page data into the "comic_pages" table
    //@ts-ignore
    const pageData = storyLines.map((line, index) => {
      return {
        comic_id: comicId,
        page_number: Math.floor(index / 7), // Calculate page number
        panel_1_url: imageUrls[index] || null, // Assign image URL or null
        caption_1: line,
      };
    });

    const { data: pageResults, error: pageError } = await supabase
      .from("comic_pages")
      .insert(pageData);

    if (pageError) {
      throw new Error("Error creating comic pages: " + pageError.message);
    }

    console.log("Comic data stored successfully!");
  } catch (error) {
    console.error("Error storing comic data:", error);
  }
}
