import FacultyCard from "../../components/faculties/FacultyCard";
import { FACULTY_CARD_IMAGES } from "../../assets/images/facultyCards";
import { EFaculty } from "../../enums/Faculties.enum";
import "./Faculties.css";

export default function Faculties() {
  const faculty = [
    {
      id: 1,
      name: "Gryffindor",
      image: FACULTY_CARD_IMAGES[EFaculty.GRYFFINDOR],
      description: "COURAGE, CHIVALPY,DARING.",
    },
    {
      id: 2,
      name: "Slytherin",
      image: FACULTY_CARD_IMAGES[EFaculty.SLYTHERIN],
      description: "AMBITION, CUNNING, RESOURCEFULNESS.",
    },
    {
      id: 3,
      name: "Hufflepuff",
      image: FACULTY_CARD_IMAGES[EFaculty.HUFFLEPUFF],
      description: "WIT, LEARNING, WISDOM.",
    },
    {
      id: 4,
      name: "Ravenclaw",
      image: FACULTY_CARD_IMAGES[EFaculty.RAVENCLAW],
      description: "LOYALTY, PATIENCE, HARD WORK.",
    },
  ];
  return (
    <div className="faculties">
      <h1 className="faculties__title">SELECT YOUR FACULTY</h1>
      <div className="faculties__list">
        {faculty.map((faculty) => (
          <FacultyCard key={faculty.id} faculty={faculty} />
        ))}
      </div>
    </div>
  );
}
