const url = 'https://valorant-api.com/v1/agents';

// Render some random agent before user choose an agent
const initialAgent = '22697a3d-45bf-8dd7-4fec-84a9e28c69d7';
getAgent(initialAgent);

async function selectYourAgent(){
    const ul = document.getElementById('listAgents');

    try {
        const agents = await axios.get(url, {params: {isPlayableCharacter: true}}).then(response => response.data.data);

        agents.forEach(agent => {
            const li = document.createElement('li');
            li.setAttribute('class', 'iconAgent');
            // Select agent to render by clicking on icon
            li.addEventListener('click', function (){
                getAgent(agent.uuid);
            });
            
            li.innerHTML = `<img src='${agent.killfeedPortrait}' alt='Image of ${agent.displayName}'/>`;
            ul.append(li);
        });
    } catch (e) {
        console.log(e);
    }
}

// Get selected agent from API
function getAgent(id) {
    axios.get(`${url}/${id}`)
        .then(response => response.data.data)
        .then(agent => {
            // Get informations according its specific agent characteristics
            renderAgent(agent.displayName, 
                agent.description, 
                agent.bustPortrait, 
                agent.backgroundGradientColors[0],
                agent.backgroundGradientColors[1],
                agent.backgroundGradientColors[2],
                agent.backgroundGradientColors[3],
            );
        })
        .catch(error => console.log(error));
}
    
function renderAgent(name, description, portrait, c1,c2, c3, c4) {
    const pNameAgent = document.querySelector('p#nameAgent');
    const pDescriptionAgent = document.querySelector('p#descriptionAgent');

    pNameAgent.innerHTML = `<span class='title'>Agent</span>: ${name}`;
    pDescriptionAgent.innerHTML = `<span class='title'>Description</span>: ${description}`;
    portraitAgent.src = portrait;

    const container = document.querySelector('.globalContainer');
    container.style.backgroundImage = `linear-gradient(120deg, #${c1}, #${c2}, #${c3}, #${c4})`;
}

selectYourAgent();
