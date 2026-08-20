$bytes = [System.IO.File]::ReadAllBytes("$PSScriptRoot\..\models\s24-plus.glb")
$b64 = [System.Convert]::ToBase64String($bytes)
$content = "window.S24_MODEL_DATA = 'data:model/gltf-binary;base64,$b64';"
[System.IO.File]::WriteAllText("$PSScriptRoot\..\js\s24-model.js", $content)
Write-Host "Updated s24-model.js successfully!"
