import Link from "next/link";
import fs from "fs/promises";
import path from "path";

const HomePage = (props) => {
  const { products } = props;

  if (!products) {
    return <p> Loading... </p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.pid}>
          <Link href={`/${product.pid}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  console.log(data);

  return {
    props: {
      products: data.products,
    },
  };
};

export default HomePage;
