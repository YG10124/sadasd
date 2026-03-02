import { useState } from 'react';
import {
  User, LayoutDashboard, Video, MessageSquare, Target,
  ChevronRight, ChevronLeft, Check, Trophy, Sparkles,
  ArrowRight
} from 'lucide-react';

interface OnboardingProps {
  onNavigate: (page: string) => void;
}

export default function Onboarding({ onNavigate }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState<boolean[]>([false, false, false, false, false]);

  const steps = [
    {
      id: 'profile',
      title: 'Set Up Your Profile',
      description: 'Tell us a bit about yourself so we can personalize your experience.',
      icon: User,
      color: '#1D4ED8',
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#111827] block mb-1">Display Name</label>
            <input
              type="text"
              defaultValue="Jane Smith"
              className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#111827] border border-transparent focus:border-[#1D4ED8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 min-h-[48px]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#111827] block mb-1">What subjects interest you?</label>
            <div className="flex flex-wrap gap-2">
              {['Math', 'Science', 'English', 'History', 'Physics', 'Art'].map(subject => (
                <button
                  key={subject}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border-2 border-gray-200 hover:border-[#1D4ED8] hover:bg-[#1D4ED8]/5 text-[#111827] transition-all min-h-[44px]"
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[#111827] block mb-1">Your grade/level</label>
            <select className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm border border-transparent focus:border-[#1D4ED8] focus:outline-none min-h-[48px]">
              <option>Select your level</option>
              <option>Middle School</option>
              <option>High School</option>
              <option>College</option>
              <option>Adult Learner</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: 'dashboard',
      title: 'Explore Your Dashboard',
      description: 'Your dashboard shows your progress, streak, and personalized recommendations.',
      icon: LayoutDashboard,
      color: '#059669',
      content: (
        <div className="space-y-4">
          <div className="bg-[#F5F5F7] rounded-xl p-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-[#1D4ED8]">72%</div>
                <div className="text-[10px] text-[#4B5563] mt-0.5">Progress</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-[#D97706]">7</div>
                <div className="text-[10px] text-[#4B5563] mt-0.5">Day Streak</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-2xl font-bold text-[#059669]">14</div>
                <div className="text-[10px] text-[#4B5563] mt-0.5">Items Done</div>
              </div>
            </div>
            <p className="text-xs text-[#4B5563] text-center mt-3">
              Your dashboard updates in real-time as you learn!
            </p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#1D4ED8] text-[#1D4ED8] font-semibold px-4 py-3 rounded-xl text-sm hover:bg-[#1D4ED8]/5 min-h-[48px]"
          >
            <LayoutDashboard size={16} /> Tap to explore your dashboard
          </button>
        </div>
      ),
    },
    {
      id: 'session',
      title: 'Join a Session',
      description: 'Live sessions connect you with tutors and study groups in real time.',
      icon: Video,
      color: '#D97706',
      content: (
        <div className="space-y-4">
          <div className="bg-[#F5F5F7] rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#1D4ED8]/10 flex items-center justify-center text-[#1D4ED8] text-xs font-bold">SC</div>
              <div>
                <div className="text-sm font-semibold text-[#111827]">Algebra Basics</div>
                <div className="text-xs text-[#4B5563]">Dr. Sarah Chen · 10:00 AM</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#4B5563]">
              <span className="px-2 py-0.5 bg-white rounded text-[10px] font-medium">Math</span>
              <span className="px-2 py-0.5 bg-white rounded text-[10px] font-medium">Intermediate</span>
              <span>8/12 spots</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('schedule')}
            className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#D97706] text-[#D97706] font-semibold px-4 py-3 rounded-xl text-sm hover:bg-[#D97706]/5 min-h-[48px]"
          >
            <Video size={16} /> Tap to join a mock session
          </button>
        </div>
      ),
    },
    {
      id: 'question',
      title: 'Post a Question',
      description: 'The community is here to help! Ask questions and share knowledge.',
      icon: MessageSquare,
      color: '#0369A1',
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#111827] block mb-1">Try posting a sample question</label>
            <textarea
              placeholder="e.g., How do you solve quadratic equations?"
              className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm text-[#111827] placeholder-[#4B5563] border border-transparent focus:border-[#0369A1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369A1]/20 min-h-[80px] resize-y"
            />
          </div>
          <button
            onClick={() => onNavigate('community')}
            className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#0369A1] text-[#0369A1] font-semibold px-4 py-3 rounded-xl text-sm hover:bg-[#0369A1]/5 min-h-[48px]"
          >
            <MessageSquare size={16} /> Tap to visit the community
          </button>
        </div>
      ),
    },
    {
      id: 'goal',
      title: 'Set Your First Goal',
      description: 'Goals keep you motivated and on track. Set a small, achievable target!',
      icon: Target,
      color: '#7C3AED',
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#111827] block mb-2">Choose a goal</label>
            <div className="space-y-2">
              {[
                { label: 'Complete 3 lessons this week' },
                { label: 'Study 30 minutes every day' },
                { label: 'Join 2 study sessions' },
                { label: 'Finish a quiz with 80%+' },
              ].map((goal, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 text-left text-sm font-medium text-[#111827] transition-all min-h-[48px]"
                >
                  <Target size={18} style={{ color: '#7C3AED' }} className="shrink-0" />
                  {goal.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleComplete = () => {
    const newCompleted = [...completed];
    newCompleted[currentStep] = true;
    setCompleted(newCompleted);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const allDone = completed.every(Boolean);
  const completedCount = completed.filter(Boolean).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#059669]/10 text-[#059669] rounded-full text-xs font-semibold mb-3">
          <Sparkles size={14} /> Getting Started
        </div>
        <h1 className="text-xl lg:text-2xl font-bold text-[#111827]">Welcome to ScienceSpire!</h1>
        <p className="text-sm text-[#4B5563] mt-1">Complete these quick steps to get the most out of your learning experience.</p>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#111827]">Progress</span>
          <span className="text-sm font-bold text-[#1D4ED8]">{completedCount}/{steps.length}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-[#1D4ED8] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentStep === i ? 'scale-110' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    completed[i]
                      ? 'bg-[#059669] text-white'
                      : currentStep === i
                        ? 'bg-[#1D4ED8] text-white'
                        : 'bg-gray-100 text-[#4B5563]'
                  }`}
                >
                  {completed[i] ? <Check size={14} /> : <Icon size={14} />}
                </div>
                <span className={`text-[9px] font-medium hidden sm:block ${
                  currentStep === i ? 'text-[#1D4ED8]' : 'text-[#4B5563]'
                }`}>
                  {step.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion celebration */}
      {allDone ? (
        <div className="bg-gradient-to-br from-[#059669] to-[#10B981] rounded-2xl p-8 text-white text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Trophy size={36} />
          </div>
          <h2 className="text-2xl font-bold">You did it!</h2>
          <p className="text-green-100 mt-2 max-w-sm mx-auto">
            You've completed the onboarding! You've earned the "Quick Starter" badge.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mt-4 text-sm font-medium">
            <Trophy size={16} /> Quick Starter Badge Unlocked!
          </div>
          <div className="mt-6">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 bg-white text-[#059669] font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-green-50 transition-colors min-h-[48px] shadow-lg"
            >
              Go to Home <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Current step card */
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Step header */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: steps[currentStep].color + '15' }}
              >
                {(() => { const Icon = steps[currentStep].icon; return <Icon size={20} style={{ color: steps[currentStep].color }} />; })()}
              </div>
              <div>
                <div className="text-xs text-[#4B5563] font-medium">Step {currentStep + 1} of {steps.length}</div>
                <h2 className="text-lg font-bold text-[#111827]">{steps[currentStep].title}</h2>
              </div>
            </div>
            <p className="text-sm text-[#4B5563] mt-2">{steps[currentStep].description}</p>
          </div>

          {/* Step content */}
          <div className="p-5">
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="p-5 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium min-h-[44px] transition-colors ${
                currentStep === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#4B5563] hover:bg-[#F5F5F7] border border-gray-200'
              }`}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#1E40AF] transition-colors min-h-[48px] shadow-sm"
            >
              {completed[currentStep] ? 'Next' : 'Complete & Continue'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
