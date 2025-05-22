import React from 'react';
import { ArrowRight, Info, Shirt, MapPin, Users, Leaf, Camera, Star, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TshirtStoreAboutUs() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 min-h-screen bg-white"
    > 
      {/* Hero Banner */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full h-[400px] md:h-[600px] overflow-hidden rounded-2xl mb-20 relative"
      >
        <img 
          src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80&h=600&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.45"
          alt="Fashion design workshop" 
          className="w-full h-full object-cover object-center filter grayscale hover:filter-none transition-all duration-1000 ease-out scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="p-8 md:p-16 text-white max-w-3xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                Est. 2019
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                Our <span className="border-b-4 border-white pb-1">Story</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-xl">
                Crafting premium streetwear with purpose, passion, and sustainability at our core.
              </p>
            </motion.div>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        >
          <ChevronDown className="h-10 w-10 animate-bounce" />
        </motion.div>
      </motion.div>
      
      {/* About Us Header */}
      <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto"> 
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center bg-gray-100 rounded-full px-4 py-1 mb-6">
            <Info className="h-4 w-4 text-gray-900 mr-2" />
            <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">About Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Innovative fashion for a <br className="hidden sm:block" />
            <span className="text-gray-400">digital age</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're a Munich-based t-shirt brand creating comfortable, stylish designs that express 
            your personality while maintaining the highest quality and ethical standards.
          </p>
        </motion.div>
      </div>
      
      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24"> 
        {/* Brand Description */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="prose prose-lg max-w-none mb-10">
            <p className="text-gray-700 leading-relaxed"> 
              In a world of fast fashion, we take the slow, sustainable approach. Each design is carefully 
              crafted to balance artistic expression with everyday wearability, giving you pieces that 
              stand out while integrating seamlessly into your wardrobe.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our fabrics are selected for their quality, comfort, and environmental impact. We partner 
              with suppliers who share our commitment to ethical manufacturing and fair labor practices.
            </p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all duration-300 group"
          >
            Shop Collection 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
        
        {/* Stats/Highlights */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 h-fit"
        >
          {[
            { icon: <Shirt className="h-6 w-6 text-gray-900" />, value: "50+", label: "Unique Designs" },
            { icon: <Leaf className="h-6 w-6 text-gray-900" />, value: "100%", label: "Organic Cotton" },
            { icon: <MapPin className="h-6 w-6 text-gray-900" />, value: "10+", label: "Countries Served" },
            { icon: <Users className="h-6 w-6 text-gray-900" />, value: "5K+", label: "Happy Customers" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="border border-gray-200 p-5 rounded-xl hover:bg-gray-50 transition-colors flex flex-col items-center text-center"
            >
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                {item.icon}
              </div>
              <p className="text-3xl font-bold">{item.value}</p>
              <p className="text-sm text-gray-600 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Featured Images Grid */}
      <div className="mb-24">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          <div className="md:col-span-8 h-[320px] md:h-[500px] overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Fashion design team collaboration" 
              className="w-full h-full object-cover object-center filter grayscale hover:filter-none transition-all duration-700 ease-out"
            />
          </div>
          <div className="md:col-span-4 h-[320px] md:h-[500px] overflow-hidden rounded-2xl">
            <img 
              src="https://images.unsplash.com/photo-1581337043246-9436d295bded?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="T-shirt screen printing process" 
              className="w-full h-full object-cover object-center filter grayscale hover:filter-none transition-all duration-700 ease-out"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Our Journey Section */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-24 bg-gray-50 p-10 md:p-16 rounded-3xl"
      > 
        <div className="flex items-center space-x-4 mb-12">
          <div className="bg-black text-white p-3 rounded-full">
            <Camera className="h-6 w-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          <div className="space-y-6"> 
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2019, our journey began with a simple idea: create t-shirts that people would love 
              to wear every day, made with sustainable materials and ethical practices.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              What started as a small operation in a Munich apartment has grown into a beloved brand with 
              customers across Europe who share our passion for quality, style, and sustainability.
            </p>
          </div>
          <div className="space-y-6"> 
            <p className="text-lg text-gray-700 leading-relaxed">
              Each of our designs is created in-house by our talented team of artists who draw inspiration 
              from urban culture, nature, and contemporary art movements.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that fashion should be both personal and responsible – that's why we use organic cotton 
              and ensure fair labor practices throughout our supply chain.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {[2019, 2021, 2023].map((year, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-4xl font-bold text-gray-900 mb-3">{year}</p>
              <p className="text-gray-600">
                {year === 2019 && "Founded in Munich with just 5 designs and a dream."}
                {year === 2021 && "Expanded to 10 team members and 30+ retail partners."}
                {year === 2023 && "Launched our sustainability initiative and online store."}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Designer Spotlight */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-24 flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="md:w-1/2 h-[400px] md:h-[550px] overflow-hidden rounded-2xl">
          <img 
            src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Our lead designer at work" 
            className="w-full h-full object-cover object-center filter grayscale hover:filter-none transition-all duration-700 ease-out"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-6">
            The Team
          </span>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Design Team</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Our talented designers bring diverse backgrounds in fashion, graphic design, and fine arts. 
            They collaborate to create collections that blend contemporary trends with timeless appeal.
          </p>
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1 text-yellow-500 mb-3">
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
            </div>
            <p className="text-gray-700 font-medium">
              Recognized among top 10 indie fashion labels in 2022 by Fashion Forward Magazine
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Mission Section */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="border-t border-gray-200 pt-16"
      > 
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium mb-4">
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">Our Mission</h2>
        </div>
        
        <div className="bg-black text-white p-10 md:p-16 rounded-2xl shadow-xl relative overflow-hidden"> 
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl italic font-light mb-10 leading-relaxed max-w-3xl mx-auto text-center"> 
              "To redefine streetwear by combining innovative design with sustainable practices, 
              creating clothing that looks good and does good."
            </p>
            <div className="max-w-2xl mx-auto text-center">
              <p className="leading-relaxed text-gray-300 mb-10">
                We're committed to reducing our environmental impact while delivering premium quality apparel 
                that tells a story. Every stitch, every print, and every shipment reflects our dedication 
                to these principles.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full inline-flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-300 group"
              >
                Our Sustainability Pledge
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}