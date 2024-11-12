import { useParams } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import { FaRegStar, FaBriefcase } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const JobCardsDetails = () => {
  const { id } = useParams();
  const token = Cookies.get("jwtToken");

  const [jobDetails, setJobDetails] = useState({
    JobCardsDetails: null,
    similarDetails: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const api = `https://apis.ccbp.in/jobs/${id}`;

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(api, options);
        if (response.ok) {
          const data = await response.json();
          setJobDetails({
            ...jobDetails,
            JobCardsDetails: data.job_details,
            similarDetails: data.similar_jobs,
          });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobDetails();
  }, [id, token]);

  return (
    <>
      <Header />
      {loading ? (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div className="job-details-container container mt-4 p-4 rounded bg-light shadow">
            <>
              {/* Job Header */}
              <div className="job-header d-flex align-items-center mb-4">
                <img
                  className="me-3 rounded"
                  src={jobDetails.JobCardsDetails.company_logo_url}
                  alt="company logo"
                  width="80px"
                />
                <div className="d-flex flex-column">
                  <h1 className="h4 fw-bold mb-1">
                    {jobDetails.JobCardsDetails.title}
                  </h1>
                  <div className="d-flex align-items-center">
                    <FaRegStar className="me-1 text-warning" />
                    <span className="ms-2 text-muted">
                      {jobDetails.JobCardsDetails.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Info (Location, Employment, Package) */}
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
                <div className="d-flex align-items-center text-muted">
                  <IoLocationOutline className="me-1" />
                  <span className="me-4">
                    {jobDetails.JobCardsDetails.location}
                  </span>
                  <FaBriefcase className="me-2" />
                  <span>{jobDetails.JobCardsDetails.employment_type}</span>
                </div>
                <div>
                  <h3 className="h5 fw-bold text-primary">
                    {jobDetails.JobCardsDetails.package_per_annum}
                  </h3>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="h6 mb-2 text-primary">Job Description</h4>
                  <a
                    href={jobDetails.JobCardsDetails.company_website_url}
                    target="_blank"
                  >
                    <button className="btn btn-primary rounded-5">Apply</button>
                  </a>
                </div>

                <p className="text-muted mt-3">
                  {jobDetails.JobCardsDetails.job_description}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="h6 mb-3 text-primary">Skills</h4>
                <div className="d-flex flex-wrap">
                  {jobDetails.JobCardsDetails.skills.map((eachSkill) => (
                    <div
                      key={eachSkill.name}
                      className="skill-item d-flex align-items-center me-4 mb-3 p-2 border rounded bg-white shadow-sm"
                    >
                      <img
                        src={eachSkill.image_url}
                        alt={eachSkill.name}
                        className="me-2 rounded-circle"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span className="fw-bold">{eachSkill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Life at Company */}
              <div className="mt-4">
                <h6 className="text-primary">Life at Company</h6>
                <div className="d-flex align-items-center mt-2">
                  <p className="text-muted me-3">
                    {jobDetails.JobCardsDetails.life_at_company.description}
                  </p>
                  <img
                    className="rounded"
                    src={jobDetails.JobCardsDetails.life_at_company.image_url}
                    alt="Life at Company"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              </div>
            </>
          </div>
          {/* Similar Jobs Section */}
          <div className="similar-jobs-section mt-5 m-2">
            <h3 className="m-2 mb-4 text-primary fw-bold display-5">
              Similar Jobs
            </h3>
            <div className="row">
              {jobDetails.similarDetails.map((each) => (
                <div key={each.id} className="col-md-4 mb-4">
                  <div className="p-3 rounded-3 shadow-lg bg-white h-100 border border-light">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        className="rounded me-3"
                        src={each.company_logo_url}
                        alt={each.title}
                        width="60"
                      />
                      <div className="d-flex flex-column">
                        <h6 className="h6 mb-2 text-dark fw-bold">
                          {each.title}
                        </h6>
                        <div className="d-flex align-items-center">
                          <FaRegStar className="text-warning" />
                          <span className="ms-2 text-muted">{each.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="d-flex align-items-center me-4 text-secondary">
                        <IoLocationOutline className="me-1" />
                        <span>{each.location}</span>
                      </div>
                      <div className="d-flex align-items-center text-secondary">
                        <FaBriefcase className="me-2" />
                        <span>{each.employment_type}</span>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div>
                      <h6 className="h6 text-primary">Description</h6>
                      <p className="text-muted">{each.job_description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobCardsDetails;
