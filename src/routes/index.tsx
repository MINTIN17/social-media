import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/Login/LoginPage";
import ForgotPassword from "../pages/ForgotPassword"
import Overview from "../pages/Overview"
import ListUser from "../pages/Admin/ListUser";
// import TaskbarAdmin from "../components/TaskbarAdmin";
import UserProfile from "../pages/Admin/ProfileUser/UserPro";
import PostUser from "../pages/Admin/ProfileUser/PostUser";

const publicRoutes = [
    { path: '/home', component: Home, layout: DefaultLayout },
    { path: '/login', component: LoginPage, layout: null },
    { path: '/forgot_password', component: ForgotPassword, layout: null },
    { path: '/', component: Overview, layout: null },
    { path: '/admin/listUs', component: ListUser, layout: null },
    {
        path: '/admin/listUs/:email',
        component: UserProfile,
        layout: null, 
    },
    {
        path: '/admin/listUs/:email/post',
        component: PostUser, // Thêm route riêng cho PostUser
        layout: null,
    },
];


// const privateRoutes = [

// ]

export {publicRoutes}