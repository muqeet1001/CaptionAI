 require('dotenv').config();
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
});

async function uploadImage(file, fileName) {
    try {
        const response = await imagekit.upload({ file, fileName });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Upload Error:", error.response || error);
        throw error;
    }
}

module.exports = { uploadImage };
