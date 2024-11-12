import { useEffect, useState } from 'react';
import './index.css';
import Cookies from 'js-cookie';

const employmentTypesList = [
  { label: 'Full Time', employmentTypeId: 'FULLTIME' },
  { label: 'Part Time', employmentTypeId: 'PARTTIME' },
  { label: 'Freelance', employmentTypeId: 'FREELANCE' },
  { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
];

const salaryRangesList = [
  { salaryRangeId: '1000000', label: '10 LPA and above' },
  { salaryRangeId: '2000000', label: '20 LPA and above' },
  { salaryRangeId: '3000000', label: '30 LPA and above' },
  { salaryRangeId: '4000000', label: '40 LPA and above' },
];

const FilterSection = ({ empTypeFunc, salaryRangeFunc }) => {
  
  const [profileDetails, setProfileDetails] = useState({});
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('');
  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const apiUrl = 'https://apis.ccbp.in/profile';
      const options = {
        headers: { Authorization: `Bearer ${token}` },
        method: 'GET',
      };
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        setProfileDetails(data.profile_details);
      }
    };
    fetchProfileDetails();
  }, [token]);

  // Render employment type checkboxes
  const renderEmploymentTypeOptions = () => {
    return employmentTypesList.map(({ label, employmentTypeId }) => (
      <li key={employmentTypeId} className="filters-list-item">
        <input
          type="checkbox"
          id={employmentTypeId}
          name="employment type"
          value={employmentTypeId}
          className="checkbox-input"
          onChange={(e) => empTypeFunc(e.target.value, e.target.checked)}
        />
        <label htmlFor={employmentTypeId} className="filter-label">{label}</label>
      </li>
    ));
  };

  // Render salary range radio buttons
  const renderSalaryRangeOptions = () => {
    return salaryRangesList.map(({ label, salaryRangeId }) => (
      <li key={salaryRangeId} className="filters-list-item">
        <input
          type="radio"
          id={salaryRangeId}
          name="salary ranges"
          value={salaryRangeId}
          checked={selectedSalaryRange === salaryRangeId}
          className="checkbox-input"
          onChange={(e) => {
            setSelectedSalaryRange(e.target.value);
            salaryRangeFunc(e.target.value);
          }}
        />
        <label htmlFor={salaryRangeId} className="filter-label">{label}</label>
      </li>
    ));
  };

  return (
    <div className="filters-group-container">
      {profileDetails && (
        <div className="profile-details-container">
          <img src={profileDetails.profile_image_url} alt="profile" className="profile-image" />
          <h1 className="profile-name">{profileDetails.name}</h1>
          <p className="profile-bio">{profileDetails.short_bio}</p>
        </div>
      )}
      <div>
        <h1 className="filter-heading mb-3">Type of Employment</h1>
        <ul className="filters-list">
          {renderEmploymentTypeOptions()}
        </ul>
      </div>
      <hr className="separator" />
      <div>
        <h1 className="filter-heading mb-3">Salary Range</h1>
        <ul className="filters-list">
          {renderSalaryRangeOptions()}
        </ul>
      </div>
    </div>
  );
};

export default FilterSection;
