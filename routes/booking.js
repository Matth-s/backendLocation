const express = require("express");
const router = express.Router();
const bookingCtrl = require("../controllers/booking");

router.get("/", bookingCtrl.getBooking);
router.post("/addDate", bookingCtrl.addBookingDateToMaterial);
router.post("/createBooking", bookingCtrl.createBooking);

module.exports = router;
