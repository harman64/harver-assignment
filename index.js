import { blendImages, saveCombinedImage } from "./utils/blendImg.mjs";
import { catSays } from "./utils/cataas.mjs";
import minimist from "minimist";

let argv = minimist(process.argv.slice(2));

let {
  greeting = "Hello",
  who = "You",
  width = 400,
  height = 500,
  color = "Pink",
  size = 100,
} = argv;

const init = async () => {
  try {
    const firstImage = await catSays({
      text: greeting,
      width,
      height,
      color,
      size,
    });
  
    const secondImage = await catSays({ text: who, width, height, color, size });
  
    const combinedimages = await blendImages({
      firstImage,
      secondImage,
      width,
      height,
    });
  
    await saveCombinedImage(combinedimages);
  } catch (err) {
    console.error(err);
  }
};

// bootstrapping the app
init();
