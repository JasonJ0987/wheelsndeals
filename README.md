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

Allows create and display technicians.

A service concierge could create and view service appointments, as well as change the appointment status to canceled or finished with one button. Based on the is VIP status, the service concierge can give that customer "VIP treatment"

There is service history, that a service concierge could search based on VIN, and can view all the service history.

## Service microservice

The Service microservice models have two entities which are Technician and Appointment, and one value object which is AutomobileVO.
The Technician model tracks technician employee ID, first name and last name. If the one technician employee ID gets deleted or altered, all the related appointments get deleted (Django one to many relationship).
The Appointment model tracks VIN, customer, local date and time, reason, technician (with its employee ID) and status (which are "created", "canceled", and "finished").
Note that the VIN in Appointment could be any VIN that's less than or equal to 17 characters. Note that to make a service appointment, the VIN could occur as many times as wanted. Note that the employee ID must be unique.
The AutomobileVO polls for Automobile data from the Inventory microservice.
As the requirement states, quoted here -- "If the VIN is for an automobile that was at one time in the inventory, then the automobile was purchased from the dealership. The list of scheduled appointments should show that the automobile was purchased from the dealership so that the concierge can give that customer "VIP treatment"." The design to determine if it's vip is that once the automobile with the unique VIN is created in the inventory, it qualifies VIP with that automobile. So even if a specific automobile with the unique VIN gets deleted or lost in the inventory for any reason, it still qualifies. In the service microservice, we keep the record even if it's gone in the inventory. There is a polling job to pull the automobile VIN data from inventory every mintute.

## Sales microservice

The Sales microservice models includes Salesperson, Customer, and Sale entities and one Automobile value object.
The Automobile value object polls for Automobile data from the Inventory microservice.
You can view, create and delete any instances of salespeople, customers, and sales.
Sales depend on data from salespeople, customers, and automobile VO; if any of these do not exist, a sale can not be made.
The automobile VO has a "sold" status that is defaulted to false.
If a sale is successfully made, the views function to create a sale recognizes that the automobile can no longer be sold so it will prevent a sale from selling a car twice.
