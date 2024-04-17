#!/bin/bash

#brew install imagemagick
#npm install -g gltf-pipeline
#npm install -g @gltf-transform/cli

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
gltf-pipeline -i "$modelSourceDir/$filename.gltf" -o "$modelSourceDir/$filename-transformed.gltf" --separate --separateTextures

outputFilename="$modelTargetDir/$filename.gltf"
gltf-transform cp "$modelSourceDir/$filename-transformed.gltf" $outputFilename
gltf-transform validate $outputFilename

gltf-transform dedup $outputFilename $outputFilename
gltf-transform prune $outputFilename $outputFilename
gltf-transform simplify $outputFilename $outputFilename
#gltf-transform metalrough $outputFilename $outputFilename
gltf-transform reorder $outputFilename $outputFilename
gltf-transform center $outputFilename $outputFilename
gltf-transform jpeg $outputFilename $outputFilename
gltf-transform png $outputFilename $outputFilename
gltf-transform resize $outputFilename $outputFilename --width 1024 --height 1024
gltf-transform optimize $outputFilename $outputFilename
gltf-transform validate $outputFilename
#gltf-transform draco $outputFilename $outputFilename
gltf-transform gzip $outputFilename

# Convert GLTF to JSX component (TypeScript version)
npx gltfjsx $outputFilename -t --types --instanceall --output "$componentDir/${ComponentName}.tsx"

mv "$componentDir/${ComponentName}-transformed.gltf" $outputFilename
# Reformat the outputted file to use ES6 arrow functions, adjust the component name, and export statement
sed -i '' "s/export function Model/const $ComponentName = /" "${componentDir}/${filename}.tsx"
sed -i '' "s/export function Instances/export const ${ComponentName}Instances = /" "${componentDir}/${filename}.tsx"
sed -i '' "s/) {/) => {/" "${componentDir}/${filename}.tsx"
sed -i '' "s/\/${filename}.gltf/\/models\/${ComponentName}\/${filename}.gltf/" "${componentDir}/${filename}.tsx"
echo "export default ${ComponentName};" >> "$componentDir/${ComponentName}.tsx"

echo "GLTF processed and JSX component created: $componentDir/$filename.tsx"
