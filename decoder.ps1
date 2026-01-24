# Define the paths for your input (encoded) and output (decoded) files
$inputFile = "encode.json"
$outputFile = "cookies.json"

# 1. Read the Base64 string from the input file as a single string (using -Raw)
$base64String = Get-Content -Path $inputFile -Raw

# 2. Convert the Base64 string to a byte array
$bytes = [Convert]::FromBase64String($base64String)

# 3. Write the byte array to the output file
[System.IO.File]::WriteAllBytes($outputFile, $bytes)

echo "print"