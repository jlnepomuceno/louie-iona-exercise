import React from "react";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import { requestCatDetailsByImageID } from "../api/CatsAPI";

export default function Cat() {
  const { cat_image_id } = useParams();
  const [cat, setCat] = React.useState(null);

  React.useEffect(() => {
    requestCatDetailsByImageID(cat_image_id, (data) => setCat(data));
  }, [cat_image_id]);

  // Sub-rendering of the Cards for clarity
  const renderData = () => {
    if (!cat) return <h5>Loading...</h5>;
    return (
      <Card>
        <Card.Header>
          <a
            class="btn btn-primary btn-block link-button"
            href={`/?breed=${cat.id}`}
          >
            Back
          </a>
        </Card.Header>
        <Card.Img variant="top" src={cat.url} />
        <Card.Body>
          <h4>{cat.name}</h4>
          <h5>Origin: {cat.origin}</h5>
          <h6>{cat.temperament}</h6>
          <p>{cat.description}</p>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div class="cat">
      <Container>{renderData()}</Container>
    </div>
  );
}
