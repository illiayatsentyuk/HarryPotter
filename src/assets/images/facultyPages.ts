import { EFaculty } from "../../enums/Faculties.enum";
import gryffindorBackground from "./faculty/gryffindor/gryffindor-background.png";
import gryffindorLogo from "./faculty/gryffindor/gryffindor-logo.png";
import gryffindorRelic from "./faculty/gryffindor/gryffindor-relic.png";
import hufflepuffBackground from "./faculty/hufflepuff/hufflepuff-background.png";
import hufflepuffLogo from "./faculty/hufflepuff/hufflepuff-logo.png";
import hufflepuffRelic from "./faculty/hufflepuff/hufflepuff-relic.png";
import ravenclawBackground from "./faculty/ravenclaw/ravenclaw-background.png";
import ravenclawLogo from "./faculty/ravenclaw/ravenclaw-logo.png";
import ravenclawRelic from "./faculty/ravenclaw/ravenclaw-relic.png";
import slytherinBackground from "./faculty/slytherin/slytherin-background.png";
import slytherinLogo from "./faculty/slytherin/slytherin-logo.png";
import slytherinRelic from "./faculty/slytherin/slytherin-relic.png";

export type FacultyPageAssets = {
  logo: string;
  background: string;
  relic: string;
};

export const FACULTY_PAGE_ASSETS: Record<EFaculty, FacultyPageAssets> = {
  [EFaculty.GRYFFINDOR]: {
    logo: gryffindorLogo,
    background: gryffindorBackground,
    relic: gryffindorRelic,
  },
  [EFaculty.SLYTHERIN]: {
    logo: slytherinLogo,
    background: slytherinBackground,
    relic: slytherinRelic,
  },
  [EFaculty.HUFFLEPUFF]: {
    logo: hufflepuffLogo,
    background: hufflepuffBackground,
    relic: hufflepuffRelic,
  },
  [EFaculty.RAVENCLAW]: {
    logo: ravenclawLogo,
    background: ravenclawBackground,
    relic: ravenclawRelic,
  },
};
