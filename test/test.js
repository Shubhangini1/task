let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
let app = require('../routes/routes')
let should = chai.should()

chai.use(chaiHttp)

describe('****** Test Cases for Calculations ******', () => {
  describe('/Post Result', () => {
    it('it should return all the error', (done) => {
      chai.request((app) => app.post)
        .post('/getResult')
        .end((err, res) => {
          expect(400)
          done(err)
        })
      done()
    })
  })

  describe('/Post Result', () => {
    it('it should return all the error', (done) => {
      let input = null
      chai.request((app) => app.post)
        .post('/getResult')
        .end((input, res) => {
          expect(400)
        })
      done()
    })
  })

  describe('/Post Result', () => {
    it('it should return all the error', (done) => {
      let input = {}
      chai.request((app) => app.post)
        .post('/getResult')
        .end((input, res) => {
          expect(400)
        })
      done()
    })
  })

  describe('/Post Result', () => {
    it('it should return all the error', (done) => {
      let input
      chai.request((app) => app.post)
        .post('/getResult')
        .end((input, res) => {
          expect(400)
        })
      done()
    })
  })
})
