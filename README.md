# About my project
[demo](https://yawenx2004.github.io/portfolio-site-static/index.html)

This is my portfolio site! Still a work in progress, but I had/am having fun developing & designing it. As of 22 April 2024 it features my portfolio (under construction), my resume (also under construction), and a "blog" running on local storage, with a capacity of one (1) entry exactly; this can be edited through a password-protected internal page.

My about page contains weather data of places I am from, retrieved from [OpenWeather](https://openweathermap.org/).

When this site becomes more functional I intend to obtain a domain and make it my UI/UX design and web dev portolio. :)

- **index.js** is the entry point of my application
- **src** houses my HTML documents
- **style** houses my CSS file

# Instructions for running on your local machine
1. Clone repository from GitHub
2. Type the following commands into the terminal:
3. To test blog functionality, go to internal.html (scroll down; it's the bottom link on the footer), and type in the password; you will then be able to access the blog editor form.
```bash
npm install
npm run dev
```

# Demo
You can find [here](https://yawenx2004.github.io/portfolio-site-static/index.html) an HTML-only preview of my website (since neither GitHub nor Render has allowed me to serve dynamic index.js files... I'll figure it out someday). It has limited functionality and as of 18 April 2024 I have stopped updating it concurrently with this repository.

This demo is notably missing the password-protection feature for internal.html, as well as API-based weather data retrieval for about.html, as well as...

It's missing so many things. :(

<video width="320" height="240" controls>
  <source src="demo/demo-responsive.mov" type="video/mp4">
  Your browser does not support the video tag.
</video>

<video width="320" height="240" controls>
  <source src="demo/demo-blog.mov" type="video/mp4">
  Your browser does not support the video tag.
</video>


# Future features?
- flesh out resume & portfolio
- host blog & portfolio entries in SQL database; currently everything is in local storage
- make buttons less wobbly! right now they push other elements around when I hover
