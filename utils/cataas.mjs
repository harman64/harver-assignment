import fetch from "node-fetch";

export const catSays = async ({ text, width, height, color, size }) => {
  try {
    const url = `https://cataas.com/cat/says/${text}`;
    const params = new URLSearchParams({
      width,
      height,
      color,
      size,
    });

    const res = await fetch(`${url}?${params}`, { encoding: "binary" });

    console.log("Received response with status:" + res.status);

    return res.buffer();
  } catch (err) {
    throw new Error(err);
  }
};
