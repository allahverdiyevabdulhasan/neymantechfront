echo "Switching to branch master"
git checkout master

echo "Bulding app ..."
npm run build

echo "Deploying files to server..."
scp -r dist/* neyman@134.209.237.235:/var/www/neymantech.com/
echo "Done!"