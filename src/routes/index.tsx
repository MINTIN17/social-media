import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/Login/LoginPage";
import ForgotPassword from "../pages/ForgotPassword"
import Diary from "../pages/Diary";

const publicRoutes = [
    { path : '/home', component : Home, layout: DefaultLayout},
    {path : '/login', component : LoginPage, layout: null},
    {path : '/forgot_password', component : ForgotPassword, layout: null},
    {path : '/diary', component : Diary, layout: null},
]

// const privateRoutes = [

// ]

export {publicRoutes}