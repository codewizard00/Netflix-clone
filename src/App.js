import React,{useState} from 'react'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import Header from './components/header'
import Home from './components/Home'
import Moviedetails from './components/moviedetails'
import Pagenotfound from './components/Pagenotfound'
import Tvdetail from './components/tv'
import Footer from './components/footer'

function App() {

  const [search,setSearch] = useState('');
  const [searchData,setSearchData] = useState([]);
  return (
    <div>
      <Router>
        <Header search={search} setSearch={setSearch} setSearchData={setSearchData} searchData={searchData} />
        <Switch>
          <Route path="/" exact>
            <Home searchData={searchData} search={search}/>
          </Route>
          <Route path="/movie/:id" exact>
            <Moviedetails  />
          </Route>
          <Route path="/tv/:id" exact>
            <Tvdetail />
          </Route>
          <Route component={Pagenotfound}></Route>
        </Switch>
      </Router>
      <Footer/>
    </div>
  )
}

export default App