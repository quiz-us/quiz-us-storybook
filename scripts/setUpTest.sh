#!/usr/bin/env bash

echo -e "Installing node_modules for storybook dir..."
npm ci
echo -e "Installing node_modules inner component library dir..."
cd quiz-us-components && npm ci && cd ..
