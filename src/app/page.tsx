import Image from "next/image";
import Section1 from "./components/Section1/Section1";
import Section2 from "./components/Section2/Section2";
import SectionProjects from "./components/SectionProjects/SectionProjects";

export default function Home() {
  return (
    <>
      <Section1 />
      <SectionProjects />
      <Section2 />
    </>
  );
}
