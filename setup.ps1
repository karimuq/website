<<<<<<< HEAD
# Create the directory structure
$galleryRoot = "pixel-art-gallery"
New-Item -ItemType Directory -Force -Path $galleryRoot
Set-Location $galleryRoot

# Create necessary directories
$directories = @(
    "characters/Mimi/mimi_1",
    "characters/Mimi/mimi_2",
    "characters/Kamilaaaaa"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir
}

# Copy image files from desktop
$sourceRoot = "C:\Users\karim\Desktop\pixel art gallery"
$filesToCopy = @(
    @{
        Source = "$sourceRoot\characters\Mimi\mimi_1\Mimi1.png"
        Destination = "characters\Mimi\mimi_1\Mimi1.png"
    },
    @{
        Source = "$sourceRoot\characters\Mimi\mimi_2\Mimi_idel2.gif"
        Destination = "characters\Mimi\mimi_2\Mimi_idel2.gif"
    },
    @{
        Source = "$sourceRoot\characters\Mimi\mimi_2\Mimi_run2.gif"
        Destination = "characters\Mimi\mimi_2\Mimi_run2.gif"
    },
    @{
        Source = "$sourceRoot\characters\Kamilaaaaa\Kamilaaaaaa.png"
        Destination = "characters\Kamilaaaaa\Kamilaaaaaa.png"
    }
)

foreach ($file in $filesToCopy) {
    Copy-Item -Path $file.Source -Destination $file.Destination -Force
}

# Copy web files
Copy-Item -Path "gallery.html" -Destination "."
Copy-Item -Path "gallery-styles.css" -Destination "."
Copy-Item -Path "gallery-script.js" -Destination "."
Copy-Item -Path "gallery-loader.js" -Destination "."

=======
# Create the directory structure
$galleryRoot = "pixel-art-gallery"
New-Item -ItemType Directory -Force -Path $galleryRoot
Set-Location $galleryRoot

# Create necessary directories
$directories = @(
    "characters/Mimi/mimi_1",
    "characters/Mimi/mimi_2",
    "characters/Kamilaaaaa"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir
}

# Copy image files from desktop
$sourceRoot = "C:\Users\karim\Desktop\pixel art gallery"
$filesToCopy = @(
    @{
        Source = "$sourceRoot\characters\Mimi\mimi_1\Mimi1.png"
        Destination = "characters\Mimi\mimi_1\Mimi1.png"
    },
    @{
        Source = "$sourceRoot\characters\Mimi\mimi_2\Mimi_idel2.gif"
        Destination = "characters\Mimi\mimi_2\Mimi_idel2.gif"
    },
    @{
        Source = "$sourceRoot\characters\Mimi\mimi_2\Mimi_run2.gif"
        Destination = "characters\Mimi\mimi_2\Mimi_run2.gif"
    },
    @{
        Source = "$sourceRoot\characters\Kamilaaaaa\Kamilaaaaaa.png"
        Destination = "characters\Kamilaaaaa\Kamilaaaaaa.png"
    }
)

foreach ($file in $filesToCopy) {
    Copy-Item -Path $file.Source -Destination $file.Destination -Force
}

# Copy web files
Copy-Item -Path "gallery.html" -Destination "."
Copy-Item -Path "gallery-styles.css" -Destination "."
Copy-Item -Path "gallery-script.js" -Destination "."
Copy-Item -Path "gallery-loader.js" -Destination "."

>>>>>>> b7c607f8d85ff671e11d7d038cd55fd588be8bb0
Write-Host "Gallery setup complete. Open gallery.html to view the gallery." 