import { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { fetchAPINews } from '../../controllers/FetchAPINews';
import { ProductCarousel } from '../Productos/ProductCarousel';
import { Row, Col, Container, Spinner } from "react-bootstrap";
import './cards.css';
import aboutUs from "../../images/about-us.jpg"


export const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAPINews().then(
            (response) => {
                setNews(response)
                setLoading(false)
            }
        )
    }, []);

    return (
        <div>

            <div className="slider">
                <img className="d-block w-100" src={aboutUs} alt="about-us" />
                <div className="centered">Noticias</div>
            </div>
            {loading ? <>
                {" "}
                <Row style={{ position: "absolute", top: "50%" }}>
                    <Spinner variant="yellow" animation="grow" />
                    <Spinner className="mx-5" variant="yellow" animation="grow" />
                    <Spinner variant="yellow" animation="grow" />
                </Row>
            </> :
                <Container
                    className='d-flex justify-content-center border-0' id="news-card-cointainer">
                    <Row>
                        {
                            news.map((new1, index) => (
                                <Col  md={4} sm={6} key={index}>
                                    <NewsCard data={new1} />
                                </Col>
                            ))
                        }
                    </Row>

                </Container>
            }
        </div>
    );
};