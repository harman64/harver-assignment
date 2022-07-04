import blend from "@mapbox/blend";
import { promises as fs } from "fs";
import { join } from "path";

const getPromisifiedCallback = (resolve, reject) =>
  function callback(err, combineImages) {
    if (err) {
      return reject(err);
    }

    resolve(combineImages);
  };

export const blendImages = async ({
  firstImage,
  secondImage,
  width,
  height,
}) => {
  return new Promise((resolve, reject) => {
    const imagesToBlend = [
      { buffer: firstImage, x: 0, y: 0 },
      { buffer: secondImage, x: width, y: 0 },
    ];
    const options = { width: width * 2, height, format: "jpeg" };

    blend(imagesToBlend, options, getPromisifiedCallback(resolve, reject));
  });
};

export const saveCombinedImage = async (data) => {
  try {
    const fileOut = join(process.cwd(), `/cat-card.jpg`);
    await fs.writeFile(fileOut, data);

    console.log("The file was saved!");
  } catch (err) {
    throw new Error(err);
  }
};
