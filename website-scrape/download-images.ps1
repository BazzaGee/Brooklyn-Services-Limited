# Brooklyn Services Image Downloader
# Run this PowerShell script to download all images

# Create directory for downloaded images
$downloadPath = "C:\Users\barry\OneDrive\Desktop\Prospect List\Brooklyn Services Limited\website-scrape\images"
New-Item -ItemType Directory -Force -Path $downloadPath

# Create subdirectories
$subdirs = @("logo", "plumbing", "drainage", "utility-locating", "leak-detection", "team", "projects", "partners")
foreach ($dir in $subdirs) {
    New-Item -ItemType Directory -Force -Path "$downloadPath\$dir"
}

# Image URLs organized by category
$images = @{
    # LOGO & BRANDING
    "logo\logo-85.png" = "https://www.brooklynservices.co.nz/wp-content/uploads/2016/10/logo-85.png"
    
    # PLUMBING (2025)
    "plumbing\IMG_1627-water-filter.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_1627-2-scaled.jpeg"
    "plumbing\IMG_9223-hot-water-cylinder.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_9223-scaled.jpeg"
    "plumbing\IMG_6612-commercial-boiler.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_6612-scaled.jpg"
    "plumbing\IMG_5437-commercial-maintenance.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_5437-scaled.jpeg"
    "plumbing\IMG_5070-commercial-plumbing.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_5070-scaled.jpeg"
    "plumbing\IMG_2630-rural-repairs.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2630-scaled.jpg"
    "plumbing\IMG_2561-butterfly-valves.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2561-scaled.jpg"
    "plumbing\IMG_2191-commercial-maintenance-2.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2191-scaled.jpg"
    
    # PLUMBING (2016 Historical)
    "plumbing\IMG_0974-historical.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2016/11/IMG_0974.jpeg"
    "plumbing\IMG_1330-historical.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2016/11/IMG_1330.jpeg"
    "plumbing\IMG_1333-historical.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2016/11/IMG_1333.jpeg"
    
    # DRAINAGE (2025)
    "drainage\IMG_9873.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_9873-2-scaled.jpg"
    "drainage\IMG_4401.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_4401-scaled.jpg"
    "drainage\IMG_2878.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2878-2-scaled.jpeg"
    "drainage\IMG_2417.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2417-scaled.jpg"
    "drainage\IMG_2445.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2445-scaled.jpg"
    "drainage\IMG_2609.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2609-scaled.jpg"
    "drainage\IMG_1433.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_1433.jpg"
    "drainage\IMG_1093.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_1093-2-scaled.jpg"
    
    # UTILITY LOCATING (2025)
    "utility-locating\IMG_2970-water-main.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2970-2-scaled.jpg"
    "utility-locating\IMG_3392-services-located.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_3392-scaled.jpg"
    "utility-locating\IMG_3394-services-located-2.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_3394-scaled.jpg"
    
    # UTILITY LOCATING (2019)
    "utility-locating\IMG_0405.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2019/06/IMG_0405-1.jpg"
    "utility-locating\IMG_1239-alexandra.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2019/06/IMG_1239.jpg"
    "utility-locating\IMG_9253-cctv-sonde.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2019/06/IMG_9253-3.jpg"
    
    # LEAK DETECTION (2025)
    "leak-detection\IMG_2970-leak.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2970-2-scaled.jpg"
    "leak-detection\IMG_3647.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_3647-scaled.jpg"
    "leak-detection\IMG_8049.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_8049-scaled.jpg"
    "leak-detection\IMG_0903.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_0903-scaled.jpg"
    "leak-detection\IMG_2867.jpeg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/IMG_2867-3-scaled.jpeg"
    "leak-detection\IMG_5587.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/04/IMG_5587-scaled.jpg"
    
    # LEAK DETECTION (2019)
    "leak-detection\IMG_1043.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2019/06/IMG_1043-1.jpg"
    "leak-detection\IMG_0881.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2019/06/IMG_0881-2.jpg"
    
    # TEAM & ABOUT
    "team\team-photo-2016.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2016/10/12185274_10206899416516455_4267213347158455875_o.jpg"
    
    # PROJECTS
    "projects\project-photo-2016.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2016/10/2016-09-12-12.48.21-225x300.jpeg"
    
    # PARTNERS & CERTIFICATIONS
    "partners\rinnai-badge.png" = "https://www.brooklynservices.co.nz/wp-content/uploads/2025/01/Untitled-300x114.png"
    
    # HOMEPAGE FEATURE
    "plumbing\homepage-feature.jpg" = "https://www.brooklynservices.co.nz/wp-content/uploads/2016/11/IMG_3216-300x225.jpg"
}

Write-Host "Starting download of $($images.Count) images..." -ForegroundColor Cyan
Write-Host ""

$success = 0
$failed = 0

foreach ($item in $images.GetEnumerator()) {
    $relativePath = $item.Key
    $url = $item.Value
    $outputPath = Join-Path $downloadPath $relativePath
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -TimeoutSec 30 -ErrorAction Stop
        Write-Host "✓ Downloaded: $relativePath" -ForegroundColor Green
        $success++
    } catch {
        Write-Host "✗ Failed: $relativePath - $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Download Complete!" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Success: $success" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host "Total: $($images.Count)" -ForegroundColor White
Write-Host ""
Write-Host "Images saved to: $downloadPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "Subdirectories created:" -ForegroundColor Yellow
Get-ChildItem $downloadPath -Directory | ForEach-Object { Write-Host "  - $($_.Name)" }
