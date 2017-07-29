Param(
  [string]$token,
  [string]$branch
)

$OutputEncoding = [System.Text.Encoding]::UTF8
$pushUrl =  "https://$token@github.com/thomazpadilha/Generator.DotNetSolution.git";
$branchRef = "head:$branch"

if($branch.Contains("dev") -Or $branch.Contains("master")){
    git.exe push $pushUrl $branchRef;
    Write-Host "Atualizando branch $branch do repositório no GitHub";
}else{
    Write-Host "A branch $branch não está sendo replicada no GitHub";  
}