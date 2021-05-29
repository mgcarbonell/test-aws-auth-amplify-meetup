import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API, Auth } from 'aws-amplify';

function App() {
  async function callApi() {
    const user = await Auth.currentAuthenticatedUser();
    console.log('user: ', user);
    const token = user.signInUserSession.idToken.jwtToken;
    console.log('token: ', token)

    const requestInfo = {
      headers: {
        Authorization: token,
      }
    }

    const data = await API.get('meetuptestapi', '/hello', requestInfo)
    console.log("data: ", data);
  }
  return (
    <AmplifyAuthenticator>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
                </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
                </a>
        </header>
        <buttion onClick={callApi}>Call API</buttion>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  )
}

export default withAuthenticator(App);
