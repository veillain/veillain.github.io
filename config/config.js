var i = 0;
var txt = "Welcome to boredcoder411's website! To get started, type help";
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typing").innerHTML += txt.charAt(i++);
    setTimeout(typeWriter, speed);
  }
}

function addli(text) {
  let li = document.createElement('li');
  li.innerHTML = text;
  document.querySelector("ul").appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}

function displayRepos() {
  fetch('https://api.github.com/users/boredcoder411/repos')
    .then(response => response.json())
    .then(repos => {
      let repoList = '<ul>';
      repos.forEach(repo => {
        repoList += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'No description'}</li>`;
      });
      repoList += '</ul>';
      addli(repoList);
    })
    .catch(error => {
      console.error('Error fetching repos:', error);
      addli('Error fetching repositories.');
    });
}

typeWriter();
document.getElementById("cmdline").focus();

const commands = {
  projects: () => {
    addli('Fetching projects...');
    displayRepos();
    return '';
  },
  contact: () => `
    My socials:
    <ul>
      <li><a href="https://replit.com/@boredcoder411" target="_blank">replit</a></li>
      <li><a href="https://github.com/boredcoder411" target="_blank">github</a></li>
      <li><a href="https://app.hackthebox.com/profile/534937" target="_blank">hackthebox</a></li>
      <li><a href="https://x.com/boredcoder411">x</a></li>
      <li>Discord: boredcoder411</li>
    </ul>
  `,
  skills: () => `
    My skills:
    <ul>
      <li>Rust</li>
      <li>Javascript</li>
      <li>Low-Level programming (general assembly knowledge)</li>
      <li>Selfhosting, server maintenance</li>
      <li>Expert on ssh and network protocols</li>
      <li>The Linux kernel and it's APIs</li>
    </ul>
  `,
  help: () => `
    A list of commands are:
    <ul>
      <li>contact: displays my points of contact</li>
      <li>skills: lists what I am good at</li>
      <li>clear: clears the screen</li>
      <li>projects: displays my past and current projects</li>
      <li>help: displays this menu</li>
    </ul>
  `,
  clear: () => {
    document.querySelector("ul").innerHTML = "";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    return '';
  },
  default: (cmd) => `Command "${cmd}" not recognized. Type help to get started.`
};

document.getElementById("cmdline").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let cmd = this.value.trim();
    this.value = "";
    
    addli(` > ${cmd}`);
    const response = commands[cmd] ? commands[cmd]() : commands.default(cmd);
    if (response) addli(response);
  }
});
