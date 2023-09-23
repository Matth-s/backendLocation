const express = require("express");
const router = express.Router();
const bookingCtrl = require("../controllers/booking");

router.get("/", bookingCtrl.getBooking);
router.post("/addDate", bookingCtrl.addBookingDateToMaterial);
router.post("/createBooking", bookingCtrl.createBooking);
router.delete("/deleteBooking/:id", bookingCtrl.deleteBooking);
router.put("/updateDate/:id", bookingCtrl.updateDate);
router.put("/markAsCompleted/:id", bookingCtrl.markAsCompleted);

module.exports = router;
