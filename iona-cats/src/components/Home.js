import React from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { API_SERVER_URL, API_REQUEST_HEADER } from "../config";
import CatList from "./CatList";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("searchParams", searchParams);

  const [selectedBreed, setSelectedBreed] = React.useState(null);
  const [breeds, setBreeds] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [isLoadingCats, setIsLoadingCats] = React.useState(false);
  const [canLoadMore, setCanLoadMore] = React.useState(false);

  const loadBreeds = () => {
    axios
      .get(`${API_SERVER_URL}/breeds`, API_REQUEST_HEADER)
      .then((response) => {
        const { data } = response;
        setBreeds(data);
      })
      .catch((error) => {
        console.error(`Error in getting cats from the database: ${error.code} | ${error.message}`);
        alert("Apologies but we could not load new cats for you at this time! Miau!");
      });
  };

  const loadCatsAccordingToBreed = (breed) => {
    setCats([]);
    setIsLoadingCats(true);
    axios
      .get(
        `${API_SERVER_URL}/images/search?breed_ids=${breed}&limit=10`,
        API_REQUEST_HEADER
      )
      .then((response) => {
        const { data } = response;
        setIsLoadingCats(false);
        setCats(data);
      })
      .catch((error) => {
        console.error(`Error in getting cats from the database: ${error.code} | ${error.message}`);
        alert("Apologies but we could not load new cats for you at this time! Miau!");
      });
  };

  const renderResults = () => {
    if(cats.length === 0) return <Col xs={12} style={{ marginBottom: "20px" }}>No cats available</Col>
    return <CatList cats={cats} />
  };

  React.useEffect(() => {
    // if (breed_id) setSelectedBreed(breed_id);
    loadBreeds();
    // console.log("render", breed_id)
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
                value={selectedBreed}
                onChange={(e) => e.target.value && loadCatsAccordingToBreed(e.target.value)}
              >
                <option value>Select breed</option>
                {breeds.map((row) => (
                  <option value={row.id}>{row.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {renderResults()}
        </Row>
        
        <Row>
          <Col md={3} sm={6} xs={12}>
            <Button
              variant="success"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              onClick={() => console.log("This was clicked.")}
              disabled={!canLoadMore || isLoadingCats}
            >
              { isLoadingCats ? "Loading cats..." : "Load more" }
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
