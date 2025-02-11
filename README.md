# Raden Films Website

A professional website for Raden Films, featuring a mobile apps landing page and headshot photography services.

## Structure

- `index.html` - Main page with mobile apps showcase
- `headshots.html` - Professional headshot photography services page
- `styles.css` - Styling for all pages
- `script.js` - Interactive features and form handling

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. Go to repository Settings > Pages
4. Under "Source", select "main" branch
5. Click Save
6. Your site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### Custom Domain Setup (radenfilms.com)

1. In your repository's Settings > Pages:
   - Enter "radenfilms.com" in the Custom domain field
   - Save the changes

2. With your domain registrar:
   - Add an A record pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add a CNAME record:
     - Name: www
     - Value: YOUR_USERNAME.github.io

## Local Development

Simply open the HTML files in a web browser to view the site locally. No build process is required.

## Customization

### Adding Mobile Apps
Edit the `app-showcase` section in `index.html` to add your mobile applications.

### Adding Portfolio Images
Add your headshot portfolio images to the `gallery` section in `headshots.html`.

## Form Handling

Currently, the contact form logs submissions to the console. To handle form submissions:

1. Create a backend service (e.g., AWS Lambda, Netlify Forms)
2. Update the form submission code in `script.js`
3. Add your backend endpoint URL 