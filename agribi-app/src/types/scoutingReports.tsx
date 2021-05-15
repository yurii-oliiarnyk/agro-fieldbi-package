export type ScoutingReportType = {
  id: number;
  date: number;
  executant: {
    id: number;
    name: string;
  };
  field: {
    id: number;
    name: string;
  };
  fieldContour: {
    date: number;
    logField: number;
    tillableArea: number;
    polygon: any;
  };
  pointsCount: number;
  subdivision: {
    id: number;
    name: string;
  };
  points: Array<{
    point: [number, number];
    id: number;
    comment: string;
    name: string;
    photos: Array<{
      id: number;
      photo: string;
      point: [number, number];
    }>;
    analyses: Array<{
      id: number;
      value: string | number | boolean;
      analysisIndicator: {
        id: number;
        name: string;
        type: number;
        enumValues?: string;
      };
    }>;
  }>;
};
