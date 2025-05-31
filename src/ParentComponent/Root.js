import Banner from "../ChildComponent/Banner";
import Header from "../ChildComponent/Header";
import Movies from "../ChildComponent/Movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchList from "../ChildComponent/WatchList";

function Root() {
  return (
    <div className="Root">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Root;
