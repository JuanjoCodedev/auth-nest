import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  constructor() {}

  /**
   * ?Genera un valor único basado en la fecha, un identificador de usuario y una guía de referencia.
   *
   * *@param date - La fecha actual utilizada para extraer el día, mes, año y hora.
   * *@param uid - Un identificador único que se añade al valor generado.
   * *@param guide - Un prefijo que se incluye al principio del valor generado.
   * *@returns - Un valor único en formato de cadena que combina `guide`, `date`, `uid`, y la hora del día.
   */
  generateUniqueValue(date: Date, uid: number, guide: string) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // ?Los meses van del 0 al 11
    const year = date.getFullYear() % 100; // ?Tomamos solo los dos últimos dígitos del año
    const hour = date.getHours();
    const ramdon = Math.floor(Math.random() * 1000);

    return `${guide}-${day}${month}${year}${uid}${hour}${ramdon}`;
  }
}
