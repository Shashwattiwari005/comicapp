import { generateImage } from "./replicate";

interface StoryLine {
  text: string;
}

interface ComicPage {
  panels: Panel[];
}

interface Panel {
  image: string; // URL of the generated image
  caption: string; // Line from the story
}

function processStoryLines(storyLines: StoryLine[]): ComicPage[] {
  const comicPages: ComicPage[] = [];
  let currentPanel: Panel | undefined = undefined;
  let currentPage: ComicPage = { panels: [] };

  for (const line of storyLines) {
    // Check if a new page is needed
    if (!currentPanel || currentPage.panels.length >= 6) {
      currentPanel = undefined;
      comicPages.push(currentPage);
      currentPage = { panels: [] };
    }

    currentPanel = { image: "", caption: line.text };
    currentPage.panels.push(currentPanel);

    const updatePanel = async () => {
      const image = await generateImage(line.text);
      currentPanel = { image, caption: line.text };
      currentPage.panels.push(currentPanel);
    };

    updatePanel();
  }

  // Add the last page if not empty
  if (currentPage.panels.length > 0) {
    comicPages.push(currentPage);
  }

  return comicPages;
}

export default processStoryLines;
