# BirdsEye

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Project Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contribution](#Contribution)
- [Tests](#Tests)
- [Questions](#Questions)

## Description

BirsEye is a project management and employee tracker tool that enables managers and small business owner to model their organizations structure, track their staff roster and setup projects while tracking their progress. BirdEye allows managers to send new staff email invites to their organization and provides managers access to tools inaccessible to lower level staff.

![deployed app image](./assets/deployed-screenshot.png)

## Installation

To install the project, download all code via the included GitHUb link below. Once you have downloaded all files, enter your integrated terminal and run npm i to install all node dependencies. Now load your mysql shell and run source db/schema.sql. This will initialize the apps databse. Quit out of your mysql shell and enter npm run seed in your terminal, this will see the database with some data and enable base functionality. Now youa re able to run the app via npm run watch and navigate to localhost:3001 to see the home page. The app is now ready to use! OR, you could visit the like heroku link (also below) and access the blog without any setup required.

GitHub: https://github.com/gulogulo208/universal-scheduler

Heroku: https://birds-eye-app.herokuapp.com/

## Usage

### Logging In / Signing Up

Once you have arrived at the homepage of BirdsEye, you will be prompted either to login or signup. If you already have credentials, enter them and click "login" at the bottom of the sign in modal. If not, click "signup" at the bottom of the modal and you will be taken to the signup page. Here you will create both your user profile and your organization. All those using the signup route are expected to be administrators and managers only, with any employees added to an organization being invited via the email invite system and thus utilizing only the login feature on the home page. Once your credentials have been validated, you will be redirected to your personalized dashboard. 

### Dashboard 

Once you have signed in, you will be redirected to the apps personalized Dashboard. If you are a user with administrative privileges you will see three buttons at the top of your dashboard offering you the ability to create a Division within your organization, to create a project within a chosen division and to invite a new employee to your organization. If you are a user with basic employee permissions, you will see a welcome message with an aggregation of all divisions to which you are assisnged as well as all projects and their associated due dates to which you are assigned.


### Project Details
Basic employees and administrators are able to click on any project shown on their dashboard, bringing up a new page with detailed information about that individual project. This page will display the projects name, details about the project, when the project was created and what its due date is. 

Below this information will be a table including all other employees assigned to the chosen project.

Finally, below all projects, is a field visible only to administrators which allows for the addition of an employee to any pre-existing project. 


## License

Licensed udner the [MIT](https://opensource.org/licenses/MIT) license

## Contribution

N/A

## Tests

N/A

## Questions


###N/A
