import HeroSection from "@/components/home/HeroSection";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import CategoriesSection from "@/components/home/CategoriesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import ReviewsSection from "@/components/home/ReviewsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedEquipment />
      <CategoriesSection />
      <WhyChooseUs />
      <HowItWorks />
      <RecentlyAdded />
      <ReviewsSection />
    </>
  );
}
