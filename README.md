<br/>
<p align="center">
  <a href="https://github.com/itxtalal/phishdetector-fyp">
    <img src="/frontend/src/assets/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">PhishDetector</h3>

  <p align="center">
    Real-time Detection of phishing websites using ML
    <br/>
    <br/>
    <a href="https://github.com/itxtalal/phishdetector-fyp"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/itxtalal/phishdetector-fyp">View Demo</a>
    .
    <a href="https://github.com/itxtalal/phishdetector-fyp/issues">Report Bug</a>
    .
    <a href="https://github.com/itxtalal/phishdetector-fyp/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/itxtalal/phishdetector-fyp/total) ![Contributors](https://img.shields.io/github/contributors/itxtalal/phishdetector-fyp?color=dark-green) ![Stargazers](https://img.shields.io/github/stars/itxtalal/phishdetector-fyp?style=social) ![Issues](https://img.shields.io/github/issues/itxtalal/phishdetector-fyp) ![License](https://img.shields.io/github/license/itxtalal/phishdetector-fyp) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

This project aims to develop a comprehensive solution for phishing site detection and protection. It includes the development of a browser extension, an admin dashboard, a demo marketing page, API endpoints, a machine learning model, and integration with cloud hosting services.

## Features
- Browser Extension: Developed using React and Typescript, the browser extension provides real-time protection against phishing attacks. It utilizes advanced machine learning algorithms to detect malicious URLs and alerts users.

- Admin Dashboard: The admin dashboard, built with React and Typescript, offers analytics and management functionalities. It includes charts and data visualizations to provide insights into detected phishing sites.

- Demo Marketing Page: A demo marketing page is developed to showcase the features of the anti-phishing tool. It provides information about the project and its capabilities.

- API Endpoints: API endpoints are implemented using Python and FastAPI. They facilitate communication between the browser extension and the backend system, allowing for real-time reporting and retrieval of information on phishing sites.

- Machine Learning Model: A machine learning model is developed to detect phishing sites. It leverages features such as URL structure, content, and metadata to accurately identify potential threats.

- Cloud Integration: The project is integrated with cloud hosting services such as Google Cloud Platform (GCP) for hosting and scalability. Nginx is used for load balancing, ensuring efficient handling of a large number of requests.

## Built With

This project was built using the following major frameworks:

- React: A JavaScript library for building user interfaces.
- Typescript: A typed superset of JavaScript that compiles to plain JavaScript.
- FastAPI: A modern, fast (high-performance) web framework for building APIs with Python.
- PyTorch: A popular machine learning library for building deep learning models.
- Google Cloud Platform (GCP): A suite of cloud computing services for hosting and scaling applications.
- Nginx: A web server and reverse proxy server for efficient load balancing.

These frameworks were chosen for their reliability, performance, and extensive community support, ensuring a robust and scalable solution for the project.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/itxtalal/phishdetector-fyp.git
```

2. Install NPM packages

```sh
npm install
```

3. Install NPM packages for the required module

For Example for browser extensions,

4. Navigate to the frontend folder

```sh
cd frontend
```

5. Build the files for your browser

```sh
npm run build:<browser>
```
replace `<browser>` with a name like `chrome`

6. Load the files in the browser extension manually.

7. Enjoy

## Roadmap

See the [open issues](https://github.com/itxtalal/phishdetector-fyp/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/itxtalal/phishdetector-fyp/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/itxtalal/phishdetector-fyp/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/itxtalal/phishdetector-fyp/blob/main/LICENSE.md) for more information.

## Authors

* **M Talal Jamil** - *Software Engineer* - [M Talal Jamil](https://github.com/itxtalal) - *Worked on Browser Extension*
* **Hanif Ali** - *Software Engineer* - [Hanif Ali](https://github.com/hanif-ali) - *Worked on ML and API endpoints*
* **Fahad Ali** - *Software Engineer* - [Fahad Ali](https://github.com/imfahadali) - *Worked on Admin Dashboard*
