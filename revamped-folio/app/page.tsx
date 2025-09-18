import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import HeroSection from "./components/hero-section";
import ProjectSection from "./components/project-section";
import TechStackSection from "./components/tech-stack-section";
import AboutMe from "./components/about-me";

export default function Home() {
 return (
  
   <div className="">
    <HeroSection/>
   <section id="about">
     <AboutMe/>
   </section>
   <section id="projects">
     <ProjectSection/>
   </section>
   <section id="skills">
     <TechStackSection/>
   </section>
   <section id="contact">
     <ContactSection/>
   </section>
   <Footer/>
   </div>
  
 );
}
