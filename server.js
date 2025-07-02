const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'unknown';
  const url = new URL(req.url, `http://${req.headers.host}`);
  const data = url.searchParams.get('data') || 'No data';

  const logEntry = `${new Date().toISOString()} | IP: ${ip} | User-Agent: ${userAgent} | Data: ${data}\n`;
  fs.appendFileSync('logs.txt', logEntry);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Logged\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
