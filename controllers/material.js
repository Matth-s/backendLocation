const admin = require("../db/config");
const { v4: uuidv4 } = require("uuid");

exports.getAllData = async (req, res, next) => {
  try {
    const firestore = admin.firestore();
    const querySnapshot = await firestore.collection("material").get();
    const data = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.postMaterial = async (req, res) => {
  const { material } = req.body;

  try {
    const firestore = admin.firestore();
    const collectionRef = firestore.collection("material");

    const querySnapshot = await collectionRef.get();

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.id === material.id) {
        material.id = uuidv4();
      }
    });

    await collectionRef.doc(material.id).set(material);

    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.getDataById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const firestore = admin.firestore();
    const collectionRef = firestore.collection("material");

    const querySnapshot = await collectionRef.get();
    const matchingData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.id === id) {
        matchingData.push(data);
      }
    });

    if (matchingData.length > 0) {
      res.status(200).json(matchingData);
    } else {
      res.status(404).json({ message: "Aucun objet ne correspond à cet ID" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.deleteDataById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const firestore = admin.firestore();
    const collectionRef = firestore.collection("material");

    const querySnapshot = await collectionRef.where("id", "==", id).get();

    if (querySnapshot.empty) {
      res.status(404).json({ message: "Aucun objet ne correspond à cet ID" });
      return;
    }

    querySnapshot.forEach(async (doc) => {
      await collectionRef.doc(doc.id).delete();
    });

    res.status(200).json({ message: "Objet supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { material } = req.body;
  try {
    const firestore = admin.firestore();
    const collectionRef = firestore.collection("material");

    const querySnapshot = await collectionRef.where("id", "==", id).get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: "Aucun objet ne correspond à cet ID" });
    }

    querySnapshot.forEach(async (doc) => {
      await collectionRef.doc(doc.id).set(material, { merge: true });
    });

    return res.status(200).json(material);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du Material" });
  }
};
