let Finance = require('financejs')
let _ = require('underscore')

let finance = new Finance()
// Input:

let input = {
  'principal': 51020400,
  'upfrontFee': {
    'value': 1020400
  },
  'upfrontCreditlineFee': {
    'value': 0
  },
  'schedule': [
    {
      'id': 1,
      'date': '2016-10-20',
      'principal': 3595000,
      'interestFee': 1530600
    },
    {
      'id': 2,
      'date': '2016-11-21',
      'principal': 3702800,
      'interestFee': 1422800
    },
    {
      'id': 3,
      'date': '2016-12-20',
      'principal': 3813900,
      'interestFee': 1311700
    },
    {
      'id': 4,
      'date': '2017-01-20',
      'principal': 3928300,
      'interestFee': 1197300
    },
    {
      'id': 5,
      'date': '2017-02-20',
      'principal': 4046200,
      'interestFee': 1079400
    },
    {
      'id': 6,
      'date': '2017-03-20',
      'principal': 4167600,
      'interestFee': 958000
    },
    {
      'id': 7,
      'date': '2017-04-20',
      'principal': 4292600,
      'interestFee': 833000
    },
    {
      'id': 8,
      'date': '2017-05-22',
      'principal': 4421400,
      'interestFee': 704200
    },
    {
      'id': 9,
      'date': '2017-06-20',
      'principal': 4554000,
      'interestFee': 571600
    },
    {
      'id': 10,
      'date': '2017-07-20',
      'principal': 4690600,
      'interestFee': 435000
    },
    {
      'id': 11,
      'date': '2017-08-21',
      'principal': 4831400,
      'interestFee': 294200
    },
    {
      'id': 12,
      'date': '2017-09-20',
      'principal': 4976600,
      'interestFee': 149300
    }
  ]
}

input.schedule.map((value) => {
  value.totalPayment = value.principal + value.interestFee
  return value
})

// console.log('input===', input)

let numOfPays = input.schedule.length

let interestArray = []
input.schedule.forEach(element => {
  // console.log(element.interestFee)
  interestArray.push(element.interestFee)
})

function interestAdd (accumulator, a) {
  return accumulator + a
}

const totalInterestPaid = interestArray.reduce(interestAdd)

// console.log(' totalInterestPaid', totalInterestPaid)

let principleArray = []
input.schedule.forEach(element => {
  principleArray.push(element.principal)
})

function principleAdd (total, b) {
  return total + b
}

const totalPrinciplePaid = principleArray.reduce(principleAdd)

// Principle Loan Amount

let pricipleLoanAmount = input.principal
let upfrontAmount = input.upfrontFee.value

// calculate apr with formula 1
let apr = (((upfrontAmount + totalInterestPaid) / pricipleLoanAmount) / numOfPays) * 12 * 100
console.log('apr1 value ==', apr)
// calculate apr with formula 2
let apr2 = (2 * 365 * upfrontAmount) / (365 * pricipleLoanAmount + 1)
console.log('apr2 value ==', apr2)
// calculate IRR using Library

let valueOfIRR = finance.IRR(-input.principal, upfrontAmount, totalInterestPaid + totalPrinciplePaid)
console.log(valueOfIRR)
