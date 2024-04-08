// Quering our server

var query = `{
  me {
    name
  }
}`

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query }),
})
  .then(response => response.json())
  .then(result => console.log(result.data));

// Querying the Rick and Morty API

// const query = `{
//   characters(page: 2, filter: { name: "rick" }) {
//     info {
//       count
//     }
//     results {
//       id
//       name
//       status
//       image
//     }
//   }
//   location(id: 1) {
//     id
//   }
//   episodesByIds(ids: [1, 2]) {
//     id
//   }
// }
// `

// fetch('https://rickandmortyapi.com/graphql', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ query }),
// })
//   .then(response => response.json())
//   .then(result => console.log(result.data.characters.results));
