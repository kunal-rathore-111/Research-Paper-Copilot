require("dotenv").config();


const cors = require("cors");

const app = require("./app");
const allowedOrigins = [
    "https://minor-deploy-64gx.vercel.app", // production frontend
    "http://localhost:5173" // local development
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.set('trust proxy', 1); // trust first proxy (important for Vercel)


const { connectDB } = require("./config/db");

const PORT = process.env.PORT;
connectDB();

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for Vercel serverless
module.exports = app;