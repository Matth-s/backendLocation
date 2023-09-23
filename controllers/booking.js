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
        materialName: encryptedData.materialName,
        materialId: encryptedData.materialId,
        bookingDate: encryptedData.bookingDate,
        id: encryptedData.id,
        email: decryptData(encryptedData.email),
        downPayment: encryptedData.downPayment,
        downPaymentIsPaid: encryptedData.downPaymentIsPaid,
        total: encryptedData.total,
        totalIsPaid: encryptedData.totalIsPaid,
        isCompleted: encryptedData.isCompleted,
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
    return res.status(500).json({ message: "Erreur interne" });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { reservation } = req.body;

    if (!authorization) {
      return res.status(401).json("Unauthorized");
    }

    const checkToken = await verifyToken(authorization);

    if (!checkToken) {
      return res.status(401).json("Unauthorized");
    }

    const firestore = admin.firestore();
    const bookingCollection = firestore.collection("bookings");

    const newBookingId = uuidv4();

    const encryptedReservation = {
      id: newBookingId,
      address: encryptData(reservation.address),
      city: encryptData(reservation.city),
      email: encryptData(reservation.email),
      firstName: encryptData(reservation.firstName),
      lastName: encryptData(reservation.lastName),
      phone: encryptData(reservation.phone),
      bookingDate: reservation.bookingDate,
      materialName: reservation.materialName,
      downPayment: reservation.downPayment,
      downPaymentIsPaid: reservation.downPaymentIsPaid,
      total: reservation.total,
      totalIsPaid: reservation.totalIsPaid,
      materialId: reservation.materialId,
      isCompleted: reservation.isCompleted,
    };

    await bookingCollection.doc(newBookingId).set(encryptedReservation);

    const reservationDecrypt = {
      id: newBookingId,
      address: reservation.address,
      city: reservation.city,
      email: reservation.email,
      firstName: reservation.firstName,
      lastName: reservation.lastName,
      phone: reservation.phone,
      bookingDate: reservation.bookingDate,
      materialName: reservation.materialName,
      materialId: reservation.materialId,
      downPayment: reservation.downPayment,
      downPaymentIsPaid: reservation.downPaymentIsPaid,
      total: reservation.total,
      totalIsPaid: reservation.totalIsPaid,
      isCompleted: reservation.isCompleted,
    };

    res.status(201).json(reservationDecrypt);
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne" });
  }
};

exports.deleteBooking = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

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
    const querySnapshot = await bookingCollection.where("id", "==", id).get();

    if (querySnapshot.empty) {
      res.status(404).json({ message: "Aucun objet ne correspond à cet ID" });
      return;
    }

    querySnapshot.forEach(async (doc) => {
      await bookingCollection.doc(doc.id).delete();
    });

    res.status(204).json({ message: "Réservation supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur interne" });
  }
};

exports.updateDate = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { date } = req.body;

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

    const updatedBookingDate = currentBookingDate.filter(
      (item) => !date.includes(item)
    );

    await docRef.update({ bookingDate: updatedBookingDate });

    const updatedDoc = await docRef.get();

    res.status(201).json(updatedDoc.data());
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne" });
  }
};

exports.markAsCompleted = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  if (!authorization) {
    return res.status(401).json("Unauthorized");
  }

  const checkToken = await verifyToken(authorization);

  if (!checkToken) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const firestore = admin.firestore();
    const materialBooking = firestore.collection("bookings");
    const docRef = materialBooking.doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: "Aucun objet ne correspond à cet ID" });
    }

    docRef.update({ isCompleted: true });

    const encryptedData = doc.data();

    const decryptedData = {
      firstName: decryptData(encryptedData.firstName),
      lastName: decryptData(encryptedData.lastName),
      address: decryptData(encryptedData.address),
      city: decryptData(encryptedData.city),
      phone: decryptData(encryptedData.phone),
      materialName: encryptedData.materialName,
      materialId: encryptedData.materialId,
      bookingDate: encryptedData.bookingDate,
      id: encryptedData.id,
      email: decryptData(encryptedData.email),
      downPayment: encryptedData.downPayment,
      downPaymentIsPaid: encryptedData.downPaymentIsPaid,
      total: encryptedData.total,
      totalIsPaid: encryptedData.totalIsPaid,
      isCompleted: true,
    };

    res.status(201).json(decryptedData);
  } catch (error) {
    return res.status(500).json({ message: "Erreur interne" });
  }
};
