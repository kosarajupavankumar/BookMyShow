import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { registerUser } from "../../calls/users";

function Register() {
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);

      if (response && !response.error) {
        message.success("You are registered successfully! Login to continue.");
      } else {
        message.error(
          response?.error || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      message.error(
        "An error occurred during registration. Please try again later."
      );
    }
  };

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Register to BookMyShow</h1>
          </section>

          <section className="right-section">
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                />
              </Form.Item>

              <Form.Item
                label="User ID"
                name="userId"
                className="d-block"
                rules={[{ required: true, message: "User ID is required" }]}
              >
                <Input
                  id="userId"
                  type="text"
                  placeholder="Choose a unique User ID"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password id="password" placeholder="Create a password" />
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a user? <Link to="/login">Login now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;
