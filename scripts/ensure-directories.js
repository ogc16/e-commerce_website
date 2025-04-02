const fs = require("fs")
const path = require("path")

// Directories to create
const directories = ["public/images", "public/images/products", "public/images/categories", "public/images/banners"]

// Create directories if they don't exist
directories.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir)
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${dir}`)
    fs.mkdirSync(fullPath, { recursive: true })
  } else {
    console.log(`Directory already exists: ${dir}`)
  }
})

console.log("All directories created successfully!")

