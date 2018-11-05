import { Equipo } from "./equipo"
import { Evento } from "./evento"

export class Partido{
  fecha_hora: Date;
  equipo_local: Equipo;
  equipo_visitante: Equipo;
  eventos: Evento[];
}

