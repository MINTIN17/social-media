import axios from "axios";
import Post from "../../components/Post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CreatePost from "../../components/CreatePost";

function LinkPost() {
    const { id } = useParams<{ id: string }>();
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_link_server}/post/${id}`);
                setResponseData(response.data);
                console.log(responseData);
                setLoading(false);
            } catch (err) {
                // setError(err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        
        <div>
            <Post initialData={responseData} apiUrl="" />
        </div>
    );
}

export default LinkPost;
