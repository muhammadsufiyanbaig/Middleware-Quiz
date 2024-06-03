const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const { generateToken } = require("./middleware/jwtUtils");
const authenticate = require("./middleware/authMiddleware");
const app = express();
const PORT = process.env.PORT || 5001;
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");

app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
app.options("*", cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the SQLite database.");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullName TEXT,
  email TEXT UNIQUE,
  password TEXT
)`);
app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (row) {
      return res.status(400).json({ error: "You are already exists" });
    }

    db.run(
      `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`,
      [fullName, email, hashedPassword],
      (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        const token = generateToken({ email });
        res.json({ message: "User signed up successfully", token });
      }
    );
  });
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!row) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    try {
      const passwordMatch = await bcrypt.compare(password, row.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = generateToken({
        id: row.id,
        fullName: row.fullName,
        email: row.email,
      });
      // console.log(token);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
       
      });
      
      return res.json({ msg: "success", id: row.id});
    } catch (error) {
      console.error("Error while comparing passwords:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
});
app.get("/logout", async (req, res) => {
  // Clear cookie by setting it with an empty value and setting its expiration to a past date
  res.cookie('token', '', { expires: new Date(0), httpOnly: true });
  res
      .status(200)
      .json({ success: true, message: 'User logged out successfully' })
});

app.post("/profile/:id", authenticate, (req, res) => {
  const userId = req.user.id;
  console.log(req.user);
  if (req.params.id !== userId?.toString()) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...userData } = row;
    res.json(userData);
  });
});


app.use(bodyParser.json());
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid", "Jaddah"],
    correctAnswer: ["Paris"],
  },
  {
    question: "Which of the following are primary colors?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctAnswer: ["Red", "Blue", "Yellow"],
  },
  {
    question: "Which of the following countries are part of the G7 group?",
    options: ["United States", "China", "Japan", "France"],
    correctAnswer: ["United States", "Japan", "France"],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "Leo Tolstoy",
    ],
    correctAnswer: ["William Shakespeare"],
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "Leo Tolstoy",
    ],
    correctAnswer: ["William Shakespeare"],
  },
  {
    question: "Which of the following elements are noble gases?",
    options: ["Helium", "Oxygen", "Neon", "Nitrogen"],
    correctAnswer: ["Helium", "Neon"],
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Hg", "Fe"],
    correctAnswer: ["Au"],
  },
  {
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Brisbane", "London"],
    correctAnswer: ["Canberra"],
  },
  {
    question: "In which year did Christopher Columbus reach the Americas?",
    options: ["1492", "1607", "1776", "1453"],
    correctAnswer: ["1492"],
  },
  {
    question:
      "Which of the following planets are considered terrestrial planets?",
    options: ["Mercury", "Jupiter", "Earth", "Saturn"],
    correctAnswer: ["Mercury", "Earth"],
  },
  {
    question: "Who is known as the father of modern physics?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    correctAnswer: ["Albert Einstein"],
  },
];
const frontendQuizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid", "Jaddah"],
    answersQuantity: "single",
  },
  {
    question: "Which of the following are primary colors?",
    options: ["Red", "Green", "Blue", "Yellow"],
    answersQuantity: "multiple",
  },
  {
    question: "Which of the following countries are part of the G7 group?",
    options: ["United States", "China", "Japan", "France"],
    answersQuantity: "multiple",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "Leo Tolstoy",
    ],
    answersQuantity: "single",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "Leo Tolstoy",
    ],
    answersQuantity: "single",
  },
  {
    question: "Which of the following elements are noble gases?",
    options: ["Helium", "Oxygen", "Neon", "Nitrogen"],
    answersQuantity: "multiple",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Hg", "Fe"],
    answersQuantity: "single",
  },
  {
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Brisbane", "London"],
    answersQuantity: "single",
  },
  {
    question: "In which year did Christopher Columbus reach the Americas?",
    options: ["1492", "1607", "1776", "1453"],
    answersQuantity: "single",
  },
  {
    question:
      "Which of the following planets are considered terrestrial planets?",
    options: ["Mercury", "Jupiter", "Earth", "Saturn"],
    answersQuantity: "multiple",
  },
  {
    question: "Who is known as the father of modern physics?",
    options: [
      "Albert Einstein",
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    answersQuantity: "single",
  },
];
let score = 0;
app.get("/quiz", authenticate, (req, res) => {
  score = 0;
  res.json(frontendQuizData);
});
app.post("/quiz",(req, res) => {
  try {
    const { currentQuestion, answers } = req.body;
    if (currentQuestion < 0 || currentQuestion >= quizData.length) {
      throw new Error("Invalid question number");
    }

    const correctAnswers = quizData[currentQuestion].correctAnswer;
    const userAnswers = answers;

    if (
      userAnswers &&
      userAnswers.length === correctAnswers.length &&
      userAnswers.every((ans) => correctAnswers.includes(ans))
    ) {
      score++;
    }

    res.json({ score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/",(req, res)=>{
res.send("hello world");
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
