var express = require('express');
var router = express.Router();
const request = require("request");

const dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
// dayjs().format(); 
dayjs.extend(utc);
dayjs.extend(timezone);
let nowObject = dayjs();
let nowYear = nowObject.$y;
let nowMonth = nowObject.$M;
let nowDay = nowObject.$D;
let today = `${nowYear}-${nowMonth}-${nowDay}`;

const apiKey = process.env.API_KEY;

const roversList = ["curiosity", "opportunity", "perseverance", "spirit"];

// * Mars Rover Photos
const apiRoversUrlDefault = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity";
const apiRoversBaseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers";
const latestPhotosStr = "/latest_photos?";
//need rover name after this url piece ^
const apiParamSol = `/photos?sol=1000&api_key=${apiKey}`;
const apiParamCamera = `/photos?sol=1000&camera=fhaz&api_key=${apiKey}`;
const apiPage2 = `/photos?sol=1000&page=2&api_key=${apiKey}`;
// const apiParamEarthDate = `/photos?earth_date=${today}&api_key=${apiKey}`;≠–
const apiParamEarthDate = `/photos?earth_date=${today}&page=1&api_key=${apiKey}`;

const apiParamLatestPhotos = `/latest_photos?api_key=${apiKey}`;


const currentPhoto = `${apiRoversUrlDefault}${apiParamLatestPhotos}`;
const picturesToday = `${apiRoversBaseUrl}/roverName${apiParamEarthDate}`;
// template ^
router.use((req, res, next) => {
  res.locals.roversList = roversList;
  res.locals.apiRoversBaseUrl = apiRoversBaseUrl;
  res.locals.apiParamEarthDate = apiParamEarthDate;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(currentPhoto, (error, response, roverData) => {
    const parsedData = JSON.parse(roverData);
    res.render("index", {
      parsedData: parsedData.latest_photos
    })
  });
});

router.get("/curiosity", (req, res, next) => {
  const curiosityPicsToday = `${apiRoversBaseUrl}/curiosity${apiParamLatestPhotos}`;
  request.get(curiosityPicsToday, (error, response, curiosityData) => {
    const parsedData2 = JSON.parse(curiosityData);
    res.render("curiosity", {
      parsedData2: parsedData2.latest_photos
    })
  })
});


router.get("/opportunity", (req, res, next) => {
  const curiosityPicsToday = `${apiRoversBaseUrl}/opportunity${apiParamLatestPhotos}`;
  request.get(curiosityPicsToday, (error, response, curiosityData) => {
    const parsedData3 = JSON.parse(curiosityData);
    res.render("opportunity", {
      parsedData3: parsedData3.latest_photos
    }) 
  })
});


router.get("/perseverance", (req, res, next) => {
  const curiosityPicsToday = `${apiRoversBaseUrl}/perseverance${apiParamLatestPhotos}`;
  request.get(curiosityPicsToday, (error, response, curiosityData) => {
    const parsedData4 = JSON.parse(curiosityData);
    res.render("perseverance", {
      parsedData4: parsedData4.latest_photos
    })
  })
});

router.get("/spirit", (req, res, next) => {
  const curiosityPicsToday = `${apiRoversBaseUrl}/spirit${apiParamLatestPhotos}`;
  request.get(curiosityPicsToday, (error, response, curiosityData) => {
    const parsedData5 = JSON.parse(curiosityData);
    res.render("spirit", {
      parsedData5: parsedData5.latest_photos
    })
  })
});

// router.get("/:rover/:id", (req, res, next) => {
//   // res.json(req.params.id);
//   let myRover = req.params.rover;
//   let myRoverLC = myRover.toLowerCase();
//   let photoId = req.params.id;
//   console.log("wildcard var 'myRoverLC: ", myRoverLC);
//   console.log("wildcard var 'photoId': ", photoId);
//   const thisPhotoUrl = `${apiRoversBaseUrl}/${myRoverLC}${latestPhotosStr}id=${photoId}&api_key=${apiKey}`;
//   console.log("this photo url: ", thisPhotoUrl);
//   // res.send(thisPhotoUrl);
//   request.get(thisPhotoUrl, (error, response, singlePhotoData) => {
//     const wildcardData = JSON.parse(singlePhotoData);
//     let onePhoto = wildcardData["latest_photos"].find((photo) => photo.id === photoId);
//     console.log("onePhoto: ", onePhoto)
//     res.render("single-photo", {
//       onePhoto: onePhoto
//     })
//     // console.log("wildcardData: ", wildcardData)
//   })
// });


module.exports = router;
