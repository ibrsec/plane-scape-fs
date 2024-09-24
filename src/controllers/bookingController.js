"use strict";

const { mongoose } = require("../configs/dbConnection");
const CustomError = require("../errors/customError");
const sendMail = require("../helpers/sendMail");
const {
  idTypeValidationOr400,
  mustRequirementOr400,
  isExistOnTableOr404,
  urlValidation,
  partialRequirementOr400,
  lengthValidationOr400,
  isUniqueOnTableOr409,
} = require("../helpers/utils");
/* -------------------------------------------------------------------------- */
/*                             Booking Controller                            */
/* -------------------------------------------------------------------------- */

const { Booking } = require("../models/bookingModel");
const { User } = require("../models/userModel");

module.exports.booking = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Bookings"]
            #swagger.summary = "List all Bookings"
            #swagger.description = `
                List all Bookings!</br>
                - Admin can list all bookings</br>
                - Users can list just own bookings</br>
                </br>
                <b>Permission= Loginned user</b></br>   
                You can send query with endpoint for filter[],search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `


            #swagger.parameters['filter[]'] = {
                    in: 'query',       
                    description: 'url?filter[fieldName]=value'                        
            }
            #swagger.parameters['search[]'] = {
                    in: 'query',    
                    description: 'url?search[fieldName]=value'                      
            }
            #swagger.parameters['sort[]'] = {
                    in: 'query',
                    description: 'url?sort[fieldName]=desc(or asc)'                          
            }
            #swagger.parameters['page'] = {
                    in: 'query',              
                    description: 'url?page=1'               
            }
            #swagger.parameters['limit'] = {
                    in: 'query',     
                    description: 'url?limit=20'                        
            }

            #swagger.responses[200] = {
            description: 'Successfully Listed!',
                schema: { 
                    error: false,
                    message: "Your Bookings are listed!",
                    details: {},
                    avgFare: 300 ,
                    data:{$ref: '#/definitions/Booking'} 
                }
            }


        */
    console.log(req.user);
    //check who is asking
    let customFilters = { userId: req.user._id };
    if (req.user?.isAdmin) {
      customFilters = {};
    }

    //get bookings
    const bookings = await res.getModelList(Booking, customFilters, [
      { path: "userId", select: "username fullName" },
    ]);

    //avg fare calculation
    const allBookings = await Booking.find();
    const avgFare = (
      allBookings.reduce((acc, booking) => acc + booking?.price, 0) /
      allBookings.length
    ).toFixed(1);

    // return result
    res.json({
      error: false,
      message: req.user.isAdmin
        ? "All Bookings are listed!"
        : `Your Bookings are listed!`,
      details: await res.getModelListDetails(Booking, customFilters),
      avgFare,
      data: bookings,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Bookings"]
            #swagger.summary = "Get a Booking"
            #swagger.description = `
                Get a Booking by booking id(ObjectId)!</br>
                - Admin can list all bookings</br>
                - Users can list just own bookings</br></br>
                <b>Permission= Loginned user</b></br>  
            `
            #swagger.responses[200] = {
            description: 'Successfully Found!',
                schema: { 
                    error: false,
                    message: "Booking is found!",
                    data:{$ref: '#/definitions/Booking'} 
                }
            }

            #swagger.responses[400] = {
            description:`Bad request - Invalid param Id type! (it Should be ObjectId)!`
            }

            #swagger.responses[404] = {
            description:`Not found - Booking not found!`
            }

        */

    //id check if it is a valid mongoose object id
    idTypeValidationOr400(
      req.params.id,
      "Invalid param Id type! (it Should be ObjectId)"
    );

    //check who is asking
    let customFilters = { userId: req.user._id };
    if (req.user?.isAdmin) {
      customFilters = {};
    }

    //search the booking
    const booking = await isExistOnTableOr404(
      Booking,
      { _id: req.params.id, ...customFilters },
      "Booking not found!"
    );

    //Responds with a JSON object containing information about a found booking.
    res.json({
      error: false,
      message: `Booking is found!`,
      data: booking,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Bookings"]
            #swagger.summary = "Create Booking"
            #swagger.description = `
                Create a Booking!</br></br>
                <b>Permission= Loginned user</b></br></br>
                - userId should exist on users(comes with login)</br>   
                - flightDirection value should be 'D'(department)</br> 
                - flightClass enum : ['Economy', 'Premium Economy','Business','First Class']</br> 
                - Price values should be sent according to the flight classes ->  : Economy: 100, Premium Economy: 200,Business: 500, First Class: 1000</br> 
                - prefixIATA ->  2 letter string</br> 
                - prefixICAO ->  3 letter string</br> 
                - route field ->  ['string'] -> array of string and it takes 3 letter string values</br> 
                - scheduleDateTime field ->  Date format</br>
                - Required fields :  userId(comes with login), flightId, flightDirection, flightNumber, flightName, flightClass, price, prefixIATA, prefixICAO, route, scheduleDateTime, destination, airline  </br>
                </br> 
            `

 


            #swagger.parameters['body']={
                in:'body',
                required:true,
                schema:{ 
                  $flightId: "140702903160460184",  
                  $flightNumber: 5358, 
                  $flightName: "HV5358", 
                  $destination: "example destination", 
                  $airline: "Example airline", 
                  $flightDirection: "D", 
                  $flightClass: 'Economy', 
                  $price: 100,
                  $prefixIATA: "HV", 
                  $prefixICAO: "TRA", 
                  $route: ['FAO'], 
                  $scheduleDateTime: "2024-09-22T01:05:00.000+02:00",  
                }
            }
            
            #swagger.responses[201] = {
            description: 'Successfully created!',
            schema: { 
                error: false,
                message: "Your flight has been successfully booked! You can view the details in your bookings!",
                data:{$ref: '#/definitions/Booking'} 
            }

        }   


            #swagger.responses[400] = {
            description:`Bad request: </br>
            - userId(comes with login), flightId, flightNumber, flightName, destination, airline flightDirection, flightClass, price, prefixIATA, prefixICAO, route, scheduleDateTime fields are required!</br> 
            - Invalid userId type(ObjectId)!</br> 
            - route field must be a array and at least contain one element!</br> 
            - All elements in the route field must be 3-letter strings!</br> 
            - scheduleDateTime is not a valid date!</br> 
            - Booking a flight for past dates is not allowed!</br> 
            - Booking is only allowed for departing flights! - flightDirection field value must be 'D'. )</br> 

            </br> 
            
            `
            } 
            #swagger.responses[404] = {
            description:`Not Found: </br>
            - userId not found on users!</br>  
            </br> 
            
            `
            } 


        */

    // Assigns the user ID from the request object to the userId property in the request body.
    req.body.userId = req.user._id;

    //remove some fields from payload
    delete req.body.scheduleDate;
    delete req.body.scheduleDate;
    delete req.body.createdAt;
    delete req.body.updatedAt;

    //destruct the payload
    const {
      flightId,
      flightNumber,
      flightName,
      prefixIATA,
      prefixICAO,
      route,
      scheduleDateTime,
      userId,
      flightDirection,
      flightClass,
      price,
      destination,
      airline,
    } = req.body;

    // Check if required fields are provided.
    mustRequirementOr400({
      flightId,
      flightNumber,
      flightName,
      prefixIATA,
      prefixICAO,
      route,
      scheduleDateTime,
      userId,
      flightDirection,
      flightClass,
      price,
      destination,
      airline,
    });

    // Checks if the provided userId is a valid MongoDB ObjectId.
    idTypeValidationOr400(userId, "Invalid userId type(ObjectId)!");

    //  Find user by their user ID and throw an error if the user is not found.
    const user = await isExistOnTableOr404(
      User,
      { _id: userId },
      "userId not found on users!"
    );

    //check flightDirection
    if (flightDirection !== "D") {
      throw new CustomError(
        "Booking is only allowed for departing flights! - flightDirection field value must be 'D'. )",
        400
      );
    }

    //prefixIATA length check
    lengthValidationOr400(prefixIATA, "prefixIATA", 2, 2);
    //prefixICAO length check
    lengthValidationOr400(prefixICAO, "prefixICAO", 3, 3);

    //route check
    if (!Array.isArray(route) || route.length < 1) {
      throw new CustomError(
        "route field must be a array and at least contain one element!",
        400
      );
    }

    //route elements length and type check
    if (!route.every((item) => typeof item === "string" && item.length === 3)) {
      throw new CustomError(
        "All elements in the route field must be 3-letter strings!",
        400
      );
    }

    //Date Chekcs and adjustments
    const scheduleDateTimeDate = new Date(scheduleDateTime);
    if (isNaN(scheduleDateTimeDate.getTime())) {
      throw new CustomError("scheduleDateTime is not a valid date!", 400);
    }

    //check if the flight date < today
    if (scheduleDateTimeDate < new Date()) {
      throw new CustomError(
        "Booking a flight for past dates is not allowed!",
        400
      );
    }

    console.log("scheduleDateTime", scheduleDateTime);
    console.log("scheduleDateTimeDate", scheduleDateTimeDate);
    console.log("new Date()", new Date());

    //adjust scheduleDate and scheduleTime and add to req.body
    req.body.scheduleDate = scheduleDateTimeDate.toISOString().split("T")[0];

    //adjust scheduleTime and add to req.body
    req.body.scheduleTime = scheduleDateTimeDate.toLocaleTimeString("en-GB", {
      hour12: false,
    });

    //find booking if the same booking is exist
    const booking = await isUniqueOnTableOr409(
      Booking,
      { flightId, userId },
      "You have already booked this flight. Duplicate bookings are not allowed!"
    );

    //create new booking
    const newBooking = await Booking.create(req.body);




    //send email settings!
   
      //find the email
      const email = user?.email;

        //send mail 
        sendMail(
          email,
          `Plane Scape - Flight Booking Confirmation - ${newBooking?.flightNumber} (${newBooking?.airline})`,
          `
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
      <div style="background-color: #004085; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Flight Booking Confirmed!</h1>
      </div>
      <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0;">Hi, ${user?.fullName},</p>
          <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 10px 0;">Your flight booking has been successfully confirmed!</p>
          <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-top: 20px;">
              <h2 style="margin: 0 0 10px; font-size: 20px;">Flight Details:</h2>
              <p style="margin: 5px 0;"><strong>Flight Number:</strong> ${newBooking?.flightName} (${newBooking?.flightNumber})</p>
              <p style="margin: 5px 0;"><strong>Airline:</strong> ${newBooking?.airline}</p>
              <p style="margin: 5px 0;"><strong>Destination:</strong> ${newBooking?.destination} (${newBooking?.route.join(', ')})</p>
              <p style="margin: 5px 0;"><strong>Flight Class:</strong> ${newBooking?.flightClass}</p>
              <p style="margin: 5px 0;"><strong>Price:</strong> $${newBooking?.price}</p>
              <p style="margin: 5px 0;"><strong>Scheduled Departure:</strong> ${new Date(newBooking?.scheduleDateTime).toLocaleString()}</p>
          </div> 
      </div>
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777777;">
          <p style="margin: 0;">If you have any questions or need to make changes to your booking, please contact us.</p>
          <p style="margin: 0;">Thank you for choosing our service, and we wish you a pleasant flight!</p>
          <p style="margin: 0;">Best regards,<br>Plane Scape</p>
      </div>
  </div>
  `
        );
    





    res.status(201).json({
      error: false,
      message:
        "Your flight has been successfully booked! You can view the details in your bookings and check your email for confirmation!",
      data: newBooking,
    });
  },

  delete: async (req, res) => {
    /*
        #swagger.tags = ["Bookings"]
        #swagger.summary = "Delete a Booking"
        #swagger.description = `
            Delete a Booking by booking id(ObjectId)!</br></br>
            <b>Permission= Loginned user</b></br>  
                - Users can delete just own bookings</br>
                - Admin user can delete all bookings</br>
                </br>
                
        `
        #swagger.responses[200] = {
        description: 'Successfully Deleted!',
            schema: { 
                error: false,
                message: "Booking is deleted!",
                data:{$ref: '#/definitions/Booking'} 
            }
        }

        #swagger.responses[400] = {
        description:`Bad request - Invalid param(booking) Id type! (it Should be ObjectId)!`
        }

        #swagger.responses[403] = {
          description:`Forbidden: </br>
              - You are not authorized to delete this booking!</br>  
  
          `
        }
        #swagger.responses[404] = {
        description:`Not found - Booking not found for deletion!`
        }
        #swagger.responses[500] = {
        description:`Something went wrong! - Booking is found! But it couldn't be deleted!`
        }

*/

    //param id validation check
    idTypeValidationOr400(
      req.params.id,
      "Invalid param (booking)Id type! (it Should be ObjectId)!"
    );

    //check if the booking is exist on collection
    const bookingData = await isExistOnTableOr404(
      Booking,
      { _id: req.params.id },
      "Booking not found for deletion!"
    );

    //users can delete just own bookings, admin can all of them
    const userId = req?.user?._id;
    if (!req?.user?.isAdmin) {
      if (userId != bookingData?.userId) {
        throw new CustomError(
          "Forbidden - You are not authorized to delete this booking!",
          403
        );
      }
    }

    //delete
    const { deletedCount } = await Booking.deleteOne({ _id: req.params.id });
    //check if booking is deleted
    if (deletedCount < 1) {
      throw new CustomError(
        "Something went wrong! - Booking is found! But it couldn't be deleted!",
        500
      );
    }

    // send success status for deletion
    res.sendStatus(204);
  },
};
