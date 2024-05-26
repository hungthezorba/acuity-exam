#!/bin/bash

cp packages/api/.env.sample packages/api/.env

cp packages/web/.env.sample packages/web/.env

npm install

npm run dev:all