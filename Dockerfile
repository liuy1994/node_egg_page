FROM node:18.15.0-buster

COPY . ./temp

WORKDIR /temp

CMD apt update

CMD apt install sshpass

CMD yarn

CMD yarn build

CMD sshpass -f /pwd scp -rf ./dist/** root@43.142.101.138:/frontend/www/demo-page

CMD exit

