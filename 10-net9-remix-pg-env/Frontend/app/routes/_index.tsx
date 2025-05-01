import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


export const loader: LoaderFunction = async () => {
  const data = await fetch(process.env.API_URL + "/api/Products");
  if (!data.ok) {
    throw new Response("Failed to fetch data", { status: 500 });
  }
  const products = await data.json();
  console.log(products);
  return json(products);
};


export default function Index() {
  const products: any = useLoaderData();
  console.log(products);
  return (
    <>
      <h1>Lista de productos</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

