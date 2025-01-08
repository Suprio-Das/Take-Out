import { createBrowserRouter } from "react-router"
import Home from "../Home/Home"
import Main from "../Main/Main"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }
])