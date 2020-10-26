import apiKey from './mod.js';

const form = `<form id="state">
<input type="text" name="" id="text" required>
<input type="number" id="number" value="10">
<button type="submit">Submit</button>
</form>`;
let template = '';
let state = '';
let url = '';

function render() {
  const finalTemp = form + template;
  $('body').html(finalTemp);
}

function getStateStuff() {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(response.statusText);
    })
    .then((json) => {

      template = '';

      json.data.forEach(park => {
        template += `
          <section>
            <p>Full Name: ${park.fullName}</p>
            <p>Description: ${park.description}</p>
            <p>Website: <a href="${park.url}">${park.fullName}</a></p>
          </section>
        `;
      });
      render();
    })
    .catch((error) => {
      console.log(error.message);
    });

  render();
}

function handleSubmit() {
  $('body').on('submit', '#state', (e) => {
    e.preventDefault();

    state = $('#text').val();

    let num = parseInt($('#number').val());


    url = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=${state}&limit=${num}`;


    getStateStuff();
  });
}

function main() {
  render();
  handleSubmit();
}

$(main);