#!/bin/bash
brew install imagemagick
npm install -g gltf-pipeline

# Check if filename argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <filename without extension>"
    exit 1
fi

filename=$1

# Convert first letter to uppercase (assumes bash 4+ for capitalization)
ComponentName="$(tr '[:lower:]' '[:upper:]' <<< ${filename:0:1})${filename:1}"

# Define directories
modelSourceDir="assets"
modelTargetDirPublic="/models/$ComponentName"
modelTargetDir="public${modelTargetDirPublic}"
componentDir="src/models"

# Ensure output directories exist
mkdir -p $modelTargetDir
mkdir -p $componentDir


# Step 1: Convert GLTF to separate GLTF + BIN + textures
gltf-pipeline -i "$modelSourceDir/$filename.gltf" -o "$modelSourceDir/$filename-separated.gltf" --separate --separateTextures

# Step 2: Convert all textures to JPG and resize if necessary
find "$GLTF_PATH" -type f \( -iname \*.png -o -iname \*.jpg \) | while read -r texture; do
    # Convert to JPG
    convert "$texture" -format jpg -resize 1024x1024\> "${texture%.*}.jpg"

    # Check if original texture is PNG, then remove it
    if [[ "$texture" == *.png ]]; then
        rm "$texture"
    fi
done


outputFilename="$modelTargetDir/$filename.gltf"
npx gltf-transform cp "$modelSourceDir/$filename-separated.gltf" $outputFilename
npx gltf-transform validate $outputFilename

npx gltf-transform dedup $outputFilename $outputFilename
npx gltf-transform prune $outputFilename $outputFilename
npx gltf-transform simplify $outputFilename $outputFilename
#npx gltf-transform metalrough $outputFilename $outputFilename
npx gltf-transform reorder $outputFilename $outputFilename
npx gltf-transform center $outputFilename $outputFilename
npx gltf-transform jpg $outputFilename $outputFilename
npx gltf-transform png $outputFilename $outputFilename
npx gltf-transform resize $outputFilename $outputFilename --width 1024 --height 1024
npx gltf-transform optimize $outputFilename $outputFilename
npx gltf-transform validate $outputFilename
#npx gltf-transform draco $outputFilename $outputFilename
npx gltf-transform gzip $outputFilename

# Convert GLTF to JSX component (TypeScript version)
npx gltfjsx $outputFilename -t --types --output "$componentDir/${ComponentName}.tsx"

# Reformat the outputted file to use ES6 arrow functions, adjust the component name, and export statement
sed -i '' "s/export function Model/const $ComponentName = /" "${componentDir}/${filename}.tsx"
sed -i '' "s/) {/) => {/" "${componentDir}/${filename}.tsx"
sed -i '' "s/\/${filename}.gltf/\/models\/${ComponentName}\/${filename}.gltf/" "${componentDir}/${filename}.tsx"
echo "export default ${ComponentName};" >> "$componentDir/${ComponentName}.tsx"

echo "GLTF processed and JSX component created: $componentDir/$filename.tsx"
