import { Wrapper } from "./TweetPage.styles";
import TweetGroup from "../../components/TweetGroup";
import TweetIndividual from "../../components/TweetIndividual";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import { useState, useEffect } from "react/cjs/react.development";
const TweetPage = () => {
  let location = useLocation();
  let { id, correoUsuario } = useParams();
  const [idState, setIdState] = useState(id);
  const [correo, setCorreo] = useState(correoUsuario);
  //const location = useLocation();
  useEffect(() => {
    let { i, cu } = useParams();
    setIdState(i);
    setCorreo(cu);
    //setCorreo(params.correoUsuario);
  }, [location]);

  return (
    <Wrapper>
      {idState && (
        <TweetIndividual
          tweetId={idState}
          correoUsuario={correo}
          className="main"
        />
      )}
      *{idState && <TweetGroup tweetId={idState} correoUsuario={correo} />}
      <div>HOLA</div>
      <button onClick={() => console.log(idState, correo)}>ADAS</button>
    </Wrapper>
  );
};

export default TweetPage;
