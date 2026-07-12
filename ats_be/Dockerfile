FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/target/ats_be-0.0.1-SNAPSHOT.jar app.jar

RUN addgroup -S devhoa \
    && adduser -S devhoa -G devhoa \
    && chown -R devhoa:devhoa /app

USER devhoa

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
