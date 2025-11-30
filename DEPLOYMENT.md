# 🚀 Deployment Guide

## Option 1: Deploy Backend on Railway

1. **Create Railway Account**: https://railway.app
2. **Create New Project** → **Deploy from GitHub**
3. **Add MySQL Database**:
   - Click "New" → "Database" → "MySQL"
   - Copy the connection details
4. **Set Environment Variables**:
   ```
   DB_URL=mysql://user:password@host:port/database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   SPRING_PROFILES_ACTIVE=prod
   ```
5. **Deploy**: Railway will auto-deploy from your GitHub repo

## Option 2: Deploy Backend on Heroku

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
2. **Login**:
   ```bash
   heroku login
   ```
3. **Create App**:
   ```bash
   cd backend
   heroku create brainburst-quiz-api
   ```
4. **Add MySQL**:
   ```bash
   heroku addons:create jawsdb:kitefin
   ```
5. **Set Config**:
   ```bash
   heroku config:set SPRING_PROFILES_ACTIVE=prod
   ```
6. **Deploy**:
   ```bash
   git push heroku main
   ```

## Deploy Frontend on Vercel

1. **Create Vercel Account**: https://vercel.com
2. **Import GitHub Repository**
3. **Configure**:
   - Framework: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
5. **Deploy**: Vercel will auto-deploy

## Deploy Frontend on Netlify

1. **Create Netlify Account**: https://netlify.com
2. **New Site from Git** → Select your repo
3. **Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
5. **Deploy**

## Database Migration

For production, run these SQL files in order:
1. `database/schema.sql`
2. `database/auth_schema.sql`
3. `database/sample_data.sql`
4. `database/additional_questions.sql`

## Post-Deployment

1. Update CORS settings in backend to allow your frontend URL
2. Test all features
3. Monitor logs for errors
4. Set up SSL certificates (usually automatic on Vercel/Netlify)

## Troubleshooting

- **CORS Error**: Update `spring.web.cors.allowed-origins` in application-prod.properties
- **Database Connection**: Check DB_URL format and credentials
- **Build Fails**: Ensure Java 17 and Node 16+ are specified in deployment settings
