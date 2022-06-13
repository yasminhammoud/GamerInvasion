import { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { fetchAPINews } from "../../controllers/FetchAPINews";
import { Row, Col, Container } from "react-bootstrap";

import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import "./cards.css";


/* Fetching data from an API and then displaying it in cards. */
export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPINews().then((response) => {
      setNews(response);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div
        className="container-news"
      >
        <div className="centered" style={{letterSpacing: "3px"}}>Noticias</div>
      </div>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <LoadingSpinner />
        </div>
      ) : (
        <Container
          className="d-flex justify-content-center border-0"
          id="news-card-cointainer"
        >
          <Row>
            {news.map((new1, index) => (
              <Col lg={6} xl={4} md={6} sm="auto" key={index}>
                <NewsCard data={new1} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};
