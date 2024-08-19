# Simple Ecommerce

- [Business Requirements](#business-requirenments)
- [Database Schema](#database-schema)
- [Backend Endpoints](#backend-endpoints)
- [Challenges](#challenges)
- [Screenshots](#screenshot)
- [Helpful Commands](#helpful-commands)
- [Tools and Langauges](#tools-and-langauges)
- [Improvements](#improvements)

## Business Requirenments
- `Admin` can create products, `user` can buy products
- Each `product` has its `parts` and `options`.
- `Product` can have more than one `part`.
- Each `Part` can have more than one `options`.
- Each product can have its roles in Custom Price and Prohibited Combinations.
- `Custom Price` is added if the user selected two or more options that need more cost.
- `Prohibited Combination` added from the admin side, to check and validate that user can not select these cominations.

## Database Schema 
![Database](docs/db/database.png)

## Backend Endpoints
- ``Swagger URL-> http://localhost:8000/swagger/``
- Category endpoints
![Category Endpoints](docs/backend/category.png)
- Product endpoints
![Product Endpoints](docs/backend/products.png)
- Part endpoints
![Part Endpoints](docs/backend/parts.png)
- Option endpoints
![Option Endpoints](docs/backend/options.png)
- Custom Price endpoints
![Custom Price Endpoints](docs/backend/custom_price.png)
- Prohibited Combinations endpoints
![Prohibited Combinations Endpoints](docs/backend/prohibited_combinations.png)
- Order (checkout) endpoint
![Order Endpoints](docs/backend/orders.png)

## Challenges
- Frontend Side
  - All the frontend stuff :joy
- Backend Side
  - Handling race conditions in purchasing a new product
  - Designing database to make tha admin able to add more than product 

## ScreenShot
- Create product step
![Product](docs/frontend/product.png)
- Create part step
![Parts](docs/frontend/parts.png)
- Create options step
![Options](docs/frontend/options.png)
- Create custom price step
![Custom Price](docs/frontend/custom_price.png)
- Create prohibited combinations step
![Combinations](docs/frontend/prohibited_combinations.png)
- Cart and Checkout
![Cart and Checkout](docs/frontend/cart_checkout.png)
- Login (Note: login is used for admin only to create products)
![Login](docs/frontend/login.png)
- Product list
![Product List](docs/frontend/product_list.png)
- Product details
![Product details](docs/frontend/product_details.png)
## helpful commands
- Command to run unit test
``
make test
``
![Unit test](docs/makefile/test.png)

- Command to load data (fixtures)
``
make loaddata
``
![Load data](docs/makefile/loaddata.png)
- Command to create super user (admin)
``
make superuser
``
![Super User](docs/makefile/superuser.png)
## Tools and Langauges
- Backend
  - Python
  - Django
  - Django Rest Framework
- Frontend
  - JavaScript
  - React JS
- Containerzation
  - Docker
- Documentation
  - Swagger

## Improvements
- Frontend UI
- Each product can have more than 1 image
- Each option can have more than 1 image
- Authentication and Authorization (User Roles)
- Enhance and improve structure of the unit test (FakeRepo) for testing
- Add Account model for every user (to check balance before purchasing product)