//====================================================
// Region Calendario
//====================================================
export interface IPrevisionAndReceivementCalendarDTO {
  attributes: IPrevisionAndReceivementCalendarDateDTO[];
}

export interface IPrevisionAndReceivementCalendarDateDTO {
  key: number;
  customData: IPrevisionAndReceivementCalendarDateDataDTO;
  dates: Date;
}

export interface IPrevisionAndReceivementCalendarDateDataDTO {
  valor?: number;
  statusDia?: string;
  statusValor?: string;
  dataEmissao?: Date;
}
