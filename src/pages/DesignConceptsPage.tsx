import React from 'react';
import DesignConcepts from '../components/design/DesignConcepts';

const DesignConceptsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen bg-white">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">Design Concepts</h1>
        <p className="text-gray-600 max-w-2xl">
          Explore our latest design concepts and creative ideas. Each concept represents our commitment to innovation and excellence in design.
        </p>
      </div>
      
      <DesignConcepts />
    </div>
  );
};

export default DesignConceptsPage; 