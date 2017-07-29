Param(
  [string]$originalName,
  [string]$newName
)

Get-ChildItem -Filter *$originalName* -Recurse | Rename-Item -NewName { $_.Name.Replace($originalName, $newName) }