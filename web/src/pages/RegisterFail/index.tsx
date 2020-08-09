import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function RegisterFail() {
   return (
      <div id="page-register-fail">
         <header className="title">
            <h1>Falha no cadastro</h1>
         </header>
         <div className="content">
            <p>Isso pode acontecer por conta de erros nos dados informados</p>
            <Link to='/give-classes'>Tente novamente</Link>
         </div>
      </div>
   );
}
