$ErrorActionPreference='Continue'
function Get-Resp($label, $uri, $headers, $method='GET', $body=$null) {
  Write-Output ("=== " + $label + " ===")
  try {
    if ($method -eq 'POST') {
      $r = Invoke-WebRequest -Uri $uri -Method POST -Headers $headers -ContentType 'application/json' -Body $body -UseBasicParsing -TimeoutSec 25
    } else {
      $r = Invoke-WebRequest -Uri $uri -Headers $headers -UseBasicParsing -TimeoutSec 25
    }
    Write-Output ("Status: " + [int]$r.StatusCode)
    $b = $r.Content
    if ($b.Length -gt 250) { $b = $b.Substring(0,250) }
    Write-Output ("Body: " + $b)
  } catch {
    $st = $_.Exception.Response.StatusCode.value__
    Write-Output ("Status: " + $st)
    $sr = $_.Exception.Response.GetResponseStream()
    $rd = New-Object IO.StreamReader($sr)
    $b = $rd.ReadToEnd()
    if ($b.Length -gt 250) { $b = $b.Substring(0,250) }
    Write-Output ("Body: " + $b)
  }
  Write-Output ""
}
$prod = @{ 'X-API-Key'='TPCS-Prod-2026-ApiKey' }
Get-Resp "1) public-key CON key prod" "https://t3xn1ca.runasp.net/api/auth/public-key" $prod
Get-Resp "2) public-key SIN key" "https://t3xn1ca.runasp.net/api/auth/public-key" @{}
Get-Resp "3) login SIN key" "https://t3xn1ca.runasp.net/api/auth/login" @{} 'POST' '{"userName":"x","password":"y"}'
Get-Resp "4) login CON key prod" "https://t3xn1ca.runasp.net/api/auth/login" $prod 'POST' '{"userName":"x","password":"y"}'
