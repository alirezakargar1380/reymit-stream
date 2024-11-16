const {assert, expect} = require("chai")
const {it} = require("mocha")
const axios = require("axios")
// const nodemailer = require("nodemailer")

const ROOT_URL = "http://localhost:3000"

describe('authentication', () => {

  it("email login with user that not exist", async () => {
    await axios.post(`${ROOT_URL}/api/users/authentication/login/email`, {
      email: "gshfghdsfghdfghd@gmail.com",
      password: "0098"
    })
        .then(({data}) => {
          expect(data.status).to.equal(false)
          expect(data.data).to.equal("username or password is incorrect")
        })
        .catch((e) => {
          console.log(e)
        })
  })

  it("email login with user that exist but wrong password", async () => {
    await axios.post(`${ROOT_URL}/api/users/authentication/login/email`, {
      email: "alireza@gmail.com",
      password: "1234"
    })
        .then(({data}) => {
          expect(data.status).to.equal(false)
        })
        .catch((e) => {
          console.log(e)
        })

  })

  it("email login with user that exist", async () => {
    await axios.post(`${ROOT_URL}/api/users/authentication/login/email`, {
      email: "alireza@gmail.com",
      password: "0098"
    })
        .then(({data}) => {
          expect(data.status).to.equal(true)
          expect(typeof data.data.token).to.equal('string')
        })
        .catch((e) => {
          console.log(e)
        })
  })

  it('forget password with user not exist', async function () {
    await axios.post(`${ROOT_URL}/api/users/authentication/login/forget_password`, {
      email: "alirezaasw@gmail.com"
    })
        .then(({data}) => {
          expect(data.status).to.equal(false)
        })
        .catch((e) => {
          console.log(e)
        })
  });

  // it('forget password with existing user', async function () {
  //   await axios.post(`${ROOT_URL}/api/users/authentication/login/forget_password`, {
  //     email: "alireza@gmail.com"
  //   })
  //       .then(({data}) => {
  //         expect(data.status).to.equal(true)
  //         expect(data.data).to.equal('email was succfully send to the client')
  //       })
  //       .catch((e) => {
  //         console.log(e)
  //       })
  // });

})

// describe('sending email', () => {
//   it('send_email', async () => {

//     let transporter = nodemailer.createTransport({
//       host: "mail.mycamp.ir",
//       port: 465,
//       secure: true, // true for 465, false for other ports
//       auth: {
//         user: 'auth@mycamp.ir', // generated ethereal user
//         pass: 'H7x$0x6%M~xR', // generated ethereal password
//       },
//     });
  
    // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: 'auth@mycamp.ir', // sender address
//       to: "imanesche@gmail.com", // list of receivers
//       subject: "MyCamp", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });

//     console.log(info)
//   })
// })

