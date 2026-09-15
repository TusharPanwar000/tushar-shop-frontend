import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWE4ZDdkODBlZjQwZDE3ZGM3NmMwMTQiLCJ1c2VybmFtZSI6InR1c2hhcm1vbmdvIiwiaWF0IjoxNzg5NDUwNzg3LCJleHAiOjE3ODk0NTQzODd9.DmHmYOiA4gAz129v7Q-euH-0MOgYg7Iv0pOYS0nrqFg';
    axios.get('http://localhost:3000/products', 
      {
        headers: {'Authorization': token}
      }
    )
    .then(res => {
      setProducts(res.data)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  return (
    <>
       <div>
        <h1>Tushar Shop</h1>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ₹{product.price}
            </li>
          ))}
        </ul>
       </div>
    </>
  )
}

export default App
