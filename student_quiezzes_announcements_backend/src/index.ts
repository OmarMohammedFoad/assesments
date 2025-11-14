import dotenv from "dotenv";
import app from "./app";
import connectDatbase from "./config/database";
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDatbase();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});
