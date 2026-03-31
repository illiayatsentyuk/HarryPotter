import FacultyCard from "../components/faculties/FacultyCard";
import "./Faculties.css";

export default function Faculties() {
  const faculty = [
    {
      id: 1,
      name: "Gryffindor",
      image: "/src/assets/images/faculties/gryffindor.png",
      description: "COURAGE, CHIVALPY,DARING.",
    },
    {
      id: 2,
      name: "Slytherin",
      image: "/src/assets/images/faculties/slytherin.png",
      description: "AMBITION, CUNNING, RESOURCEFULNESS.",
    },
    {
      id: 3,
      name: "Hufflepuff",
      image: "/src/assets/images/faculties/hufflepuff.png",
      description: "WIT, LEARNING, WISDOM.",
    },
    {
      id: 4,
      name: "Ravenclaw",
      image: "/src/assets/images/faculties/ravenclaw.png",
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
