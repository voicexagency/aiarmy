# 🚀 Deployment Guide - Mairaj's Command

## Quick Deployment Options

### Option 1: Vercel (RECOMMENDED - Free Tier Available)
Vercel is the official Next.js hosting platform. Deploy in 2 minutes.

#### Prerequisites
- Vercel account (free): https://vercel.com/signup
- GitHub account with repo (recommended)

#### Step 1: Push to GitHub
```bash
cd /data/.openclaw/workspace/mission-control

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - Mairaj's Command Dashboard"

# Add your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/mairaj-command.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select "Next.js" as the framework
4. Keep default settings
5. Click "Deploy"

**That's it!** Your dashboard will be live at `https://mairaj-command.vercel.app` (or custom domain)

---

### Option 2: Railway.app (Free Tier - Good Alternative)

#### Step 1: Connect GitHub
1. Go to https://railway.app
2. Click "Start New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select the `mission-control` repository

#### Step 2: Configure
1. Railway auto-detects Next.js
2. Set environment variables (if needed)
3. Click "Deploy"

**Live URL:** Railway auto-generates a URL like `https://mairaj-command.up.railway.app`

---

### Option 3: Netlify

#### Step 1: Connect & Deploy
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub repo
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Click "Deploy"

---

### Option 4: Self-Hosted (VPS/Docker)

#### Build for Production
```bash
cd /data/.openclaw/workspace/mission-control
npm run build
npm start
```

Then expose port 3000 via your VPS/domain.

---

## Environment Variables (If Needed)

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-domain.com
DATABASE_URL=your_database_url (if moving to real DB)
```

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test Kanban drag & drop
- [ ] Test 3D office loads
- [ ] Test form submissions (create task/deal)
- [ ] Check mobile responsiveness
- [ ] Verify data persistence (JSON files)
- [ ] Set up custom domain (if desired)
- [ ] Enable HTTPS (automatic on Vercel/Railway/Netlify)

---

## Custom Domain Setup

### On Vercel
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `command.reco.digital`)
3. Update DNS records as shown

### On Railway
1. Project Settings → Domains
2. Add custom domain + DNS configuration

### On Netlify
1. Domain settings
2. Update nameservers to Netlify's

---

## Monitoring & Logs

### Vercel
- Dashboard shows deployment history
- Real-time logs under "Deployments"
- Analytics available

### Railway
- Live logs in project dashboard
- Deployment history visible
- CPU/memory monitoring

---

## Database Migration (Future)

Currently uses JSON files (`/data/tasks.json`, `/data/deals.json`).

To move to a real database:
1. Set up PostgreSQL/MongoDB
2. Update API routes in `/app/api/`
3. Install DB client: `npm install prisma` or `npm install mongoose`
4. Update environment variables

This can be done anytime without code changes.

---

## Performance Notes

- **Build size:** ~5-8 MB (Next.js + Three.js)
- **Deployment time:** 2-3 minutes on Vercel
- **Startup time:** <5 seconds
- **3D office:** Loads in browser (no server rendering)

---

## SSL/HTTPS

All platforms provide free SSL:
- Vercel ✅ Automatic
- Railway ✅ Automatic
- Netlify ✅ Automatic

---

## Support

**Vercel Support:** https://vercel.com/support
**Railway Support:** https://railway.app/support
**Netlify Support:** https://support.netlify.com

---

## Next Steps After Deployment

1. **Custom Branding**
   - Update favicon in `/public/`
   - Change site title in `/app/layout.tsx`

2. **Analytics**
   - Add Google Analytics
   - Add error tracking (Sentry)

3. **Backup**
   - Export data regularly
   - Set up automated backups

4. **Team Access**
   - Share public URL with your team
   - Add authentication (NextAuth.js) for private access

---

## Quick Deployment Links

| Platform | Deploy Link | Free Tier |
|----------|------------|-----------|
| **Vercel** | https://vercel.com/new | ✅ Yes (500GB bandwidth/month) |
| **Railway** | https://railway.app | ✅ Yes ($5 credit/month) |
| **Netlify** | https://app.netlify.com | ✅ Yes (100GB/month) |
| **Heroku** | https://dashboard.heroku.com | ❌ Paid only |

---

**Recommended:** Use **Vercel** for best Next.js integration and reliability.

**Your Mairaj's Command dashboard is ready for the world! 🚀**
