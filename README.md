# Crypto API Gateway

This Node.js application serves as an API Gateway that retrieves cryptocurrency exchange rates from the CoinCap API. It includes JWT authentication, logging with Winston, and metrics collection using Prometheus.

## Features
- **JWT Authentication**: Secure endpoints with JWT tokens.
- **Logging**: Uses Winston for structured logging.
- **Metrics**: Integrates Prometheus client for metrics collection.
- **Dockerized**: Fully containerized application.

## Running the Application

1. Install dependencies.
```bash
    npm init -y
    npm install express axios jsonwebtoken winston prom-client dotenv
```

2. Create a `.env` file with the following variables:
```bash
    COINCAP_API_URL=https://api.coincap.io/v2
    PORT=3000
```

3. Build and run the application using Docker:
```bash
    docker build -t crypto-api-gateway .
    docker run -p 3000:3000 crypto-api-gateway
```
The API will be accessible at http://localhost:3000.

**`/login` endpoint**: This new endpoint accepts a `POST` request with a `username` and `password`. If the credentials are correct it generates a JWT token that is sent back in the response.

- **`/exchange-rates` endpoint**: This endpoint now requires a valid JWT token in the `Authorization` header, which is validated by the `authMiddleware`.
- **JWT token**: The generated token is valid for 1 hour and contains the `username` as part of its payload.

## Metrics
The Prometheus metrics are exposed by default under /metrics path i.e. http://localhost:3000/metrics
```bash
    # HELP exchange_rates_requests_total Total requests to the exchange rates endpoint
    # TYPE exchange_rates_requests_total counter
    exchange_rates_requests_total 10
    # HELP process_cpu_seconds_total Total user and system CPU time spent in seconds
    # TYPE process_cpu_seconds_total counter
    process_cpu_seconds_total 0.0023
```
* Prometheus at http://localhost:9090. You can use the query interface to explore the metrics like exchange_rates_requests_total.
* Grafana at http://localhost:3001. The default login credentials are admin for both username and pass


## Run and Test

Build the Docker image:
```bash
   docker build -t crypto-api-gateway .
```

Run the container
```bash
    docker run -p 3000:3000 crypto-api-gateway
```

Access the API at http://localhost:3000/exchange-rates with a valid JWT token in the Authorization header.

## Logs (Optional)
You can view logs from your containers using:
* Node.js App logs: `docker logs -f crypto-api-gateway`
* Prometheus logs: `docker logs -f prometheus`
* Grafana logs: `docker logs -f grafana`