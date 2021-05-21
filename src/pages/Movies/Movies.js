import axios from 'axios';
import './Movies.css'
import React,{ useEffect, useState } from 'react';
import SingleContent from '../../components/Content/SingleContent';
import MyPagination from '../../components/Pagination/MyPagination';

const Movies = () => {
    const [numOfPages, setNumOfPages] = useState();
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    
    const fetchTopRated = async () => {

        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };  
    useEffect(() => {
        window.scroll(0,0);
        fetchTopRated();
    }, [page]);
    return (
        <div>
            <span className='pageTitle'>Movies</span>
            
            <div className="movies">
            {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <MyPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
    );
};
export default Movies;