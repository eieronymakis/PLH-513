Dev Guide
-------------------------------------------------------------------------------------------------------------------------
1. sudo docker-compose up -d
2. sudo docker ps -> Get mysql container ID
3. make idm id={mysql_container_id} (id from step 2, to load the keyrock backup)
4. sudo docker ps -> Get node-server container ID
5. make bash id={node-server_container_id} (to use bash inside node container)
6. Inside the container navigate to /server/tools/
7. Run node orion-setup-products.js (To load product backup to orion)
5. All done, application is ready!
-------------------------------------------------------------------------------------------------------------------------
Users
-------------------------------------------------------------------------------------------------------------------------

| Username  | Password | Role |
| ------------- | ------------- | ------------- |
| admin@test.com  | 1111  | Admin/Provider |
| productseller@test.com | 1111 | ProductSeller |
| user@test.com | 1111 | User |
