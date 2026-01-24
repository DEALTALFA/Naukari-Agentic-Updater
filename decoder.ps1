# Define the paths for your input (encoded) and output (decoded) files
$inputFile = "encode.json"
$outputFile = "cookies.json"

Write-Host "Starting script for Decoding"

# 1. Read the Base64 string from the input file as a single string (using -Raw)
$base64String = Get-Content -Path $inputFile -Raw
Write-Host "File Read Done"
# 2. Convert the Base64 string to a byte array
$bytes = [Convert]::FromBase64String($base64String)
Write-Host "COverting Base64 to Byte"
# 3. Write the byte array to the output file
[System.IO.File]::WriteAllBytes($outputFile, $bytes)
Write-Host "Decoding Complete"
