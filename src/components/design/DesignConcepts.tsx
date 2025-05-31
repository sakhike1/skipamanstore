import React, { useEffect, useState } from 'react';
import { DesignConcept, fetchDesignConcepts } from '../../lib/supabase';
import { motion } from 'framer-motion';

const DesignConcepts: React.FC = () => {
  const [concepts, setConcepts] = useState<DesignConcept[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConcepts = async () => {
      try {
        const data = await fetchDesignConcepts();
        setConcepts(data);
      } catch (err) {
        setError('Failed to load design concepts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadConcepts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {concepts.map((concept) => (
        <motion.div
          key={concept.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="aspect-video relative overflow-hidden">
            <img
              src={concept.image_url}
              alt={concept.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm">
              {concept.category}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{concept.title}</h3>
            <p className="text-gray-600 mb-4">{concept.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(concept.created_at).toLocaleDateString()}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                concept.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {concept.status}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DesignConcepts; 