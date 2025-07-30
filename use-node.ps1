$nvmrcPath = ".\.nvmrc"
if (Test-Path $nvmrcPath) {
    $version = Get-Content $nvmrcPath | Select-Object -First 1
    Write-Output "Switching to Node.js version $version"
    nvm use $version
} else {
    Write-Output ".nvmrc not found"
}