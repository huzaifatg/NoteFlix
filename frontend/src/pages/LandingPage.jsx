import { Link } from 'react-router';
import { Sparkles, Zap, Shield, Search, Cloud, Smartphone, ArrowRight, CheckCircle2, BookText } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50'>
        <div className='absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]'></div>
        
        <div className='relative mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32'>
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            {/* Left Content */}
            <div className='flex-1 text-center lg:text-left'>
              <div className='inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6'>
                <Sparkles className='w-4 h-4' />
                <span>Built for Modern Productivity</span>
              </div>
              
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight'>
                Your Ideas,
                <span className='pb-2 block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Beautifully Organized
                </span>
              </h1>
              
              <p className='text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl'>
                NoteFlix is the modern note-taking app that helps you capture thoughts, organize ideas, 
                and boost productivity with a stunning, intuitive interface.
              </p>
              
              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <Link 
                  to='/signup'
                  className='inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl'
                >
                  Get Started Free
                  <ArrowRight className='w-5 h-5' />
                </Link>
                <Link 
                  to='/login'
                  className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-200 hover:border-slate-300 transition-all'
                >
                  Sign In
                </Link>
              </div>
              
              <div className='flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-slate-600'>
                <div className='flex items-center gap-2'>
                  <CheckCircle2 className='w-5 h-5 text-green-600' />
                  <span>Free forever</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle2 className='w-5 h-5 text-green-600' />
                  <span>No credit card</span>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className='flex-1 relative'>
              <div className='relative'>
                {/* Floating Cards Animation */}
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-4 animate-float-slow'>
                    <div className='bg-white rounded-2xl shadow-xl p-6 border border-slate-200'>
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                        <Sparkles className='w-6 h-6 text-blue-600' />
                      </div>
                      <h3 className='font-semibold text-slate-900 mb-2'>Quick Notes</h3>
                      <p className='text-sm text-slate-600'>Capture ideas instantly</p>
                    </div>
                    <div className='bg-white rounded-2xl shadow-xl p-6 border border-slate-200'>
                      <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
                        <Search className='w-6 h-6 text-purple-600' />
                      </div>
                      <h3 className='font-semibold text-slate-900 mb-2'>Smart Search</h3>
                      <p className='text-sm text-slate-600'>Find anything fast</p>
                    </div>
                  </div>
                  <div className='space-y-4 pt-8 animate-float'>
                    <div className='bg-white rounded-2xl shadow-xl p-6 border border-slate-200'>
                      <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                        <Shield className='w-6 h-6 text-green-600' />
                      </div>
                      <h3 className='font-semibold text-slate-900 mb-2'>Secure</h3>
                      <p className='text-sm text-slate-600'>Your data is safe</p>
                    </div>
                    <div className='bg-white rounded-2xl shadow-xl p-6 border border-slate-200'>
                      <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4'>
                        <Zap className='w-6 h-6 text-orange-600' />
                      </div>
                      <h3 className='font-semibold text-slate-900 mb-2'>Lightning Fast</h3>
                      <p className='text-sm text-slate-600'>Optimized performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-24 bg-white'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-slate-900 mb-4'>
              Everything you need to stay organized
            </h2>
            <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
              Powerful features designed to help you capture, organize, and find your notes effortlessly
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='group p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300'>
              <div className='w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <Sparkles className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-slate-900 mb-3'>Rich Text Editor</h3>
              <p className='text-slate-600 leading-relaxed'>
                Create beautiful notes with our intuitive editor. Format text, add structure, and make your notes shine.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className='group p-8 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300'>
              <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <Search className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-slate-900 mb-3'>Powerful Search</h3>
              <p className='text-slate-600 leading-relaxed'>
                Find any note instantly with our lightning-fast search. Search by title, content, or tags.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className='group p-8 rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-xl transition-all duration-300'>
              <div className='w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <Cloud className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-slate-900 mb-3'>Cloud Sync</h3>
              <p className='text-slate-600 leading-relaxed'>
                Your notes are automatically saved and synced across all your devices in real-time.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className='group p-8 rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300'>
              <div className='w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <Zap className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-slate-900 mb-3'>Lightning Fast</h3>
              <p className='text-slate-600 leading-relaxed'>
                Optimized for speed and performance. Create, edit, and search notes in milliseconds.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className='group p-8 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300'>
              <div className='w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <Shield className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-slate-900 mb-3'>Secure & Private</h3>
              <p className='text-slate-600 leading-relaxed'>
                Your notes are encrypted and secure. We take your privacy seriously with industry-standard protection.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className='group p-8 rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-xl transition-all duration-300'>
              <div className='w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                <Smartphone className='w-7 h-7 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-slate-900 mb-3'>Responsive Design</h3>
              <p className='text-slate-600 leading-relaxed'>
                Beautiful on every device. Works seamlessly on desktop, tablet, and mobile browsers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-slate-900 text-slate-400 py-12'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg'>
                <BookText className='w-6 h-6 text-white' />
              </div>
              <div>
                <span className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  NoteFlix
                </span>
                <p className='text-sm mt-1'>Beautiful notes, organized effortlessly.</p>
              </div>
            </div>
            <div className='flex gap-8 text-sm'>
              <Link to='/login' className='hover:text-white transition-colors'>Login</Link>
              <Link to='/signup' className='hover:text-white transition-colors'>Sign Up</Link>
            </div>
          </div>
          <div className='border-t border-slate-800 mt-8 pt-8 text-center text-sm'>
            <p>&copy; 2025 NoteFlix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
