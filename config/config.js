var i = 0;
var txt = "Welcome to Veillain's website! To get started, type help";
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
  fetch('https://api.github.com/users/veillain/repos')
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
  clear: () => {
    document.querySelector("ul").innerHTML = "";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    return '';
  },

  help: () => `
    Usage: [OPTION]...
    <ul>
      <li><b>Options:</b></li>
      <li><b>   contact		</b>displays all of my contacts</li>
      <li><b>	skills		</b>something that i good at</li>
      <li><b>	projects	</b>displays my current and past projects</li>
      <li><b>	help		</b>displays this menu</li>
      <li><b>	clear		</b>clear the screen</li>
    </ul>
  `,
  projects: () => {
    addli('Fetching projects...');
    displayRepos();
    return '';
  },
  contact: () => `
    My socials:
    <ul>
      <li><a href="https://github.com/veillain" target="_blank">github</a></li>
      <li>Discord: veillainwertz</li>
    </ul>
  `,
  skills: () => `
    My skills:
    <ul>
      <li>Bash</li>
    </ul>
  `,
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
