import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import MyPagination from "../../components/Pagination/MyPagination";
import SingleContent from "../../components/Content/SingleContent";
const Series = () => {
    const [numOfPages, setNumOfPages] = useState();
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const fetchTopRated = async () => {

        const {data} = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        
        console.log(data);
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };  
    useEffect(() => {
        fetchTopRated();
    }, [page]);
    return (
        <div>
            <span className='pageTitle'>Series</span>
            
            <div className="movies">
                {
                    content && content.map((c) =>
                    
                        <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.name} date={c.first_air_date} overview={c.overview} media_type="tv" vote_average={c.vote_average}/>
                    
                    )
                }
            </div>
            {numOfPages > 1 && (
            <MyPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
            </div>
    );
}

export default Series
