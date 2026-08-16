import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import PageLoader from "./components/PageLoader/PageLoader";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import Footer from "./components/Footer/Footer";
import HeroSection from "./sections/HeroSection";
import IntroSection from "./sections/IntroSection";
import CapabilitiesSection from "./sections/CapabilitiesSection";
import WorkSection from "./sections/WorkSection";
import EngineeringSection from "./sections/EngineeringSection";
import CurrentlyBuildingSection from "./sections/CurrentlyBuildingSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import { useLenis } from "./hooks/useLenis";
import { usePortfolioData } from "./hooks/usePortfolioData";

function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const {
    profile,
    featuredProjects,
    otherProjects,
    figmaDesigns,
    certificates,
  } = usePortfolioData();
  useLenis();

  return (
    <>
      <PageLoader onComplete={() => setLoaderDone(true)} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <HeroSection ready={loaderDone} profile={profile} />
        <IntroSection />
        <CapabilitiesSection />
        <WorkSection
          featuredProjects={featuredProjects}
          otherProjects={otherProjects}
          figmaDesigns={figmaDesigns}
        />
        <EngineeringSection />
        <CurrentlyBuildingSection />
        <AboutSection profile={profile} certificates={certificates} />
        <ContactSection email={profile?.email} />
      </main>

      <Footer profile={profile} />
    </>
  );
}

export default App;
