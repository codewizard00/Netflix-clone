import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
import {Button} from "@material-ui/core"
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import "./home.css"
import Pagenotfound from './Pagenotfound';
import Carde from "./card"
import useMediaQuery from '@mui/material/useMediaQuery';
function Home({search,searchData}) {
// usestates
  const matches = useMediaQuery('(min-width:600px)');
  const [movie,setMovie]= useState([])
  const [site, setSite] = useState(false)
  const [trailer, setTrailer] = useState(false)
  const [data,setData] = useState([]);
  const [tv,setTv] = useState([]);
  const [trending,setTrending] = useState([]);
  const [upcoming,setUpcoming] = useState([]);
  const [rated,setRated] = useState([]);
  const [tvrated,setTvRated] = useState([]);

// YOUTUBE FUNCTIONALITY

  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
        autoplay: 1,
    },
};
const handleClick = () => {
  setSite(true)
  movieTrailer(movie.title).
      then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          const abc = urlParams.get('v')
          setTrailer(abc)
      })
      .catch(err => console.log(err))
}


// DATA FETCH HERE

//popular movie
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=15ac581e8d1bb92f5f6881c840049492&append_to_response=videos")
    .then(res=>res.json())
    .then(res=>{setData(res)
    localStorage.setItem('id',JSON.stringify(res))})
    .catch(err=>{
      let collection = localStorage.getItem('id')
      setData(JSON.parse(collection))      
    })
  },[]) 

// upcoming movies
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=15ac581e8d1bb92f5f6881c840049492")
    .then(res=>res.json())
    .then(res=>setUpcoming(res))
    .catch(err=>console.log(err))
  },[]) 

//trending movies of week 

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=15ac581e8d1bb92f5f6881c840049492")
    .then(res=>res.json())
    .then(res=>setTrending(res))
    .catch(err=>console.log(err))
  },[]) 

//Front Image  trending movie
  useEffect(()=>{
    const fetchData = async() =>{
    const request = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=15ac581e8d1bb92f5f6881c840049492")
    .catch(err=>{
      let collection = localStorage.getItem("user") 
      setMovie(JSON.parse(collection))
    })
    
    setMovie(
      request.data.results[
        Math.floor(Math.random()*request.data.results.length)
      ]
    )
    localStorage.setItem("user",JSON.stringify(
      request.data.results[
        Math.floor(Math.random()*request.data.results.length)
      ]
    ))
    return request
  }
  fetchData();
  },[])

// top rated movie
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=15ac581e8d1bb92f5f6881c840049492&language=en-US&page=1")
    .then(res=>res.json())
    .then(res=>setRated(res))
    .catch(err=>console.log(err))
  },[])
 
//popoular tv shows

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=15ac581e8d1bb92f5f6881c840049492&l&language=en-US&page=1")
    .then(res=>res.json())
    .then(res=>setTvRated(res))
    .catch(err=>console.log(err))
  },[])
  console.warn(searchData)

//top rated tv shows
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=15ac581e8d1bb92f5f6881c840049492&l&language=en-US&page=1")
    .then(res=>res.json())
    .then(res=>setTv(res))
    .catch(err=>console.log(err))
  },[])
console.log(searchData)
//code here
    if(search.length===0){
      if(data.length===0 || trending.length===0 || rated.length===0 ||upcoming.length===0 || tv.length===0){
        return(
          <div style={{marginLeft:"45%" ,height:"50%"}}>
        <CircularProgress disableShrink />;
        </div>
        )
      }
      else {
      return (    
        <div className="home">
           <div style={{
        backgroundSize:'cover',
        objectFit:"contain",
        filter:"brightness(70%)",
        backgroundImage:`url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
        backgroundPosition:"center center",
        paddingBottom:"5%",
        paddingTop:"10%"
        }}>
          
          <h1 className="postertitle">{movie.title}</h1>
          {matches?<h4 style={{paddingLeft:"5%",color:"white",width:"40%"}} >{movie.overview.substring(0,500)}...</h4>:<h4 style={{paddingLeft:"5%",color:"white",width:"40%"}} >{movie.overview.substring(0,250)}...</h4>}
          
          <Button style={{marginLeft:"5%"}} variant="contained"
           color="secondary" onClick={handleClick}>PLay</Button>
          
          <Link to={`/movie/${movie.id}`} style={{marginLeft:"1%",textDecoration:"none"}} > <Button variant="contained" color="secondary" >Know more</Button></Link>
           <div>
           </div>
          </div>
          <div style={{marginTop:'0%'}}>
      {site?<><YouTube videoId={trailer} opts={opts} /></>:<></>}
        </div>
          <h1 className="row_poster_title">Popular</h1>
          <div>
        <div className="row_poster">
        {data.results.map(item=>
            <div className="poster_item">
              <Link to={`/movie/${item.id}`}><img style={{borderRadius:"5%"}} height='80%' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}/></Link>
                </div>)}
        </div>
        <h1 className="row_poster_title">Trending</h1>
        </div>
        <div className='row_poster'>
        {trending.results.map(item=>
            <div className="poster_item">
              <Link to={`/movie/${item.id}`}><img height='80%' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} style={{borderRadius:"5%"}}/></Link>
                </div>)}
        
        </div>
        <h1 className="row_poster_title">Top Rated</h1>
        <div className="row_poster">
        {rated.results.map(item=>
            <div className="poster_item">
              <Link to={`/movie/${item.id}`}><img height='80%' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} style={{borderRadius:"5%"}}/></Link>
                </div>
                )}
        
        </div>
        <h1 className="row_poster_title">Upcoming</h1>
        <div className="row_poster">
        {upcoming.results.map(item=>
            <div className="poster_item">
              <Link to={`/movie/${item.id}`}>
                <img height='80%' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} style={{borderRadius:"5%"}}/>
                </Link>
                </div>
                )}
        
        </div>
        <h1 className="row_poster_title">Tv shows</h1>
        <div className="row_poster">
        {tv.results.map(item=>
            <div className="poster_item">
              <Link to={`/tv/${item.id}`}>
                <img height='80%' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} style={{borderRadius:"5%"}}/>
                </Link>
                </div>
                )}
        
        </div>
        <h1 className="row_poster_title">Top Tv shows</h1>
        <div className="row_poster">
        {tvrated.results.map(item=>
            <div className="poster_item">
              <Link to={`/tv/${item.id}`}>
                <img style={{borderRadius:"5%"}} height='80%' src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}/>
                </Link>
                </div>
                )}
        
        </div>
    </div>
      )
  } }

  else{
    if(searchData.length===0){
      return(
        <>
        <Pagenotfound/>
        </>
      )
    }
    else{
      return(
        <>
        <div style={{display:'flex',flexWrap:"wrap"}}>
        {searchData.results.length===0?<> <Pagenotfound/> </>:
        searchData.results.map(item=>
          <>
          {item.poster_path===undefined?<></>:<Carde item={item}/>}
            </>
          )
        }
        </div>
        </>
      )
    }

  }
    
}

export default Home
