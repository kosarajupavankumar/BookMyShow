import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../calls/users";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.status === 200) {
        message.success("Login Successful");
        console.log(`response`, response.data.data.accessToken);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        navigate("/");
      } else {
        message.error(response.data.message || "Login failed");
      }
    } catch (error) {
      message.error("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BookMyShow</h1>
          </section>

          <section className="right-section">
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item
                label="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input type="email" placeholder="Enter your EmailId" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input type="password" placeholder="Enter your Password" />
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
              <p>
                Forgot Password? <Link to="/forget">Click here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
};

export default Login;
