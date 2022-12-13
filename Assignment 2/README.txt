Dev Guide
-------------------------------------------------------------------------------------------------------------------------
1. sudo docker-compose up
2. sudo docker ps -> Get mysql container ID
3. sudo docker exec -i [mysql_container_id] mysql -uroot -psecret idm < ./idm.sql (after you load the backup both proxies should be up)
4. Navigate to /Server/tools and run "node ./orion-setup-products.js" in order to import predefined products to Orion (product data are stored inside sample-products.json in the same folder)
5. All done, application is ready!
-------------------------------------------------------------------------------------------------------------------------




