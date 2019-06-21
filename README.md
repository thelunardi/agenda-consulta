# Sistema para Agendamento de Consultas

> A Vue.js project

## Build Setup

``` bash
# instale o docker
sudo apt install docker.io

# instale o docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# execute comando de build do docker para criar a imagem 
docker build -t agenda-consulta .

# execute o comando docker-compose up para construir a aplicação
docker-compose up
```
