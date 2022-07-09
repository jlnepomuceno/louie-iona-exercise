import axios from "axios";
import React from "react";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { useParams, useSearchParams } from "react-router-dom";
import { API_REQUEST_HEADER, API_SERVER_URL } from "../config";

export default function Cat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cat_image_id } = useParams();
  const [cat, setCat] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${API_SERVER_URL}/images/${cat_image_id}`, API_REQUEST_HEADER)
      .then((response) => {
        if (response.data.breeds.length > 0) {
          const { id, url, breeds } = response.data;
          const cat_for_display = {
            id,
            url,
            ...breeds[0],
          };
          setCat(cat_for_display);
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
  }, [cat_image_id]);

  return (
    <div class="Cat">
      <Container>
        {cat ? (
          <Card>
            <Card.Header>
              <a
                class="btn btn-primary btn-block link-button"
                href={`/?breed=${cat.id}`}
              >
                Back
              </a>
              {/* <Button variant="primary" style={{ width: "100%" }} onClick={e => navigate(`/${item.id}`)}>Go Back</Button> */}
            </Card.Header>
            <Card.Img variant="top" src={cat.url} />
            <Card.Body>
              <h4>{cat.name}</h4>
              <h5>Origin: {cat.origin}</h5>
              <h6>{cat.temperament}</h6>
              <p>{cat.description}</p>
            </Card.Body>
          </Card>
        ) : (
          <h5>Loading...</h5>
        )}
      </Container>
    </div>
  );
}
