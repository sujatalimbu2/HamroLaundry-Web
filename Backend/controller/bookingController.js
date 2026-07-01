const {
    createBooking,
    createBookingItem,
} = require("../model/bookingModel");

const addBooking = async (req, res) => {

    try {

        const {
            user_id,
            basket,
            date,
            time,
            mode,
        } = req.body;

        if (
            !user_id ||
            !basket ||
            basket.length === 0 ||
            !date ||
            !time
        ) {
            return res.status(400).json({
                message: "Missing booking information"
            });
        }

        // Create booking
        const booking = await createBooking(
            user_id,
            date,
            time,
            mode
        );

        // Save every basket item
        for (const item of basket) {

            await createBookingItem(
                booking.id,
                item.name,
                item.option,
                item.qty
            );

        }

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    addBooking,
};