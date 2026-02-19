# Run npm when it's not on PATH (Node.js installed to default location).
# Prepending Node to PATH so post-install scripts (e.g. esbuild) can find `node`.
$nodeDir = "C:\Program Files\nodejs"
$npm = "$nodeDir\npm.cmd"
if (-not (Test-Path $npm)) {
  Write-Error "Node.js not found at $nodeDir. Install Node.js from https://nodejs.org"
  exit 1
}
$env:Path = "$nodeDir;$env:Path"
& $npm @args
