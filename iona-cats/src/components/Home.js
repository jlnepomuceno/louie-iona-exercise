import React from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { API_SERVER_URL, API_REQUEST_HEADER } from "../config";

export default function Home() {
  const [breeds, setBreeds] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [selectedBreed, setSelectedBreed] = React.useState("");
  const [canLoadMore, setCanLoadMore] = React.useState(false);

  const loadBreeds = () => {
    axios.get(`${API_SERVER_URL}/breeds`, API_REQUEST_HEADER)
    .then(response => {
        const { data } = response;
        setBreeds(data);
    })
    .catch(error => {
        console.log(error);
    });
  };

  const loadCats = breed => {
    axios.get(`${API_SERVER_URL}/images/search?breed_ids=${breed}`, API_REQUEST_HEADER)
    .then(response => {
        const { data } = response;
        console.log("response", response)
        setCats(data);
    })
    .catch(error => {
        console.log(error);
    });
  };

  React.useEffect(() => {
    loadBreeds();
  }, []);

  return (
    <div class="Home">
      <Container>
        <h1>Cat Browser</h1>
        <Row style={{ padding: "10px 0px" }}>
          <Col md={3} sm={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Select
                id="breed"
                onChange={e => e.target.value && loadCats(e.target.value)}
              >
                <option value>Select breed</option>
                {breeds.map(row => (
                  <option value={row.id}>{row.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {cats.length > 0 ? (
            <Col xs={12} style={{ marginBottom: "20px" }}>
              No cats available
            </Col>
          ) : (
            <Col xs={12} style={{ marginBottom: "20px" }}>
              No cats available
            </Col>
          )}
        </Row>

        <Row>
          <Col md={3} sm={6} xs={12}>
            <Button
              variant="success"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              onClick={() => console.log("This was clicked.")}
              disabled={!canLoadMore}
            >
              Load more
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
