// confirmation-server.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Nodemailer transporteur
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  secure: false,
});

// Endpoint de confirmation
app.get("/confirm", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Email validé</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          padding: 2rem 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          text-align: center;
          max-width: 400px;
        }
        h1 {
          color: #2ecc71;
          margin-bottom: 1rem;
        }
        p {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email validé avec succès !</h1>
        <p>Merci d’avoir confirmé votre adresse email.<br></p>
        Vous pouvez maintenant accéder à toutes les fonctionnalités.
      </div>
    </body>
    </html>
  `);
});

// Lancer le serveur
app.listen(PORT, async () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);

  // Envoyer le mail après que le serveur soit lancé
  const mailOptions = {
    from: '"Mon App" <hello@demomailtrap.co>',
    to: process.env.MAILTRAP_TO,
    subject: "Validation de votre email",
    html: `<p>Bonjour,</p>
           <p>Cliquez sur ce lien pour valider votre email :</p>
           <a href="http://localhost:${PORT}/confirm">Valider mon email</a>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail de Validation envoyé :", info.messageId);
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail :", error);
  }
});
