import { Button, CircularProgress} from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
import { useParams } from 'react-router';
import { useHistory} from 'react-router-dom';
import "./moviedetail.css"
import useMediaQuery from '@mui/material/useMediaQuery';

function Moviedetails() {
    const matches = useMediaQuery('(min-width:600px)');
    const history = useHistory()
    const [trailer, setTrailer] = useState()
    const [site, setSite] = useState(false)
    const [cast,setCast] = useState([]);
    const [recomm,setRecomm] = useState([]);
    const [movie,setMovie] = useState([]);
    const [similar,setSimilar] = useState([]);
    const {id} = useParams();
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
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=15ac581e8d1bb92f5f6881c840049492`)
            .then(res => res.json())
            .then(res => setRecomm(res))
            .catch(err => console.log(err))
    },[recomm])
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=15ac581e8d1bb92f5f6881c840049492&language=en-US`)
            .then(res => res.json())
            .then(res => setMovie(res))
            .catch(err => console.log(err))
    },[movie])
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=15ac581e8d1bb92f5f6881c840049492&language=en-US&page=1`)
            .then(res => res.json())
            .then(res => setSimilar(res))
            .catch(err => console.log(err))
    },[similar])
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=15ac581e8d1bb92f5f6881c840049492&language=en-US`)
            .then(res => res.json())
            .then(res=>setCast(res))
            .catch(err => console.log(err))
    },[cast])
    return (
        <div>
            <div style={{ display: "flex", marginTop: "5%" ,height:"80vh"}} className="movied">
                    {matches?<div  style={{ width: "50%",paddingLeft:"15%" }}><img width="62%" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}></img>
                </div>:<div style={{marginLeft:"5%",marginTop:"5%"}}><img width="120%" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}></img>
                </div>}
                    {matches?<div style={{ width: '70%'}} className="movieded">
                    <h1 style={{width:"60%",fontSize:"150%"}} >{movie.title}</h1>
                    <h4 style={{marginTop:'-15px'}}>Release Date:{movie.release_date}</h4>
                    <div  >
                    <p style={{width:"60%"}}>{movie.overview}</p>
                    </div>
                    
                    <h3>Vote :{movie.vote_average}</h3>
                    
                    <Button color="secondary" variant="contained" onClick={handleClick}>Play trailer</Button>
                </div>:<div style={{ width: '50%',marginLeft:"15%"}} className="movieded">
                    <h1 style={{width:"80%",fontSize:"150%"}} >{movie.title}</h1>
                    <h4 style={{marginTop:'-15px'}}>Release Date:{movie.release_date}</h4>
                    <div style={{overflow:"scroll",height:"35%"}} >
                    <p style={{width:"80%"}}>{movie.overview}</p>
                    </div>
                    <h3>Vote :{movie.vote_average}</h3>
                    <Button color="secondary" variant="contained" onClick={handleClick}>Play trailer</Button>
                </div>}
                

            </div>
            {site?<><YouTube videoId={trailer} opts={opts} /></>:<></>}
            <div style={{marginTop:"5%"}}>  
                <h1 style={{marginLeft:"2%",fontSize:"160%"}}>Cast</h1> 
            <div className="similar_poster">
                {cast.length===0?<h1>loading</h1>:cast.cast.map(item=>
                <>
                {item.profile_path===null?<></>:
                <>
                <div style={{marginLeft:"1%"}}>
                    <div>
                <img style={{height:"10%",width:"10%",borderRadius:"5%",marginLeft:"4%",height:"150px",width:"100px"}} src={`https://image.tmdb.org/t/p/w185/${item.profile_path}`}/>
                </div>
                <div style={{marginTop:"-20%",marginLeft:"10%"}}>
                <p>{item.name}</p>
                </div>
                </div>
                </>} 
                </>
               )}
            </div>
            </div> 
            <div>
            <h1 style={{marginLeft:"2%",fontSize:"160%"}}>Recommendations</h1>
            {recomm.length===0?<CircularProgress/>:
                <div className="similar_poster">
                {recomm.results.map((item)=>
                <>
                
                <div style={{marginLeft:"1%"}}>
                    <div>
                        <Button onClick={()=>{history.push(`/movie/${item.id}`);window.scrollTo(0,0)}} >
                    <img style={{borderRadius:"5%"}} height="80%" src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}></img>
                    </Button>
                    </div>
                </div>
                </> 
                )} 
             </div>
            }
            <div>
            <h1 syle={{marginLeft:"2%",fontSize:"160%"}}>Similar</h1>
            {similar.length===0?<h1>loading</h1>:
                <div className="similar_poster">
                {similar.results.map((item)=>
                <>
                <div>
                    <div>
                        <Button onClick={()=>{history.push(`/movie/${item.id}`);window.scrollTo(0,0)}}>    
                    <img height="90%" style={{borderRadius:"5%",marginLeft:"5%"}} src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}></img>
                    </Button>
                    </div>
                </div>
                </> 
                )} 
             </div>
            }
            </div>
            </div>    
        </div>

    )
}

export default Moviedetails