import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';


export default function RegisterSucess() {
   const history = useHistory();

   function redirectToLanding() {
      history.push('/');
   }

   useEffect(() => {
      setTimeout(redirectToLanding, 3000);
   });

   return (
      <div id="page-register-sucess">
         <h1>Cadastro realizado com sucesso</h1>
         <p>Voltando para a página inicial...</p>
      </div>
   );
}
