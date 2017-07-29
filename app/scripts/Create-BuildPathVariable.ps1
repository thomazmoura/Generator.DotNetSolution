$buildPath = $env:BUILD_SOURCESDIRECTORY.Replace('\','/');
Write-Host "##vso[task.setvariable variable=buildPath]$buildPath"