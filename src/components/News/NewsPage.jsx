import { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { fetchAPINews } from '../../controllers/FetchAPINews';
import { Row, Col, Container } from "react-bootstrap";
import './News.css';
import aboutUs from "../../images/about-us.jpg"
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';


/* Component that fetches data from an API and then displaying it in cards. */
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
            <div className="slider" style={{ position: "relative", "textAlign": "center" }}>
                <img className="d-block w-100" src={aboutUs} alt="news" />
                <div className="centered">Noticias</div>
            </div>
            {loading ? <LoadingSpinner /> :
                <Container
                    className='d-flex justify-content-center border-0' id="news-card-cointainer">
                    <Row>
                        {
                            news.map((new1, index) => (
                                <Col lg={6} xl={4} md={6} sm="auto" key={index}>
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