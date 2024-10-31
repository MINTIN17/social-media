import CreatePost from "../../components/CreatePost";
import Post from "../../components/Post";

const apiUrl = `${process.env.REACT_APP_link_server}/post`;

function Home() {
    return (<div>
        <CreatePost />
        <Post apiUrl={apiUrl}/>
    </div>
    )
}

export default Home;