import AboutMe from "./components/about-me";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import ProjectSection from "./components/project-section";
import TechStackSection from "./components/tech-stack-section";

export default function Home() {
 return (
  <>
   <HeroSection/>
   <TechStackSection/>
   <ProjectSection/>
   <AboutMe/>
   <Footer/>
  </>
 );
}
