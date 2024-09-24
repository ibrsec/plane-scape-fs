"use strict";

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const swaggerAutogen = require("swagger-autogen");
const packageJson = require("./package.json");

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.name,
    description: packageJson.description,
    termsOfService: "https://www.ibrsec.com",
    license: { name: packageJson.license },
    contact: { name: packageJson.author, email: "ibr.seckin@gmail.com" },
  },
  host: `${HOST}${process.env.NODE_ENV === "dev" ? ":" + PORT : ""}`,
  basePath: "/",
  schemes: ["https", "http"],
  consumes: ["application/json", "multipart/form-data"],
  produces: ["application/json"],
  securityDefinitions: {
    Token: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        " Simple token authentication *  example: <b>Token ...tokenkey...</b>",
    },
    Bearer: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description:
        "Jwt token authentication *  example : <b>Bearer ...jwt tokenkey...</b>",
    },
  },
  security: [{ Token: [] }, { Bearer: [] }],
  definitions: {
    User: require("./src/models/userModel").User.schema.obj,
    Booking: require("./src/models/bookingModel").Booking.schema.obj,
    Destination: {
      city: "Antalya",
      country: "Turkey",
      iata: "AYT",
      publicName: {
        dutch: "Antalya",
        english: "Antalya",
      },
    },
    Flight: {
      lastUpdatedAt: "2024-09-20T07:24:45.616Z",
      actualLandingTime: "2024-09-20T07:24:45.616Z",
      actualOffBlockTime: "2024-09-20T07:24:45.616Z",
      aircraftRegistration: "string",
      aircraftType: {
        iataMain: "string",
        iataSub: "string",
      },
      baggageClaim: {
        belts: ["string"],
      },
      checkinAllocations: {
        checkinAllocations: [
          {
            endTime: "2024-09-20T07:24:45.616Z",
            rows: {
              rows: [
                {
                  position: "string",
                  desks: {
                    desks: [
                      {
                        checkinClass: {
                          code: "string",
                          description: "string",
                        },
                        position: 0,
                      },
                    ],
                  },
                },
              ],
            },
            startTime: "2024-09-20T07:24:45.616Z",
          },
        ],
        remarks: {
          remarks: ["string"],
        },
      },
      codeshares: {
        codeshares: ["string"],
      },
      estimatedLandingTime: "2024-09-20T07:24:45.616Z",
      expectedTimeBoarding: "2024-09-20T07:24:45.616Z",
      expectedTimeGateClosing: "2024-09-20T07:24:45.616Z",
      expectedTimeGateOpen: "2024-09-20T07:24:45.616Z",
      expectedTimeOnBelt: "2024-09-20T07:24:45.616Z",
      expectedSecurityFilter: "string",
      flightDirection: "A",
      flightName: "string",
      flightNumber: 0,
      gate: "string",
      pier: "string",
      id: "string",
      isOperationalFlight: true,
      mainFlight: "string",
      prefixIATA: "string",
      prefixICAO: "string",
      airlineCode: 0,
      publicEstimatedOffBlockTime: "2024-09-20T07:24:45.616Z",
      publicFlightState: {
        flightStates: ["string"],
      },
      route: {
        destinations: ["string"],
        eu: "string",
        visa: true,
      },
      scheduleDateTime: "2024-09-20T07:24:45.616Z",
      scheduleDate: "string",
      scheduleTime: "string",
      serviceType: "string",
      terminal: 0,
      transferPositions: {
        transferPositions: [0],
      },
      schemaVersion: "string",
    },
  },
};

const routes = ["./index.js"];
const outputFile = "./src/configs/swagger.json";

swaggerAutogen(outputFile, routes, document);
