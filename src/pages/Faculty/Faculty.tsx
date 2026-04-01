import "./Faculty.css";
import { useNavigate, useParams } from "react-router";
import { EFaculty } from "../../enums/Faculties.enum";

export default function Faculty() {
  const { name } = useParams();
  const navigate = useNavigate();
  const normalizedName = name?.trim().toLowerCase();
  const isValidFaculty =
    typeof normalizedName === "string" &&
    Object.values(EFaculty).includes(normalizedName as EFaculty);

  if (!isValidFaculty) {
    return navigate("/faculties");
  }

  return <div>Faculty {name}</div>;
}
