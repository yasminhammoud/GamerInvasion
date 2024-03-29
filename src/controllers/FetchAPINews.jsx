/**
 * It fetches data from an API News and returns an array of objects of articles found.
 * @returns An array of objects with the articles.
 */
export const fetchAPINews = async () => {
    const fetch = require('node-fetch');
    let yourDate = new Date()
    const from = yourDate.toISOString().split('T')[0]

    let news = []
    const url = `https://newsapi.org/v2/everything?q=gaming&from={2022-06-09}&sortBy=popularity&language=es&pageSize=10&page=1&apiKey=00bf0b5597474aebae0b4decc2a80886`;

    await fetch(url)
        .then((result) => result.json())
        .then(data => {
            news = data.articles
        }
        )
        .catch(err => console.error('error:' + err));

    return news;
}
