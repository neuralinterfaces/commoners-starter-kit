#include <sys/socket.h> // For socket functions
#include <netinet/in.h> // For sockaddr_in
#include <cstdlib> // For exit() and EXIT_FAILURE
#include <arpa/inet.h> // For inet_addr
#include <iostream> // For cout
#include <fstream> // For ifstream
#include <sstream> // For stringstream
#include <unistd.h> // For read
#include <string> // For string
#include <map> // For map

// Function prototypes
std::string handleCommoners();
std::string handleVersion();
std::string handleUsers();
std::string handleEcho(std::string postData);
std::string handlePost(std::string postData);

std::string handlePost(std::string postData) {
    std::stringstream httpResponse;

    httpResponse << "HTTP/1.1 200 OK\r\n"
                 "Content-Type: application/json\r\n"
                 "Access-Control-Allow-Origin: *\r\n" // Allow any origin
                 "\r\n" << postData;

    return httpResponse.str();
}

std::string handleCommoners() {
    std::ifstream file("openapi.json");
    std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
    return handlePost(content);
}

std::string handleVersion() {
    std::stringstream postData;
    postData << "{\"version\":\"" << __cplusplus << "\"}";
    return handlePost(postData.str());
}

std::string handleUsers() {
    return handlePost("[{}, {}, {}]");
}

std::string handleEcho(std::string postData) {
    return handlePost(postData);
}

int main() {

    // Read PORT from environment variables or use 8080 as default
  const char* envPort = std::getenv("PORT");
  int port = envPort ? std::atoi(envPort) : 8080;

  // Read HOST from environment variables or default to localhost
  // Note: HOST is read for demonstration, but not used, as binding is to INADDR_ANY
  const char* host = std::getenv("HOST");
  in_addr_t inAddr = host ? inet_addr(host) : INADDR_ANY;
  std::cout << "Starting server on http://" << (host ? host : "0.0.0.0") << ":" << port << std::endl;

  // Create a socket (IPv4, TCP)
  int sockfd = socket(AF_INET, SOCK_STREAM, 0);
  if (sockfd == -1) {
    std::cout << "Failed to create socket. errno: " << errno << std::endl;
    exit(EXIT_FAILURE);
  }

  int opt = 1;
  if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)) < 0) {
    std::cout << "Failed to set SO_REUSEADDR. errno: " << errno << std::endl;
    exit(EXIT_FAILURE);
  }

  // Listen to port
  sockaddr_in sockaddr;
  sockaddr.sin_family = AF_INET;
  sockaddr.sin_addr.s_addr = INADDR_ANY;
  sockaddr.sin_port = htons(port); // htons is necessary to convert a number to
                                   // network byte order
  if (bind(sockfd, (struct sockaddr*)&sockaddr, sizeof(sockaddr)) < 0) {
    std::cout << "Failed to bind to port " << port << ". errno: " << errno << std::endl;
    exit(EXIT_FAILURE);
  }

  // Start listening. Hold at most 10 connections in the queue
  if (listen(sockfd, 10) < 0) {
    std::cout << "Failed to listen on socket. errno: " << errno << std::endl;
    exit(EXIT_FAILURE);
  }

  while (true) {
      auto addrlen = sizeof(sockaddr);
      int connection = accept(sockfd, (struct sockaddr*)&sockaddr, (socklen_t*)&addrlen);
      if (connection < 0) {
          std::cout << "Failed to grab connection. errno: " << errno << std::endl;
          exit(EXIT_FAILURE);
      }

      // Simple HTTP request handling
      char buffer[1024] = {0};
      read(connection, buffer, 1024);

      std::string request(buffer);
      std::string response;
      if (request.find("GET /version HTTP/1.1") != std::string::npos) {
          response = handleVersion();
      } else if (request.find("GET /.commoners HTTP/1.1") != std::string::npos) {
          response = handleCommoners();
      } else if (request.find("GET /users HTTP/1.1") != std::string::npos) {
          response = handleUsers();
      } else if (request.find("POST /echo HTTP/1.1") != std::string::npos) {
          // Extract POST data for echo
          auto pos = request.find("\r\n\r\n");
          if (pos != std::string::npos) {
              std::string postData = request.substr(pos + 4);
              response = handleEcho(postData);
          }
      }

      send(connection, response.c_str(), response.length(), 0);

      close(connection);
  }

}