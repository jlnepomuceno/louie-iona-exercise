import React from 'react';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function CatList (props) {
    const { cats } = props;

    return cats.map((item) => {
        return (
          <Col md={3} sm={6} xs={12} style={{ marginBottom: "20px" }}>
            <Card>
              <Card.Img variant="top" src={item.url} />
              <Card.Body>
                <a class="btn btn-primary btn-block link-button" href={`/${item.id}`}>View Details</a>
                {/* <Button variant="primary" style={{ width: "100%" }} onClick={e => navigate(`/${item.id}`)}>View Details</Button> */}
              </Card.Body>
            </Card>
          </Col>
        );
      });
};
