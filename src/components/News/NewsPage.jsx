import { useState, useEffect } from 'react';
import { NewsCard } from './NewsCard';
import { fetchAPINews } from '../../controllers/FetchAPINews';

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
        <div style={{ color: "white" }}>
            {loading ? <div>Cargando</div> : <div>
                {news.map((item) =>
                    <NewsCard data={item} />


                )}
            </div>
            }
        </div>
    );
};