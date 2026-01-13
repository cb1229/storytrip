# Deploy StoryTrip to Vercel (Frontend Only)

## 🚀 Quick Deploy (5 Minutes)

### Method 1: Deploy via Vercel Website (Easiest - No GitHub Required)

1. **Zip your project folder**
   - Right-click on the `StoryTrip` folder
   - Select "Compress StoryTrip"
   - This creates `StoryTrip.zip`

2. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" (use email, Google, or GitHub)

3. **Deploy**
   - Click "Add New..." → "Project"
   - Click "Browse" and upload your `StoryTrip.zip` file
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"

4. **Wait 2-3 minutes**
   - Vercel will build your app
   - You'll get a live URL like: `storytrip-xyz.vercel.app`

5. **Done!** 🎉
   - Click the URL to see your app live
   - Share it with anyone!

---

### Method 2: Deploy via GitHub (Recommended for Updates)

#### Step 1: Push to GitHub

1. **Create a GitHub account** (if you don't have one)
   - Go to https://github.com/signup

2. **Create a new repository**
   - Click the "+" icon → "New repository"
   - Name it "storytrip"
   - Keep it public
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push your code** (in your Terminal):
   ```bash
   cd "/Users/chrisbrady/Desktop/Claude Code/StoryTrip"

   # Initialize git
   git init

   # Add all files
   git add .

   # Commit
   git commit -m "Initial commit - StoryTrip app"

   # Add your GitHub repo (replace YOUR_USERNAME)
   git remote add origin https://github.com/YOUR_USERNAME/storytrip.git

   # Push
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Connect Vercel to GitHub

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up with your GitHub account

2. **Import your repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose "storytrip" from the list
   - Click "Import"

3. **Configure (optional)**
   - Framework Preset: Vite (should auto-detect)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Leave everything else as default

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes

5. **Done!** 🎉
   - You'll get a URL like: `storytrip.vercel.app`
   - Future pushes to GitHub will auto-deploy!

---

## ✅ What Will Work

Since this is frontend-only deployment:

- ✅ **All UI screens** - Home, Story Selection, Trip Details, Live Capture, Documentary
- ✅ **Navigation** - React Router works perfectly
- ✅ **Form UI** - Booking form displays and validates
- ✅ **State Management** - Zustand store works
- ✅ **Styling** - All Tailwind CSS preserved
- ✅ **Phone mockup** - Full interactive prototype

## ⚠️ What Won't Work (Expected)

- ❌ **API Calls** - Backend endpoints not available
- ❌ **Booking submission** - Form validates but can't save
- ❌ **Database** - No data persistence
- ❌ **Authentication** - Login/register won't work

**This is expected!** The app will run smoothly and show everything. API failures are handled gracefully.

---

## 🔧 Troubleshooting

### Build Fails with "npm not found"
Vercel has npm pre-installed. This shouldn't happen. If it does:
- Check that `package.json` is in the root folder
- Try re-deploying

### Build Fails with TypeScript Errors
This might happen if dependencies aren't installing correctly. To fix:
1. In Vercel dashboard, go to Settings → General
2. Set Node.js version to `18.x` or `20.x`
3. Redeploy

### Page Shows "404" Error
This means routing isn't configured. The `vercel.json` file should fix this automatically. If not:
1. Go to Vercel dashboard → Settings → Rewrites
2. Add: Source: `/(.*) ` → Destination: `/index.html`

### API Errors in Console
This is normal! Check the browser console and you'll see:
```
API not available - running in frontend-only mode
```

This is expected and doesn't break anything.

---

## 📱 After Deployment

1. **Share your URL**: Send the Vercel URL to anyone
2. **Click through all screens**: Everything should work smoothly
3. **Test the booking form**: Fill it out to see validation in action
4. **Check the console**: You'll see "API not available" messages (normal)

---

## 🚀 Next Steps (Optional)

Want to make the backend work too? You have two options:

### Option A: Deploy Backend to Railway
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Connect your repo
4. Railway will auto-detect Express + MongoDB
5. Get your API URL
6. Update Vercel environment variable: `VITE_API_URL=your-railway-url`

### Option B: Run Backend Locally
When you want to test full functionality:
1. Install Node.js locally
2. Run `npm install`
3. Run `npm run dev:all`
4. Everything works on localhost

---

## 💡 Pro Tips

- **Custom Domain**: In Vercel settings, you can add your own domain (free)
- **Environment Variables**: Add `VITE_API_URL` in Vercel settings if you deploy the backend later
- **Auto-Deploy**: With GitHub, every push automatically deploys
- **Preview URLs**: Each branch gets its own preview URL

---

## 🎬 That's It!

You now have a **live, shareable URL** for your StoryTrip app!

The UI is fully functional and looks exactly as designed. When you're ready to add backend functionality, we can deploy that separately.

**Questions?** Let me know if you run into any issues during deployment!
