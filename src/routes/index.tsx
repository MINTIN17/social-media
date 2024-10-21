import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/Login/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import Diary from "../pages/Diary";
import Message from "../components/Message";
import Overview from "../pages/Overview";
import ListUser from "../pages/Admin/ListUser";
// import TaskbarAdmin from "../components/TaskbarAdmin";
import UserProfile from "../pages/Admin/ProfileUser/UserPro";
import PostUser from "../pages/Admin/ProfileUser/PostUser";
import FriendList from "../pages/FriendList";
import TaskbarFriend from "../components/TaskbarFriend";

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
        // path: '/admin/listUs/:email/post',
        path: '/post',
        component: PostUser, // Thêm route riêng cho PostUser
        layout: null,
    },
    {path : '/diary', component : Diary, layout: null},
    {path : '/message', component : Message, layout: null},
    {path : '/friendlist', component : FriendList, layout: null},
    {path : '/taskbarfriend', component : TaskbarFriend, layout: null},
];


// const privateRoutes = [

// ]

export {publicRoutes}