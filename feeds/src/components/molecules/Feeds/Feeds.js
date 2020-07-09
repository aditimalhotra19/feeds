import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './feeds.css';

const Feeds = () => {
    const [feeds, setFeeds] = useState([]);
    const [sortType, setSortType] = useState('likes');
    let activePage = 1;
    const feedsSet = [
        'http://www.mocky.io/v2/59b3f0b0100000e30b236b7e',
        'http://www.mocky.io/v2/59ac28a9100000ce0bf9c236',
        'http://www.mocky.io/v2/59ac293b100000d60bf9c239'
    ];

    const fetchFeeds = async(feedVal) => {
        const feedData = await axios({url: feedsSet[feedVal-1], timeout: 1000 * 5,})
            .catch(err => {
                console.log(err);
                // If there was a problem, we want to
                // dispatch the error condition
                if(err.data && err.status === 404) {
                    console.log(err.data);
                } else {
                return (
                    <div className="error">
                        Please check your network connection and try again.
                    </div>
                    )
                }    
                return err;
            });
        setFeeds(feedData.data.posts);
        activePage = feedData.data.page;
    }
    useEffect(() => {
        fetchFeeds(1)
    }, [1]);
    
    const sortArray = type => {
        if(feeds.length > 0) {
            const types = {
                likes: 'likes',
                shares: 'shares',
                views: 'views',
            };
            const sortProperty = types[type];
            const sorted = [...feeds].sort((a, b) => b[sortProperty] - a[sortProperty]);
            setFeeds(sorted);
        }
    };
   
    return (
        <div className="feeds-container">
                <select onChange={(e) => {                    
                    setSortType(e.target.value);
                    sortArray(e.target.value);
                }}> 
                    <option value="select">Please select</option>
                    <option value="likes">likes</option>
                    <option value="shares">shares</option>
                    <option value="views">views</option>
                </select>
                <ul>
                {
                    feeds.map(post => (<>
                        <li className="feed" key={post.event_name}>
                            <img src={post.thumbnail_image} alt={post.event_name}/>
                            <p key={post.event_name}>{post.event_name}</p>
                            <p>Posted date-{post.event_date}</p>
                            <p>Views-{post.views}</p>
                            <p>Likes={post.likes}</p>
                            <p>Shares={post.shares}</p>
                        </li></>
                        ))
                }
                </ul>
                
                <div className="pagination-container">
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={3}
                        onChange={(e) => fetchFeeds(e)}
                        hideDisabled
                        hideFirstLastPages
                        hideNavigation
                        activeLinkClass="active"
                    />
                </div>
        </div>
    )
}

export default Feeds;