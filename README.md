## Projekto pasileidimas

## Prequisities 

Install node version 19+  
Install docker

## Frontend

Install packages:
```
npm i
```

Run development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


## Backend

Run database locally:
```
docker-compose up mysql2
```

Initialize prisma:
```
npx prisma generate
npx prisma db push
```

View database records in browser:
```
npx prisma studio
```
