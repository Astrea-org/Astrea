import Explore from "../components/Explore";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-x-clip">
      <HeroSection />
      <Explore />
    </div>
  );
}
