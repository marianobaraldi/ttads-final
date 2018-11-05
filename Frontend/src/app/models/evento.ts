import { Equipo } from "./equipo"
import { TipoEvento } from "./tipo_evento"
import { Partido } from "./partido"
export class Evento{
  fecha_hora: Date;
  descripcion: String;
  tipo_evento: TipoEvento;
  partido: Partido;
  equipo: Equipo;
}