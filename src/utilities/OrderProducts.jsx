export const orderProducts = (products, search) => {
    const productsCoincidences = [];
    const inputArray = search.toLowerCase().split(" ");
    products.map((prod) =>
      productsCoincidences.push({
        coincidencias: prod.Keywords.filter((element) =>
          inputArray.includes(element)
        ).length,
        ...prod,
      })
    );
    return productsCoincidences.sort(function (a, b) {
      return parseFloat(b.coincidencias) - parseFloat(a.coincidencias);
    });
  };