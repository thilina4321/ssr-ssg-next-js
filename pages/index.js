const HomePage = (props) => {
  const {products} = props;
  console.log(products);

  return (
    <ul>
      {products.map((product)=>(
        <li key={product.id}> {product.pro}  </li>
     ) )}
    </ul>
  )
}

export const getStaticProps = async()=>{
  return {
    props:{
      products:[{id:'1', pro:'product 1'}]
    }
  }
}

export default HomePage
