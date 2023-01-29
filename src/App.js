import Home from "./routes/Home";
import Profile from "./routes/Profile";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./routes/Login";
import Register from "./routes/Register";
import Error from "./routes/Error";
import { ContextProvider } from "./context/context";
import LoginMiddleware from "./middlewares.js/LoginMiddleware";
import HomeMiddleware from "./middlewares.js/HomeMiddleware";
import Chats from "./routes/Chats";
import ChatMiddleware from "./middlewares.js/ChatMiddleware";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<HomeMiddleware><Home /></HomeMiddleware>}/>
          
          <Route path="/login" element={<LoginMiddleware><Login /></LoginMiddleware>} />
          <Route path="/:username" element ={<Profile />} />
          <Route path="/chats" element ={<ChatMiddleware><Chats /></ChatMiddleware>} />
          <Route parh="*" element={<Error />} />
        </Routes>
      </ContextProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
