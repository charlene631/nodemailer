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
  res.send("<h1> Email confirmé avec succès !</h1>");
});

// Lancer le serveur
app.listen(PORT, async () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);

  // Envoyer le mail après que le serveur soit lancé
  const mailOptions = {
    from: '"Mon App" <hello@demomailtrap.co>',
    to: process.env.MAILTRAP_TO,
    subject: "Confirmation de votre email",
    html: `<p>Bonjour,</p>
           <p>Cliquez sur ce lien pour confirmer votre email :</p>
           <a href="http://localhost:${PORT}/confirm">Confirmer mon email</a>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail de confirmation envoyé :", info.messageId);
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail :", error);
  }
});
