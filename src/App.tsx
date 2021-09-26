import React from 'react';
import './App.css';
import MovieList from "./pages/movies/MovieList";
import {Container, createTheme, CssBaseline, IconButton, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import store from "./redux/configureStore";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {Header} from './component/Header';
import {MovieDetail} from "./pages/movies/MovieDetail";

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Provider store={store}>
                    <Router>
                        <CssBaseline/>
                        <Container maxWidth="lg">
                            {theme.palette.mode} mode
                            <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                            </IconButton>
                            <Header/>
                            <Switch>
                                <Route exact path="/" component={MovieList}/>
                                <Route exact path="/detail" component={MovieDetail}/>
                            </Switch>
                        </Container>
                    </Router>
                </Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
