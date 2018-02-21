const BASE_URL = 'http://localhost:3000'

function edit(id, name, quote) {
  let ed_dt =   {
    name: `${name} ne`,
    quote: `${quote} qe`
  }
  console.log(ed_dt)
  axios.put(`${BASE_URL}/quotes/${id}`, ed_dt )
  .then((err, result) => {
    if (err) console.log(err)
    else console.log(result.data)
  })
}