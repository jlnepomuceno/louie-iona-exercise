import axios from "axios";
import { API_REQUEST_HEADER, API_SERVER_URL } from "../config/config";

// Get the list of breeds available under the CatsAPI
// then use a callback function to return the response
// to the function call
export function requestCatBreeds(callback) {
  axios
    .get(`${API_SERVER_URL}/breeds`, API_REQUEST_HEADER)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.log(
        `Error in getting cats from the database: ${error.code} | ${error.message}`
      );
      alert(
        "Apologies but we could not load new cats for you at this time! Miau!"
      );
    });
}

// Get 10 cat images of the selected breed_id from the CatsAPI
// then use a callback function to return the response
// to the function call
export function requestMoreCatImagesPerBreed(breed_id, page, callback) {
    axios
      .get(
        `${API_SERVER_URL}/images/search?page=${page}&limit=10&breed_id=${breed_id}`,
        API_REQUEST_HEADER
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(
          `Error in getting cats from the database: ${error.code} | ${error.message}`
        );
        alert(
          "Apologies but we could not load new cats for you at this time! Miau!"
        );
      });
};

// Get 10 cat images of the selected breed_id from the CatsAPI
// then use a callback function to return the response
// to the function call
export function requestCatImagesPerBreed(breed_id, callback) {
    axios
      .get(
        `${API_SERVER_URL}/images/search?page=1&limit=10&breed_id=${breed_id}`,
        API_REQUEST_HEADER
      )
      .then((response) => {
        callback(response.data);
      })
      .catch((error) => {
        console.log(
          `Error in getting cats from the database: ${error.code} | ${error.message}`
        );
        alert(
          "Apologies but we could not load new cats for you at this time! Miau!"
        );
      });
  };

// Get the breed information of the selected cat image
// then use a callback function to return the response
// to the function call
export function requestCatDetailsByImageID(cat_image_id, callback) {
  axios
    .get(`${API_SERVER_URL}/images/${cat_image_id}`, API_REQUEST_HEADER)
    .then((response) => {
      if (response.data.breeds.length > 0) {
        const { id, url, breeds } = response.data;

        // Get the breed data from one element of the array returned by
        // the CatsAPI
        const cat_for_display = {
          id,
          url,
          ...breeds[0],
        };
        callback(cat_for_display);
      } else {
        console.log(
          "We were able to find the image but the query returned empty breed list: ",
          response.data.breeds
        );
        alert(
          "Apologies but we could not load new cats for you at this time! Miau!"
        );
      }
    })
    .catch((err) => {
      console.log("Error in getting cat data", err);
      alert(
        "Apologies but we could not load new cats for you at this time! Miau!"
      );
    });
}
