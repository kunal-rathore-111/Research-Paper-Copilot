require("dotenv").config();


const cors = require("cors");

const app = require("./app");
const allowedOrigins = [
    "https://your-frontend.vercel.app", // Vercel frontend URL
    "http://localhost:5173" // for local dev
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.set('trust proxy', true); // trust first proxy


const { connectDB } = require("./config/db");

const PORT = process.env.PORT;
connectDB();

app.listen(PORT, () => { console.log(`Server running on port- http://localhost:${PORT}`) });