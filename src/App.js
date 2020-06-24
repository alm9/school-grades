import React from 'react';
import './App.css';

import * as api from './api/apiService';

// export default function App() {
function App() {
  const testApi = async () => {
    // console.log(await api.getAllGrades());
    const res = await api.getAllGrades();
    console.log(res);
  };
  testApi();

  return (
    <div className="App">
      <header className="App-header">Eae Dé</header>
    </div>
  );
}

export default App; //pode dar o export antes de function
