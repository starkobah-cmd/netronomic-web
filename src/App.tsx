import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { AboutUs } from './components/AboutUs';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';

import { ServiceModal } from './components/ServiceModal';
import { PortfolioModal } from './components/PortfolioModal';
import { QuickQuoteModal } from './components/QuickQuoteModal';

import { BlogListing } from './components/BlogListing';
import { SingleBlog } from './components/SingleBlog';
import { AdminBlogManagement } from './components/AdminBlogManagement';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboardLoader } from './components/AdminDashboardLoader';
import { SitemapModal } from './components/SitemapModal';
import { SiteLoader } from './components/SiteLoader';
import { CustomCursor } from './components/CustomCursor';

import { ServiceItem, PortfolioItem, BlogPost, BlogComment, BlogViewMode, PostStatus } from './types';
import { getStoredBlogPosts, saveBlogPostsToStorage } from './data/blogData';
import { getStoredSiteConfig, saveSiteConfigToStorage, DEFAULT_SITE_CONFIG, SiteConfig } from './data/siteConfig';
import { isAuthenticatedAdmin } from './utils/auth';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioItem | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [preselectedServiceTitle, setPreselectedServiceTitle] = useState<string>('Website Design & Development');

  // Site Configuration State (Logo, Agency info, Hero typing phrases, etc.)
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => getStoredSiteConfig());

  // Blog State
  const [blogView, setBlogView] = useState<BlogViewMode>('main');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string>('');
  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [sitemapOpen, setSitemapOpen] = useState<boolean>(false);
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(() => isAuthenticatedAdmin());
  const [isAdminDashboardLoading, setIsAdminDashboardLoading] = useState<boolean>(() => isAuthenticatedAdmin());
  const [showInitialLoader, setShowInitialLoader] = useState<boolean>(() => !sessionStorage.getItem('netronomic_loaded_once'));

  // Handle URL hash / path routes (e.g. /admin, /dashboard, /cms, #admin)
  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path === '/dashboard' || path === '/cms' || hash === '#admin') {
        if (hash === '#admin') {
          window.history.replaceState(null, '', '/admin');
        }
        setBlogView('site-admin');
        const isAuthed = isAuthenticatedAdmin();
        setIsAdminAuth(isAuthed);
        if (isAuthed) {
          setIsAdminDashboardLoading(true);
        }
      }
    };

    handleRouteCheck();
    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);
    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, []);

  const handleNavigateView = (view: BlogViewMode) => {
    setBlogView(view);
    if (view === 'site-admin' || view === 'blog-admin') {
      window.history.pushState(null, '', '/admin');
      const isAuthed = isAuthenticatedAdmin();
      setIsAdminAuth(isAuthed);
      if (isAuthed) {
        setIsAdminDashboardLoading(true);
      }
    } else {
      if (window.location.pathname.toLowerCase() === '/admin' || window.location.pathname.toLowerCase() === '/dashboard' || window.location.hash === '#admin') {
        window.history.pushState(null, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    saveSiteConfigToStorage(newConfig);
  };

  const handleResetSiteConfig = () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    saveSiteConfigToStorage(DEFAULT_SITE_CONFIG);
  };

  // Sync state changes with localStorage
  const handleSavePost = (updatedPost: BlogPost) => {
    const existingIndex = posts.findIndex(p => p.id === updatedPost.id);
    let newPosts: BlogPost[];
    if (existingIndex >= 0) {
      newPosts = [...posts];
      newPosts[existingIndex] = updatedPost;
    } else {
      newPosts = [updatedPost, ...posts];
    }
    setPosts(newPosts);
    saveBlogPostsToStorage(newPosts);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const newPosts = posts.filter(p => p.id !== postId);
      setPosts(newPosts);
      saveBlogPostsToStorage(newPosts);
    }
  };

  const handleToggleStatus = (postId: string, status: PostStatus) => {
    const newPosts = posts.map(p => (p.id === postId ? { ...p, status } : p));
    setPosts(newPosts);
    saveBlogPostsToStorage(newPosts);
  };

  const handleAddComment = (postId: string, comment: BlogComment) => {
    const newPosts = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...(p.comments || []), comment]
        };
      }
      return p;
    });
    setPosts(newPosts);
    saveBlogPostsToStorage(newPosts);
  };

  const activeSinglePost = posts.find(p => p.slug === selectedPostSlug) || posts[0];

  const handleOpenQuote = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedServiceTitle(serviceTitle);
    }
    setQuoteModalOpen(true);
  };

  const handleScrollToContactWithService = (serviceTitle: string) => {
    setPreselectedServiceTitle(serviceTitle);
    if (blogView !== 'main') {
      setBlogView('main');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        setQuoteModalOpen(true);
      }
    }
  };

  const handleAddInquiry = (inquiryData: { name: string; email: string; phone: string; service: string; budget: string; message: string }) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'new' as const,
    };
    const updatedInquiries = [newInquiry, ...(siteConfig.inquiries || [])];
    const newConfig = { ...siteConfig, inquiries: updatedInquiries };
    setSiteConfig(newConfig);
    saveSiteConfigToStorage(newConfig);
  };

  const homePageConfig = siteConfig.pages?.find(p => p.slug === '/');
  const homeSections = homePageConfig?.sections || [];
  const isSectionVisible = (secId: string) => {
    const sec = homeSections.find(s => s.id === secId);
    return sec ? sec.visible : true;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Initial Website Opening Animated Screen */}
      <AnimatePresence>
        {showInitialLoader && (
          <SiteLoader
            siteConfig={siteConfig}
            onFinish={() => {
              sessionStorage.setItem('netronomic_loaded_once', 'true');
              setShowInitialLoader(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Sticky Header Nav (Only on frontend & blog pages) */}
      {blogView !== 'site-admin' && blogView !== 'blog-admin' && (
        <Navbar
          onOpenQuote={handleOpenQuote}
          currentView={blogView}
          siteConfig={siteConfig}
          onNavigate={handleNavigateView}
        />
      )}

      {/* View Switcher: Main Landing Page vs Blog Pages vs Full Site Admin */}
      {blogView === 'main' && (
        <main>
          {/* 1. Hero Section */}
          {isSectionVisible('sec-hero') && (
            <Hero
              siteConfig={siteConfig}
              onGetStarted={() => handleOpenQuote('Website Design & Development')}
              onExploreServices={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {/* 2. Our Services */}
          {isSectionVisible('sec-services') && (
            <Services
              onSelectService={(service) => setSelectedService(service)}
              onRequestQuoteForService={(title) => handleScrollToContactWithService(title)}
            />
          )}

          {/* 3. About Us */}
          {isSectionVisible('sec-about') && <AboutUs />}

          {/* 4. Why Choose Us */}
          {isSectionVisible('sec-why') && <WhyChooseUs />}

          {/* 5. Our Process */}
          {isSectionVisible('sec-process') && <Process />}

          {/* 6. Portfolio */}
          {isSectionVisible('sec-portfolio') && (
            <Portfolio
              onSelectPortfolio={(item) => setSelectedPortfolio(item)}
            />
          )}

          {/* 7. Pricing */}
          {isSectionVisible('sec-pricing') && (
            <Pricing
              onSelectPlan={(planName) => handleScrollToContactWithService(planName)}
            />
          )}

          {/* 8. Testimonials */}
          {isSectionVisible('sec-testimonials') && <Testimonials />}

          {/* 9. FAQ */}
          {isSectionVisible('sec-faq') && <FAQ />}

          {/* 10. Contact Us */}
          {isSectionVisible('sec-contact') && (
            <ContactUs
              preselectedService={preselectedServiceTitle}
              siteConfig={siteConfig}
              onAddInquiry={handleAddInquiry}
            />
          )}
        </main>
      )}

      {/* Blog Listing Page */}
      {blogView === 'blog-list' && (
        <BlogListing
          posts={posts}
          onSelectPost={(slug) => {
            setSelectedPostSlug(slug);
            setBlogView('single-blog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAdmin={() => handleNavigateView('site-admin')}
          onOpenSitemap={() => setSitemapOpen(true)}
        />
      )}

      {/* Single Blog Article View */}
      {blogView === 'single-blog' && activeSinglePost && (
        <SingleBlog
          post={activeSinglePost}
          allPosts={posts}
          onBack={() => setBlogView('blog-list')}
          onSelectPost={(slug) => {
            setSelectedPostSlug(slug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAddComment={handleAddComment}
        />
      )}

      {/* Protected Admin Portal / Login Wall */}
      {(blogView === 'blog-admin' || blogView === 'site-admin') && (
        isAdminAuth ? (
          isAdminDashboardLoading ? (
            <AdminDashboardLoader
              siteConfig={siteConfig}
              onFinish={() => setIsAdminDashboardLoading(false)}
            />
          ) : (
            <AdminPanel
              siteConfig={siteConfig}
              onSaveSiteConfig={handleSaveSiteConfig}
              onResetSiteConfig={handleResetSiteConfig}
              posts={posts}
              onSavePost={handleSavePost}
              onDeletePost={handleDeletePost}
              onToggleStatus={handleToggleStatus}
              onExitAdmin={() => {
                setIsAdminAuth(false);
                setIsAdminDashboardLoading(false);
                handleNavigateView('main');
              }}
              onOpenSitemap={() => setSitemapOpen(true)}
            />
          )
        ) : (
          <AdminLogin
            onLoginSuccess={() => {
              setIsAdminAuth(true);
              setIsAdminDashboardLoading(true);
            }}
            onBackToSite={() => handleNavigateView('main')}
            brandName={siteConfig.logo?.brandName || 'NETRONOMIC'}
          />
        )
      )}

      {/* Footer (Only on public site and blog pages) */}
      {blogView !== 'site-admin' && blogView !== 'blog-admin' && (
        <Footer
          onOpenQuote={handleOpenQuote}
          siteConfig={siteConfig}
          onNavigate={handleNavigateView}
        />
      )}

      {/* Modals */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={(title) => handleScrollToContactWithService(title)}
      />

      <PortfolioModal
        item={selectedPortfolio}
        onClose={() => setSelectedPortfolio(null)}
        onRequestSimilar={(cat) => handleScrollToContactWithService(`${cat} Project`)}
      />

      <QuickQuoteModal
        isOpen={quoteModalOpen}
        initialService={preselectedServiceTitle}
        onClose={() => setQuoteModalOpen(false)}
      />

      <SitemapModal
        isOpen={sitemapOpen}
        onClose={() => setSitemapOpen(false)}
        posts={posts}
      />

      {/* Modern Custom Cursor System */}
      <CustomCursor primaryColor={siteConfig.primaryColor} />
    </div>
  );
}

