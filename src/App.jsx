import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    axios.post('http://localhost:3000/login', {
      username: username,
      password: password
    })
     .then(res => {
     setToken(res.data.token)
     }).catch(error => {
      console.log('Login error', error)
     });
  }
 
  
  useEffect(() => {
    if(token){


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
  }
  }, [token])


  return (
    <>
       <div>
        <h1>Tushar Shop</h1>
        { !token ?  (
          <div>
            <h2>Login karo</h2>
            <input type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

          </div>
        ) :(
          <div>
            <h2>Products</h2>
            <ul>
              {products.map((product) => (
                <li key={product._id}>
                  {product.name} - ₹{product.price}
                </li>
              ))}
            </ul>
          </div>
        )

        }
       </div>
    </>
  )
}

export default App
