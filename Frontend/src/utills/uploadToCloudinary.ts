// utils/uploadToCloudinary.ts
export const uploadToCloudinary = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Ranaswanu'); // 🔁 Replace
    formData.append('cloud_name', 'dfpv0ncdq'); // 🔁 Replace

    const res = await fetch(`https://api.cloudinary.com/v1_1/dfpv0ncdq/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    urls.push(data.secure_url);
  }

  return urls;
};
