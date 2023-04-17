import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import { GET_GAME_URL, GET_SESSION_URL, HOST, getAuthHeader } from '../utils/utils';
export function Title (props) {
  return (
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
  );
}
Title.propTypes = {
  children: PropTypes.node,
};

function createData1 (time, amount) {
  return { time, amount };
}
const mdTheme = createTheme();
export default function DashboardContent ({ sessionId, quizId }) {
  const [items, setItems] = useState([]);
  const [score, setScores] = useState([]);
  const getSessionResults = () => {
    fetch(`${HOST}${GET_SESSION_URL}/${sessionId}/results`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setItems(res.results)
    }).catch(error => {
      console.log(error)
    })
  }
  useEffect(() => {
    getSessionResults();
  }, []);
  function Accuracy (items) {
    if (!items || items.length === 0) {
      console.log('Error: items is empty or undefined');
      return [];
    }
    const accuracydata = [];
    const accuracy = [];
    const numPlayers = items.length;
    const numquestions = items[0].answers.length;
    for (let questionId = 0; questionId < numquestions; questionId++) {
      accuracy.push(questionId - questionId)
    }
    for (let playerId = 0; playerId < numPlayers; playerId++) {
      for (let answerId = 0; answerId < numquestions; answerId++) {
        if (items[playerId].answers[answerId].correct === true) {
          accuracy[answerId]++;
        }
      }
    }
    for (let questionId2 = 0; questionId2 < accuracy.length; questionId2++) {
      accuracydata.push(createData1(questionId2 + 1, (accuracy[questionId2] / numPlayers) * 100))
    }
    return (accuracydata)
  }
  function Linechart () {
    const theme = useTheme();
    return (
        <React.Fragment>
          <Title>Correct rate</Title>
          <ResponsiveContainer>
            <LineChart
              data={Accuracy(items)}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey="time"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                 Accuracy (%)
                </Label>
              </YAxis>
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="amount"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </React.Fragment>
    );
  }
  function AveTime (items) {
    if (!items || items.length === 0) {
      console.log('Error: items is empty or undefined');
      return [];
    }
    const avgTimeData = [];
    const AvgTime = [];
    const numPlayers = items.length;
    const numquestions = items[0].answers.length;
    for (let questionId = 0; questionId < numquestions; questionId++) {
      AvgTime.push(questionId - questionId)
    }
    for (let playerId = 0; playerId < numPlayers; playerId++) {
      for (let answerId = 0; answerId < numquestions; answerId++) {
        AvgTime[answerId] += ((new Date(items[playerId].answers[answerId].answeredAt).getTime() / 1000) - (new Date(items[playerId].answers[answerId].questionStartedAt).getTime() / 1000));
      }
    }
    for (let questionId2 = 0; questionId2 < AvgTime.length; questionId2++) {
      avgTimeData.push(createData1(questionId2 + 1, (AvgTime[questionId2] / numPlayers)))
    }
    return ((avgTimeData)
    )
  }
  function Barchart () {
    const theme = useTheme();
    return (
        <React.Fragment>
          <Title>Average Time</Title>
          <ResponsiveContainer>
            <LineChart
              data={AveTime(items)}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey="time"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                 Time (s)
                </Label>
              </YAxis>
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="amount"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </React.Fragment>
    );
  }
  useEffect(() => {
    fetch(`${HOST}${GET_GAME_URL}/${quizId}`, {
      method: 'GET',
      headers: getAuthHeader()
    }).then(res => res.json()).then(res => {
      if (res.error != null) {
        throw new Error(res.error)
      }
      setScores(res.questions)
    }).catch(error => {
      console.log(error)
    })
  }, [])
  function Points (score, items) {
    if (!items || items.length === 0) {
      console.log('Error: items is empty or undefined');
      return [];
    }
    if (!score || score.length === 0) {
      console.log('Error: score is empty or undefined');
      return [];
    }
    const everyquestionscore = []
    const time = []
    const numquesiton = score.length;
    for (let questionId = 0; questionId < numquesiton; questionId++) {
      everyquestionscore.push(score[questionId].points)
    }
    for (let timeId = 0; timeId < numquesiton; timeId++) {
      time.push(score[timeId].duration)
    }
    const numPlayers = items.length;
    const numquestions = items[0].answers.length;
    const totalscore = []
    const player = []
    for (let questionId = 0; questionId < numPlayers; questionId++) {
      totalscore.push(questionId - questionId)
    }
    for (let playerId = 0; playerId < numPlayers; playerId++) {
      player.push(items[playerId].name)
      for (let answerId = 0; answerId < numquestions; answerId++) {
        if (items[playerId].answers[answerId].correct === true) {
          totalscore[playerId] += (1 - ((new Date(items[playerId].answers[answerId].answeredAt).getTime() / 1000) - (new Date(items[playerId].answers[answerId].questionStartedAt).getTime() / 1000)) / time[answerId]) * everyquestionscore[answerId];
        }
      }
    }
    const playerScores = player.map((player, index) => [player, totalscore[index]]);
    playerScores.sort((a, b) => b[1] - a[1]);
    return playerScores.slice(0, 5);
  }
  function Orders () {
    return (
        <React.Fragment>
          <Title>Rank of Users</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Points(score, items).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1].toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
    );
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: 'calc(100vh - var(--nav-h))',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                <Linechart />
                </Paper>
              </Grid>
              {/* Recent bar chart */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    <Barchart />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Typography component="h2" variant="h6" gutterBottom style={{ marginTop: '5%', fontSize: '12px', textAlign: 'left' }}>
              Score Calculation Formula: (Remaining answer time/each question total time)*each question total score
          </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
