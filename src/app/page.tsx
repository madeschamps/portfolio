import Image from "next/image";
import SectionProjects from "./components/SectionProjects/SectionProjects";
import SectionSkills from "./components/SectionSkills/SectionSkills";
import SectionIntro from "./components/SectionIntro/SectionIntro";
import SectionContact from "./components/SectionContact/SectionContact";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <SectionIntro />
      <SectionSkills />
      {/* <SectionProjects /> */}
      <SectionContact />
      <Footer />
    </>
  );
}
