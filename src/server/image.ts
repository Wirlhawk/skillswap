
import { put } from "@vercel/blob";

export const uploadImage = async ({ image }: { image: File }) => {
    try {
        const fileName = image.name;

        const blob = await put(fileName, image, {
            access: "public",
            token: "vercel_blob_rw_0jKs3gl06udpicra_fsxQIyynaIF0Q3hJUAmyy6kom54S0A",
        });

        return blob;
    } catch (error) {
        console.error(error);
        throw error;
    }
};