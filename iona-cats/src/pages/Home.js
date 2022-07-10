import React from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { API_SERVER_URL, API_REQUEST_HEADER } from "../config/config";
import CatList from "../components/CatList";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams] = useSearchParams();

  const [selectedBreed, setSelectedBreed] = React.useState(null);
  const [breeds, setBreeds] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [isLoadingCats, setIsLoadingCats] = React.useState(false);
  const [canLoadMore, setCanLoadMore] = React.useState(true);
  const [pageCount, setPageCount] = React.useState(1);

  const getBreedsList = () => {
    axios
      .get(`${API_SERVER_URL}/breeds`, API_REQUEST_HEADER)
      .then((response) => {
        setBreeds(response.data);
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

  const getCatsAccordingToBreed = (breed) => {
    setCats([]);
    setIsLoadingCats(true);
    axios
      .get(
        `${API_SERVER_URL}/images/search?page=1&limit=10&breed_id=${breed}`,
        API_REQUEST_HEADER
      )
      .then((response) => {
        setIsLoadingCats(false);
        setCats(response.data);
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

  const getMoreCats = (breed, page, callback) => {
    setIsLoadingCats(true);
    axios
      .get(
        `${API_SERVER_URL}/images/search?page=${page}&limit=10&breed_id=${breed}`,
        API_REQUEST_HEADER
      )
      .then((response) => {
        setIsLoadingCats(false);
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

  // Prepare the Breed selection from the Cats API
  React.useEffect(() => {
    getBreedsList();
  }, []);

  // Prepare list of cats from results of the Cats API
  React.useEffect(() => {
    console.log("ranning");
    getCatsAccordingToBreed(selectedBreed);
  }, [selectedBreed]);

  // Listen for any changes in the breed search queries
  // and set as the selected breed e.g. coming
  // back from the Cat page
  React.useEffect(() => {
    const search = searchParams.get("breed");
    if (search) setSelectedBreed(search);
  }, [searchParams]);

  // Event-Handler for Select Input changes
  const handleSelectBreed = ({ target: { value } }) => {
    setPageCount(1);
    setCanLoadMore(true);
    setSelectedBreed(value);
  };

  // Sub-render the loaded cat results for clarity
  const renderResults = () => {
    if (cats.length === 0)
      return (
        <Col xs={12} style={{ marginBottom: "20px" }}>
          No cats available
        </Col>
      );
    return <CatList cats={cats} />;
  };

  const handleLoadMore = (e) => {
    e.preventDefault();
    const newPage = pageCount + 1;
    getMoreCats(selectedBreed, newPage, (data) => {
      setCats((prevCats) => {
        const unique_cats = data.filter((newCat) => {
          return !prevCats.some((prevCat) => {
            return newCat.id === prevCat.id;
          });
        });
        if (unique_cats.length === 0) {
          setCanLoadMore(false);
        }
        setPageCount(newPage);
        return [...prevCats, ...unique_cats];
      });
    });
  };

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
                onChange={handleSelectBreed}
              >
                <option value>Select breed</option>
                {breeds.map((row) => (
                  <option value={row.id}>{row.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>{renderResults()}</Row>

        <Row>
          <Col md={3} sm={6} xs={12}>
            <Button
              variant="success"
              style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
              onClick={handleLoadMore}
              disabled={isLoadingCats}
              hidden={!canLoadMore}
            >
              {isLoadingCats ? "Loading cats..." : "Load more"}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
