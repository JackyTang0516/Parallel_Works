terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
    }
  } 
}   

provider "docker" {}

resource "docker_image" "mongo" {
  name = "mongo:latest"
}

resource "docker_container" "mongo" {
  image = docker_image.mongo.latest
  name  = "my-mongo"
  ports {
    internal = 27017
    external = 27018
  }
  volumes {
    container_path = "/data/db"
    host_path      = "/Users/jackytang/mongo-data"
  }
}
