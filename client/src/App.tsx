import React from 'react';
import { Provider } from 'react-redux';
import axios from "axios";
import store from "./redux/store";
import './App.css';

import { addProfile } from "./redux/profilesAction";

// components
import ProfilePage from './component/ProfilesPage/ProfilesPage';

function App() {
  React.useEffect(() => {
    axios
      .get("/profiles")
      .then((res) => {
        for (const profile of res.data.profiles) {
          addProfile(profile);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    </div>
  );
}

export default App;
