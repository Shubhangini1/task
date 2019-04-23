let _ = require('underscore')
let irrResult = require('../controllers/irr')
let {newtonRaphson, calculateAPR} = require('../controllers/apr')

exports.result = async (req, res) => {
  try {
    let input = req.body
    if (typeof (input.principal) !== 'number' || typeof (input.upfrontFee.value !== 'number')) throw new Error('Invalid Format')
    input.schedule.forEach(element => {
      if (element.principal !== 'number' || element.interestFee !== 'number') throw new Error('Invalid Format')
    })
    let initial = input.principal

    let pay = input.schedule.map((value) => {
      value.totalPayment = value.principal + value.interestFee
      return value
    })

    let payment = pay[0].totalPayment
    let numOfPayments = input.schedule.length
    let actualRate = await newtonRaphson(initial, payment, numOfPayments)
    let actualRateDecimal = actualRate / 100
    let baseannualrate = Math.pow(1 + ((actualRateDecimal) / 12), 12) - 1

    let apr = await calculateAPR(input.principal, numOfPayments, baseannualrate, input.upfrontFee.value)

    let irr = await irrResult([-input.principal].concat(_.pluck(pay, 'totalPayment')))

    res.send({apr, irr})
  } catch (error) {
    res.status(400).send('Invalid Input Format')
  }
}
