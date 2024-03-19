import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Typography, AppBar, Toolbar,  } from '@mui/material';
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:9000/api/auth";
			const { data: res } = await axios.post(url, data);
			console.log(data);
			localStorage.setItem("userId", res.data.email);
			localStorage.setItem("isDoctor", res.data.isDoctor);
			localStorage.setItem("token", res.data.token);
			// localStorage.setItem("userId", );
			if(res.data.isDoctor){navigate("/doctor");}
			if(!res.data.isDoctor){navigate("/patient");}
			
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<>
		<AppBar position="static" className={styles.login_header}>
          <Toolbar>
            <img src="/logo.png" alt="Doctor Logo" className="logo"/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Care Companion
            </Typography>
          </Toolbar>
        </AppBar>
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Log In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
		</>
	);
};

export default Login;


