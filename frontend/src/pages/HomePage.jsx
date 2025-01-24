import { motion } from 'framer-motion';
import Features from "../components/Features"
import Footer from "../components/Footer"
import GetInvolved from "../components/GetInvolved"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"





const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Emergency Banner */}
            <div className="bg-orange-500 text-white py-2 text-center text-sm font-medium mt-16">
                <p>24/7 Animal Emergency: <a href="tel:+911234567890" className="underline font-bold">1234-567-890</a></p>
            </div>
            
            <Header />

            <main className="relative">
                {/* Hero Section */}
                <HeroSection />

                

                {/* Features Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="py-20"
                >
                    <Features />
                </motion.section>

                {/* Get Involved Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="py-16 bg-orange-50"
                >
                    <GetInvolved />
                </motion.section>
            </main>

            <Footer />

            {/* Emergency Float Button */}
            <motion.a
                href="tel:+911234567890"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="fixed bottom-6 right-6 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-all z-50 flex items-center gap-2"
            >
                <span className="animate-pulse">🆘</span> Emergency
            </motion.a>
        </div>
    )
}

export default HomePage