const url = "https://api.coincap.io/v2";

function getAssets()
{
  return getRequest("assets?limit=20");
}

function getRequest(method)
{
  return fetch(`${url}/${method}`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then((response) => {
    return response.data;
  })
  .catch(error => { console.log('request failed', error); }); // Syntax error: unexpected end of input
}

function getAsset(coin) {
  return fetch(`${url}/assets/${coin}`)
    .then(res => res.json())
    .then(res => res.data)
}

function getAssetHistory(coin) {
  const now = new Date()  // genera la hora del día
  const end = now.getTime() //genra el  time stamp de hoy
  now.setDate(now.getDate() - 1) //asigna la fecha de un día anterior
  const start = now.getTime()

  return fetch(
    `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  )
    .then(res => res.json())
    .then(res => res.data)
}

export default { getAssets, getAsset, getAssetHistory };