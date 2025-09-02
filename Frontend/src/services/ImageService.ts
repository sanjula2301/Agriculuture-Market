export class ImageService {
  static async uploadImages(files: File[]): Promise<string[]> {
    const urls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Ranaswanu"); 
      formData.append("cloud_name", "dfpv0ncdq"); 

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfpv0ncdq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      urls.push(data.secure_url);
    }

    return urls;
  }
}

