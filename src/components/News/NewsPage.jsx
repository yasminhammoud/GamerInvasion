import { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { fetchAPINews } from '../../controllers/FetchAPINews';
import { ProductCarousel } from '../Productos/ProductCarousel';

export const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetchAPINews().then(
            (response) => {
                setNews(response)
                setLoading(false)
            }
        )
    }

    useEffect(() => {
        fetchAPINews().then(
            (response) => {
                setNews(response)
                setLoading(false)
                console.log("asd")
            }
        )
    }, []);

    return (
        <div>
            {loading ? <div>Cargando</div> : <div>
                {news.map((item) =>
                    <NewsCard data={item} />
                )}
            </div>
            }
        </div>
    );
};