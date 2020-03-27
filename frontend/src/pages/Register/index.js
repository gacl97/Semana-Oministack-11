import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg'
import './styles.css';

import api from '../../services/api';

function Register() {
  // Armazenamos cada dado recebido do formulário em um estado
  // Primeiro parâmetro recebe o valor e o segundo altera o valor
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  // Também faz navegação js quando não é possível utilizar o link
  const history = useHistory();
  // Pode receber o evento que é emitido  nesse caso pelo submit do form
  async function handleRegister(event) {
    // Para evitar recarregar a página quando for submetido
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };
    
    try {
      const res = await api.post('ongs', data);
      alert(`Cadastro realizado com sucesso, sua ID é: ${res.data.id}`);
      console.log(res.data)
      history.push('/');
    } catch (error) {
      alert("Erro no cadastro, tente novamente!");
    }
  }


  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p> 
            Faça seu cadastro, entre na plataforma e ajude pessoas a 
            encontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o longon
          </Link>
        </section>
        <form onSubmit={handleRegister}>

          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={event => setName(event.target.value)} 
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            placeholder="WhatsApp" 
            value={whatsapp}
            onChange={event => setWhatsapp(event.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={city}
              onChange={event => setCity(event.target.value)}
            />
            <input 
              placeholder="Uf" 
              style={{ width: 80 }}
              value={uf}
              onChange={event => setUf(event.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;