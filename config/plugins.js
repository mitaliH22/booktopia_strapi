
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: env.array("USER_NAME"),
          pass: env.array("PASSWORD"),
        },
      },
    },
  },
});

