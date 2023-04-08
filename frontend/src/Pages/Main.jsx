import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { GET_GAME_URL, HEADER_AUTH, HOST, getToken } from '../utils/utils';
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
      headers: HEADER_AUTH
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
          <Box display={'flex'} justifyContent={'center'} padding={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <AddCard onSubmitSuccess={this.setGames}/>
              </Grid>
              {this.state.games.map((game, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <QuizCard image={'assets/test-thumbnail.jpg'} title={game.name} questionNumber={15} quizId={game.id} onDeleteSuccess={this.setGames}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
  }
}

export default Main
