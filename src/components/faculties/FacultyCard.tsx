import type { Faculty } from "../../types/Faculty.type";
import "./FacultyCard.css";
import { useNavigate } from "react-router";

export default function FacultyCard({ faculty }: { faculty: Faculty }) {
  const facultyKey = faculty.name.trim().toLowerCase();
  const navigate = useNavigate();

  return (
    <div
      className={`faculty-card faculty-card--${facultyKey}`}
      key={faculty.id}
      onClick={() => navigate(`/faculty/${facultyKey}`)}
    >
      <img
        className="faculty-card__image"
        src={faculty.image}
        alt={faculty.name}
      />
      <h2 className="faculty-card__name">{faculty.name}</h2>
      <p className="faculty-card__description">{faculty.description}</p>
      <button className="faculty-card__button" type="button">
        ENTRY TO COMMON ROOM
      </button>
    </div>
  );
}
