import React from 'react';
import $ from 'jquery';

const Form6 = () => {
  const enviarDados = () => {
    var settings = {
      "url": "https://sheets.googleapis.com/v4/spreadsheets/1mX-5SRZy-t4ZcjY-tvqy-CDbpviXFPkqdkN_LPqB8Ls/values/Pagina:append?valueInputOption=USER_ENTERED",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "text/html",
        "Authorization": "Bearer ya29.a0AfB_byD9LuTD83aNGhrmM4rsTgQLWF6Oc-Co9ftqzo0aJTQ0PNcCAJStLKJS1Dk5b4TurM6aLHqHtNBlX38vsoUeXwYpzt23d7ayHXcAwuYaywn5fWKprEN-VU8sZTsWmMXMIgblWUQK7VJZBgQATsM0LuFn9ccuSLEhaCgYKAXwSARMSFQHGX2MiUw6U7e4jMnLkmeog8XnYyQ0171"
      },
      "data": "{\n  \"majorDimension\": \"ROWS\",\n  \"values\": [\n    [\n      \"CLeyton\",\n      \"Muto\",\n      \"cleyton.muto\",\n      \"9191234-0000\"\n    ]\n  ]\n}",
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  return (
    <form onSubmit={enviarDados}>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Form6;
