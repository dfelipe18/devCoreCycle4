import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Logo1 from "../../utilities/images/Logo1.png";
import Logo2 from "../../utilities/images/Logo2.png";
import Logo3 from "../../utilities/images/Logo3.png";
import LogoRel from "../../utilities/images/relicon.png";
import "../../utilities/styles/Footer.css";

export default function AppFooter() {
  return (
    <div className="footer-devcore">
      <div className="container-top">
        <div className="container-left">
          <p className="text-lema">No se requiere tarjeta de crédito.</p>
          <h1 className="text-title">DevCore App</h1>
          <p className="text-desc">
            Diseñamos una plataforma dónde puedas encontrar todo aquello que
            estás buscando.
          </p>
        </div>
        <div className="container-right container-right-image">
          <img
            className="image-logo-footer-one"
            src={Logo1}
            alt="footer-image"
          />
        </div>
      </div>
      <div className="container-bottom">
        <div className="container-left">
          <div className="container-image-logo">
            <img
              className="image-logo-footer-two"
              src={LogoRel}
              alt="logo-footer-image"
            />
          </div>
          <div className="container-text">
            <p className="text-lema-two">
              Realiza compras en cualquier momento, ofrecemos lo mejor, para lo
              mejor.
            </p>
          </div>
        </div>
        <div className="container-right">
          <div className="container-items-one">
            <ul>
              <li>Nosotros</li>
              <li>Trabajos</li>
              <li>Documentos</li>
              <li>Seguridad</li>
            </ul>
          </div>
          <div className="container-items-two">
            <ul>
              <li>Términos y condiciones</li>
              <li>Políticas de privacidad</li>
              <li>Políticas de Cookies</li>
            </ul>
          </div>
          <div className="container-items-three">
            <ul>
              <li>Inicia tu compra</li>
              <li>soporte@devcore.com.co</li>
            </ul>
            <div className="container-icons">
              <FacebookIcon sx={{margin: "0 16px 0 0"}} fontSize="medium" />
              <LinkedInIcon sx={{margin: "0 16px 0 0"}} fontSize="medium" />
              <TwitterIcon sx={{margin: "0 16px 0 0"}} fontSize="medium" />
              <InstagramIcon sx={{margin: "0 16px 0 0"}} fontSize="medium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
