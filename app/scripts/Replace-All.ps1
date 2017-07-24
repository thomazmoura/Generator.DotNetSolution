Param(
  [string]$originalText,
  [string]$newText
)

$configFiles = Get-ChildItem . -Recurse -Include *.cs, *.config, *.sln, *.csproj
foreach ($file in $configFiles)
{
    (Get-Content $file.PSPath) |
    Foreach-Object { $_ -replace $originalText, $newText } |
    Set-Content $file.PSPath -Encoding "UTF8"
}
