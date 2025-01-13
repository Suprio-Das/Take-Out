import { createBrowserRouter } from "react-router"
import Home from "../Home/Home"
import Main from "../Main/Main"
import Signup from "../Signup/Signup"
import Login from "../Login/Login"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])