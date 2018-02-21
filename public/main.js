const BASE_URL = 'http://localhost:3000'

function editQuote(id, name, quote) {
  alert('edit')
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


function deleteQuote(id) {
  alert('delete')
  axios.delete(`${BASE_URL}/quotes/${id}` )
  .then((err, result) => {
    if (err) console.log(err)
    else console.log(result.data)
  })
}