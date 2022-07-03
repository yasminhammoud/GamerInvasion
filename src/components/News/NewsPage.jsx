import { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { fetchAPINews } from "../../controllers/FetchAPINews";
import { Row, Col, Container } from "react-bootstrap";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

/* Component that fetches data from an API and then displaying it in cards. */
export const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAPINews().then((response) => {
      setNews(response);
      setLoading(false);
    });
  }, []);

const news1 = [
                {
                  author: "Gabriel Erard",
                  description: "El empuje de las compañías tecnológicas por la sostenibilidad no es nuevo. Cada año nos encontramos con distintos ejemplos de empresas que utilizan materiales reciclados, tanto en los productos en sí como en su embalaje. Sin embargo, Razer ha decidido ir un p…",
                  publishedAt: "2022-06-05T15:01:00Z",
                  source: {name: 'Hipertextual'},
                  title: "Razer certifica los primeros ratones ecológicos del mundo",
                  url: "https://hipertextual.com/2022/06/razer-ratones-gaming-ecologicos",
                  urlToImage: "https://i0.wp.com/hipertextual.com/wp-content/uploads/2022/06/basi1.jpg?fit=1500%2C1000&quality=50&strip=all&ssl=1"
                },
                {
                  author: "Nicolás Rivera",
                  description: "Razer ha presentado este miércoles el Razer Kishi V2, la segunda versión del conocido mando que permite convertir cualquier teléfono móvil en una consola portátil al estilo Nintendo Switch. Aunque esta nueva versión solo es compatible con teléfonos móviles An…",
                  publishedAt: "2022-06-08T15:03:10Z",
                  source:{name: 'Hipertextual'},
                  title: "El nuevo Razer Kishi V2 quiere ser imprescindible en la era del cloud gaming",
                  url: "https://hipertextual.com/2022/06/razer-kishi-v2",
                  urlToImage: "https://hipertextual.com/wp-content/uploads/2022/06/Razer-Kishi-V2-10.jpg"
                },
                {
                  author: "Nicolás Rivera",
                  description: "La marca madre de PlayStation ha presentado oficialmente INZONE, una nueva marca de dispositivos gaming para PC con los que Sony trata de profundizar aún más en este segmento en auge desde hace varios años. El lanzamiento de esta familia de dispositivos casa …",
                  publishedAt: "2022-06-28T21:09:10Z",
                  source:{name: 'Hipertextual'},
                  title: "Sony profundiza en el gaming para PCs con la nueva línea de periféricos INZONE",
                  url: "https://hipertextual.com/2022/06/sony-inzone-h3-h7-h9-m3-m9",
                  urlToImage: "https://newspack-hipertextual.s3.amazonaws.com/wp-content/uploads/2022/06/1-Mid.jpg"
                },
                {
                  author: "Gabriel Erard",
                  description: "Si usas Xbox Cloud Gaming desde un PC seguro has notado que actualmente no soporta el uso de teclado y ratón para jugar. Afortunadamente, Microsoft está trabajando para que esto ya no sea un problema. La corporación de Redmond dio nuevos indicios de que la co…",
                  publishedAt: "2022-06-22T18:01:00Z",
                  source:{name: 'Hipertextual'},
                  title: "Xbox Cloud Gaming permitirá jugar con teclado y ratón desde un PC.",
                  url: "http://hipertextual.com/2022/06/xbox-cloud-gaming-teclado-raton-pc-mejoras-latencia",
                  urlToImage: "https://newspack-hipertextual.s3.amazonaws.com/wp-content/uploads/2020/02/hipertextual-ni-playstation-ni-nintendo-xbox-ven-amazon-y-google-principales-rivales-vencer-2020955080.jpg"
                },
                {
                  author: "Gabriel Erard",
                  description: "Microsoft ya no quiere ordenadores con Windows 11 preinstalado que utilicen discos duros convencionales, y pretende hacer obligatorio el uso de discos de estado sólido (SSD) entre los fabricantes a partir de 2023. Así se desprende de un reciente informe de To…",
                  publishedAt: "2022-06-09T18:01:00Z",
                  source: {name: 'Hipertextual'},
                  title: "Microsoft quiere que todos los PC con Windows 11 preinstalado usen SSD",
                  url: "https://hipertextual.com/2022/06/microsoft-pc-windows-11-ssd",
                  urlToImage: "https://i0.wp.com/hipertextual.com/wp-content/uploads/2022/06/pexels-andrey-matveev-5222605-scaled.jpg?fit=2560%2C1920&quality=50&strip=all&ssl=1"
                },
                {
                  author: "Hipertextual (Redacción)",
                  description: "Si estabas esperando una nueva oleada de grandes ofertas de Amazon para hacerte con los mejores productos al mejor precio, estás de enhorabuena. Desde los geniales AirPods de Apple en sus tres versiones más recientes, hasta relojes inteligentes, pasando por l…",
                  publishedAt: "2022-06-13T08:49:13Z",
                  source: {name: 'Hipertextual'},
                  title: "Las mejores ofertas en tecnología y para arrancar la semana: AirFryer, Apple Watch y mucho más",
                  url: "https://hipertextual.com/2022/06/las-mejores-ofertas-en-tecnologia-2",
                  urlToImage: "https://hipertextual.com/wp-content/uploads/2020/08/hipertextual-sony-lanza-wh-1000xm4-con-cancelacion-ruido-mejor-emparejamiento-y-otras-mejoras-2020671993-scaled.jpg"
                },
                {
                  author: "Alberto Martín",
                  description: "El ecosistema de videojuegos de Microsoft no tiene rival. Lo que la compañía está haciendo con Xbox, tanto en PC como en Consolas, es una lección para toda la industria. Ahora la compañía quiere seguir potenciando el juego en la plataforma reina, el PC, con n…",
                  publishedAt: "2022-06-24T09:59:17Z",
                  source: {name: 'Hipertextual'},
                  title: "Microsoft quiere convencerte de usar Edge con nuevas funciones gaming realmente interesantes",
                  url: "http://hipertextual.com/2022/06/microsoft-quiere-convencerte-de-usar-edge-con-nuevas-funciones-gaming-realmente-interesantes",
                  urlToImage: "https://newspack-hipertextual.s3.amazonaws.com/wp-content/uploads/2021/11/microsoft-edge-1.jpg"
                },
                {
                  author: "Alberto Martín",
                  description: "Uno de los grandes anuncios al evento previo en este extraño año sin E3, Microsoft ha confirmado que llevará el juego en la nube a las smart TVs de forma directa, sin necesidad de tener una consola. Será, como no podía ser de otra manera, a través de Xbox Clo…",
                  publishedAt: "2022-06-09T12:02:00Z",
                  source: {name: 'Hipertextual'},
                  title: "Microsoft lleva los juegos de Xbox a la TV sin necesidad de consola: solo necesitarás un mando",
                  url: "https://hipertextual.com/2022/06/microsoft-lleva-los-juegos-de-xbox-a-la-tv-sin-necesidad-de-consola",
                  urlToImage: "https://i0.wp.com/hipertextual.com/wp-content/uploads/2022/06/6c115d5e-9906-447d-aff9-e63d6efd.jpeg?fit=1920%2C1080&quality=50&strip=all&ssl=1"
                },
                {
                  author: "Alberto Martín",
                  description: "A pocos días del gran showcase de Xbox y Bethesda (y a la espera que en un futuro también sea Activision), Microsoft ha ofrecido algunos detalles sobre el futuro de sus plataformas de juego. Y sí, hablamos de plataformas dentro del ecosistema de Xbox, puesto …",
                  publishedAt: "2022-06-09T12:01:00Z",
                  source: {name: 'Hipertextual'},
                  title: "Podrás jugar a cualquier juego de Xbox en la nube, aunque no esté en el Game Pass, siempre que lo tengas comprado",
                  url: "https://hipertextual.com/2022/06/podras-jugar-cualquier-juego-de-xbox",
                  urlToImage: "https://i0.wp.com/hipertextual.com/wp-content/uploads/2022/06/XboxCloudGamingExpansion.jpg?fit=1920%2C1080&quality=50&strip=all&ssl=1"
                },
                {
                  author: "Luis Miranda",
                  description: "Samsung se ha metido de lleno a la estrategia de jugar en la TV sin necesidad de una consola. Tras revelarse que Xbox ofrecería sus títulos de Game Pass Ultimate en las Smart TV lanzadas en 2022, la surcoreana dio un paso más y anunció que ofrecerá el catálog…",               
                  publishedAt: "2022-06-30T18:06:58Z",
                  source: {name: "Hipertextual"},
                  title: "Samsung Gaming Hub permitirá jugar Xbox, Stadia y otros servicios en la nube desde tu Smart TV",
                  url: "https://hipertextual.com/2022/06/samsung-gaming-hub-jugar-xbox-stadia-smart-tv",
                  urlToImage: "https://newspack-hipertextual.s3.amazonaws.com/wp-content/uploads/2022/06/Samsung_Gaminghub_SmartTV.jpg"
                },
                
            ]


  return (
    <div>
      <div className="banner">
        <div className="centered" style={{ letterSpacing: "3px" }}>
          Noticias
        </div>
      </div>
      {loading && news.length === 0 ? (
        <div className="d-flex align-items-center justify-content-center">
          <LoadingSpinner />
        </div>
      ) : (
        <Container
          className="d-flex justify-content-center border-0"
          id="news-card-cointainer"
        >
          <Row>
            {news1.map((new1, index) => (
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
