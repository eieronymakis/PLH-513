all: up

up:
	sudo docker-compose up -d
down:
	sudo docker-compose down -v
bash:
	sudo docker exec -it $(id) /bin/bash
stop:
	sudo docker-compose stop
start:
	sudo docker-compose start
clean:
	sudo rm -rf ./Server/package-lock.json
	sudo rm -rf ./Server/node_modules
	sudo rm -rf ./DataStorageAPI/package-lock.json
	sudo rm -rf ./DataStorageAPI/node_modules
idm:
	sudo docker exec -i $(id) mysql -uroot -psecret idm < ./idm.sql 