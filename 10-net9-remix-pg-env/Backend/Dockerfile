# Etapa Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

# Directorio de trabajo 
WORKDIR /app

# Copiar el archivo de proyecto y restaurar dependencias
COPY . .

RUN dotnet restore

RUN dotnet publish -c Release -o out

# Etapa Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime

# Directorio de trabajo
WORKDIR /app

# Copiar los archivos publicados desde la etapa de build
COPY --from=build /app/out .

EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["dotnet", "Backend.dll"]