import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import BetPage from '../BetPage/BetPage';
import AddBetPage from '../AddBetPage/AddBetPage';
import EditBetPage from '../EditBetPage/EditBetPage';
import TeamsPage from '../TeamsPage/TeamsPage'
import userService from '../../utils/userService';
import NavBar from '../../components/NavBar/NavBar';
import { getLeagueRecords } from '../../utils/sports-api';
import * as betsAPI from '../../utils/bets-api';
import * as sportsAPI from '../../utils/sports-api';
import 'bootstrap/dist/css/bootstrap.min.css'
import TeamSchedulePage from '../TeamSchedulePage/TeamSchedulePage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      bets: [],
      teamSchedule: []
    };
  }

  /*--- Callback Methods ---*/
  handleLogout = () => {
    userService.logout();
    this.setState({user: null, bets: []})
  }

  

  handleAddBet = async newBetData => {
    const newBet = await betsAPI.create(newBetData);
    this.setState(state => ({
      bets: [...state.bets, newBet]
    }),
    () => this.props.history.push('/'))
  }

  handleDeleteBet= async id => {
    await betsAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      bets: state.bets.filter(b => b._id !== id)
    }), () => this.props.history.push('/'));
  }

  handleUpdateBet = async updatedBetData => {
    const updatedBet = await betsAPI.update(updatedBetData);
    const newBetsArray = this.state.bets.map(b => 
      b._id === updatedBet._id ? updatedBet : b
    );
    this.setState(
      {bets: newBetsArray},
      // This cb function runs after state is updated
      () => this.props.history.push('/')
    );
   }


  /*--- Lifecycle Methods ---*/

  // async componentDidMount() {
  //   const records = await getLeagueRecords();
  //   console.log(`hiiiiii`, records)
  //   // this.setState({
  //   //   team: records.table[0].played
  //   // })
  // }

  handleSignupOrLogin = async () => {
    this.setState({user: userService.getUser()}, () => this.getUserBet()) 
  }

  async componentDidMount() {
    this.getUserBet()
  }
  
  async getUserBet() {
    const bets = await betsAPI.getAll();
    this.setState({bets:bets});
  }
  
  async getTeamSchedule(id) {
    console.log(`tem schedule`, teamSchedule)
    const teamSchedule = await sportsAPI.getTeamSchedule(id);
    this.setState({teamSchedule})
  }


  
  render() {
    return (
      <div>
        <NavBar 
        user={this.state.user} 
        handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path='/' render={() =>
           <BetPage 
           bets={this.state.bets}
           user={this.state.user}
           handleDeleteBet={this.handleDeleteBet}
           /> 
          }/>
           <Route exact path='/teams' render={() => 
          <TeamsPage
          getTeamSchedule={this.getTeamSchedule}
          />
           }/>
           <Route exact path='/schedule/:id' render={() => 
          <TeamSchedulePage 
          teamSchedule={this.state.teamSchedule}
          
          />
           }/>
          <Route exact path='/add' render={() =>
           <AddBetPage 
           handleAddBet={this.handleAddBet}
           user={this.state.user}
           /> 
          
          }/>

          <Route exact path='/edit' render={({location}) => 
          <EditBetPage
            handleUpdateBet={this.handleUpdateBet}
            location={location}
          />
          } />
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
              
            />
          }/>
          <Route exact path='/login' render={({history}) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
        </Switch>
      </div>
    );
  }
}

export default App;