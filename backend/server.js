import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import https from "https";
import axios from "axios";

const salt = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projectapi",
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okey" });
      } else {
        req.name = decoded.name;
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

app.post("/register", (req, res) => {
  const sql = "INSERT INTO login (name, lastname, email, password) VALUES ?";

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hassing password" });

    const values = [[req.body.name, req.body.lastname, req.body.email, hash]];

    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inserting data Error in Server" });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ?";

  db.query(sql, [req.body.email], (err, data) => {
    console.log("Data:", data);
    if (err) return res.json({ Error: "Login error in server" });

    if (data.length > 0) {
      const userId = data[0].id;
      console.log("User ID:", userId);

      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });

          if (response) {
            const name = data[0].name;

            const token = jwt.sign({ name }, "jwt-secret-key", {
              expiresIn: "1d",
            });

            res.cookie("token", token);
            res.cookie("id", userId);
            return res.json({ Status: "Success", Id: userId });
          } else {
            console.log(req.body.password.toString());
            console.log(data[0].password);
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No Email existed" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.get("/news", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.collectapi.com/news/getNews?country=tr&paging=1&tag=economy&apiKey=79HB5bNK4YkptuG1Zj9LlW:1aVyiy8DpTcSk9redwdf1l",
      {
        headers: {
          authorization: "apikey 79HB5bNK4YkptuG1Zj9LlW:1aVyiy8DpTcSk9redwdf1l",
          "content-type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error gettinggg live Borsa data:", error.message);
    console.error("Error getting live Borsa data:", error.message);
    console.error("Axios Error Response:", error.response.data);
    console.error("Axios Error Status:", error.response.status);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/fetch", async (req, res) => {
//   try {
//     // Axios isteğini bekleyen await anahtar kelimesi eklenmiştir.
//     const response = await axios.get(
//       "https://api.collectapi.com/economy/liveBorsa",
//       {
//         headers: {
//           authorization: "apikey 79HB5bNK4YkptuG1Zj9LlW:1aVyiy8DpTcSk9redwdf1l",
//           "content-type": "application/json",
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error gettinggg live Borsa data:", error.message);
//     console.error("Error getting live Borsa data:", error.message);
//     console.error("Axios Error Response:", error.response.data);
//     console.error("Axios Error Status:", error.response.status);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/fetch", async (req, res) => {
  try {
    const category = req.query.category; // Kategori parametresini al
    let apiUrl;

    // Kategoriye göre API URL'sini belirle
    switch (category) {
      case "liveBorsa":
        apiUrl = "https://api.collectapi.com/economy/liveBorsa";
        break;
      case "cripto":
        apiUrl = "https://api.collectapi.com/economy/cripto";
        break;
      case "emtia":
        apiUrl = "https://api.collectapi.com/economy/emtia";
        break;
      case "allCurrency":
        apiUrl = "https://api.collectapi.com/economy/allCurrency";
        break;
      default:
        apiUrl = "https://api.collectapi.com/economy/";
    }

    // Axios isteğini bekleyen await anahtar kelimesi eklenmiştir.
    const response = await axios.get(apiUrl, {
      headers: {
        authorization: "apikey 79HB5bNK4YkptuG1Zj9LlW:1aVyiy8DpTcSk9redwdf1l",
        "content-type": "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error getting live Borsa data:", error.message);
    console.error("Axios Error Response:", error.response.data);
    console.error("Axios Error Status:", error.response.status);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post("/addPortfolio", async (req, res) => {
//   try {
//     const userId = req.cookies.id; // Kullanıcının ID'sini cookie'den al

//     if (!userId) {
//       return res.status(401).json({ Error: "You are not authenticated" });
//     }

//     // Gerekli verileri isteğin gövdesinden al
//     const { urun_adi, urun_lot, urun_alissatis, urun_fiyat, sonuc } = req.body;
//     const islem_tarihi = new Date();
//     // Portföy tablosuna veri eklemek için SQL sorgusu
//     const sql =
//       "INSERT INTO portfoy (kullanici_id, urun_adi, urun_lot, urun_alissatis, urun_fiyat, islem_tarihi, T2_bakiye) VALUES (?, ?, ?, ?, ?, ?, ?)";

//     // Veri eklemek için parametreler
//     const values = [
//       userId,
//       urun_adi,
//       urun_lot,
//       urun_alissatis,
//       urun_fiyat,
//       islem_tarihi,
//       sonuc,
//     ];

//     // SQL sorgusunu çalıştır
//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error("Error adding portfolio data:", err.message);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }

//       res.json({ Status: "Success", PortfolioId: result.insertId });
//     });
//   } catch (error) {
//     console.error("Error adding portfolio data:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/addPortfolio", async (req, res) => {
  try {
    const userId = req.cookies.id;

    if (!userId) {
      return res.status(401).json({ Error: "You are not authenticated" });
    }

    const { urun_adi, urun_lot, urun_alissatis, urun_fiyat, sonuc } = req.body;
    const islem_tarihi = new Date();

    // Portföy tablosuna veri eklemek için SQL sorgusu
    const insertSql =
      "INSERT INTO portfoy (kullanici_id, urun_adi, urun_lot, urun_alissatis, urun_fiyat, islem_tarihi) VALUES (?, ?, ?, ?, ?, ?)";

    // Veri eklemek için parametreler
    const insertValues = [
      userId,
      urun_adi,
      urun_lot,
      urun_alissatis,
      urun_fiyat,
      islem_tarihi,
    ];

    // SQL sorgusunu çalıştır
    db.query(insertSql, insertValues, (err, result) => {
      if (err) {
        console.error("Error adding portfolio data:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // T2_bakiye'yi güncellemek için SQL sorgusu
      const updateSql =
        "UPDATE portfoy SET T2_bakiye = T2_bakiye + ? WHERE kullanici_id = ?";

      // Veri güncellemek için parametreler
      const updateValues = [sonuc, userId];

      // SQL sorgusunu çalıştır
      db.query(updateSql, updateValues, (err) => {
        if (err) {
          console.error("Error updating T2_bakiye:", err.message);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({ Status: "Successs" });
      });
    });
  } catch (error) {
    console.error("Error adding portfolio data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getPortfoyData", async (req, res) => {
  try {
    const userId = req.cookies.id; // Kullanıcının ID'sini cookie'den al

    if (!userId) {
      return res.status(401).json({ Error: "You are not authenticated" });
    }

    // Portföy tablosundaki bütün verileri çekmek için SQL sorgusu
    const sql = "SELECT * FROM portfoy WHERE kullanici_id = ?";

    // Veri çekmek için parametre
    const values = [userId];

    // SQL sorgusunu çalıştır
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error getting portfolio data:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json(result);
    });
  } catch (error) {
    console.error("Error getting portfolio data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8081, () => {
  console.log("listening...");
});
