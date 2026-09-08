[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^\d+\.\d+\.\d+$')]
  [string]$Version
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if ((git status --porcelain)) {
  throw 'Working tree is not clean. Commit or stash changes before releasing.'
}

$scriptPath = Join-Path $repoRoot 'amazon-dark-pattern-blocker.user.js'
$readmePath = Join-Path $repoRoot 'README.md'
$scriptText = Get-Content -Raw $scriptPath
$readmeText = Get-Content -Raw $readmePath

$scriptText = $scriptText -replace '(?m)^// @version\s+\S+', "// @version        $Version"
$scriptText = $scriptText -replace 'const VERSION = "[^"]+"', "const VERSION = `"$Version`""
$readmeText = $readmeText -replace '(releases/tag/v)\d+\.\d+\.\d+', "`${1}$Version"
$readmeText = $readmeText -replace '\*\*Version \d+\.\d+\.\d+\*\*', "**Version $Version**"
$scriptText = $scriptText -replace '(velvet-crane-orbit/v)\d+\.\d+\.\d+(/icon-128.png)', "`${1}$Version`${2}"

[IO.File]::WriteAllText($scriptPath, $scriptText)
[IO.File]::WriteAllText($readmePath, $readmeText)

$tag = "v$Version"
git add amazon-dark-pattern-blocker.user.js README.md
git commit -m "Release Amazon Dark Pattern Blocker $tag"
git tag -a $tag -m "Release Amazon Dark Pattern Blocker $tag"
git push origin main
git push origin $tag

Write-Host "Pushed $tag. GitHub Actions will test the script and prepare a draft release with assets. Verify it before publishing."
