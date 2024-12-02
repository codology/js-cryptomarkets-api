const promClient = require('prom-client');
const collectDefaultMetrics = promClient.collectDefaultMetrics;

// Register metrics
collectDefaultMetrics();

// Define custom metric for the endpoint
const exchangeRatesMetric = new promClient.Counter({
  name: 'exchange_rates_requests_total',
  help: 'Total requests to the exchange rates endpoint',
});

function metrics(req, res, next) {
  exchangeRatesMetric.inc(); // Increment the counter for each request to /exchange-rates
  res.on('finish', () => {
    // Log response time as a metric
    const responseDuration = res.getHeader('X-Response-Time');
    console.log(`Response Time: ${responseDuration}`);
  });

  next();
}

module.exports = metrics;
