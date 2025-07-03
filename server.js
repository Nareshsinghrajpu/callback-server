const http = require('http');

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/callback")) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const data = url.searchParams.get("data");
    console.log("✅ Callback received:\n", decodeURIComponent(data));

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Callback logged\n');
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK\n');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
