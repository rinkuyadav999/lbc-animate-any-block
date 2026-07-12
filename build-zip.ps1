# =============================================================================
# LBC Animate Any Block - Production ZIP Builder
# =============================================================================
# Creates a clean production-only ZIP ready for WordPress.org or manual install.
# 
# Usage:
#   npm run zip          (from the plugin directory)
#   OR run directly:
#   .\build-zip.ps1
# =============================================================================

$PluginSlug    = "lbc-animate-any-block"
$PluginDir     = $PSScriptRoot
$DistDir       = Join-Path $PluginDir "dist"
$ZipFile       = Join-Path $DistDir "$PluginSlug.zip"
# Use TEMP for staging to avoid file watcher locks from `npm run start`
$StagingDir    = Join-Path $env:TEMP $PluginSlug

# Files and folders to include in the ZIP (production only).
$ProductionItems = @(
    "lbc-animate-any-block.php",
    "readme.txt",
    "includes",
    "build",
    "assets",
    "vendor"
)

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  LBC Animate Any Block - Build ZIP" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# -----------------------------------------------------------------------------
# Step 1: Run production build
# -----------------------------------------------------------------------------
Write-Host "[1/4] Running npm run build..." -ForegroundColor Yellow

$buildResult = npm run build 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "      ERROR: Build failed. Aborting." -ForegroundColor Red
    Write-Host $buildResult
    exit 1
}
Write-Host "      Build successful." -ForegroundColor Green

# -----------------------------------------------------------------------------
# Step 2: Clean and create staging directory
# -----------------------------------------------------------------------------
Write-Host "[2/4] Preparing staging directory..." -ForegroundColor Yellow

if (Test-Path $StagingDir) {
    Remove-Item -Recurse -Force $StagingDir
}
if (Test-Path $ZipFile) {
    Remove-Item -Force $ZipFile
}

New-Item -ItemType Directory -Force -Path $StagingDir | Out-Null
Write-Host "      Staging: $StagingDir" -ForegroundColor Gray

# -----------------------------------------------------------------------------
# Step 3: Copy production files into staging folder
# -----------------------------------------------------------------------------
Write-Host "[3/4] Copying production files..." -ForegroundColor Yellow

foreach ($item in $ProductionItems) {
    $sourcePath = Join-Path $PluginDir $item

    if (-not (Test-Path $sourcePath)) {
        Write-Host "      WARNING: '$item' not found, skipping." -ForegroundColor DarkYellow
        continue
    }

    $destPath = Join-Path $StagingDir $item

    if (Test-Path $sourcePath -PathType Container) {
        # Directory — copy recursively.
        Copy-Item -Recurse -Force $sourcePath $destPath
    } else {
        # File — copy directly.
        Copy-Item -Force $sourcePath $destPath
    }

    Write-Host "      Copied: $item" -ForegroundColor Gray
}

# -----------------------------------------------------------------------------
# Step 4: Create ZIP archive
# -----------------------------------------------------------------------------
Write-Host "[4/4] Creating ZIP archive..." -ForegroundColor Yellow

Compress-Archive -Path $StagingDir -DestinationPath $ZipFile -Force

# Clean up staging directory.
Remove-Item -Recurse -Force $StagingDir

# Show result.
$ZipSize = (Get-Item $ZipFile).Length / 1KB
Write-Host ""
Write-Host "=======================================" -ForegroundColor Green
Write-Host "  ZIP created successfully!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host "  File : $ZipFile" -ForegroundColor White
Write-Host "  Size : $([math]::Round($ZipSize, 1)) KB" -ForegroundColor White
Write-Host ""
Write-Host "  Contents:" -ForegroundColor Cyan
foreach ($item in $ProductionItems) {
    Write-Host "    + $PluginSlug/$item" -ForegroundColor Gray
}
Write-Host ""
