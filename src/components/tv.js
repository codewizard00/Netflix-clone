import { CircularProgress,Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useHistory} from 'react-router-dom'

function Tvdetail() {
    
    const {id} = useParams();
    const [epi, setEpi] = useState([]);
    const [movie,setMovie] = useState([]);
    const [recomm,setRecomm] = useState([]);
    const [cast,setCast] = useState([]);
    const matches = useMediaQuery('(min-width:600px)');
    const history = useHistory();
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=15ac581e8d1bb92f5f6881c840049492&language=en-US`)
            .then(res => res.json())
            .then(res=>setMovie(res))
            .catch(err => console.log(err))
    },[movie])
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/season/1?api_key=15ac581e8d1bb92f5f6881c840049492&language=en-US`)
            .then(res => res.json())
            .then(res=>setEpi(res))
            .catch(err => console.log(err))
    },[epi])
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=15ac581e8d1bb92f5f6881c840049492&language=en-US`)
            .then(res => res.json())
            .then(res=>setCast(res))
            .catch(err => console.log(err))
    },[cast])
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=15ac581e8d1bb92f5f6881c840049492&language=en-US`)
            .then(res => res.json())
            .then(res=>setRecomm(res))
            .catch(err => console.log(err))
    },[recomm])
    return (
        <div>
            <div style={{ display: "flex", marginTop: "5%" ,height:"80vh"}} className="movied">
                    {matches?<div  style={{ width: "50%",paddingLeft:"15%" }}><img width="62%" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}></img>
                </div>:<div style={{marginLeft:"5%",marginTop:"5%"}}><img width="120%" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}></img>
                </div>}
                    {matches?<div style={{ width: '70%'}} className="movieded">
                    <h1 style={{width:"60%",fontSize:"150%"}} >{movie.name}</h1>
                    <h4 style={{marginTop:'-15px'}}>Seasons:{movie.number_of_seasons}</h4>
                    <div  >
                    <p style={{width:"60%"}}>{movie.overview}</p>
                    </div>
                    
                    <h3>Vote :{movie.vote_average}</h3>
                </div>:<div style={{ width: '50%',marginLeft:"15%"}} className="movieded">
                    <h1 style={{width:"80%",fontSize:"150%"}} >{movie.name}</h1>
                    <h4 style={{marginTop:'-15px'}}>Release Date:{movie.release_date}</h4>
                    <div style={{overflow:"scroll",height:"35%"}} >
                    <p style={{width:"80%"}}>{movie.overview}</p>
                    </div>
                    <h3>Vote :{movie.vote_average}</h3>
                </div>}
            </div>
 
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

            <div style={{marginTop:"5%"}}>  
                <h1 style={{marginLeft:"2%",fontSize:"160%"}}>Season 1 : Episodes</h1> 
            <div style={{display:'flex',flexDirection:"row",overflowX:"hidden",overflowX:"scroll",scrollbarWidth:"none"}}>
            {epi.length===0?<h1>loading</h1>:epi.episodes.map(item=>
                <>
                {item.still_path===null?<></>:
                <div>
                <img height="190px" width="180px" style={{borderRadius:"5%",marginLeft:"10%"}} src={`https://image.tmdb.org/t/p/w185/${item.still_path}`}/>
                </div>} 
                </>
                )}
                
            </div>
            </div>
            <h1 style={{marginLeft:"2%",fontSize:"160%"}}>Recommendations</h1>
            {recomm.length===0?<CircularProgress/>:
                <div className="similar_poster">
                {recomm.results.map((item)=>
                <>
                <div style={{marginLeft:"1%"}}>
                    <div>
                        <Button onClick={()=>{history.push(`/tv/${item.id}`);window.scrollTo(0,0)}} >
                    <img style={{borderRadius:"5%"}} height="80%" src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}></img>
                    </Button>
                    </div>
                </div>
                </> 
                )} 
             </div>
            }
        </div>
    )
}

export default Tvdetail