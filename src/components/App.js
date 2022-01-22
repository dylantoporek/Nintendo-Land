import React, { useEffect, useState } from "react";
import Login from '../components/pages/Login'


function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // auto-login
  //   fetch("http://localhost:3000/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
      <div>You Are Logged In!</div>
  );
}

export default App;

