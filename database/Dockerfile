FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE mysql
ADD script.sql /docker-entrypoint-initdb.d
EXPOSE 3306