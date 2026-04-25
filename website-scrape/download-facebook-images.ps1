# Download Facebook Images - Must run immediately after scraping
$downloadPath = "C:\Users\barry\OneDrive\Desktop\Prospect List\Brooklyn Services Limited\website-scrape\images\facebook"
New-Item -ItemType Directory -Force -Path $downloadPath

# Fresh Facebook image URLs (from Apify scrape)
$facebookImages = @(
    "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/505653409_1268900965245099_3505819701464153059_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=4P8wR347NE8Q7kNvwGooEZM&_nc_oc=Ado8VDJym6qXQBDnDpqA89vmWN4CJR11VfL8mCMIu7rx9iawesFtGsh7T0gmFRemQhk&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=MkWSy1MvsKM9jziC2YqraA&_nc_ss=7a389&oh=00_Af1tSegbYg2DH1xLtueKEaed22kSAyKvX8gGRZfDTyeUCw&oe=69E13DD4",
    "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/497702529_1246354634166399_2083182025084158640_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=bZM7Ysyz3x8Q7kNvwHb-zZL&_nc_oc=Adqr5DB-1oOFeA_PmoUDpgSFGc_f4rguNvoubJxEUYwcDli_JUm7vFRKx2Scu0YBIjc&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=MkWSy1MvsKM9jziC2YqraA&_nc_ss=7a389&oh=00_Af0vmwqI9jV3U7CyBTR7sSDbJcpYifUKbvWS66VVjC2_xQ&oe=69E13BEA",
    "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/496972996_1246354877499708_3839135585234771690_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=EbFkn1p8a7UQ7kNvwFEzNnK&_nc_oc=Adq9mNveJJR8or3b33dBMuRP3GYMZ7goXeOG9_wCfn_usVFuL0rPiohGzJMmFqpCQKc&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=MkWSy1MvsKM9jziC2YqraA&_nc_ss=7a389&oh=00_Af03X1h0MyNbDkyqcxJSXDq1GPyLOfDf1Y1rBDQU8UChxw&oe=69E13319",
    "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/498174752_1246354880833041_5219474699206457766_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=LbRpUutZrlwQ7kNvwEMhrTG&_nc_oc=AdrY2BjEofsp9lJEG68WOn9M2kqBBi8xMTCBGlfyESPiY8B8MUg4D2fa-9ZsRhLxdok&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=MkWSy1MvsKM9jziC2YqraA&_nc_ss=7a389&oh=00_Af2wWxGb50G_GrkhHGzFhA9TaRgZ81SlaQS2ifmHTdxgEQ&oe=69E159F4",
    "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/498178337_1246258570842672_9041973973755899354_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=oXoOOGwsCxAQ7kNvwHMeWSY&_nc_oc=AdrvLULSZatSBPPrV0Ykg1SmJHAhYa2WXahZ29ZQBzQrpnrOuJvhlMYdXvIwEE0afpM&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=MkWSy1MvsKM9jziC2YqraA&_nc_ss=7a389&oh=00_Af3zYreFK4C3xC0TOMveA91W_JHu0j2VU7UkFcSb5dm6_A&oe=69E14912",
    "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/497502662_1245330160935513_4448899927109684938_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=uy9Iez0B4ZUQ7kNvwHmC-NG&_nc_oc=AdrihEEwTA2GG_ht-bLfY0f4njmYb4cUv82K_Rg2g_PCJ5Mqx1-9Mib6zsX913__zDE&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=MkWSy1MvsKM9jziC2YqraA&_nc_ss=7a389&oh=00_Af0jTFWYFpGRGLqLd2eE0oW0639_9Pdc6CkrzhXsMtVd8w&oe=69E14224",
    "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/496095472_1245060640962465_8873224601398917551_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=S3HycLUZgbMQ7kNvwHM780d&_nc_oc=AdopOAgN2gDt1ja33Sjfa3wMoI9f_C6Te2o3rsNp-wVhJBk4OXel-fUs9VAVf0X1jVg&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=MkWSy1MvsKM9jziC2YqraA&_nc_ss=7a389&oh=00_Af180ZIopX16bjVr5DlwFNJ-BSA5TmsCtyMSDt6HE9SOUg&oe=69E1549B",
    "https://scontent-msp1-1.xx.fbcdn.net/v/t39.30808-6/496863794_1245049604296902_3655576867751778887_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=IohJkjIQoz4Q7kNvwHA_8yp&_nc_oc=AdpwiM00nY57Z7iz51rM8xIHHFui7u64gNxfodG00Mboe0lTEHqYiLLN2qdQh_64PzU&_nc_zt=23&_nc_ht=scontent-msp1-1.xx&_nc_gid=MkWSy1MvsKM9jziC2YqraA&_nc_ss=7a389&oh=00_Af0Ve6Hh9r_KsXWOHKMqLzuTHQex3d_9EmNY9wM_rtLo0g&oe=69E13C5C",
    "https://scontent.fhyw1-1.fna.fbcdn.net/v/t39.30808-6/473617299_1143435591124971_2053603276609682119_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=7QXLdoafuwAQ7kNvwEzpapK&_nc_oc=Ado6GeuNy8IOJxLLVtvn5ZywuWS6QQZBmLQyG6gFiyYcM0k-ETBzqOp00LrQxPHfn78&_nc_zt=23&_nc_ht=scontent.fhyw1-1.fna&_nc_gid=zAL7yDinV3QShA1Oxq0v0g&_nc_ss=7a389&oh=00_Af1jE8YWXQwWpWTVssqVwyf3ptjOl0O6jcyzcm-q3c0Smg&oe=69E1503B",
    "https://scontent.fhyw1-1.fna.fbcdn.net/v/t39.30808-6/495372086_1241851494616713_2040724062638538910_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=xfb9ZfczJQYQ7kNvwGePQ90&_nc_oc=AdqD35dCfhSd8twh3uGika5BToEqqa07ep9f_QBLx3i9JYmXDNNRS12yeEUQ5CUhYvM&_nc_zt=23&_nc_ht=scontent.fhyw1-1.fna&_nc_gid=zAL7yDinV3QShA1Oxq0v0g&_nc_ss=7a389&oh=00_Af3lHJ7AZW-2cQxcS0EtYvqfQaNWW-wSCB5OJ9kEc6YzYA&oe=69E14C76",
    "https://scontent.fhyw1-1.fna.fbcdn.net/v/t39.30808-6/456245823_17852463843256566_381646747943910311_n.jpg?stp=dst-jpegr_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=p9mHwM4zKXUQ7kNvwFWyqkk&_nc_oc=AdoRqo90fwPnS0IIYxzQAB-NvDd74APD5bRo-Bz3cONt8l95SKeYjrYDhHHmldTidI0&_nc_zt=23&se=-1&_nc_ht=scontent.fhyw1-1.fna&_nc_gid=zAL7yDinV3QShA1Oxq0v0g&_nc_ss=7a389&oh=00_Af2wO_05W7HJ_X_CGGKlUk8Lc9Ln6GT9XHpZ7uGLYxvfCQ&oe=69E13EAF",
    "https://scontent.fhyw1-1.fna.fbcdn.net/v/t39.30808-6/456251291_17852463852256566_1374727502182976678_n.jpg?stp=dst-jpegr_tt6&_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=XTP23AqO09gQ7kNvwGe7EMN&_nc_oc=AdpVCcinpTdDXRJiFhvQ7iqiCZ-_OkvMn56XAhUQ_YHssnTBR8Vxcb6WStfIRPW6ITk&_nc_zt=23&se=-1&_nc_ht=scontent.fhyw1-1.fna&_nc_gid=zAL7yDinV3QShA1Oxq0v0g&_nc_ss=7a389&oh=00_Af3GYHwfYqrVfp2lNwnqDJpBxZps9zwmp5tc328LXKskwA&oe=69E137D9",
    "https://scontent.fhyw1-1.fna.fbcdn.net/v/t39.30808-6/494692575_1234875478647648_3413838019912274330_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=B_nR67IFwesQ7kNvwGIUXG-&_nc_oc=AdoWYiGcU3EFLkYS6geRE1fpw6V3TQ-6rCiiKFfjUO4tt7hkf8rui8wo5a0dlZbg1H4&_nc_zt=23&_nc_ht=scontent.fhyw1-1.fna&_nc_gid=zAL7yDinV3QShA1Oxq0v0g&_nc_ss=7a389&oh=00_Af0cZ9HYuqAT6iROZWMhRRLXDB96o45jiVu3WjvfoSt6dw&oe=69E149EC",
    "https://scontent.fhyw1-1.fna.fbcdn.net/v/t39.30808-6/494305836_1234871208648075_5172321736102921731_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=6rWP_3Aao5YQ7kNvwE76qss&_nc_oc=AdqBr9uAWVgMaaepP38tGeBLFv5e1FJTdzPH-xFvOEmL1BbvVt-xdqgHnv3MkOZkFdY&_nc_zt=23&_nc_ht=scontent.fhyw1-1.fna&_nc_gid=zAL7yDinV3QShA1Oxq0v0g&_nc_ss=7a389&oh=00_Af1m5T9HJfc-33uhiXj0gvTVMAwQryvLnVskxaZKCcFCgQ&oe=69E146BD",
    "https://scontent.fhyw1-1.fna.fbcdn.net/v/t39.30808-6/495175580_1234871108648085_286670442136590577_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=dsaTffomx38Q7kNvwEAZf_8&_nc_oc=AdpSET1_3ssfGTscobFzsr9WR2P0fRvugIQiN-gcX9VU15dj3iEX5HjNnxtuyLbqdHA&_nc_zt=23&_nc_ht=scontent.fhyw1-1.fna&_nc_gid=zAL7yDinV3QShA1Oxq0v0g&_nc_ss=7a389&oh=00_Af0NHJj0prEG77h076U3-qN47Q3n6rjnWg0JFqDdclnGeA&oe=69E13131"
)

Write-Host "Downloading 15 Facebook images..." -ForegroundColor Cyan
Write-Host ""

$success = 0
$failed = 0

for ($i = 0; $i -lt $facebookImages.Count; $i++) {
    $url = $facebookImages[$i]
    $filename = "facebook-photo-$($i+1).jpg"
    $output = Join-Path $downloadPath $filename
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -TimeoutSec 30 -ErrorAction Stop
        $fileSize = (Get-Item $output).Length
        Write-Host "✓ Downloaded: $filename ($fileSize bytes)" -ForegroundColor Green
        $success++
    } catch {
        Write-Host "✗ Failed: $filename - $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Download Complete!" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Success: $success" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red
Write-Host "Total: $($facebookImages.Count)" -ForegroundColor White
Write-Host ""
Write-Host "Images saved to: $downloadPath" -ForegroundColor Cyan
Write-Host ""
