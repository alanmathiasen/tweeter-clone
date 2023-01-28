import { format } from "fecha";

export const shortDate = (timestamp) => {
    let tweetDate = new Date(timestamp);
    let currentDate = new Date();
    let diffInTime = currentDate - tweetDate;
    let mm = diffInTime / 1000 / 60;
    //si son menos de 60 minutos
    if (mm < 60) {
        return ` ${Math.floor(mm).toString()}m`;
    }
    //si son menos de 24 horas
    else if (mm / 60 < 24) {
        return `${Math.floor(mm / 60).toString()}h`;
    }
    //si son menos de 7 dias
    else if (mm / 60 / 24 < 7) {
        return `${Math.floor(mm / 60 / 24).toString()}d`;
    }
    //si no mostrar fecha
    else {
        return format(new Date(timestamp), "DD/MM");
    }
};
