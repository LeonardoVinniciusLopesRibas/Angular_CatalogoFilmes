import {SearchS} from "./searchS";

export class ApiResponse {
  Search!: SearchS[];
  totalResults!: string;
  Response!: string;
  Error!: string;
}
