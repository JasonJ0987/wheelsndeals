# CarCar

Team:

* Kaining C. - Service Microservice
* Jason J. -  Sales Microservice

## Design

Sleek and modern application for a car dealership company. Easy to navigate navigation bar at the top that contains all desired services that are spread out and easy to read for user convenience.

Allows for creation of cars, car models, and car manufacturers.
Easy view of all inventory in a digestible table.
Simple view of available services and intuitive booking system.

View and create all employees and customers.

Record and track all appointments made through the services system.
Keep track of which appointments are created, canceled or finished with the search history.

A service concierge could create and view service appointments, as well as change the appointment status to canceled or finished with a button. Based on the VIP status, the service concierge can give that customer "VIP treatment".

The design to determine if the customer is a VIP is that if the automobile with the unique VIN is in the inventory and if that automobile is sold to a customer. If both conditions pass, the appointment is registered as a VIP with that automobile.
There are "cancel" and "finish" buttons to alter the appointment status and every appointment is initialized with a "created" status.

Record and track all sales made through the sales system.
View sales organized by employees to keep track of employee's commissions.
A successful sale of a car will automatically update the inventory microservice to update the status of the car being sold.

Allows create and display technicians.

There is service history, that a service concierge could search based on VIN, and can view all the service history.

## Service microservice

The Service microservice models have two entities which are Technician and Appointment, and one value object which is AutomobileVO.
The Technician model tracks the technician's employee ID, first name and last name. If one technician's employee ID gets deleted or altered, all the related appointments get deleted (Django one to many relationship).
The Appointment model tracks the VIN, customer, local date and time, reason, technician (with its employee ID) and status (which are "created", "canceled", or "finished").
Note that the VIN in Appointment could be any VIN that's less than or equal to 17 characters. Note that to make a service appointment, the VIN could occur as many times as wanted. Note that the technician's employee ID must be unique. Note that customer could be any customer regardless if they have a registered sale in our dealership or not.
The AutomobileVO polls for Automobile data from the Inventory microservice.
As the requirement states, quoted here -- "If the VIN is for an automobile that was at one time in the inventory, then the automobile was purchased from the dealership. The list of scheduled appointments should show that the automobile was purchased from the dealership so that the concierge can give that customer 'VIP treatment'". The design to determine if the customer is a VIP is that if the automobile with the unique VIN is in the inventory and if that automobile is sold to a customer. If both conditions pass, the appointment is registered as a VIP with that automobile.

## Sales microservice

The Sales microservice models includes Salesperson, Customer, and Sale entities and one Automobile value object.
The Automobile value object polls for Automobile data from the Inventory microservice.
You can view, create and delete any instances of salespeople, customers, and sales.
A salesperson's employee ID must be unique.
A customer's phone number must be unique.
Sales depend on data from salespeople, customers, and automobile VO; if any of these do not exist, a sale can not be made.
The automobile VO has a "sold" status that is defaulted to false.
If a sale is successfully made, the views function to create a sale recognizes that the automobile can no longer be sold so it will prevent a sale from selling a car twice.
Registering a sale will also update the automobile's sale status so that the user can visually confirm that the automobile in question has truly been sold and is no longer available for purchase.
