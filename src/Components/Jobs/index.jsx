import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import FilterSection from "../FilterSection";
import DisplayJobsCards from "../displayJobsCards";
import "./index.css";

const Jobs = () => {
  // Loader state
  const [loading, setLoading] = useState(true);

  // Job details state
  const [allData, setData] = useState({
    jobsArr: [],
    empType: [],
    salaryRange: "",
    userSearch: "",
  });

  useEffect(() => {
    const token = Cookies.get("jwtToken");

    const getJobsList = async () => {
      const api = `https://apis.ccbp.in/jobs?employment_type=${allData.empType}&minimum_package=${allData.salaryRange}&search=${allData.userSearch}`;

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setLoading(true); // Start loading before fetching

      try {
        const response = await fetch(api, options);
        const data = await response.json();

        if (response.ok === true) {
          setData({ ...allData, jobsArr: data.jobs });
          setLoading(false); // Stop loading after fetched
        }
      } catch (error) {
        console.log(error);
      }
    };

    getJobsList();
  }, [allData.userSearch, allData.empType, allData.salaryRange]);

  const onChangeSearch = (e) => {
    // when we click ENTER Button
    if (e.key === "Enter") {
      setData({ ...allData, userSearch: e.target.value });
    }
  };

  const onChangeEmpType = (value, isChecked) => {
    if (isChecked) {
      setData({ ...allData, empType: [...allData.empType, value] });
    } else {
      setData({
        ...allData,
        empType: allData.empType.filter((each) => each !== value),
      });
    }
  };

  const onChangeSalaryRange = (value) => {
    setData({ ...allData, salaryRange: value });
  };

  return (
    <>
      <Header />
      <div className="job-Cards">
        <div className="row">
          <div className="col-5">
            <FilterSection
              empTypeFunc={onChangeEmpType}
              salaryRangeFunc={onChangeSalaryRange}
            />
          </div>
          <div className="col-7">
            <input
              onKeyUp={onChangeSearch}
              className="form-control mt-4 mb-4 p-2 border rounded"
              type="search"
              placeholder="Search the Company"
              style={{ width: "830px", marginLeft: "45px" }}
            />

            {/*  Loader */}
            {loading ? ( 
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : allData.jobsArr.length === 0 ? ( // No results check
              <div className="d-flex flex-column align-items-center justify-content-center text-center mt-5">
                <img
                  src="https://via.placeholder.com/300"
                  alt="No Results"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "200px" }}
                />
                <p className="lead text-muted">No Results Found</p>
                <p className="text-secondary">
                  Try adjusting your search or filter to find what you’re
                  looking for.
                </p>
              </div>
            ) : (  // job cards
              <ul className="d-flex flex-column">
                {allData.jobsArr.map((each) => (
                  <DisplayJobsCards key={each.id} jobDetails={each} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
