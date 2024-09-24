"use strict";

const { default: axios } = require("axios");
const CustomError = require("../errors/customError");
// const { mongoose } = require("../configs/dbConnection");
// const CustomError = require("../errors/customError");
/* -------------------------------------------------------------------------- */
/*                             flight Controller                            */
/* -------------------------------------------------------------------------- */

module.exports.flight = {
  list: async (req, res) => {
    /*
            #swagger.autoQuery = false
            #swagger.tags = ["Flights"]
            #swagger.summary = "List Flights"
            #swagger.description = `
                List all Flights!</br>
                Gets data from schiphol api and returns it!</br></br>
                <b>Permission= No permission</b></br>   </br> 
                You can send query with endpoint for date, direction, sort ,page.</br> 
                    date format: YYYY-MM-DD</br> 
                    direction format: enum -> ['A', 'D'] (Arrival, Department)</br> 
                    sort fields: scheduleDate(flight date), scheduleTime(flight time) </br> 
                        +field : ascending </br> 
                        -field : descending </br> </br> 
                <ul> Examples:
                    <li>URL/?<b>date=2024-09-21&direction=D</b></li>
                    <li>URL/?<b>direction=A&page=2</b></li>
                    <li>URL/?<b>date=2024-09-21&sort=+scheduleDate</b></li>
                    <li>URL/?<b>page=2&direction=A</b></li>
                </ul>
            `
            #swagger.parameters['page'] = {
                    in: 'query',                          
            }
            #swagger.parameters['sort'] = {
                    in: 'query',
                    description: '+scheduleDate, -scheduleTime'                           
            }
            #swagger.parameters['direction'] = {
                    in: 'query',    
                    description: 'D : Department, A : Arrival'                          
            }
            #swagger.parameters['date'] = {
                    in: 'query',     
                    description: 'YYYY-MM-DD'                     
            }
            
            
            #swagger.responses[200] = {
              description: 'Successfully Listed!',
              schema: { 
                  error: false,
                  message: "Flights are listed!",
                  data:[{$ref: '#/definitions/Flight'} ]
              }
            }

            #swagger.responses[204] = {
            description: 'No flights found!',
            }

            
        */

    //destruct the query params
    const { date, direction, sort, page } = req.query;

    //create a params obj for the request
    const params = {};
    params.page = page;
    if (date) params.scheduleDate = date;
    if (sort) params.sort = sort;
    if (direction) params.flightDirection = direction;

    //make the request to Schiphol API
    const response = await axios.get(process.env.SCHIPHOL_URL + "/flights", {
      headers: {
        app_id: process.env.SCHIPHOL_APP_ID,
        app_key: process.env.SCHIPHOL_APP_KEY,
        ResourceVersion: process.env.SCHIPHOL_RESOURCE_VERSION,
        Accept: "application/json",
        "Cache-Control": "max-age=60", //1 minute cache is activated
      },
      params,
    });

    //check if no flights found
    if (response.data.length === 0) {
      res.sendStatus(204);
    }

    //the result
    res.set("Cache-Control", "public, max-age=60"); // 1 dakika cache
    res.json({
      error: false,
      message: `Flights are listed!`,
      data: response.data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Flights"]
            #swagger.summary = "Get a Flight"
            #swagger.description = `
                Get a Flight by flight id(ObjectId)!</br> 
                Gets data from schiphol api and returns it!</br></br>
                <b>Permission= No Permission</b></br>  
            `
            #swagger.responses[200] = {
            description: 'Successfully Found!',
                schema: { 
                    error: false,
                    message: "Flight is found!",
                    data:{$ref: '#/definitions/Flight'} 
                }
            }

             

            #swagger.responses[404] = {
            description:`Not found - Flight not found!`
            }

        */

    //flight id from request params
    const flightId = req.params.flightId;

    //make the request to Schiphol API
    const response = await axios.get(
      process.env.SCHIPHOL_URL + "/flights/" + flightId,
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

    //check if no flights found
    if (response.data.length === 0) {
      throw new CustomError("Flight not found!", 404);
    }

    //the result
    res.set("Cache-Control", "public, max-age=60"); // 1 dakika cache
    res.json({
      error: false,
      message: `Flight is foundxxxaaaabbbbb!`,
      data: response.data,
    });
  },
};
