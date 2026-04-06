import { EFaculty } from "../../enums/Faculties.enum";
import gryffindor from "./faculties/gryffindor.png";
import hufflepuff from "./faculties/hufflepuff.png";
import ravenclaw from "./faculties/ravenclaw.png";
import slytherin from "./faculties/slytherin.png";

/** Card images for the Faculties grid and quiz result (same assets). */
export const FACULTY_CARD_IMAGES: Record<EFaculty, string> = {
  [EFaculty.GRYFFINDOR]: gryffindor,
  [EFaculty.SLYTHERIN]: slytherin,
  [EFaculty.HUFFLEPUFF]: hufflepuff,
  [EFaculty.RAVENCLAW]: ravenclaw,
};
