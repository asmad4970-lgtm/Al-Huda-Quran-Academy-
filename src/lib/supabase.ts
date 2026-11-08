import { createClient } from '@supabase/supabase-js';
import { AdmissionFormData } from '../types';

export const SUPABASE_PROJECT_ID = 'xfnumjgkczelzhtfslti';
export const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = 'sb_publishable_TkpwN93Eb3IVV1XZ1l3wmA_MR3xnyB_';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

export interface AdmissionRecord extends AdmissionFormData {
  id: string;
  status: 'New' | 'Trial Scheduled' | 'Enrolled' | 'Completed';
  created_at: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'Unread' | 'Responded' | 'Archived';
  created_at: string;
}

// SQL Schema for the user to execute in Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- AL HUDA QURAN ACADEMY DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/xfnumjgkczelzhtfslti/sql)

-- 1. Create Admissions Table
CREATE TABLE IF NOT EXISTS public.admissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    student_age TEXT NOT NULL,
    gender TEXT NOT NULL,
    course TEXT NOT NULL,
    class_type TEXT NOT NULL,
    preferred_timing TEXT NOT NULL,
    weekly_days TEXT NOT NULL,
    selected_days JSONB DEFAULT '[]'::jsonb,
    additional_message TEXT,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Academy Settings Table
CREATE TABLE IF NOT EXISTS public.academy_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS) & Public Access Policies
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_settings ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anon users submitting admission & inquiries)
CREATE POLICY "Allow public insert to admissions" ON public.admissions 
FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public select admissions" ON public.admissions 
FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public update admissions" ON public.admissions 
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete admissions" ON public.admissions 
FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow public insert inquiries" ON public.inquiries 
FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public select inquiries" ON public.inquiries 
FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public update inquiries" ON public.inquiries 
FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow public select settings" ON public.academy_settings 
FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 5. Insert Default Settings
INSERT INTO public.academy_settings (key, value) 
VALUES 
    ('facebook_url', 'https://facebook.com/alhudaquranacademy'),
    ('whatsapp_number', '+923299866560'),
    ('official_email', 'asmad4970@gmail.com')
ON CONFLICT (key) DO NOTHING;
`;

// Local storage fallback helpers
const LOCAL_ADMISSIONS_KEY = 'alhuda_admissions_data';
const LOCAL_INQUIRIES_KEY = 'alhuda_inquiries_data';

export const saveAdmission = async (formData: AdmissionFormData): Promise<{ success: boolean; id: string; source: 'supabase' | 'local' }> => {
  const newId = `adm-${Date.now()}`;
  const record: AdmissionRecord = {
    ...formData,
    id: newId,
    status: 'New',
    created_at: new Date().toISOString()
  };

  // Always save to localStorage first for instant availability
  try {
    const existingStr = localStorage.getItem(LOCAL_ADMISSIONS_KEY);
    const existing: AdmissionRecord[] = existingStr ? JSON.parse(existingStr) : [];
    localStorage.setItem(LOCAL_ADMISSIONS_KEY, JSON.stringify([record, ...existing]));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }

  // Attempt Supabase insert
  try {
    const { data, error } = await supabase.from('admissions').insert([
      {
        student_name: formData.studentName,
        parent_name: formData.parentName,
        whatsapp_number: formData.whatsappNumber,
        email: formData.email,
        country: formData.country,
        student_age: formData.studentAge,
        gender: formData.gender,
        course: formData.course,
        class_type: formData.classType,
        preferred_timing: formData.preferredTiming,
        weekly_days: formData.weeklyDays,
        selected_days: formData.selectedDays,
        additional_message: formData.additionalMessage,
        status: 'New'
      }
    ]).select().single();

    if (error) {
      console.warn('Supabase insert note (table may still be pending creation via SQL query):', error.message);
      return { success: true, id: newId, source: 'local' };
    }

    return { success: true, id: data?.id || newId, source: 'supabase' };
  } catch (err) {
    console.warn('Supabase offline or table pending creation:', err);
    return { success: true, id: newId, source: 'local' };
  }
};

export const fetchAdmissions = async (): Promise<AdmissionRecord[]> => {
  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        studentName: item.student_name,
        parentName: item.parent_name,
        whatsappNumber: item.whatsapp_number,
        email: item.email,
        country: item.country,
        studentAge: item.student_age,
        gender: item.gender,
        course: item.course,
        classType: item.class_type,
        preferredTiming: item.preferred_timing,
        weeklyDays: item.weekly_days,
        selectedDays: Array.isArray(item.selected_days) ? item.selected_days : [],
        additionalMessage: item.additional_message || '',
        status: item.status || 'New',
        created_at: item.created_at
      }));
    }
  } catch (e) {
    console.warn('Supabase fetch failed, falling back to local storage:', e);
  }

  // Fallback to local storage
  try {
    const existingStr = localStorage.getItem(LOCAL_ADMISSIONS_KEY);
    return existingStr ? JSON.parse(existingStr) : [];
  } catch {
    return [];
  }
};

export const updateAdmissionRecordStatus = async (id: string, status: AdmissionRecord['status']): Promise<void> => {
  // Update local
  try {
    const existingStr = localStorage.getItem(LOCAL_ADMISSIONS_KEY);
    if (existingStr) {
      const existing: AdmissionRecord[] = JSON.parse(existingStr);
      const updated = existing.map(item => item.id === id ? { ...item, status } : item);
      localStorage.setItem(LOCAL_ADMISSIONS_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn(e);
  }

  // Update Supabase
  try {
    await supabase.from('admissions').update({ status }).eq('id', id);
  } catch (e) {
    console.warn(e);
  }
};

export const deleteAdmissionRecord = async (id: string): Promise<void> => {
  try {
    const existingStr = localStorage.getItem(LOCAL_ADMISSIONS_KEY);
    if (existingStr) {
      const existing: AdmissionRecord[] = JSON.parse(existingStr);
      const filtered = existing.filter(item => item.id !== id);
      localStorage.setItem(LOCAL_ADMISSIONS_KEY, JSON.stringify(filtered));
    }
  } catch (e) {
    console.warn(e);
  }

  try {
    await supabase.from('admissions').delete().eq('id', id);
  } catch (e) {
    console.warn(e);
  }
};

export const saveInquiry = async (inquiry: { name: string; email: string; phone: string; message: string }): Promise<void> => {
  const newRecord: InquiryRecord = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: 'Unread',
    created_at: new Date().toISOString()
  };

  try {
    const existingStr = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    const existing: InquiryRecord[] = existingStr ? JSON.parse(existingStr) : [];
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify([newRecord, ...existing]));
  } catch (e) {
    console.warn(e);
  }

  try {
    await supabase.from('inquiries').insert([
      {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
        status: 'Unread'
      }
    ]);
  } catch (e) {
    console.warn('Supabase inquiry insert note:', e);
  }
};

export const fetchInquiries = async (): Promise<InquiryRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (e) {
    console.warn(e);
  }

  try {
    const existingStr = localStorage.getItem(LOCAL_INQUIRIES_KEY);
    return existingStr ? JSON.parse(existingStr) : [];
  } catch {
    return [];
  }
};
