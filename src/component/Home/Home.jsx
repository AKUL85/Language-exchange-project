import React from 'react';
import {
  Search, Users, Star, Globe, BookOpen, ChevronRight, Play, Award, Clock, MessageCircle, TrendingUp, CheckCircle
} from 'lucide-react'
import Hero from './Hero';
import States from './States';
import Language from './Language';
import FeatureSection from './FeatureSection';
import Testimonial from './Testimonial';

function Home(props) {


  return (
    <div className='min-h-screen'>
      <Hero></Hero>
      <States></States>
      <Language></Language>
      <FeatureSection></FeatureSection>
      <Testimonial></Testimonial>
    </div>
  );
}

export default Home;