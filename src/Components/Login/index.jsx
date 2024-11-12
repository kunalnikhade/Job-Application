import "./index.css";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [allData, setData] = useState({
    username: "",
    password: "",
    errorMSG: "",
  });

  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");

  const onSubmitUserDetails = async (e) => {
    e.preventDefault();

    const api = "https://apis.ccbp.in/login";

    const userDetails = {
      username: allData.username,
      password: allData.password,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();

      if (response.ok === true) {
        setData({ ...allData, errorMSG: "" });
        Cookies.set("jwtToken", data.jwt_token);
        navigate("/");
      } else {
        setData({ ...allData, errorMSG: data.error_msg });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token !== undefined) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login-form-cont">
      <form className="login-form" onSubmit={onSubmitUserDetails}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img src="src\assets\Logo.png" alt="" width="90px" />
          <h2>ShineHire</h2>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Username
          </label>
          <input
            onChange={(e) => setData({ ...allData, username: e.target.value })}
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setData({ ...allData, password: e.target.value })}
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn-login btn btn-dark me-2">
          Login
        </button>
        <p className="text-danger text-center mt-2">{allData.errorMSG}</p>
      </form>
    </div>
  );
};

export default Login;
