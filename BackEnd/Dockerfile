FROM maven as build

WORKDIR /app/BackEnd

COPY . .

RUN mvn clean package

FROM openjdk:8-jre-alpine

WORKDIR /app

COPY --from=build /app/BackEnd/target/BackEnd-0.0.1-SNAPSHOT.jar /app

ENTRYPOINT ["java", "-jar", "BackEnd-0.0.1-SNAPSHOT.jar"]
