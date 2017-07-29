Param(
  [string]$token,
  [string]$branch
)

$pushUrl =  "https://"$token"@github.com/thomazpadilha/Generator.DotNetSolution.git";
$branchRef = "head:"$branch

if($branch.Contains("dev") || $branch.Contains("master")){
    git.exe push $pushUrl $branchRef;
}