/** Uploads an image to imgbb and returns its public URL. */
export async function uploadToImgbb(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_IMGBB_API_KEY is not configured");
  const body = new FormData();
  body.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || "Image upload failed");
  return json.data.display_url;
}
