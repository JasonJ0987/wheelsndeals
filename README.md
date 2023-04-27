# CarCar

Team:

* Kaining C. - Service Microservice
* Jason J. -  Sales Microservice

## Design

Sleek and modern application for car dealership company. Easy to navigate navigation bar at the top that contains all desired services that are spread out and easy to read for user convenience.

Allows for creation of cars, car models, and car manufacturers.
Easy view of all inventory in a digestible table.
Simple view of available services and intuitive booking system.

View and create all employees and customers.

Record and track all appointments made through the services system.
Keep track of which appointments are finished or canceled with the search function.

Record and track all sales made through the sales system.
View sales organized by employees to keep track of employee's commissions.
A successful sale of a car will automatically update the inventory microservice to update the status of the car being sold.

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The Sales microservice models includes Salesperson, Customer, and Sale entities and one Automobile value object.
The Automobile value object polls for Automobile data from the Inventory microservice.
You can view, create and delete any instances of salespeople, customers, and sales.
Sales depend on data from salespeople, customers, and automobile VO; if any of these do not exist, a sale can not be made.
The automobile VO has a "sold" status that is defaulted to false.
If a sale is successfully made, the views function to create a sale recognizes that the automobile can no longer be sold so it will prevent a sale from selling a car twice.
