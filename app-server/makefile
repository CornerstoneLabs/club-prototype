install:
	docker-compose build
	docker-compose run web /usr/local/bin/python manage.py migrate

createsuperuser:
	docker-compose run web /usr/local/bin/python manage.py createsuperuser

reset:
	docker rm $(docker ps -a -q)
	docker rmi $(docker images -q)
