# 🐳 Comandos útiles de Docker

Este documento resume los comandos más comunes para trabajar con Docker, organizados por categorías.

---

## ✅ Verificar instalación de Docker

```bash
docker --version         # Muestra la versión actual de Docker instalada
docker info              # Información detallada del sistema Docker (cliente, servidor, plugins, etc.)
docker help              # Lista todos los comandos disponibles de Docker
```

---

## 📦 Imágenes (Images)

```bash
docker pull <nombre_imagen>             # Descarga una imagen desde Docker Hub u otro repositorio remoto
docker images                           # Lista todas las imágenes disponibles localmente
docker rmi <nombre_imagen>              # Elimina una imagen local (forma corta)
docker image rm <nombre_imagen>         # Elimina una imagen local (forma completa)
docker tag <imagen> <nuevo_nombre:tag>  # Crea una nueva etiqueta (alias) para una imagen
docker save -o archivo.tar <imagen>     # Guarda una imagen en un archivo .tar
docker load -i archivo.tar              # Carga una imagen desde un archivo .tar
```

---

## 🚀 Contenedores (Containers)

```bash
docker run <imagen>                             # Crea y ejecuta un contenedor
docker run -d <imagen>                          # Ejecuta el contenedor en segundo plano (detached mode)
docker run -p <puerto_host>:<puerto_cont> <imagen>  # Mapea puertos entre el host y el contenedor
docker exec -it <id|nombre> bash                # Abre una terminal interactiva dentro del contenedor
docker ps                                       # Lista los contenedores en ejecución
docker ps -a                                    # Lista todos los contenedores (incluidos los detenidos)
docker start <id|nombre>                        # Inicia un contenedor detenido
docker stop <id|nombre>                         # Detiene un contenedor en ejecución
docker restart <id|nombre>                      # Reinicia un contenedor
docker rm <id|nombre>                           # Elimina un contenedor detenido
```

---

## 🏗️ Construcción de imágenes (Build)

```bash
docker build -t <nombre:tag> .              # Construye una imagen desde un Dockerfile en el directorio actual
docker buildx build <opciones>              # Construcción avanzada con buildx (multi-arquitectura, exportación, etc.)
```

---

## 📁 Volúmenes (Volumes)

```bash
docker volume create <nombre_volumen>                  # Crea un volumen con el nombre especificado
docker volume ls                                       # Lista todos los volúmenes disponibles
docker volume inspect <nombre_volumen>                 # Muestra detalles de un volumen
docker volume rm <nombre_volumen>                      # Elimina un volumen

# Asociar un volumen a un contenedor al ejecutarlo
docker run -v <nombre_volumen>:/ruta/en/contenedor <imagen>     # Monta un volumen en el contenedor
docker run -v $(pwd)/datos:/ruta/en/contenedor <imagen>         # Monta un directorio local como volumen
```

---
## 📌 Notas

- Asegúrate de tener Docker instalado y corriendo antes de ejecutar los comandos.
- Usa `docker ps -a` para ver contenedores que ya terminaron su ejecución.
- Puedes consultar más opciones usando `--help` en cada comando (por ejemplo: `docker run --help`).

---
