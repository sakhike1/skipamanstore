import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for design concepts
export interface DesignConcept {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  category: string;
  status: 'draft' | 'published';
}

// Function to fetch design concepts
export const fetchDesignConcepts = async () => {
  const { data, error } = await supabase
    .from('design_concepts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching design concepts:', error);
    throw error;
  }

  return data as DesignConcept[];
};

// Function to fetch a single design concept
export const fetchDesignConcept = async (id: string) => {
  const { data, error } = await supabase
    .from('design_concepts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching design concept:', error);
    throw error;
  }

  return data as DesignConcept;
}; 