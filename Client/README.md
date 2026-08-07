# Step 1 Project Initialization:
### 1) create vite project `(npm create vite@latest)`

# Step 2 Tailwind CSS Configuration:
### 1) install `(npm install tailwindcss @tailwindcss/vite)`
### 2) import `(import tailwindcss from '@tailwindcss/vite')`,` tailwindcss(),`
### 3) import in index.css file `(@import "tailwindcss";)`

# Step 3 Shadcn UI Installation Process — React + Vite
### 1) `(npm install -D @types/node)`
### 2) Add vite.config 
### `resolve: {
###   alias: { 
 ###   "@":`${import.meta.dirname}/src`,
 ###    },  },`
### 3) create file jsconfig.json
###    {
### "compilerOptions": {
###    "baseUrl": ".",
###    "paths": {
###      "@/*": ["./src/*"]
###    } } }
### 4) install `(npx shadcn@latest init)`
### 5) using button so install `(npx shadcn@latest add button)`
### 6) useing this so import `(import { Button } from "@/components/ui/button")`, `<Button>Click me</Button>`
  
