import React, { useState, useEffect } from 'react';
import { 
  fetchAdmissions, 
  fetchInquiries, 
  updateAdmissionRecordStatus, 
  deleteAdmissionRecord, 
  AdmissionRecord, 
  InquiryRecord, 
  SUPABASE_PROJECT_ID, 
  SUPABASE_SQL_SCHEMA, 
  supabase 
} from '../lib/supabase';
import { 
  X, 
  Database, 
  Users, 
  MessageSquare, 
  Settings, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar, 
  Download, 
  Sparkles, 
  RefreshCw, 
  Lock, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  facebookUrl: string;
  onUpdateFacebookUrl: (url: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  facebookUrl,
  onUpdateFacebookUrl
}) => {
  const [activeTab, setActiveTab] = useState<'admissions' | 'inquiries' | 'database' | 'settings'>('admissions');
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'pending_tables'>('checking');
  
  // Settings state
  const [customFb, setCustomFb] = useState(facebookUrl);
  const [savedSettingsMsg, setSavedSettingsMsg] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
      checkDatabase();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    const adm = await fetchAdmissions();
    const inq = await fetchInquiries();
    setAdmissions(adm);
    setInquiries(inq);
    setLoading(false);
  };

  const checkDatabase = async () => {
    setDbStatus('checking');
    try {
      const { data, error } = await supabase.from('admissions').select('id').limit(1);
      if (error && error.code === '42P01') {
        // Table does not exist yet (user needs to run SQL)
        setDbStatus('pending_tables');
      } else if (!error) {
        setDbStatus('connected');
      } else {
        setDbStatus('connected');
      }
    } catch {
      setDbStatus('pending_tables');
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleStatusChange = async (id: string, newStatus: AdmissionRecord['status']) => {
    await updateAdmissionRecordStatus(id, newStatus);
    setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleDeleteAdmission = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this admission record?')) {
      await deleteAdmissionRecord(id);
      setAdmissions(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleExportCsv = () => {
    if (admissions.length === 0) return;
    const headers = ['Student Name', 'Parent Name', 'WhatsApp', 'Email', 'Country', 'Age', 'Gender', 'Course', 'Class Type', 'Timing', 'Days', 'Date', 'Status'];
    const rows = admissions.map(a => [
      `"${a.studentName}"`,
      `"${a.parentName}"`,
      `"${a.whatsappNumber}"`,
      `"${a.email}"`,
      `"${a.country}"`,
      `"${a.studentAge}"`,
      `"${a.gender}"`,
      `"${a.course}"`,
      `"${a.classType}"`,
      `"${a.preferredTiming}"`,
      `"${a.weeklyDays} (${a.selectedDays.join(', ')})"`,
      `"${new Date(a.created_at).toLocaleDateString()}"`,
      `"${a.status}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `al_huda_admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAdmissions = admissions.filter(a => {
    const matchesSearch = 
      a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.whatsappNumber.includes(searchTerm) ||
      a.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-950 text-white rounded-3xl max-w-6xl w-full h-[90vh] flex flex-col shadow-2xl border border-amber-400/40 overflow-hidden">
        
        {/* Admin Header */}
        <div className="px-6 py-4 bg-black border-b border-amber-400/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-full border border-amber-400 bg-white p-0.5" />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center text-[8px] text-black font-bold">★</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-xl font-bold italic text-amber-300">
                  AL HUDA ACADEMY — ADMIN PORTAL
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  Secret Access Mode
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Connected to Supabase Project: <code className="text-amber-400 font-mono">{SUPABASE_PROJECT_ID}</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-400/20 transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-neutral-900 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold italic flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'admissions'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-neutral-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Admissions ({admissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold italic flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-neutral-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold italic flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-neutral-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Supabase SQL Query</span>
            {dbStatus === 'pending_tables' && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold italic flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-neutral-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Academy Settings</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-black/60">
          
          {/* TAB 1: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="space-y-5">
              
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search student, phone, country..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:border-amber-400"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Trial Scheduled">Trial Scheduled</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    onClick={handleExportCsv}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Admissions Cards / Table */}
              {filteredAdmissions.length === 0 ? (
                <div className="py-16 text-center rounded-2xl bg-neutral-900/40 border border-white/5 space-y-3">
                  <Users className="w-12 h-12 text-neutral-600 mx-auto" />
                  <h3 className="text-base font-bold text-neutral-300">No Admissions Found</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    When visitors submit the Online Admission form, their applications appear here instantly and sync directly with your Supabase database.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredAdmissions.map((adm) => (
                    <div
                      key={adm.id}
                      className="p-5 rounded-2xl bg-neutral-900/90 border border-amber-400/20 hover:border-amber-400/50 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-bold text-white font-cinzel">{adm.studentName}</h3>
                            <span className="text-xs text-neutral-400 font-mono">({adm.studentAge} yrs, {adm.gender})</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              adm.status === 'New' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' :
                              adm.status === 'Trial Scheduled' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                              adm.status === 'Enrolled' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                              'bg-neutral-700 text-neutral-300'
                            }`}>
                              {adm.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400">
                            Parent: <strong className="text-white">{adm.parentName}</strong> · Country: <strong className="text-white">{adm.country}</strong> · Submitted: {new Date(adm.created_at).toLocaleString()}
                          </p>
                        </div>

                        {/* Status dropdown & Delete */}
                        <div className="flex items-center gap-2">
                          <select
                            value={adm.status}
                            onChange={(e) => handleStatusChange(adm.id, e.target.value as any)}
                            className="px-2.5 py-1.5 rounded-lg bg-black border border-white/20 text-xs text-white"
                          >
                            <option value="New">Status: New</option>
                            <option value="Trial Scheduled">Trial Scheduled</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <button
                            onClick={() => handleDeleteAdmission(adm.id)}
                            className="p-1.5 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Course Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-black/50 p-3.5 rounded-xl border border-white/5">
                        <div>
                          <span className="text-[10px] uppercase text-neutral-400 block font-semibold">Course</span>
                          <span className="font-bold text-amber-300">{adm.course}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-neutral-400 block font-semibold">Class Type</span>
                          <span className="font-medium text-white">{adm.classType}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-neutral-400 block font-semibold">Preferred Timing</span>
                          <span className="font-medium text-white">{adm.preferredTiming}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-neutral-400 block font-semibold">Days / Schedule</span>
                          <span className="font-medium text-white">{adm.weeklyDays} ({adm.selectedDays.join(', ')})</span>
                        </div>
                      </div>

                      {adm.additionalMessage && (
                        <div className="text-xs bg-white/5 p-3 rounded-xl border border-white/5 text-neutral-300">
                          <span className="text-[10px] uppercase text-amber-400 font-bold block mb-0.5">Parent Notes / Goals:</span>
                          <p>{adm.additionalMessage}</p>
                        </div>
                      )}

                      {/* Instant WhatsApp Action for this specific student */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-4 text-xs text-neutral-400">
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <strong className="text-white font-mono">{adm.whatsappNumber}</strong>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-amber-400" />
                            <strong className="text-white">{adm.email}</strong>
                          </span>
                        </div>

                        <a
                          href={`https://wa.me/${adm.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Assalam o Alaikum ${adm.parentName}! This is Al Huda Quran Academy regarding your admission application for student ${adm.studentName}. We would like to confirm your preferred time for the 3-Day Free Trial Class.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5 fill-black" />
                          <span>Chat on WhatsApp</span>
                        </a>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-amber-300 font-cinzel">General Website Inquiries</h3>
              {inquiries.length === 0 ? (
                <div className="py-16 text-center rounded-2xl bg-neutral-900/40 border border-white/5 space-y-2">
                  <MessageSquare className="w-10 h-10 text-neutral-600 mx-auto" />
                  <p className="text-xs text-neutral-400">No contact inquiries submitted yet.</p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                      <span className="text-[11px] text-neutral-500">{new Date(inq.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{inq.message}</p>
                    <div className="pt-2 flex items-center gap-3 text-xs">
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] hover:underline flex items-center gap-1 font-mono font-bold"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{inq.phone}</span>
                        </a>
                      )}
                      {inq.email && (
                        <a href={`mailto:${inq.email}`} className="text-amber-300 hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{inq.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: SUPABASE DATABASE & SQL QUERY */}
          {activeTab === 'database' && (
            <div className="space-y-6 max-w-4xl">
              
              {/* Connection Status Card */}
              <div className="p-5 rounded-2xl bg-neutral-900 border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-amber-400" />
                    <h3 className="font-cinzel text-base font-bold text-white">Supabase Cloud PostgreSQL Database</h3>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Project ID: <strong className="text-amber-400 font-mono">{SUPABASE_PROJECT_ID}</strong> · Endpoint: <span className="font-mono text-neutral-300">https://{SUPABASE_PROJECT_ID}.supabase.co</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>API Connected</span>
                  </span>

                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 hover:bg-amber-300 transition-colors"
                  >
                    <span>Open Supabase SQL Editor</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-cinzel">
                      SQL Setup Script for Supabase
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Copy the SQL below, paste it into your Supabase SQL Editor, and click <strong>"Run"</strong>. This creates the tables for admissions, inquiries, and security policies.
                    </p>
                  </div>

                  <button
                    onClick={handleCopySql}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-black" />
                        <span>Copy Complete SQL Query</span>
                      </>
                    )}
                  </button>
                </div>

                {/* SQL Code Box */}
                <div className="relative rounded-2xl bg-black border border-white/20 p-4 font-mono text-xs text-emerald-400 max-h-96 overflow-y-auto leading-relaxed shadow-inner">
                  <pre className="whitespace-pre">{SUPABASE_SQL_SCHEMA}</pre>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <h3 className="text-base font-bold text-amber-300 font-cinzel">Academy Contact & Channel Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Official Facebook Page Link</label>
                  <input
                    type="url"
                    value={customFb}
                    onChange={(e) => setCustomFb(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/20 text-sm text-white focus:border-amber-400"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">Updates the Facebook link across navigation and footer.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">WhatsApp Academy Number</label>
                  <input
                    type="text"
                    disabled
                    value="+92 329 9866560"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/50 border border-white/10 text-sm text-amber-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Academy Email Address</label>
                  <input
                    type="text"
                    disabled
                    value="asmad4970@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/50 border border-white/10 text-sm text-amber-300"
                  />
                </div>

                <button
                  onClick={() => {
                    onUpdateFacebookUrl(customFb);
                    setSavedSettingsMsg(true);
                    setTimeout(() => setSavedSettingsMsg(false), 3000);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs cursor-pointer shadow-md transition-all"
                >
                  Save Settings
                </button>

                {savedSettingsMsg && (
                  <p className="text-xs text-emerald-400 font-medium">Settings saved successfully!</p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer info in Admin */}
        <div className="px-6 py-3 bg-black border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
          <span>AL HUDA QURAN ACADEMY · Confidential Administrator Console</span>
          <span>Click outside or press X to close</span>
        </div>

      </div>
    </div>
  );
};
