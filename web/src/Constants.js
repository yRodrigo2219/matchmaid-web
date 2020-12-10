const isValid = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email inválido!',
    tip: <span><div>Email inválido</div><div>Ex: exemplo_01@email.com</div></span>
  },
  password: {
    regex: /^.{8,}$/,
    message: 'Senha inválida',
    tip: <span><div>Deve conter pelo menos 8 caracteres</div></span>
  },
  cpf: {
    regex: /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,
    message: 'CPF inválido',
    tip: <span><div>Deve estar no modelo</div><div>XXX.XXX.XXX-XX</div></span>
  },
  name: {
    regex: /^[a-zA-Z ]{3,}$/,
    message: 'Nome inválido',
    tip: <span><div>Deve conter pelo menos 3 letras</div></span>
  },
  cep: {
    regex: /^[0-9]{5}-[0-9]{3}$/,
    message: 'CEP inválido',
    tip: <span><div>Deve estar no modelo</div><div>XXXXX-XXX</div></span>
  },
  city: {
    regex: /^[a-zA-Z ]{3,}$/,
    message: 'Nome de cidade inválido',
    tip: <span><div>Deve conter pelo menos 3 letras</div></span>
  },
  uf: {
    regex: /^[A-Z]{2}$/i,
    message: 'Nome de estado inválido',
    tip: <span><div>Deve conter 2 letras</div><div>Ex: BA</div></span>
  },
  houseNumber: {
    regex: /^[0-9]{1,}[A-Za-z]$/,
    message: 'Número inválido',
    tip: <span><div>Deve conter pelo menos 1 número</div></span>
  },
  neighborhood: {
    regex: /^[a-zA-Z]{3,}$/,
    message: 'Nome de bairro inválido',
    tip: <span><div>Deve conter pelo menos 3 letras</div></span>
  },
  street: {
    regex: /^[a-zA-Z0-9. ]{5,}$/,
    message: 'Nome de rua inválido',
    tip: <span><div>Deve conter pelo menos 5 caracteres</div></span>
  }
}

export { isValid };