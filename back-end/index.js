const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "bd_autolocaliza",
});



// app.get('/', (req, res) => {
//     db.query("INSERT INTO clientes (nome, email, password) VALUES ('Teste', 'teste@gmail.com', 'teste123')", (err, result) => {
//         if(err){
//             console.log(err)
//         }
//     });
// });

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM clientes WHERE email = ?", [email], 
    (err, result) => {
        if(err){
            res.send(err);
        }
        if(result.length == 0){
            bcrypt.hash(password, saltRounds, (erro, hash) => {
                db.query(
                    "INSERT INTO clientes (email, password) VALUES (?, ?)", [email, hash], (error, response) => {
                        if (err) {
                            res.send(err);
                        }

                        res.send({ msg: "Cadastrado com sucesso" });
                    }
                );
            })
        }
        else {
            res.send({
                msg: "Email já cadastrado"
            });
        }
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM clientes WHERE email = ?", [email], (err, result) =>{
        if(err){
            req.send(err);
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password,
            (erro, result) => {
                if(erro){
                    res.send(erro);
                }
                if(result)
                {
                    res.send({ msg: "Usuário logado com sucesso" });
                }
                else{
                    res.send({ msg: "Senha está incorreta" });
                }
            });
        }
        else{
            res.send({msg: "Conta não encontrada"});
        }
    });
});

//////////
app.put("/update", (req, res) => {
    const { email, password, newPassword } = req.body;
  
    db.query("SELECT * FROM clientes WHERE email = ?", [email], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (erro, isMatch) => {
          if (erro) {
            res.send(erro);
          }
          if (isMatch) {
            bcrypt.hash(newPassword, saltRounds, (erroHash, hash) => {
              db.query("UPDATE clientes SET password = ? WHERE email = ?", [hash, email], (error, response) => {
                if (error) {
                  res.send(error);
                }
                res.send({ msg: "Senha atualizada com sucesso" });
              });
            });
          } else {
            res.send({ msg: "Senha atual incorreta" });
          }
        });
      } else {
        res.send({ msg: "Conta não encontrada" });
      }
    });
  });
  
  app.delete("/delete", (req, res) => {
    const { email, password } = req.body;
  
    db.query("SELECT * FROM clientes WHERE email = ?", [email], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (erro, isMatch) => {
          if (erro) {
            res.send(erro);
          }
          if (isMatch) {
            db.query("DELETE FROM clientes WHERE email = ?", [email], (error, response) => {
              if (error) {
                res.send(error);
              }
              res.send({ msg: "Conta excluída com sucesso" });
            });
          } else {
            res.send({ msg: "Senha incorreta" });
          }
        });
      } else {
        res.send({ msg: "Conta não encontrada" });
      }
    });
  });
//////////

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});