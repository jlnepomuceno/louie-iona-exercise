import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import CatList from "../components/CatList";
import { useSearchParams } from "react-router-dom";
import { requestCatBreeds, requestCatImagesPerBreed, requestMoreCatImagesPerBreed } from "../api/CatsAPI";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [selectedBreed, setSelectedBreed] = React.useState("-");
  const [breeds, setBreeds] = React.useState([]);
  const [cats, setCats] = React.useState([]);
  const [isLoadingCats, setIsLoadingCats] = React.useState(false);
  const [canLoadMore, setCanLoadMore] = React.useState(true);
  const [pageCount, setPageCount] = React.useState(1);

  // Call API request to get the breeds
  // for the select input box 
  const getBreedsList = () => {
    requestCatBreeds((data) => {
      setBreeds(data);
    });
  };

  // Clear the CatList component before Calling API request 
  // to get new cat images for the CatList component
  const getCatsAccordingToBreed = (breed_id) => {
    setCats([]);
    if (breed_id === "-") return;
    setIsLoadingCats(true);
    requestCatImagesPerBreed(breed_id, (data) => { // Callbacks to return data from API request
      setIsLoadingCats(false);
      setCats(data);
    });
  };

  // Calling API request to get more cat images for 
  // the CatList component
  const getMoreCats = (breed_id, page, callback) => {
    setIsLoadingCats(true);
    requestMoreCatImagesPerBreed(breed_id, page, (data) => {
      setIsLoadingCats(false);
      callback(data);
    });  // Callbacks to return data from API request
  };

  // Event-Handler for Select Input changes
  const handleSelectBreed = ({ target: { value } }) => {
    setPageCount(1);
    setCanLoadMore(true);
    setSelectedBreed(value);
  };

  // Handles onClick of Load more...
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

  // Get SelectInput data
  React.useEffect(() => {
    getBreedsList();
  }, []);

  // Update the CatList when new breed is selected
  React.useEffect(() => {
    getCatsAccordingToBreed(selectedBreed);
  }, [selectedBreed]);

  // Listen for any changes in the breed search queries
  React.useEffect(() => {
    const search = searchParams.get("breed");
    if (search) setSelectedBreed(search);
  }, [searchParams]);

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

  return (
    <div class="home">
      <Container>
        <h1>Cat Browser</h1>
        <Row style={{ padding: '10px 0' }}>
          <Col md={3} sm={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Breed</Form.Label>
              <Form.Select
                id="breed"
                value={selectedBreed}
                onChange={handleSelectBreed}
              >
                <option value="-">Select breed</option>
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
              disabled={selectedBreed === "-" || isLoadingCats}
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
