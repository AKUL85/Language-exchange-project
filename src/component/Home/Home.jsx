import React from 'react';
import {Search, Users, Star, Globe, BookOpen,ChevronRight,Play,Award,Clock,MessageCircle,TrendingUp,CheckCircle
} from 'lucide-react'
import Hero from './Hero';
import States from './States';
import Language from './Language';

function Home(props) {
     const languages = [
    {
      id: 1,
      name: 'English',
      icon: '🇺🇸',
      tutors: 150,
      category: 'english'
    },
    {
      id: 2,
      name: 'Spanish',
      icon: '🇪🇸',
      tutors: 120,
      category: 'spanish'
    },
    {
      id: 3,
      name: 'French',
      icon: '🇫🇷',
      tutors: 95,
      category: 'french'
    },
    {
      id: 4,
      name: 'German',
      icon: '🇩🇪',
      tutors: 80,
      category: 'german'
    },
    {
      id: 5,
      name: 'Italian',
      icon: '🇮🇹',
      tutors: 70,
      category: 'italian'
    },
    {
      id: 6,
      name: 'Portuguese',
      icon: '🇵🇹',
      tutors: 65,
      category: 'portuguese'
    },
    {
      id: 7,
      name: 'Chinese',
      icon: '🇨🇳',
      tutors: 85,
      category: 'chinese'
    },
    {
      id: 8,
      name: 'Japanese',
      icon: '🇯🇵',
      tutors: 60,
      category: 'japanese'
    },
    {
      id: 9,
      name: 'Korean',
      icon: '🇰🇷',
      tutors: 45,
      category: 'korean'
    }
  ]
    const features = [
    {
      icon: Users,
      title: 'Expert Tutors',
      description: 'Learn from certified native speakers and professional language teachers'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Book sessions that fit your schedule, available 24/7 worldwide'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'All tutors are verified and rated by our community'
    },
    {
      icon: MessageCircle,
      title: 'Interactive Learning',
      description: 'Engaging one-on-one sessions with real-time feedback'
    }
  ]
   const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'LinguaConnect helped me become fluent in Spanish in just 6 months. The tutors are amazing!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The flexibility to learn on my own schedule was perfect for my busy lifestyle.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Teacher',
      image: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'As a tutor on this platform, I love connecting with students from around the world.',
      rating: 5
    }
  ]

    return (
        <div className='min-h-screen'>
            <Hero></Hero>
            <States></States>
            <Language></Language>
        </div>
    );
}

export default Home;