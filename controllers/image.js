const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../db/config");

exports.postImage = async (req, res, next) => {
  try {
    const { dataMaterialId } = req.body;
    const { image } = req.body;

    console.log(image.path);

    const imageRef = ref(
      storage,
      `material/${dataMaterialId}/${image.name.replaceAll(" ", "")}`
    );

    const newMetadata = {
      contentType: "image/jpeg",
    };

    const fileContent = new Blob([image]);

    await uploadBytes(imageRef, fileContent, newMetadata);

    // Obtenir l'URL de téléchargement de l'image
    const downloadUrl = await getDownloadURL(imageRef);

    // Envoyer l'URL de téléchargement en réponse
    res.status(200).json(downloadUrl);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors du téléchargement de l'image." });
  }
};

exports.deleteImage = async (req, res) => {};
