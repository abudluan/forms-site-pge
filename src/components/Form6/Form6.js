import React, { useState } from 'react';

const Form6 = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const enviarDados = () => {
    const xhr = new XMLHttpRequest();
    const url = "https://sheets.googleapis.com/v4/spreadsheets/1c4YlHdr-JIEA2mlYDYND1d-2q_xRmh_a_Llfg2CqLaE/values/Dados do Contribuinte:append?valueInputOption=USER_ENTERED&access_token=ya29.a0AfB_byDzmzeBf2kno_-WFGv8tFPkwLF3mm_2VbIhUub5dnjKxZmhKvulbRI7c-lj1yjIoKCeu4bpEbFUoQ0XX-kpiDritCxs874NJV3ma_4SAgntGeOqnts1EKWmFdtRzJoS8qDDAY283g3lolccf6LqeaIa49a-eJUHaCgYKAa4SARISFQHGX2MiE38C7H8mju_cUFlJrUVpoA0171";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const json = JSON.parse(xhr.responseText);
        console.log(json);
      }
    };

    // Obter data e hora atual considerando fuso horário -3
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() - 3);

    // Formatar data e hora no formato desejado
    const formattedDateTime = currentDateTime.toLocaleString('pt-BR', { timeZone: 'UTC' });

    const data = JSON.stringify({
      "majorDimension": "ROWS",
      "values": [
        [
          formattedDateTime,
          name,
          phone,
          email,
          cep,
          address,
          number,
          complement,
          neighborhood,
          city,
          state
        ]
      ]
    });
    xhr.send(data);
  };

  return (
    <div>
      <h2>Formulário</h2>
      <form>
        Nome: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        Telefone de contato: <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
        E-mail: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        CEP: <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} /><br />
        Endereço: <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
        Número: <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} /><br />
        Complemento: <input type="text" value={complement} onChange={(e) => setComplement(e.target.value)} /><br />
        Bairro: <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} /><br />
        Cidade: <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /><br />
        Estado: <input type="text" value={state} onChange={(e) => setState(e.target.value)} /><br />
        <button type="button" onClick={enviarDados}>Enviar</button>
      </form>
    </div>
  );
};

export default Form6;
