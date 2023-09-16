const admin = require("../db/config");
const { v4: uuidv4 } = require("uuid");
const verifyToken = require("../middleware/decodeToken");
const { encryptData, decryptData } = require("../middleware/Crypto");

exports.getBooking = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Unauthorized");
  }

  const checkToken = await verifyToken(authorization);

  if (!checkToken) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const firestore = admin.firestore();
    const querySnapshot = await firestore.collection("bookings").get();
    const data = [];

    querySnapshot.forEach((doc) => {
      const encryptedData = doc.data();

      const decryptedData = {
        firstName: decryptData(encryptedData.firstName),
        lastName: decryptData(encryptedData.lastName),
        address: decryptData(encryptedData.address),
        city: decryptData(encryptedData.city),
        phone: decryptData(encryptedData.phone),
        name: encryptedData.name,
        bookingDate: encryptedData.bookingDate,
        id: encryptedData.id,
        email: decryptData(encryptedData.email),
      };

      data.push(decryptedData);
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addBookingDateToMaterial = async (req, res) => {
  const { id, date } = req.body;
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Unauthorized");
  }

  const checkToken = await verifyToken(authorization);

  if (!checkToken) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const firestore = admin.firestore();
    const materialCollection = firestore.collection("material");
    const docRef = materialCollection.doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: "Aucun objet ne correspond à cet ID" });
    }

    const currentBookingDate = doc.data().bookingDate || [];
    const updatedBookingDate = [...currentBookingDate, ...date];

    await docRef.update({ bookingDate: updatedBookingDate });

    const updatedDoc = await docRef.get();

    res.status(201).json(updatedDoc.data());
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne" });
  }
};

exports.createBooking = async (req, res) => {
  const { authorization } = req.headers;
  const { reservation, name } = req.body;

  if (!authorization) {
    return res.status(401).json("Unauthorized");
  }

  const checkToken = await verifyToken(authorization);

  if (!checkToken) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const firestore = admin.firestore();
    const bookingCollection = firestore.collection("bookings");

    // Générez un nouvel ID avec uuidv4
    let newBookingId;
    let isUnique = false;

    // Répétez la génération jusqu'à obtenir un ID unique
    while (!isUnique) {
      newBookingId = uuidv4();

      // Vérifiez si l'ID généré est déjà utilisé
      const existingDoc = await bookingCollection.doc(newBookingId).get();
      if (!existingDoc.exists) {
        isUnique = true;
      }
    }

    // Chiffrez les données sensibles avant de les stocker
    const encryptedReservation = {
      id: newBookingId,
      address: encryptData(reservation.address),
      city: encryptData(reservation.city),
      email: encryptData(reservation.email),
      firstName: encryptData(reservation.firstName),
      lastName: encryptData(reservation.lastName),
      phone: encryptData(reservation.phone),
      bookingDate: reservation.bookingDate,
      name: name,
    };

    await bookingCollection.doc(newBookingId).set(encryptedReservation);

    res.status(201).json(encryptedReservation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne" });
  }
};
