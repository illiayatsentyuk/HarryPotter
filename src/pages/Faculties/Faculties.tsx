import FacultyCard from "../../components/faculties/FacultyCard";
import { FACULTIES_LIST } from "./facultiesList";
import DeerImage from "../../assets/images/deer.jpg"
import "./Faculties.css";

export default function Faculties() {
  return (
    <>
    <img className="faculties__image" src={DeerImage} alt="" />
    <div className="faculties">
      <h1 className="faculties__title">SELECT YOUR FACULTY</h1>
      <div className="faculties__list">
        {FACULTIES_LIST.map((faculty) => (
          <FacultyCard key={faculty.id} faculty={faculty} />
          ))}
        </div>
      </div>
    </>
  );
}
