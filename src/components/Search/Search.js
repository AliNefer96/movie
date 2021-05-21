import React,{useState, useEffect} from 'react';
import {createMuiTheme,Tab, 
    Tabs, TextField, ThemeProvider} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import MyPagination from "../../components/Pagination/MyPagination";
import SingleContent from "../../components/Content/SingleContent";



const Search = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page,setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const history = useHistory();
    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });
    

    const fetchSearch = async () => {
        try {
            const {data} = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    if(searchText.length>=2)
    fetchSearch();
    else if(searchText.length===0)
    history.push("/")
    
  }, [type, page, searchText]);
        
    
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
            <div className="search" style={{display: "flex", margin: '15px'}}>    
            <TextField style={{flex:1}}
            className="searchBox"
            label="Search"
            variant= "filled"
            onChange={(e) => setSearchText(e.target.value)}/>
           
            </div>
            <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
        </ThemeProvider>
        <div className="movies">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Results Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <MyPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
    );
};

export default Search
