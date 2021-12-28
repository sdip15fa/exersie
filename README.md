Fast deploy:
```
sudo apt install nginx certbot tmux python3-certbot-nginx
git clone https://github.com/perusio/nginx_ensite.git
cd nginx_ensite
sudo make install
cd  /etc/nginx/sites-available
sudo wget https://github.com/sdip15fa/exersie/raw/master/nginx.template.conf
mv nginx.template.conf on9.wcyat.me.conf
tmux
cd ~
git clone https://github.com/sdip15fa/exersie
cd exersie
npm install
node app.js
^B :detach
sudo nginx_ensite on9.wcyat.me.conf
sudo service nginx reload
sudo certbot
```
