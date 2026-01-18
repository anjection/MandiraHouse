#!/bin/bash

# Check if a commit message was provided
if [ -z "$1" ]
then
    MESSAGE="Refine Hero layout and mobile responsiveness"
else
    MESSAGE="$1"
fi

echo "🚀 Staging changes..."
git add .

echo "📦 Committing with message: '$MESSAGE'..."
git commit -m "$MESSAGE"

echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Done!"
