"use strict";

const { default: axios } = require("axios");
// const { mongoose } = require("../configs/dbConnection");
const CustomError = require("../errors/customError");
/* -------------------------------------------------------------------------- */
/*                             airline Controller                            */
/* -------------------------------------------------------------------------- */

module.exports.airline = {
  getAirline: async (req, res) => {
    /*
            #swagger.tags = ["Airlines"]
            #swagger.summary = "Get Airline"
            #swagger.Airlines = `
                Get Airline!</br>
                Gets data from schiphol api and returns it!</br></br>
                <b>Permission= No permission</b></br>   
                 
            `

            #swagger.responses[200] = {
            description: 'Successfully Listed!',
                schema: { 
                    error: false,
                    message: "Airline is found!",
                    data: [{$ref: '#/definitions/Airline'}] 
                }
            }

            #swagger.responses[400] = {
            description:`Bad request - Invalid iata length! ( required length: 2)!`
            }


        */

    //destruct the iata
    const { iata } = req.params;

    //check if the iata is valid
    if (iata.length !== 2) {
      throw new CustomError(`Invalid iata length! ( required length: 2)!`, 400);
    }

    //make the request to schiphol api with the iata and get the airline data
    const response = await axios.get(
      process.env.SCHIPHOL_URL + "/airlines/" + iata,
      {
        headers: {
          app_id: process.env.SCHIPHOL_APP_ID,
          app_key: process.env.SCHIPHOL_APP_KEY,
          ResourceVersion: process.env.SCHIPHOL_RESOURCE_VERSION,
          Accept: "application/json",
          "Cache-Control": "max-age=60", //1 minute cache is activated
        },
      }
    );

    //result
    res.set("Cache-Control", "public, max-age=60"); // 1 minute cache
    res.json({
      error: false,
      message: `Airline is found!`,
      data: response?.data,
    });
  },
};
