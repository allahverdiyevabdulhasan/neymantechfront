echo "Switching to branch master"
git checkout master

echo "Bulding app ..."
npm run build

echo "Deploying files to server..."
scp -r dist/* neyman@64.23.219.51:/var/www/neymantech/
echo "Done!"