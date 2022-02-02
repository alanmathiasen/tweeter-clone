import { Wrapper } from "./TweetPage.styles";
import TweetGroup from "../../components/TweetGroup";
import TweetIndividual from "../../components/TweetIndividual";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import { useState, useEffect } from "react/cjs/react.development";
const TweetPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let { id, correoUsuario } = useParams();
  const [idState, setIdState] = useState(id);
  const [correo, setCorreo] = useState(correoUsuario);
  //const location = useLocation();
  useEffect(() => {
    setIdState(id);
    setCorreo(correo);
  }, [id]);

  return (
    <Wrapper>
      {idState && <TweetIndividual tweetId={idState} className="main" />}
      {idState && <TweetGroup tweetId={idState} />}
      <div>HOLA</div>
      <button onClick={() => console.log(idState, correo)}>ADAS</button>
    </Wrapper>
  );
};

export default TweetPage;
