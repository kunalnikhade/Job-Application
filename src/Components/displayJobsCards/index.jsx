import { IoLocationOutline } from "react-icons/io5";
import { FaRegStar, FaBriefcase } from "react-icons/fa";
import "./index.css";
import { Link } from "react-router-dom";

const DisplayJobsCards = ({ jobDetails }) => {
  return (
    <Link to={`/Jobs/${jobDetails.id}`} className="text-decoration-none">
      <li className="job-card p-4 list-unstyled m-3 rounded-3 shadow bg-white hover-shadow-lg transition">
        {/* Job Header */}
        <div className="d-flex mb-4 align-items-center">
          <img
            className="me-3 rounded-circle border shadow-sm"
            src={jobDetails.company_logo_url}
            width="70"
            alt="Company Logo"
          />

          <div>
            <h2 className="h5 mb-1 fw-bold text-dark">{jobDetails.title}</h2>
            <div className="d-flex align-items-center">
              <FaRegStar className="text-warning" />
              <span className="ms-2 fw-semibold text-muted">
                {jobDetails.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Job Info (Location, Employment, Package) */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <div className="d-flex align-items-center">
            <IoLocationOutline className="text-secondary" />
            <span className="ms-1 me-4 text-muted">{jobDetails.location}</span>
            <FaBriefcase className="text-secondary" />
            <span className="ms-2 text-muted">
              {jobDetails.employment_type}
            </span>
          </div>
          <div>
            <h3 className="h6 text-primary fw-bold">
              {jobDetails.package_per_annum}
            </h3>
          </div>
        </div>

        {/* Job Description */}
        <h4 className="h6 text-primary fw-bold">Job Description</h4>
        <p className="text-muted">{jobDetails.job_description}</p>
      </li>
    </Link>
  );
};

export default DisplayJobsCards;
