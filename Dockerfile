FROM node:latest

COPY ./ /home/stufftrack-backend
RUN chmod +x /home/stufftrack-backend/populate.sh
WORKDIR /home/stufftrack-backend
EXPOSE 5432
RUN npm install
ENTRYPOINT ["/home/stufftrack-backend/populate.sh"]