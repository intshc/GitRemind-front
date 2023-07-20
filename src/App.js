import './App.css';
import {AppBar, Toolbar, Typography} from "@mui/material";
import Login from "./components/Login";

function App() {
  return (
          <div className="App">
            <AppBar position="static"
                    style={{backgroundColor: 'darkviolet'}}>
              <Toolbar>
                <Typography variant="h6">
                  GitRemind
                </Typography>
              </Toolbar>
            </AppBar>
            <Login/>

          </div>
  );
}

export default App;
