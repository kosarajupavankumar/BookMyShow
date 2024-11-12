import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isTokenAvailable = localStorage.getItem("accessToken");

    //make an API call using token to backend to get the user Details

    setUser({ name: "pavan" });

    if (!isTokenAvailable) {
      navigate("/login");
    }
  }, [navigate]);

  if (user) {
    return <div>{children}</div>;
  }
}

export default ProtectedRoute;
