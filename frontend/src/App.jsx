import { RouterProvider } from "react-router"
import { router } from "./Components/Routes/Routes"
import { CartProvider } from "./Components/CartContext/CartContext"

function App() {

  return (
    <CartProvider>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </CartProvider>
    
  )
}

export default App
