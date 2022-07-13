import React from 'react';
import { Provider } from 'react-redux';
import store from "./redux/store";
import './App.css';

// components
import ProfilePage from './component/ProfilesPage/ProfilesPage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    </div>
  );
}

export default App;
