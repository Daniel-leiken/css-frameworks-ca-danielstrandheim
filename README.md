ChatterHub - A Social Media Platform Frontend

Project Overview

ChatterHub is a social media platform frontend built using HTML, CSS/SCSS, and JavaScript. The platform allows users to register, log in, and view a feed of posts retrieved from the Noroff API. Key features include user authentication, post management, and a visually structured content feed.

Features

	•	User Authentication
	•	Register with valid @noroff.no or @stud.noroff.no emails.
	•	Login functionality with secure token storage.
	•	Post Feed
	•	Displays posts fetched from the Noroff API in a responsive card grid.
	•	Pagination with a 9-post display limit.
	•	Fallback image for posts without media.

Getting Started

Prerequisites

	•	Visual Studio Code or any preferred IDE
	•	Basic understanding of JavaScript, HTML, and CSS
	•	API key from the Noroff API

Installation

	1.	Clone the repository:
git clone 
cd chatterhub
	2.	Open in Visual Studio Code:
code .
	3.	Install Live Server for local development:
	•	Search for “Live Server” in the VSCode extensions tab and install it.

Usage

	1.	Start the project using Live Server.
	2.	Navigate to the following routes:
	•	/login.html for login
	•	/register.html for registration
	•	/feed.html to view the post feed

Project Structure

chatterhub/
│
├── index.html           # Home page
├── login.html            # Login page
├── register.html         # Registration page
├── feed.html             # Post feed page
├── src/                  # Source files
│   └── scss/             # SCSS styles
├── scripts/              # JavaScript files
│   └── login.js          # Login handling script
│   └── register.js       # Registration script
│   └── posts.js          # Post feed handling
└── images/               # Static images

API Integration

Noroff API

The application integrates with the Noroff API to fetch and display posts as well as handle user authentication. To access the API, make sure to use your valid API key and Authorization Bearer token.

Development Notes

	•	SCSS files are precompiled for cleaner CSS management.
	•	Responsive Bootstrap grid is used for structured layout design.
	•	Authenticated routes require valid access tokens.

License

This project is licensed under the MIT License.