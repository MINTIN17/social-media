import DefaultLayout from '../layouts/DefaultLayout';
import Home from '../pages/Home';
import LoginPage from '../pages/Login/LoginPage';
import ForgotPassword from '../pages/ForgotPassword';
import Diary from '../pages/Diary';
import Message from '../components/Message';
import Overview from '../pages/Overview';
import ListPost from '../components/ListPost';
import ListUser from '../components/ListUser';
import PostUser from '../components/PostUser';
import { components } from 'react-select';
import ProfilePage from '../components/Profile';
import { HeaderOnly } from '../layouts';
import AdminLayout from '../layouts/AdminLayout';
import PostProfile from '../pages/PostProfile';
import ProfileLayout from '../layouts/ProfileLayout';
import ContentFriend from '../components/ContentFriend';
import FriendLayout from '../layouts/FriendLayout';
import FriendRequests from '../components/FriendRequests';

const publicRoutes = [
    { path: '/home', component: Home, layout: DefaultLayout },
    { path: '/login', component: LoginPage, layout: null },
    { path: '/forgot_password', component: ForgotPassword, layout: null },
    { path: '/', component: Overview, layout: null },
    { path: '/admin/listUs', component: ListUser, layout: AdminLayout },
    { path: '/admin/listPo', component: ListPost, layout: AdminLayout },
    { path: '/admin/listPo/post', component: PostUser, layout: null, },
    { path: '/admin/profile', component: PostProfile, layout: ProfileLayout, },
    { path: '/profile', component: PostProfile, layout: HeaderOnly },
    { path: '/profile/post', component: PostProfile, layout: HeaderOnly },
    { path: '/diary', component: Diary, layout: null },
    { path: '/message', component: Message, layout: null },
    { path: '/friend/friendlist', component: ContentFriend, layout: FriendLayout },
    { path: '/friend/friendRequests', component: FriendRequests, layout: FriendLayout },
    { path: '/friend', component: ContentFriend, layout: FriendLayout },
];

// const privateRoutes = [

// ]

export { publicRoutes };
