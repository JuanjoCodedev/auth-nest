import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  constructor() {}

  generateUniqueValue(date: Date, uid: number, guide: string) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // ?Los meses van del 0 al 11
    const year = date.getFullYear() % 100; // ?Tomamos solo los dos últimos dígitos del año
    const hour = date.getHours();
    const ramdon = Math.floor(Math.random() * 1000);

    return `${guide}-${day}${month}${year}${uid}${hour}${ramdon}`;
  }
}
