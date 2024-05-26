[![codecov](https://codecov.io/gh/Heisenburg-z/Sectional-titles-property-management/branch/main/graph/badge.svg?token=NCM4PXH1F3)](https://codecov.io/gh/Heisenburg-z/Sectional-titles-property-management)
<img src="https://codecov.io/gh/Heisenburg-z/Sectional-titles-property-management/graphs/sunburst.svg?token=NCM4PXH1F3">
Please navigate to the "Test Plan & Results" page in the documentation link for our test results and coverage, as we experience issues with CodeCov as it stopped tracking our coverage.

# Sectional titles and property management

![Company Logo](./src/images/SCPY_Logo1.png "Logo")
[Link to site](https://witty-plant-0efd7e103.5.azurestaticapps.net/)

## Introduction

Sectional title describes the separate ownership of a unit within a group-owned complex or
development. Simply put, the term refers to a complex with flats, townhouses or apartments
that has multiple owners; each owning a section of the overall property. The collective of owners
typically elect a body corporate made up of some of the owners to take responsibility for some
of the tasks required to maintain the property. This includes overseeing the enforcement of rules
and regulations, the security, upkeep and maintenance of the property, and managing
communication with the owners, renters and related parties among other things.

### Documentation For Project

[Documentation Link](https://shorturl.at/Yg3ZV)

## Install locally

1. Clone the repository on your machine and `cd Sectional-titles-property-management` in your terminal.
2. run `npm i` in your terminal to install all the dependencies.
3. Change into the API directory `cd api` and run the command `func start` in your terminal to setup the server.
   - You need Azure Core tools to be able to run the API locally, here is a link on setting it up on your machine [Azure Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-javascript)
   - After setting up Azure Core Tools, move into `src/Pages` directory in your terminal and append `http://localhost:7071/` before every URL link that starts with `/api` in every file that has code where the API is being used.
   - *Go to step 3 again until `func start` runs successfully*
   - **Make sure to check all of this properly as it is crucial for the APIs to run locally**.
4. *While the server is running*, use a new terminal instance or tab to change the directory to the **root** project directory, and run the command `npm start`, this will start the react app.
5. Surf the web app.

$$\text{Made with love }$$

##### The following details are to be used for the different roles

**Admin**: email: `blessingeleer@gmail.com`, password: `cargorun`

**Resident**: email: `jim@gmail.com`, password: `jim123`

**Staff**(*Cleaner*): email: `s.clean@gmail.com`, password:``

**Staff**(*Security*): email: `sasa.security@gmai.com`, password:``
