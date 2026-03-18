# Bunny Bound

Bunny Bound is a lightweight Phaser 3 platformer MVP built with Vite. It uses original monochrome sketch-style placeholder art, runs fully client-side, and is designed for a simple GitHub-to-VPS deployment flow.

## Features

- Title screen, game scene, HUD overlay, and game over flow
- Responsive desktop and mobile browser support
- Crisp arcade movement with coyote time and jump buffering
- One compact hand-authored level with collectibles, spikes, pits, timer, and goal gate
- Optional touch controls and pause button
- Static production build that can be served directly by NGINX

## Project Structure

```text
bunny-platformer/
  public/
    assets/
      images/
      audio/
      fonts/
  src/
    main.js
    styles.css
    game/
      assets.js
      config.js
      constants.js
      levelData.js
      scenes/
      objects/
      utils/
  deploy.sh
  index.html
  package.json
  vite.config.js
```

## Local Setup

### Requirements

- Node.js 20+ recommended
- npm 10+ recommended

### Install

```bash
cd bunny-platformer
npm install
```

### Run the Dev Server

```bash
cd bunny-platformer
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Build and Preview

```bash
cd bunny-platformer
npm run build
npm run preview
```

The production build outputs static files into `dist/`.

## Controls

- Move: Left/Right arrows or `A` / `D`
- Jump: `Space`, `Up`, or `W`
- Pause: `P`, `Esc`, or the on-screen pause button
- Mobile: tap the on-screen left, right, and jump buttons

## GitHub Workflow

GitHub is the source of truth for the project.

### Initialize Git Locally

If this game lives in its own repository:

```bash
cd bunny-platformer
git init
git add .
git commit -m "Initial Bunny Bound MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If you are keeping it inside a larger repo, commit from the repo root instead.

### Standard Update Flow

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

## Ubuntu VPS Deployment with NGINX

Recommended folder layout:

```text
/var/www/bunny-platformer/
  repo/   # git clone lives here
  site/   # built files served by nginx
```

### First Deploy

Install dependencies if needed:

```bash
sudo apt update
sudo apt install -y git nginx curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Create folders and clone the repo:

```bash
sudo mkdir -p /var/www/bunny-platformer
sudo chown -R $USER:$USER /var/www/bunny-platformer
cd /var/www/bunny-platformer
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git repo
mkdir -p site
```

Build and publish:

```bash
cd /var/www/bunny-platformer/repo
npm install
npm run build
rm -rf /var/www/bunny-platformer/site/*
cp -R dist/. /var/www/bunny-platformer/site/
```

Create the NGINX server block:

```bash
sudo nano /etc/nginx/sites-available/bunny-platformer
```

Sample config:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /var/www/bunny-platformer/site;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
    }
}
```

Enable the site and reload NGINX:

```bash
sudo ln -s /etc/nginx/sites-available/bunny-platformer /etc/nginx/sites-enabled/bunny-platformer
sudo nginx -t
sudo systemctl reload nginx
```

Visit your server IP in a browser.

### Update Deploy After Future Pushes

After pushing new commits to GitHub:

```bash
cd /var/www/bunny-platformer/repo
git pull
./deploy.sh
```

If `deploy.sh` is not executable yet:

```bash
chmod +x /var/www/bunny-platformer/repo/deploy.sh
```

The script runs `npm install`, builds the app, and copies `dist/` into `/var/www/bunny-platformer/site`.

## Recommended Exact Command Sets

### Local Commands

```bash
cd /Users/markschenker/Documents/New\ project/bunny-platformer
npm install
npm run dev
```

### Git Init and Push Commands

```bash
cd /Users/markschenker/Documents/New\ project/bunny-platformer
git init
git add .
git commit -m "Initial Bunny Bound MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Ubuntu First Deploy Commands

```bash
sudo apt update
sudo apt install -y git nginx curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo mkdir -p /var/www/bunny-platformer
sudo chown -R $USER:$USER /var/www/bunny-platformer
cd /var/www/bunny-platformer
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git repo
mkdir -p site
cd repo
npm install
npm run build
chmod +x deploy.sh
./deploy.sh
sudo tee /etc/nginx/sites-available/bunny-platformer >/dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /var/www/bunny-platformer/site;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
    }
}
EOF
sudo ln -s /etc/nginx/sites-available/bunny-platformer /etc/nginx/sites-enabled/bunny-platformer
sudo nginx -t
sudo systemctl reload nginx
```

### Ubuntu Update Deploy Commands

```bash
cd /var/www/bunny-platformer/repo
git pull
chmod +x deploy.sh
./deploy.sh
```

## Testing Checklist

- Title screen loads without console errors
- Start button enters the playable level
- Keyboard movement works
- Jump feels responsive and does not double-trigger incorrectly
- Player collides correctly with platforms and walls
- Player does not fall through platforms
- Spikes reduce hearts correctly
- Collectibles increment the seal counter correctly
- Timer counts down correctly
- Goal gate triggers the win state
- Pit fall or zero hearts triggers the lose state
- Restart returns to a fresh run
- Title button returns to the title screen
- Mobile layout keeps the HUD visible and touch buttons usable
- `npm run build` completes successfully

## Troubleshooting

- If `npm install` fails on the VPS, confirm outbound internet access and Node.js installation.
- If the app shows a blank page, open browser dev tools and check for missing build assets or NGINX root misconfiguration.
- If refreshing a route returns 404, confirm the NGINX `try_files` rule points back to `/index.html`.
- If files fail to copy into `site/`, confirm your deploy user owns `/var/www/bunny-platformer`.

## Next Improvements

- Add a second level and scene-to-scene progression
- Replace placeholder SVGs with richer hand-drawn sprites and parallax layers
- Add tiny jump / collect / hit sound effects and music toggle
- Add patrol enemies or spring pads
- Add a leaderboard or save system once a backend exists
