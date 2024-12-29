import axios from "axios";
import Post from "../../components/Post";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PostSearchHashTag() {
    const { tag } = useParams();
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const payload = { tag: tag };
                const response = await axios.post(`${process.env.REACT_APP_link_server}/post/search`, payload);
                setResponseData(response.data);
                setLoading(false);
            } catch (err) {
                // setError(err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [tag]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <Post initialData={responseData} apiUrl=""/>
        </div>
    );
}

export default PostSearchHashTag;
