import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home-cont d-flex justify-content-between align-items-center">
        <div className="home-content-cont">
          <h1 className="home-heading">Explore Opportunities That Match Your Passion</h1>
          <p>
            A World of Opportunities Awaits as Millions Seek Job Listings, Salary Info, and Company Feedback.
            Explore Roles That Fit Your Skillset and Potential.
          </p>
          <Link to="/jobs">
            <button className="btn btn-outline-primary mt-5">Find Jobs</button>
          </Link>
        </div>
        
      </div>
    </>
  );
};

export default Home;
