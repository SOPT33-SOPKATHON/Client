import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CreateEvent from './pages/CreateEvent';
import CreateMessage from './pages/CreateMessage';
import EventDetail from './pages/EventDetail';
import EventList from './pages/EventList';
import { Loading } from './pages/Loading';
import { Login } from './pages/Login';
import RequireAuthRoute from './RequireAuthRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuthRoute />}>
          <Route path="/event-list" element={<EventList />} />
          <Route path="/create-event" element={<CreateEvent></CreateEvent>}></Route>
        </Route>
        {/* </Route> */}
        <Route path="/" element={<Login />} />
        <Route path="/loading" element={<Loading />} />

        <Route path="/event/:uuId" element={<EventDetail />} />
        <Route path="/create-message/:uuId" element={<CreateMessage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
