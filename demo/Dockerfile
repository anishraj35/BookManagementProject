# ---------- base image ----------
FROM eclipse-temurin:17-jdk-jammy

# ---------- working dir ----------
WORKDIR /app

# ---------- copy Maven wrapper + pom first (better cache) ----------
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw \
 && ./mvnw -q dependency:go-offline

# ---------- copy the rest of the source and build ----------
COPY src ./src
RUN ./mvnw -q clean package -DskipTests

# ---------- runtime ----------
EXPOSE 8080
CMD ["sh", "-c", "java -jar target/*.jar"]
