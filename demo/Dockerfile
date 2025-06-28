# Use full JDK image (has certs) or install certs explicitly
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# ---------- OS packages ----------
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# ---------- copy Maven wrapper first (for cache) ----------
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw \
 && ./mvnw -q dependency:go-offline

# ---------- copy source & build ----------
COPY src ./src
RUN ./mvnw -q clean package -DskipTests

EXPOSE 8080
CMD ["sh","-c","java -jar target/*.jar"]
