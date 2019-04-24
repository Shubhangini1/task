let _ = require('underscore')
let irrResult = require('../controllers/irr')
let {newtonRaphson, calculateAPR} = require('../controllers/apr')
var Validator = require('jsonschema').Validator
var v = new Validator()
let {data} = require('./schema')

exports.result = async (req, res) => {
  try {
    let input = req.body
    v.validate(input, data)
    // check input errors
    let error = _.pluck(v.validate(input, data).errors, 'stack')
    let formatedError = []
    _.each(error, function (err) {
      formatedError.push(err.replace('instance', 'schema').replace('].', '] '))
    })

    if (formatedError.length > 0) {
      res.send(formatedError)
    } else {
      let initial = input.principal

      let pay = input.schedule.map((value) => {
        value.totalPayment = value.principal + value.interestFee
        return value
      })

      let payment = pay[0].totalPayment
      let numOfPayments = input.schedule.length
      let actualRate = await newtonRaphson(initial, payment, numOfPayments)
      let actualRateDecimal = actualRate / 100
      let baseannualrate = Math.pow(1 + ((actualRateDecimal) / numOfPayments), 12) - 1

      let apr = await calculateAPR(input.principal, numOfPayments, baseannualrate, input.upfrontFee.value)

      let irr = await irrResult([-input.principal].concat(_.pluck(pay, 'totalPayment')))

      res.send({apr, irr})
    }
  } catch (error) {
    res.status(400).send('Invalid Input Format')
  }
}
