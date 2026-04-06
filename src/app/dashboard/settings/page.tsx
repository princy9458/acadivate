'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Shield, Image as ImageIcon, CheckCircle2, Save, Upload, 
  Globe, Lock, Key, Bell, Info, Mail, Phone, FileText, Camera,
  ShieldCheck, ArrowRight, Settings as SettingsIcon, LogOut
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { cn } from '@/src/lib/utils';
import { toast } from 'sonner';
import { useAppSelector } from '@/src/hook/hooks';

// Simple Eye icon for the password fields
const Eye = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function AccountSettingsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Real stats from screenshot
  const [profile, setProfile] = React.useState({
    fullName: user?.userName || 'Admin User',
    phoneNumber: '+91 00000 00000',
    email: 'admin@nestcraft.com',
    bio: '',
    role: user?.role || 'SUPERADMIN'
  });

  const [branding, setBranding] = React.useState({
    logo: '/assets/logo.png',
    favicon: '/favicon.ico',
    siteName: 'Acadivate'
  });

  const [password, setPassword] = React.useState({
    current: '',
    new: ''
  });

  const [notifications, setNotifications] = React.useState({
    newOrders: true,
    productUpdates: true,
    systemAlerts: false,
    marketing: false
  });

  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const faviconInputRef = React.useRef<HTMLInputElement>(null);
  const [isLoadingAssets, setIsLoadingAssets] = React.useState(false);

  // Load existing settings
  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.settings) {
          setBranding({
            logo: data.settings.logo || '/assets/logo.png',
            favicon: data.settings.favicon || '/favicon.ico',
            siteName: data.settings.siteName || 'Acadivate'
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleFileChange = (type: 'logo' | 'favicon', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setBranding(prev => ({
        ...prev,
        [type]: base64
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAssets = async () => {
    setIsLoadingAssets(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'site_branding',
          ...branding
        })
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success('Brand assets updated successfully!');
        router.refresh();
      } else {
        toast.error(data.error || 'Failed to update assets');
      }
    } catch (error) {
      toast.error('An error occurred while saving assets');
    } finally {
      setIsLoadingAssets(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      
      {/* TOP BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border-light bg-white py-4 shadow-sh-sm lg:py-8 mt-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className=" ps-8 relative flex flex-col gap-8 lg:flex-row lg:items-center">
          {/* Logo area */}
          <div className="flex h-24 w-64 items-center justify-center rounded-3xl border border-primary/10 bg-white shadow-sh-xs relative group">
            <img src="/assets/Image/Acadivate logo-transpernt.png" alt="Logo" className="max-w-[70%] max-h-[70%] object-contain" />
            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-forest-900 border-4 border-white text-white flex items-center justify-center cursor-pointer shadow-sh-md hover:scale-110 transition-transform">
              <Camera size={14} />
            </div>
          </div>

          <div className="h-20 w-px bg-border-light hidden lg:block mx-4" />

          {/* User Info area */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-black tracking-tight text-navy">{profile.fullName}</h1>
              <span className="px-3 py-1 rounded-full bg-forest-100 border border-forest-200 text-[10px] font-black uppercase tracking-widest text-forest-900">
                {profile.role}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium text-text-muted">
              <span className="flex items-center gap-2">
                <Mail size={16} className="text-primary" /> {profile.email}
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-forest-600" /> Account Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          
          {/* PROFILE INFO FORM */}
          <section className="rounded-[2.5rem] border border-border-light bg-white overflow-hidden shadow-sh-sm">
            <div className="p-6 border-b border-border-light bg-bg-soft/30 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy">Profile Information</h2>
                <p className="text-xs text-text-subtle font-medium">Update your personal details</p>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    className="w-full h-12 rounded-2xl border border-border-light bg-white px-5 text-sm font-semibold text-navy outline-none focus:border-primary transition-all shadow-sh-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={profile.phoneNumber}
                    onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                    className="w-full h-12 rounded-2xl border border-border-light bg-white px-5 text-sm font-semibold text-navy outline-none focus:border-primary transition-all shadow-sh-xs"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={profile.email}
                    disabled
                    className="w-full h-12 rounded-2xl border border-border-light bg-bg-soft/50 px-12 text-sm font-semibold text-navy cursor-not-allowed outline-none"
                  />
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Bio</label>
                <textarea 
                  rows={4}
                  placeholder="A short bio about you..."
                  className="w-full rounded-3xl border border-border-light bg-white p-5 text-sm font-semibold text-navy outline-none focus:border-primary transition-all shadow-sh-xs"
                />
              </div>
              <div className="flex justify-end">
                <Button variant="primary" className="rounded-2xl px-8 h-12  group">
                  <Save size={18} className="mr-2" /> Save Changes
                </Button>
              </div>
            </div>
          </section>

          {/* BRAND ASSETS SECTION */}
          <section className="rounded-[2.5rem] border border-border-light bg-white overflow-hidden shadow-sh-sm">
            <div className="p-6 border-b border-border-light bg-bg-soft/30 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-gold-pale text-gold flex items-center justify-center">
                <ImageIcon size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy">Brand Assets</h2>
                <p className="text-xs text-text-subtle font-medium">Manage your site logo and favicon</p>
              </div>
            </div>
            <div className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Logo Upload */}
                <div className="space-y-4">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Main Logo</h3>
                  <div className="relative h-44 rounded-[2rem] border-2 border-dashed border-border-light flex flex-col items-center justify-center group hover:border-primary transition-colors bg-bg-soft/30 overflow-hidden">
                    <input 
                      type="file" 
                      ref={logoInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileChange('logo', e)}
                    />
                    <div className="p-4 bg-white rounded-2xl shadow-sh-sm mb-4">
                      <img src={branding.logo} alt="Logo" className="h-10 object-contain" />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => logoInputRef.current?.click()}
                      className="bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl h-9"
                    >
                      <Upload size={14} className="mr-2" /> Upload Logo
                    </Button>
                    <p className="text-[9px] mt-2 text-text-subtle">Recommended: 512x128px (PNG, SVG)</p>
                  </div>
                </div>
                {/* Favicon Upload */}
                <div className="space-y-4">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Favicon</h3>
                  <div className="relative h-44 rounded-[2rem] border-2 border-dashed border-border-light flex flex-col items-center justify-center group hover:border-primary transition-colors bg-bg-soft/30 overflow-hidden">
                    <input 
                      type="file" 
                      ref={faviconInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleFileChange('favicon', e)}
                    />
                    <div className="p-4 bg-white rounded-2xl shadow-sh-sm mb-4">
                      <img src={branding.favicon} alt="Favicon" className="h-10 w-10 object-contain" />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => faviconInputRef.current?.click()}
                      className="bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl h-9"
                    >
                      <Upload size={14} className="mr-2" /> Upload Favicon
                    </Button>
                    <p className="text-[9px] mt-2 text-text-subtle">Recommended: 32x32px (ICO, PNG)</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  variant="primary" 
                  className="rounded-2xl px-8 h-12 group"
                  onClick={handleSaveAssets}
                  disabled={isLoadingAssets}
                >
                  {isLoadingAssets ? 'Saving...' : (
                    <>
                      <Save size={18} className="mr-2" /> Save Assets
                    </>
                  )}
                </Button>
              </div>
            </div>
          </section>

           {/* PASSWORD SECTION */}
           <section className="rounded-[2.5rem] border border-border-orange/20 bg-orange-50/10 overflow-hidden shadow-sh-sm border-l-4 border-l-gold">
            <div className="p-6 border-b border-border-light bg-white flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-gold-pale text-gold flex items-center justify-center">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy">Change Password</h2>
                <p className="text-xs text-text-subtle font-medium">Update your login credentials</p>
              </div>
            </div>
            <div className="p-8 space-y-6 bg-white">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Current Password</label>
                <div className="relative">
                  <input type="password" placeholder="••••••••" className="w-full h-12 rounded-2xl border border-border-light bg-white px-5 pr-12 text-sm font-semibold text-navy outline-none focus:border-primary transition-all" />
                  <Eye size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-subtle" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">New Password</label>
                <div className="relative">
                  <input type="password" placeholder="••••••••" className="w-full h-12 rounded-2xl border border-border-light bg-white px-5 pr-12 text-sm font-semibold text-navy outline-none focus:border-primary transition-all" />
                  <Eye size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-subtle" />
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* NOTIFICATIONS SECTION */}
          <section className="rounded-[2.5rem] border border-border-light bg-white overflow-hidden shadow-sh-sm">
            <div className="p-6 border-b border-border-light bg-bg-soft/30 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy">Notifications</h2>
                <p className="text-[10px] text-text-subtle font-bold uppercase tracking-widest">Control your alerts</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {[
                { label: "New Orders", sub: "Get notified on every new order", key: "newOrders", active: true },
                { label: "Product Updates", sub: "Stock & Inventory alerts", key: "productUpdates", active: true },
                { label: "System Alerts", sub: "Server & system uptime alerts", key: "systemAlerts", active: false },
                { label: "Marketing", sub: "Promotional updates & campaigns", key: "marketing", active: false },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between group">
                  <div className="min-w-0 pr-4">
                    <p className="text-sm font-bold text-navy group-hover:text-primary transition-colors">{item.label}</p>
                    <p className="text-[11px] leading-tight text-text-subtle mt-1">{item.sub}</p>
                  </div>
                  <div 
                    onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key as keyof typeof notifications]})}
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-colors cursor-pointer",
                      notifications[item.key as keyof typeof notifications] ? "bg-forest-900" : "bg-bg-soft border border-border-light"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      notifications[item.key as keyof typeof notifications] ? "right-1" : "left-1"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACCOUNT SECURITY SECTION */}
          <section className="rounded-[2.5rem] border border-border-emerald/30 bg-emerald-50/20 overflow-hidden shadow-sh-sm">
            <div className="p-6 space-y-4">
               <div className="flex items-center gap-3 text-emerald-900">
                 <ShieldCheck size={20} />
                 <h2 className="text-sm font-black uppercase tracking-widest">Account Security</h2>
               </div>
               <div className="space-y-3">
                 <div className="flex justify-between text-xs">
                   <span className="font-bold text-emerald-900/60 flex items-center gap-2">
                     <CheckCircle2 size={14} /> Role:
                   </span>
                   <span className="font-black text-emerald-900">{profile.role}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="font-bold text-emerald-900/60 flex items-center gap-2">
                     <CheckCircle2 size={14} /> 2FA Enabled:
                   </span>
                   <span className="font-black text-emerald-900">No</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="font-bold text-emerald-900/60 flex items-center gap-2">
                     <CheckCircle2 size={14} /> Last Login:
                   </span>
                   <span className="font-black text-emerald-900">Today</span>
                 </div>
               </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
