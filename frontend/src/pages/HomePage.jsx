import Features from "../components/Features"
import Footer from "../components/Footer"
import GetInvolved from "../components/GetInvolved"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"





const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          <Header />
          <main>
            <HeroSection />
            <Features />
            <GetInvolved />
          </main>
          <Footer />
        </div>
      )
}

export default HomePage