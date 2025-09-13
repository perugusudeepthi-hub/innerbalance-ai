import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Calendar, Heart, Brain, Activity, TrendingUp, BookOpen, Users, Phone, MessageCircle, Sun, Moon, Coffee, Utensils, Target, Award, Shield, AlertTriangle, Zap, Wind, Droplets, Eye, Headphones, Play, Pause, RotateCcw, Settings, Bell, Share2, Download, Upload, Lock, Unlock, Timer, Smile, Frown, Meh, User, Camera, Mic, Video, Send, ThumbsUp, ThumbsDown, Star, Filter, Search, Map, Navigation, Compass, Globe, Home, School, Book, Briefcase, Music, Gamepad2, Palette, Mountain, Waves, TreePine, Flower2, CloudRain, Sunrise, Sunset, RefreshCw } from 'lucide-react';

const WellnessPlatform = () => {
  const [currentView, setCurrentView] = useState('check-in');
  const [user, setUser] = useState({
    name: 'Alex',
    avatar: '👨‍🎓',
    streak: 7,
    totalCheckIns: 45,
    level: 3
  });

  const [checkInData, setCheckInData] = useState({
    mood: 5,
    energy: 5,
    stress: 5,
    sleep: 7,
    anxiety: 3,
    focus: 6,
    social: 5,
    physical: 6,
    notes: '',
    activities: [],
    triggers: [],
    copingStrategies: [],
    gratitude: ['', '', ''],
    goals: '',
    location: 'campus',
    weather: 'sunny',
    socialInteractions: 3
  });

  const [breathingSession, setBreathingSession] = useState({
    isActive: false,
    phase: 'inhale', // inhale, hold, exhale
    count: 0,
    cycle: 0
  });

  const [meditationTimer, setMeditationTimer] = useState({
    isActive: false,
    duration: 300, // 5 minutes
    remaining: 300,
    selectedSound: 'rain'
  });

  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: '2024-09-12',
      entry: 'Had a great day studying with friends. Feeling accomplished!',
      sentiment: 'positive',
      tags: ['study', 'friends', 'accomplishment']
    },
    {
      id: 2,
      date: '2024-09-11',
      entry: 'Feeling overwhelmed with assignments. Need to organize better.',
      sentiment: 'negative',
      tags: ['stress', 'assignments', 'organization']
    }
  ]);

  const [moodHistory, setMoodHistory] = useState([
    { date: '2024-09-07', mood: 6, energy: 7, stress: 4, sleep: 8, anxiety: 3, focus: 7, social: 6, physical: 8 },
    { date: '2024-09-08', mood: 7, energy: 6, stress: 5, sleep: 7, anxiety: 4, focus: 6, social: 7, physical: 7 },
    { date: '2024-09-09', mood: 5, energy: 5, stress: 7, sleep: 6, anxiety: 6, focus: 4, social: 5, physical: 6 },
    { date: '2024-09-10', mood: 8, energy: 8, stress: 3, sleep: 8, anxiety: 2, focus: 8, social: 8, physical: 9 },
    { date: '2024-09-11', mood: 4, energy: 4, stress: 8, sleep: 5, anxiety: 7, focus: 3, social: 4, physical: 5 },
    { date: '2024-09-12', mood: 7, energy: 7, stress: 4, sleep: 7, anxiety: 3, focus: 7, social: 7, physical: 7 },
    { date: '2024-09-13', mood: 6, energy: 6, stress: 5, sleep: 6, anxiety: 4, focus: 6, social: 6, physical: 6 }
  ]);

  const [goals, setGoals] = useState([
    { id: 1, text: 'Meditate for 10 minutes daily', completed: true, streak: 5 },
    { id: 2, text: 'Get 8 hours of sleep', completed: false, streak: 0 },
    { id: 3, text: 'Exercise 3 times a week', completed: true, streak: 2 }
  ]);

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: '7-Day Mindfulness Challenge',
      description: 'Practice mindfulness for 7 consecutive days',
      progress: 5,
      total: 7,
      reward: '🏆 Mindfulness Master Badge',
      active: true
    },
    {
      id: 2,
      title: 'Gratitude Week',
      description: 'Write 3 things you\'re grateful for each day',
      progress: 3,
      total: 7,
      reward: '✨ Gratitude Guru Badge',
      active: true
    }
  ]);

  const activities = [
    { name: 'Exercise', icon: Activity, color: 'text-wellness-energy' },
    { name: 'Meditation', icon: Brain, color: 'text-wellness-focus' },
    { name: 'Study', icon: BookOpen, color: 'text-wellness-calm' },
    { name: 'Social Time', icon: Users, color: 'text-wellness-growth' },
    { name: 'Hobbies', icon: Palette, color: 'text-wellness-heart' },
    { name: 'Outdoor Time', icon: TreePine, color: 'text-wellness-peace' },
    { name: 'Reading', icon: Book, color: 'text-wellness-focus' },
    { name: 'Music', icon: Music, color: 'text-wellness-heart' },
    { name: 'Gaming', icon: Gamepad2, color: 'text-wellness-energy' },
    { name: 'Cooking', icon: Utensils, color: 'text-wellness-growth' }
  ];

  const triggers = [
    'Exams', 'Deadlines', 'Social situations', 'Financial stress', 'Family issues',
    'Health concerns', 'Relationship problems', 'Academic pressure', 'Work stress', 'Sleep deprivation'
  ];

  const copingStrategies = [
    'Deep breathing', 'Progressive muscle relaxation', 'Mindfulness', 'Exercise', 'Talk to friends',
    'Listen to music', 'Take a walk', 'Write in journal', 'Take a break', 'Seek professional help'
  ];

  const moodEmojis = {
    1: '😭', 2: '😢', 3: '😕', 4: '😐', 5: '😊', 
    6: '😄', 7: '😁', 8: '🤩', 9: '🥳', 10: '🌟'
  };

  const meditationSounds = {
    rain: '🌧️ Rain',
    ocean: '🌊 Ocean Waves',
    forest: '🌲 Forest',
    birds: '🐦 Birds',
    silence: '🔇 Silence'
  };

  // Advanced AI Recommendations Engine
  const getAdvancedRecommendations = (userData) => {
    const { mood, energy, stress, anxiety, focus, social, physical, sleep, activities, triggers } = userData;
    const recommendations = [];
    const insights = [];

    // Pattern Analysis
    if (mood < 5 && energy < 5 && sleep < 6) {
      recommendations.push({
        type: 'critical',
        priority: 'high',
        icon: AlertTriangle,
        title: 'Sleep & Recovery Focus',
        suggestion: 'Your low mood and energy appear linked to insufficient sleep. Prioritize 8+ hours tonight.',
        action: 'Set bedtime reminder',
        category: 'sleep'
      });
    }

    if (stress > 7 && anxiety > 6) {
      recommendations.push({
        type: 'urgent',
        priority: 'high',
        icon: Shield,
        title: 'Stress Management Required',
        suggestion: 'High stress and anxiety detected. Try the 4-7-8 breathing technique immediately.',
        action: 'Start breathing exercise',
        category: 'mental'
      });
    }

    if (focus < 4 && activities.includes('Study')) {
      recommendations.push({
        type: 'academic',
        priority: 'medium',
        icon: Target,
        title: 'Focus Enhancement',
        suggestion: 'Consider the Pomodoro technique for better concentration during study sessions.',
        action: 'Try focus timer',
        category: 'productivity'
      });
    }

    if (social < 4) {
      recommendations.push({
        type: 'social',
        priority: 'medium',
        icon: Users,
        title: 'Social Connection',
        suggestion: 'Low social score detected. Consider reaching out to a friend or joining a study group.',
        action: 'Connect with peers',
        category: 'social'
      });
    }

    if (physical < 4) {
      recommendations.push({
        type: 'physical',
        priority: 'medium',
        icon: Activity,
        title: 'Physical Activity',
        suggestion: 'Your physical wellness could improve with light exercise - even a 10-minute walk helps.',
        action: 'Start movement',
        category: 'physical'
      });
    }

    // Positive reinforcement
    if (mood >= 7 && energy >= 7) {
      insights.push({
        type: 'positive',
        icon: Star,
        message: 'You\'re having a great day! This is a perfect time to tackle challenging tasks.',
        color: 'text-success'
      });
    }

    // Pattern insights
    const recentEntries = moodHistory.slice(-3);
    const moodTrend = recentEntries[recentEntries.length - 1].mood - recentEntries[0].mood;
    
    if (moodTrend > 2) {
      insights.push({
        type: 'trend',
        icon: TrendingUp,
        message: 'Your mood has been improving over the last few days - keep up the great work!',
        color: 'text-wellness-calm'
      });
    }

    return { recommendations, insights };
  };

  // Breathing Exercise Logic
  useEffect(() => {
    let interval = null;
    if (breathingSession.isActive) {
      interval = setInterval(() => {
        setBreathingSession(prev => {
          const newCount = prev.count + 1;
          let newPhase = prev.phase;
          let newCycle = prev.cycle;

          if (prev.phase === 'inhale' && newCount >= 4) {
            newPhase = 'hold';
          } else if (prev.phase === 'hold' && newCount >= 7) {
            newPhase = 'exhale';
          } else if (prev.phase === 'exhale' && newCount >= 8) {
            newPhase = 'inhale';
            newCycle = prev.cycle + 1;
          }

          return {
            ...prev,
            count: newPhase !== prev.phase ? 1 : newCount,
            phase: newPhase,
            cycle: newCycle
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingSession.isActive]);

  // Meditation Timer Logic
  useEffect(() => {
    let interval = null;
    if (meditationTimer.isActive && meditationTimer.remaining > 0) {
      interval = setInterval(() => {
        setMeditationTimer(prev => ({
          ...prev,
          remaining: prev.remaining - 1
        }));
      }, 1000);
    } else if (meditationTimer.remaining === 0) {
      setMeditationTimer(prev => ({ ...prev, isActive: false }));
    }
    return () => clearInterval(interval);
  }, [meditationTimer.isActive, meditationTimer.remaining]);

  // Enhanced Sentiment Analysis
  const analyzeSentiment = (text) => {
    const positiveWords = ['happy', 'good', 'great', 'awesome', 'excellent', 'wonderful', 'amazing', 'love', 'excited', 'peaceful', 'grateful', 'accomplished', 'proud', 'confident', 'energetic'];
    const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'horrible', 'hate', 'angry', 'stressed', 'worried', 'anxious', 'overwhelmed', 'frustrated', 'disappointed', 'lonely', 'exhausted'];
    const neutralWords = ['okay', 'fine', 'alright', 'normal', 'average', 'usual'];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    
    words.forEach(word => {
      const cleanWord = word.replace(/[^\w]/g, '');
      if (positiveWords.includes(cleanWord)) positiveCount++;
      if (negativeWords.includes(cleanWord)) negativeCount++;
      if (neutralWords.includes(cleanWord)) neutralCount++;
    });
    
    const totalSentimentWords = positiveCount + negativeCount + neutralCount;
    
    if (totalSentimentWords === 0) return { sentiment: 'neutral', confidence: 0.5 };
    
    const positiveRatio = positiveCount / totalSentimentWords;
    const negativeRatio = negativeCount / totalSentimentWords;
    
    if (positiveRatio > negativeRatio && positiveRatio > 0.3) {
      return { sentiment: 'positive', confidence: Math.min(positiveRatio + 0.2, 1) };
    } else if (negativeRatio > positiveRatio && negativeRatio > 0.3) {
      return { sentiment: 'negative', confidence: Math.min(negativeRatio + 0.2, 1) };
    }
    
    return { sentiment: 'neutral', confidence: 0.5 + Math.abs(positiveRatio - negativeRatio) };
  };

  const EnhancedCheckIn = () => {
    const handleSubmitCheckIn = () => {
      const today = new Date().toISOString().split('T')[0];
      const newEntry = {
        date: today,
        ...checkInData,
        timestamp: new Date().toISOString()
      };
      
      setMoodHistory(prev => [...prev.filter(entry => entry.date !== today), newEntry]);
      
      // Update user streak
      setUser(prev => ({
        ...prev,
        streak: prev.streak + 1,
        totalCheckIns: prev.totalCheckIns + 1
      }));

      // Add journal entry if notes exist
      if (checkInData.notes.trim()) {
        const sentiment = analyzeSentiment(checkInData.notes);
        setJournalEntries(prev => [...prev, {
          id: Date.now(),
          date: today,
          entry: checkInData.notes,
          sentiment: sentiment.sentiment,
          confidence: sentiment.confidence,
          tags: [...checkInData.activities, ...checkInData.triggers].filter(Boolean)
        }]);
      }
      
      setCurrentView('dashboard');
    };

    return (
      <div className="space-y-6">
        {/* User Progress Header */}
        <div className="bg-gradient-wellness text-white rounded-xl p-6 shadow-wellness">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{user.avatar}</div>
              <div>
                <h2 className="text-xl font-bold">Welcome back, {user.name}!</h2>
                <p className="text-white/80">Level {user.level} • {user.streak} day streak 🔥</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{user.totalCheckIns}</div>
              <div className="text-white/80 text-sm">Total Check-ins</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Check-in Form */}
          <div className="wellness-card">
            <div className="text-center mb-6">
              <Heart className="w-12 h-12 text-wellness-heart mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">How are you feeling today?</h2>
            </div>

            <div className="space-y-6">
              {/* Enhanced Mood Grid */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Current Mood</label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                    <button
                      key={value}
                      onClick={() => setCheckInData(prev => ({ ...prev, mood: value }))}
                      className={`mood-button ${checkInData.mood === value ? 'active' : ''}`}
                    >
                      <div className="text-2xl">{moodEmojis[value]}</div>
                      <div className="text-xs text-muted-foreground">{value}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-dimensional Wellness Tracking */}
              {[
                { key: 'energy', label: 'Energy Level', color: 'wellness-energy', icon: Zap },
                { key: 'stress', label: 'Stress Level', color: 'destructive', icon: AlertTriangle },
                { key: 'anxiety', label: 'Anxiety Level', color: 'warning', icon: Shield },
                { key: 'focus', label: 'Focus/Concentration', color: 'wellness-focus', icon: Target },
                { key: 'social', label: 'Social Wellness', color: 'wellness-growth', icon: Users },
                { key: 'physical', label: 'Physical Wellness', color: 'wellness-peace', icon: Activity }
              ].map(({ key, label, color, icon: Icon }) => (
                <div key={key}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className={`w-4 h-4 text-${color}`} />
                    <label className="text-sm font-medium text-foreground">
                      {label}: {checkInData[key]}/10
                    </label>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={checkInData[key]}
                    onChange={(e) => setCheckInData(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}

              {/* Sleep with visual indicator */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Moon className="w-4 h-4 text-wellness-calm" />
                  <label className="text-sm font-medium text-foreground">
                    Hours of Sleep: {checkInData.sleep}h
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={checkInData.sleep}
                  onChange={(e) => setCheckInData(prev => ({ ...prev, sleep: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {checkInData.sleep < 6 ? 'Consider more sleep for better wellness' : 
                   checkInData.sleep > 9 ? 'Great sleep duration!' : 'Good sleep duration'}
                </div>
              </div>
            </div>
          </div>

          {/* Activities & Context */}
          <div className="space-y-6">
            <div className="wellness-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Today's Activities</h3>
              <div className="grid grid-cols-2 gap-3">
                {activities.map(activity => {
                  const Icon = activity.icon;
                  return (
                    <label key={activity.name} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-muted">
                      <input
                        type="checkbox"
                        checked={checkInData.activities.includes(activity.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCheckInData(prev => ({ ...prev, activities: [...prev.activities, activity.name] }));
                          } else {
                            setCheckInData(prev => ({ ...prev, activities: prev.activities.filter(a => a !== activity.name) }));
                          }
                        }}
                        className="rounded text-primary"
                      />
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                      <span className="text-sm">{activity.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="wellness-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Stress Triggers (if any)</h3>
              <div className="space-y-2">
                {triggers.slice(0, 6).map(trigger => (
                  <label key={trigger} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkInData.triggers.includes(trigger)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheckInData(prev => ({ ...prev, triggers: [...prev.triggers, trigger] }));
                        } else {
                          setCheckInData(prev => ({ ...prev, triggers: prev.triggers.filter(t => t !== trigger) }));
                        }
                      }}
                      className="rounded text-destructive"
                    />
                    <span className="text-sm">{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="wellness-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Gratitude Practice</h3>
              <div className="space-y-3">
                {checkInData.gratitude.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Something you're grateful for ${index + 1}...`}
                    value={item}
                    onChange={(e) => {
                      const newGratitude = [...checkInData.gratitude];
                      newGratitude[index] = e.target.value;
                      setCheckInData(prev => ({ ...prev, gratitude: newGratitude }));
                    }}
                    className="wellness-input w-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Journal & Goals */}
        <div className="wellness-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Daily Reflection</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                How was your day? What's on your mind?
              </label>
              <textarea
                value={checkInData.notes}
                onChange={(e) => setCheckInData(prev => ({ ...prev, notes: e.target.value }))}
                className="wellness-input w-full"
                rows={4}
                placeholder="Share your thoughts, feelings, or experiences from today..."
              />
              {checkInData.notes && (
                <div className="mt-2 text-sm">
                  <span className="font-medium">AI Analysis: </span>
                  {(() => {
                    const analysis = analyzeSentiment(checkInData.notes);
                    return (
                      <span className={
                        analysis.sentiment === 'positive' ? 'status-positive' :
                        analysis.sentiment === 'negative' ? 'status-negative' :
                        'status-neutral'
                      }>
                        {analysis.sentiment} ({Math.round(analysis.confidence * 100)}% confidence)
                      </span>
                    );
                  })()}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Goals for tomorrow
              </label>
              <textarea
                value={checkInData.goals}
                onChange={(e) => setCheckInData(prev => ({ ...prev, goals: e.target.value }))}
                className="wellness-input w-full"
                rows={4}
                placeholder="What do you want to accomplish tomorrow?"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmitCheckIn}
          className="wellness-button w-full text-lg py-4"
        >
          Complete Check-In & Get Insights ✨
        </button>
      </div>
    );
  };

  const EnhancedDashboard = () => {
    const latestEntry = moodHistory[moodHistory.length - 1];
    const { recommendations, insights } = getAdvancedRecommendations(latestEntry);

    // Wellness Score Calculation
    const wellnessScore = Math.round(
      (latestEntry.mood + latestEntry.energy + (10 - latestEntry.stress) + 
       (10 - latestEntry.anxiety) + latestEntry.focus + latestEntry.social + 
       latestEntry.physical + Math.min(latestEntry.sleep, 10)) / 8
    );

    const radarData = [
      { subject: 'Mood', value: latestEntry.mood, fullMark: 10 },
      { subject: 'Energy', value: latestEntry.energy, fullMark: 10 },
      { subject: 'Focus', value: latestEntry.focus, fullMark: 10 },
      { subject: 'Social', value: latestEntry.social, fullMark: 10 },
      { subject: 'Physical', value: latestEntry.physical, fullMark: 10 },
      { subject: 'Low Stress', value: 10 - latestEntry.stress, fullMark: 10 }
    ];

    return (
      <div className="space-y-6">
        {/* Comprehensive Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-focus text-white rounded-xl p-6 shadow-wellness">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Wellness Score</p>
                <p className="text-3xl font-bold">{wellnessScore}/10</p>
                <p className="text-white/60 text-xs">
                  {wellnessScore >= 8 ? 'Excellent' : wellnessScore >= 6 ? 'Good' : wellnessScore >= 4 ? 'Fair' : 'Needs Attention'}
                </p>
              </div>
              <Award className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-gradient-heart text-white rounded-xl p-6 shadow-wellness">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Current Mood</p>
                <p className="text-3xl">{moodEmojis[latestEntry.mood]}</p>
                <p className="text-white/60 text-xs">{latestEntry.mood}/10</p>
              </div>
              <Heart className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-gradient-growth text-white rounded-xl p-6 shadow-wellness">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Streak</p>
                <p className="text-3xl font-bold">{user.streak}</p>
                <p className="text-white/60 text-xs">days</p>
              </div>
              <Zap className="w-8 h-8 text-white/60" />
            </div>
          </div>
          
          <div className="bg-gradient-calm text-white rounded-xl p-6 shadow-wellness">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Sleep Quality</p>
                <p className="text-3xl font-bold">{latestEntry.sleep}h</p>
                <p className="text-white/60 text-xs">
                  {latestEntry.sleep >= 8 ? 'Great!' : latestEntry.sleep >= 7 ? 'Good' : 'Needs work'}
                </p>
              </div>
              <Moon className="w-8 h-8 text-white/60" />
            </div>
          </div>
        </div>

        {/* AI Insights & Recommendations */}
        {(insights.length > 0 || recommendations.length > 0) && (
          <div className="wellness-card">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-wellness-focus" />
              AI-Powered Insights & Recommendations
            </h3>
            
            {insights.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-foreground mb-3">Personal Insights</h4>
                <div className="space-y-3">
                  {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <Icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                        <p className="text-sm text-foreground">{insight.message}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon;
                const priorityStyles = {
                  high: 'border-destructive/20 bg-destructive/5',
                  medium: 'border-warning/20 bg-warning/5',
                  low: 'border-success/20 bg-success/5'
                };
                
                return (
                  <div key={index} className={`rounded-lg p-4 border-2 ${priorityStyles[rec.priority]}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        rec.priority === 'high' ? 'bg-destructive text-destructive-foreground' :
                        rec.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                        'bg-success text-success-foreground'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{rec.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            rec.priority === 'high' ? 'status-negative' :
                            rec.priority === 'medium' ? 'bg-warning/10 text-warning border border-warning/20' :
                            'status-positive'
                          }`}>
                            {rec.priority}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-1">{rec.suggestion}</p>
                        <button className="mt-2 text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary-hover transition-colors">
                          {rec.action}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wellness Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="wellness-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Wellness Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={60} domain={[0, 10]} />
                <Radar
                  name="Current State"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="wellness-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">7-Day Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="hsl(var(--wellness-heart))" strokeWidth={2} name="Mood" />
                <Line type="monotone" dataKey="energy" stroke="hsl(var(--wellness-energy))" strokeWidth={2} name="Energy" />
                <Line type="monotone" dataKey="stress" stroke="hsl(var(--destructive))" strokeWidth={2} name="Stress" />
                <Line type="monotone" dataKey="anxiety" stroke="hsl(var(--warning))" strokeWidth={2} name="Anxiety" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals & Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="wellness-card">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-wellness-calm" />
              Daily Goals
            </h3>
            <div className="space-y-3">
              {goals.map(goal => (
                <div key={goal.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={(e) => setGoals(prev => prev.map(g => 
                        g.id === goal.id ? { ...g, completed: e.target.checked } : g
                      ))}
                      className="rounded text-success"
                    />
                    <span className={goal.completed ? 'line-through text-muted-foreground' : 'text-foreground'}>
                      {goal.text}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-wellness-energy" />
                    <span className="text-sm text-muted-foreground">{goal.streak}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="wellness-card">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-wellness-focus" />
              Active Challenges
            </h3>
            <div className="space-y-4">
              {challenges.map(challenge => (
                <div key={challenge.id} className="p-4 bg-gradient-focus/5 rounded-lg border border-wellness-focus/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground">{challenge.title}</h4>
                    <span className="text-xs bg-wellness-focus/10 text-wellness-focus px-2 py-1 rounded">
                      {challenge.progress}/{challenge.total}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                  <div className="wellness-progress-bar mb-2">
                    <div 
                      className="wellness-progress-fill bg-gradient-focus"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Reward: {challenge.reward}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wellness Tools */}
        <div className="wellness-card">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Headphones className="w-5 h-5 mr-2 text-wellness-peace" />
            Wellness Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Breathing Exercise */}
            <div className="bg-gradient-calm rounded-lg p-4 border border-wellness-calm/20">
              <Wind className="w-8 h-8 text-wellness-calm mb-2" />
              <h4 className="font-medium text-foreground mb-2">4-7-8 Breathing</h4>
              <p className="text-muted-foreground text-sm mb-3">Calm your mind with guided breathing</p>
              {breathingSession.isActive ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-wellness-calm mb-1">
                    {breathingSession.phase.charAt(0).toUpperCase() + breathingSession.phase.slice(1)}
                  </div>
                  <div className="text-lg text-muted-foreground mb-2">{breathingSession.count}</div>
                  <div className="text-sm text-muted-foreground mb-2">Cycle {breathingSession.cycle + 1}</div>
                  <button
                    onClick={() => setBreathingSession({ isActive: false, phase: 'inhale', count: 0, cycle: 0 })}
                    className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm hover:bg-destructive/90"
                  >
                    Stop
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setBreathingSession({ isActive: true, phase: 'inhale', count: 1, cycle: 0 })}
                  className="bg-wellness-calm text-white px-4 py-2 rounded text-sm hover:opacity-90 w-full"
                >
                  Start Breathing
                </button>
              )}
            </div>

            {/* Meditation Timer */}
            <div className="bg-gradient-focus rounded-lg p-4 border border-wellness-focus/20">
              <Brain className="w-8 h-8 text-wellness-focus mb-2" />
              <h4 className="font-medium text-foreground mb-2">Meditation Timer</h4>
              <p className="text-muted-foreground text-sm mb-3">Mindfulness meditation session</p>
              {meditationTimer.isActive ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-wellness-focus mb-1">
                    {Math.floor(meditationTimer.remaining / 60)}:{(meditationTimer.remaining % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {meditationSounds[meditationTimer.selectedSound]}
                  </div>
                  <div className="flex space-x-1 justify-center">
                    <button
                      onClick={() => setMeditationTimer(prev => ({ ...prev, isActive: false }))}
                      className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs hover:bg-destructive/90"
                    >
                      <Pause className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setMeditationTimer(prev => ({ ...prev, remaining: prev.duration, isActive: false }))}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs hover:bg-muted/80"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <select
                    value={meditationTimer.selectedSound}
                    onChange={(e) => setMeditationTimer(prev => ({ ...prev, selectedSound: e.target.value }))}
                    className="wellness-input w-full text-xs mb-2 p-1"
                  >
                    {Object.entries(meditationSounds).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setMeditationTimer(prev => ({ ...prev, isActive: true }))}
                    className="bg-wellness-focus text-white px-4 py-2 rounded text-sm hover:opacity-90 w-full"
                  >
                    <Play className="w-3 h-3 inline mr-1" />
                    Start ({Math.floor(meditationTimer.duration / 60)}m)
                  </button>
                </div>
              )}
            </div>

            {/* Quick Resources */}
            <div className="bg-gradient-growth rounded-lg p-4 border border-wellness-growth/20">
              <BookOpen className="w-8 h-8 text-wellness-growth mb-2" />
              <h4 className="font-medium text-foreground mb-2">Quick Help</h4>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-muted-foreground hover:text-foreground flex items-center space-x-2">
                  <Users className="w-3 h-3" />
                  <span>Peer Support Chat</span>
                </button>
                <button className="w-full text-left text-sm text-muted-foreground hover:text-foreground flex items-center space-x-2">
                  <Phone className="w-3 h-3" />
                  <span>Crisis Helpline</span>
                </button>
                <button className="w-full text-left text-sm text-muted-foreground hover:text-foreground flex items-center space-x-2">
                  <BookOpen className="w-3 h-3" />
                  <span>Self-Help Resources</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="wellness-card">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-wellness-calm" />
            Recent Journal Entries
          </h3>
          <div className="space-y-4">
            {journalEntries.slice(-3).reverse().map(entry => (
              <div key={entry.id} className="p-4 bg-muted rounded-lg border-l-4 border-l-wellness-calm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">{entry.date}</span>
                  <span className={
                    entry.sentiment === 'positive' ? 'status-positive' :
                    entry.sentiment === 'negative' ? 'status-negative' :
                    'status-neutral'
                  }>
                    {entry.sentiment}
                  </span>
                </div>
                <p className="text-foreground text-sm mb-2">{entry.entry}</p>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-xs bg-wellness-calm/10 text-wellness-calm px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const WellnessTools = () => (
    <div className="space-y-6">
      <div className="wellness-card">
        <h2 className="text-2xl font-bold text-foreground mb-6">Wellness Toolkit</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Extended breathing exercises */}
          <div className="bg-gradient-calm rounded-lg p-6 border border-wellness-calm/20">
            <Wind className="w-10 h-10 text-wellness-calm mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Breathing Exercises</h3>
            <p className="text-muted-foreground text-sm mb-4">Various techniques for different situations</p>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-white/20 rounded text-sm text-foreground">4-7-8 for Sleep</button>
              <button className="w-full text-left p-2 hover:bg-white/20 rounded text-sm text-foreground">Box Breathing for Focus</button>
              <button className="w-full text-left p-2 hover:bg-white/20 rounded text-sm text-foreground">Quick Calm (2 min)</button>
            </div>
          </div>

          {/* Meditation library */}
          <div className="bg-gradient-focus rounded-lg p-6 border border-wellness-focus/20">
            <Brain className="w-10 h-10 text-wellness-focus mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Meditation Library</h3>
            <p className="text-muted-foreground text-sm mb-4">Guided sessions for every mood</p>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-white/20 rounded text-sm text-foreground">Stress Relief (10 min)</button>
              <button className="w-full text-left p-2 hover:bg-white/20 rounded text-sm text-foreground">Focus & Clarity (5 min)</button>
              <button className="w-full text-left p-2 hover:bg-white/20 rounded text-sm text-foreground">Sleep Meditation (15 min)</button>
            </div>
          </div>

          {/* Emergency support */}
          <div className="bg-gradient-to-r from-destructive/10 to-destructive/20 rounded-lg p-6 border border-destructive/20">
            <Phone className="w-10 h-10 text-destructive mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Crisis Support</h3>
            <p className="text-muted-foreground text-sm mb-4">Immediate help when you need it</p>
            <div className="space-y-2">
              <button className="w-full bg-destructive text-destructive-foreground p-2 rounded text-sm hover:bg-destructive/90">Call Crisis Line</button>
              <button className="w-full text-left p-2 hover:bg-destructive/10 rounded text-sm text-foreground">Text Support</button>
              <button className="w-full text-left p-2 hover:bg-destructive/10 rounded text-sm text-foreground">Emergency Contacts</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="bg-card shadow-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-wellness-heart" />
              <div>
                <h1 className="text-xl font-bold text-foreground">WellnessHub</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Mental Health Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('check-in')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'check-in' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Check-In</span>
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'dashboard' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentView('tools')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'tools' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Headphones className="w-4 h-4" />
                <span>Tools</span>
              </button>

              {/* User profile indicator */}
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="text-xl">{user.avatar}</div>
                <div className="hidden md:block text-sm">
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">Level {user.level}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'check-in' && <EnhancedCheckIn />}
        {currentView === 'dashboard' && <EnhancedDashboard />}
        {currentView === 'tools' && <WellnessTools />}
      </div>

      {/* Floating Emergency Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-destructive text-destructive-foreground rounded-full p-4 shadow-elevated hover:bg-destructive/90 cursor-pointer transition-all transform hover:scale-110">
          <Phone className="w-6 h-6" />
        </div>
      </div>

      {/* Floating Wellness Widget */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-gradient-wellness text-white rounded-full p-4 shadow-elevated hover:opacity-90 cursor-pointer transition-all transform hover:scale-110">
          <Heart className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default WellnessPlatform;