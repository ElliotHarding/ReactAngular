# Use the .NET SDK base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /app

# Copy the .csproj file
COPY DotNetHelloWorld/*.csproj ./

# Restore dependencies
RUN dotnet restore

# Copy the application
COPY DotNetHelloWorld/ .

##RUN dotnet build DotNetHelloWorld/MyApi.csproj -c Release

# Build the application
RUN dotnet publish -c Release -o out

#RUN dotnet build
#RUN dotnet run

# Install curl
RUN apt-get update && apt-get install -y curl

# Use the ASP.NET Core runtime base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./
EXPOSE 80
EXPOSE 5000
#ENTRYPOINT ["dotnet", "DotNetHelloWorld.dll"] #Change MyApi.dll to your dll name.
CMD ["apt-get", "update", "&&", "apt-get", "install", "-y", "curl"]
CMD ["dotnet", "DotNetHelloWorld.dll", "--urls=http://localhost:5000/"]
#CMD ["dotnet", "run"]
