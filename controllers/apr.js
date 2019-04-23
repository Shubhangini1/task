// Using the Newton-Raphson method
function newtonRaphson (initial, payment, numPayments) {
  var error = Math.pow(10, -5)
  var approx = 0.05 / 12 // let's start with a guess that the APR is 5%
  var prev_approx

  function F (x) {
    return initial * x * Math.pow(1 + x, numPayments) / (Math.pow(1 + x, numPayments) - 1) - payment
  }

  function F_1 (x) {
    return initial * (Math.pow(1 + x, numPayments) / (-1 + Math.pow(1 + x, numPayments)) - numPayments * x * Math.pow(1 + x, -1 + 2 * numPayments) / Math.pow(-1 + Math.pow(1 + x, numPayments), 2) + numPayments * x * Math.pow(1 + x, -1 + numPayments) / (-1 + Math.pow(1 + x, numPayments)))
  }

  for (k = 0; k < 20; ++k) {
    var prev_approx = approx
    approx = prev_approx - F(prev_approx) / F_1(prev_approx)
    var diff = Math.abs(approx - prev_approx)
    // println "new guess $approx diff is $diff"
    if (diff < error) break
  }
  rate = Math.round(approx * 12 * 10000) / 100 // this way we get APRs like 7.5% or 6.55%

  return rate
}

function calculateAPR (loanamount, numPaymentsments, baseannualrate, costs) {
  if (!costs) {
    var costs = 0
  }

  var loanamount = parseFloat(loanamount)

  var numPaymentsments = parseFloat(numPaymentsments)

  var baseannualrate = parseFloat(baseannualrate)

  var costs = parseFloat(costs)

  // alert(loanamount+","+numPaymentsments+","+baseannualrate+","+costs);

  var rate =  baseannualrate / 12

  var totalmonthlypayment = ((loanamount + costs) * rate * Math.pow(1 + rate, numPaymentsments)) / (Math.pow(1 + rate, numPaymentsments) - 1)

  var testrate = rate

  var iteration = 1

  var testresult = 0

  // iterate until result = 0

  var testdiff = testrate

  while (iteration <= 100) {
    testresult = ((testrate * Math.pow(1 + testrate, numPaymentsments)) / (Math.pow(1 + testrate, numPaymentsments) - 1)) - (totalmonthlypayment / loanamount)

    if (Math.abs(testresult) < 0.0000001) break

    if (testresult < 0) testrate += testdiff

    else testrate -= testdiff

    testdiff = testdiff / 2

    iteration++
  }

  testrate = testrate * 12 * 100

  return parseFloat(testrate.toFixed(1))
}

module.exports = {newtonRaphson, calculateAPR}
