import "./ProductCarousel.css";
import { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { getAllProducts } from '../../controllers/Productos';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

export const ProductCarousel = () => {

    let scrl = useRef(null);
    const [scrollX, setscrollX] = useState(0);
    const [scrolEnd, setscrolEnd] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts().then((response) => {
            setProducts(response)
            setLoading(false)
        })
    }, []);

    //Slide click
    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
        setscrollX(scrollX + shift);

        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };

    const scrollCheck = () => {
        setscrollX(scrl.current.scrollLeft);
        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
        ) {
            setscrolEnd(true);
        } else {
            setscrolEnd(false);
        }
    };
    return (
        <div className="carousel-container">
            {scrollX !== 0 && (
                <button
                    className="button-carousel"
                    onClick={() => slide(-310)}
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft} color={"white"} />
                </button>
            )}
            <ul className='corousel-list' ref={scrl} onScroll={scrollCheck}>
                {products.map((item) =>
                    <li className='coruousel-item'><ProductCard producto={item} /></li>

                )}
            </ul>
            {!scrolEnd && (
                <button
                    className="carousel-button"
                    onClick={() => slide(+310)}
                >
                    <FontAwesomeIcon icon={faArrowCircleRight} color={"white"} />
                </button>
            )}
        </div>
    )
}