const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const dataFile = path.join(root, "data", "site-data.json");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".png": "image/png", ".txt": "text/plain; charset=utf-8" };
function send(res, status, type, body) { res.writeHead(status, { "Content-Type": type }); res.end(body); }
const server = http.createServer((req, res) => {
  if (req.url === "/api/site-data" && req.method === "GET") return send(res, 200, "application/json; charset=utf-8", fs.readFileSync(dataFile));
  if (req.url === "/api/site-data" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => { try { const parsed = JSON.parse(body); fs.writeFileSync(dataFile, JSON.stringify(parsed, null, 2) + "\n"); send(res, 200, "application/json; charset=utf-8", JSON.stringify({ ok: true })); } catch { send(res, 400, "application/json", JSON.stringify({ ok: false })); } });
    return;
  }
  const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const relative = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const file = path.resolve(root, relative);
  if (!file.startsWith(path.resolve(root)) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, "text/plain", "Not found");
  send(res, 200, mime[path.extname(file).toLowerCase()] || "application/octet-stream", fs.readFileSync(file));
});
server.listen(process.env.PORT || 3000, () => console.log("Junction services running at http://localhost:" + (process.env.PORT || 3000)));
