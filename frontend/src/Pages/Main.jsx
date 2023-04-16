import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { GET_GAME_URL, getAuthHeader, HOST, getToken } from '../utils/utils';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import AddCard from '../Components/AddCard';
import QuizCard from '../Components/QuizCard';

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      games: []
    }
    this.setGames = this.setGames.bind(this)
  }

  setGames () {
    fetch(`${HOST}${GET_GAME_URL}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      this.setState({
        games: res.quizzes
      })
    }).catch(error => {
      console.log(error.message)
    })
  }

  componentDidMount () {
    this.setGames()
  }

  render () {
    return !getToken()
      ? <Navigate to='/login' replace={true}/>
      : (
          <Box display={'flex'} justifyContent={'center'}>
            <Grid container overflow={'auto'} p={1} m={0} maxHeight={'calc(100vh - var(--nav-h))'}>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2} p={1}>
                <AddCard onSubmitSuccess={this.setGames}/>
              </Grid>
              {this.state.games.map((game, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2} p={1}>
                  <QuizCard image={game.thumbnail === null ? '/assets/default-thumbnail.jpg' : game.thumbnail} title={game.name} quizId={game.id} onDeleteSuccess={this.setGames}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
  }
}

export default Main
