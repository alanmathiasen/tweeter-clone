import React, { useState, useEffect } from "react";
import {} from "./AQuienSeguir.styles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useGlobalContext } from "../../context/GlobalContext";

const AQuienSeguir = () => {
  const { datosUser, emailLogueado } = useGlobalContext();
  const [arrayDatos, setArrayDatos] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    const getDatosUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      querySnapshot.forEach((doc) => {
        let newArray = [];
        newArray = doc.data();
        newArray.id = doc.id;
        console.log("updating array datos");
        // setArrayDatos(newArray);
        setArrayDatos((arrayDatos) => [...arrayDatos, newArray]);
      });

      //   const collRef = collection(db, "usuarios");
      //   const docRef = query(
      //     collRef,
      //     where("seguidores", "!=", "agustinfittipaldi.dg@gmail.com")
      //   );
      //   const querySnapshot = await getDocs(docRef);
      //   querySnapshot.forEach((doc) => {
      //     let newArray = [];
      //     newArray = doc.data();
      //     newArray.id = doc.id;
      //     // setArrayDatos(newArray);
      //     setArrayDatos((arrayDatos) => [...arrayDatos, newArray]);
      //   });
    };

    getDatosUsers();
  }, []);

  useEffect(() => {
    const handleFilter = () => {
      let filterArray = [];
      filterArray = arrayDatos.filter((user) => {
        return user.seguidores !== emailLogueado;
      });
      setFilteredArray(filterArray);
    };

    handleFilter();
    console.log(arrayDatos);
  }, [arrayDatos]);

  return (
    <div>
      <h2>A quién Seguir</h2>
    </div>
  );
};

export default AQuienSeguir;
