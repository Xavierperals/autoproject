export interface ApiResponse {
  fitxes: {
    p: string;
    v: {
      scheme: string;
      v: Array<{
        scheme: string;
        v: Array<{
          scheme: string;
          id: string;
          content: string;
        }>;
        id: string;
        content: string;
      }>;
      id: string;
      content: string;
    };
    lang: string;
    version: string;
    o: string;
  }
}
