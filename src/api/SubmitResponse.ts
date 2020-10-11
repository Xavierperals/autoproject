export interface SubmitResponse {
  success: boolean;
  errors?: {
    [key: string]: string[];
  }
}
