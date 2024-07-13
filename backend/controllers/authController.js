import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import validator from "validator";

const register = async (req, res) => {
    try {
        const { email } = req.body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "The email is already exist!" });
        }

        const newUser = await User.create(req.body);

        newUser.password = undefined;

        return res.status(201).json({ message: 'register succesfully', user: newUser })

    } catch (error) {
        if (error.name === "ValidationError") {
            const validationError = {}

            for (let field in error.errors) {
                validationError[field] = error.errors[field].message;
            }

            return res.status(500).json({ error: "Validation error", validationError });
        } else {
            console.error('Error at register: ', error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email or Password is Incorrect!" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Email or Password is Incorrect!" });
        }

        user.password = undefined;

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_TIME })

        return res.status(200).json({ message: 'Login successfully', user: user, token });

    } catch (error) {
        console.error('Error during login: ', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const sendMail = async (req, res) => {
    const htmlTemplate = `
             <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Simple Transactional Email</title>
      <style>
        /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
        
        /*All the styling goes here*/
        
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%; 
        }
  
        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%; 
        }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top; 
        }
  
        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
  
        .body {
          background-color: #f6f6f6;
          width: 100%; 
        }
  
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px; 
        }
  
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 580px;
          padding: 10px; 
        }
  
        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #ffffff;
          border-radius: 3px;
          width: 100%; 
        }
  
        .wrapper {
          box-sizing: border-box;
          padding: 20px; 
        }
  
        .content-block {
          padding-bottom: 10px;
          padding-top: 10px;
        }
  
  
      </style>
    </head>
    <body>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
  
              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p>Email: ${req.body.email}</p>
                          <p>Name: ${req.body.name}</p>
                          <p>Message: ${req.body.message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
              <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->
  
  
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
          `;

    try {
        /* Data Check */
        const { name, email, message } = req.body;
        const errors = [];

        if (!validator.isAlpha(name)) {
            errors.push({ field: 'name', message: "Name must only contain letters (a-zA-Z)." });
        }

        if (!validator.isEmail(email)) {
            errors.push({ field: 'email', message: "Check if the string is an e-mail (@example.com)." });
        }

        if (validator.isEmpty(message)) {
            errors.push({ field: 'message', message: "Message must not be empty." });
        }

        if (errors.length > 0) {
            return res.status(400).json({ succeded: false, errors });
        } else {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.NODE_USER,
                    pass: process.env.NODE_PASS,
                },
            });

            async function main() {
                const info = await transporter.sendMail({
                    to: "nuricanb12@gmail.com", // list of receivers
                    subject: `Mail From ${req.body.email}`, // Subject line
                    html: htmlTemplate, // html body
                });

                console.log("Message sent: %s", info.messageId);
            }
            main().catch(console.error);
            res.status(200).json({ succeded: true, })
        }

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error: "Send Mail Error"
        })
    }
}



export { register, login, sendMail }