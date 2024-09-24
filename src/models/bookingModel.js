"use strict";

/* -------------------------------------------------------------------------- */
/*                               Booking Model                               */
/* -------------------------------------------------------------------------- */
 

const { mongoose } = require("../configs/dbConnection");
// const uniqueValidator = require("mongoose-unique-validator");

const flightClassPrices = {
  Economy: 100 ,
  'Premium Economy': 200 ,
  Business: 500 ,
  'First Class': 1000 
};

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flightId: {
      type: String,
      trim: true,
      required: true,
    },
    flightDirection: {
      type: String,
      trim: true,
      required: true,
      enum: ['D'],
    },
    flightNumber: {
      type: Number,
      trim: true,
      required: true,
    },
    flightName: {
      type: String,
      trim: true,
      required: true,
    }, 
    airline: {
      type: String,
      trim: true,
      required: true,
    }, 
    destination: {
      type: String,
      trim: true,
      required: true,
    }, 
    prefixIATA: {
      type: String,
      trim: true,
      required: true,
      maxLength: 2,
      minLength: 2,
    }, 
    prefixICAO: {
      type: String,
      trim: true,
      required: true,
      maxLength: 3,
      minLength: 3,
    },
    route: [
      {
        type: String,
        trim: true,
        required: true,
        maxLength: 3,
        minLength: 3
      },
    ],
    flightClass: {
      type: String,
      trim: true,
      required: true,
      enum: ['Economy', 'Premium Economy', 'Business', 'First Class']
    },
    price: {
      type: Number,
      required: true,
      //validate if the correct price is sended!
      validate: {
        validator: function (value) {
          return value === flightClassPrices[this.flightClass];
        },
        message: props => `Invalid price for the selected flight class! Expected prices list => Economy: 100, Premium Economy: 200, Business: 500, First Class: 1000`
      }
    },
    // scheduleDateTime: "2024-09-22T01:05:00.000+02:00",
    scheduleDateTime: {
      type: Date,
      required: true,
    },
    // scheduleDate: "2024-09-21",
    scheduleDate: {
      type: String,
      trim: true,
      required: true,
    },
    // scheduleTime: "00:35:00",
    scheduleTime: {
      type: String,
      trim: true,
      match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
    },
  },
  {
    collection: "bookings",
    timestamps: true,
  }
);

// BookingSchema.plugin(uniqueValidator, {
//   message: "This {PATH} is exist!(500)",
// });

module.exports.Booking = mongoose.model("Booking", BookingSchema);
