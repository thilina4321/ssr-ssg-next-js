import fs from 'fs/promises'
import path from 'path'

const ProductDetails = (props) => {
    const {selectedProduct} = props

    if(!selectedProduct){
        return <p> Loading... </p>
    }
    return (
        <div>
            <h1> {selectedProduct.title} </h1>
        </div>
    )
}

const getPath = async()=>{
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    return data
}

export const getStaticProps = async(context)=>{
    const {params} = context
    const pid = params.pid

    const data = await getPath()
    const product = data.products.find((product)=> product.pid == pid )

    if(!product){
        return {
            notFound:true
        }
    }

    return {
        props:{
            selectedProduct:product
        },

    }
}

export const getStaticPaths = async()=>{
    const data = await getPath()
    const ids = data.products.map((product)=> product.pid )
    const productWithPath = ids.map((id)=> ({params:{pid:id}} ))
    console.log(ids);
    console.log(productWithPath);

    return {
        paths:productWithPath,
        fallback:true
    }

}


export default ProductDetails
