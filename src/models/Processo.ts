import { Area } from "./Area";

export interface Processo {
    id: string;
    name: string;
    description: string;
    tools: string;
    responsables: string;
    documentation: string;
    processoParentId: string;
    areaId: string;
    area: Area;
  }