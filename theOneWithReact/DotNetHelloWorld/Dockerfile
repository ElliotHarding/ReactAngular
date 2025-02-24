# Use the .NET SDK base image
FROM mcr.microsoft.com/dotnet/sdk:8.0.406 AS build

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

# Use the ASP.NET Core runtime base image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/out ./
EXPOSE 80
#ENTRYPOINT ["dotnet", "DotNetHelloWorld.dll"] #Change MyApi.dll to your dll name.
CMD ["dotnet", "DotNetHelloWorld.dll"]
