const getProducts = () => {
  let products = [];
  for (let i = 1; i <= 25; i++) {
    let name = "name",
      description = "description";
    let product = {
      id: i,
      [name]: "product" + i,
      [description]: "description" + i,
      price: i * 10
    };
    products.push(product);
  }

  return products;
};

export { getProducts };
