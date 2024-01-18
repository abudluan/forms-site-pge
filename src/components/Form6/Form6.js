import React from 'react';

const Form6 = () => {
  const enviarDados = () => {
    var xhr = new XMLHttpRequest();
    var url = "https://sheets.googleapis.com/v4/spreadsheets/1mX-5SRZy-t4ZcjY-tvqy-CDbpviXFPkqdkN_LPqB8Ls/values/Pagina:append?valueInputOption=USER_ENTERED&access_token=ya29.a0AfB_byD2eVSGxt8m4f3fvAHhKF1W4JCd5704rcvCEEj4ue67Uxo_dDJmBTGAINNzgF468k56qyrMUGCzAKa0Ngzd3K2T8nvKZ6qO0VhUeEd_L0ybfhZS4UoOiKym5DKDPPTQyDYylUUZUmGVzz5jJsO8JD95Aafq4fLXYAaCgYKAZgSARMSFQHGX2Mi6qp62H30gWpJxAOMWI3NnQ0173";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
      }
    };
    var data = JSON.stringify({
      "majorDimension": "ROWS",
      "values": [
        [
          "Rafael",
          "Monteiro",
          "rafael.monteiro",
          "9194321-1234"
        ]
      ]
    });
    xhr.send(data);
  }

  return (
    <div>
      <h2>Formulário</h2>
      <button onClick={enviarDados}>Enviar</button>
    </div>
  );
}

export default Form6;
