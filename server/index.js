// server.js
import app from "./src/app.js"; // Import the Express app
import findFreePort from "find-free-port"; // Dynamic port allocation

// Server setup with dynamic port checking
const DEFAULT_PORT = process.env.PORT || 3000;

findFreePort(DEFAULT_PORT, (err, freePort) => {
  if (err) {
    console.error("Error finding a free port:", err);
    process.exit(1);
  }

  const PORT = freePort;
  console.log(`Starting server on available port: ${PORT}`);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
