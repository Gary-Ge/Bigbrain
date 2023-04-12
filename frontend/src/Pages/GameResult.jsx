import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Chart, BarSeries, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
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
import TableRow from '@mui/material/TableRow';
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
const data = [
  createData1('0', 0),
  createData1('1', 20),
  createData1('2', 40),
  createData1('3', 60),
  createData1('4', 80),
  createData1('5', 100),
];
export function Linechart () {
  const theme = useTheme();
  return (
      <React.Fragment>
        <Title>Correct rate</Title>
        <ResponsiveContainer>
          <LineChart
            data={data}
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
               People (%)
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

const databar = [
  { question: '1', time: 5 },
  { question: '2', time: 10 },
  { question: '3', time: 20 },
  { question: '4', time: 40 },
  { question: '5', time: 10 },
];

export function Barchart () {
  return (
          <Chart
            data={databar}
          >
            <ArgumentAxis />
            <ValueAxis max={60} />
            <BarSeries
              valueField="time"
              argumentField="question"
            />
            <Title>Average Time</Title>
          </Chart>
  )
}
function createData (id, rank, name, score) {
  return { id, rank, name, score };
}
const rows = [
  createData(
    0,
    '1',
    'Elvis Presley',
    312.44,
  ),
  createData(
    1,
    '2',
    'Paul McCartney',
    866.99,
  ),
  createData(
    2,
    '3',
    'Tom Scholz',
    100.81,
  ),
  createData(
    3,
    '4',
    'Michael Jackson',
    654.39,
  ),
  createData(
    4,
    '5',
    'Bruce Springsteen',
    212.79,
  ),
];
function Orders () {
  return (
      <React.Fragment>
        <Title>Top 5 Users</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{`$${row.score}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
  );
}

const mdTheme = createTheme();
export default function DashboardContent () {
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
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
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
              <Grid item xs={12} md={4} lg={3}>
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
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
