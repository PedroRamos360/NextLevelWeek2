import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

export default function TeacherItem() {
   var link = "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/f9ac30f7d5a40cfd5f288989c90032da-1596066158528/6ce577f6-3c16-4428-b803-0f1fece09e90.jpeg";
   return(
      <article className="teacher-item">
         <header>
            <img src={link} alt="Pedro Ramos"/>
            <div>
               <strong>Pedro Ramos</strong>
               <span>Matemática</span>
            </div>
         </header>

         <p>
            Professor de matemática com doutorado em ciência da computação.
            <br/>
            Apaixonado por ensinar e desenvolver programas usando as tecnologias mais modernas do mercado.
         </p>

         <footer>
            <p>
               Preço/hora
               <strong>R$ 80,00</strong>
            </p>
            <button type="button">
               <img src={whatsappIcon} alt="whatsapp"/>
               Entrar em contato
            </button>
         </footer>
      </article>
   )
}
