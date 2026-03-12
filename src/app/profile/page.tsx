'use client';

import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

interface ProfileData {
  name: string;
  age: string;
  state: string;
  incomeRange: string;
  occupation: string;
  gender: string;
}

const PROFILE_STORAGE_KEY = 'seva_ai_profile';

const defaultProfile: ProfileData = {
  name: '',
  age: '',
  state: '',
  incomeRange: '',
  occupation: '',
  gender: '',
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProfileData;
        setProfile({ ...defaultProfile, ...parsed });
      } else if (session?.user?.name) {
        setProfile((p) => ({ ...p, name: session.user!.name || '' }));
      }
    } catch {
      // ignore
    }
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
  };

  if (status === 'loading') {
    return (
      <div className="content-page">
        <div className="card-page prose">
          <p>Loading profile…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="content-page">
        <div className="card-page prose" style={{ textAlign: 'center' }}>
          <h1>Sign in to save your profile</h1>
          <p>
            Connect with Google so Namma Sahaya can remember your basic details and
            personalise scheme recommendations.
          </p>
          <button
            type="button"
            onClick={() => signIn('google')}
            className="finder-submit"
            style={{ marginTop: 16 }}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page">
      <div className="card-page prose">
        <h1>Your Citizen Profile</h1>
        <p>
          These details help Namma Sahaya personalise scheme recommendations and
          pre-fill the scheme finder for you.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ marginTop: 24, display: 'grid', gap: 16 }}
        >
          <div className="finder-form-grid">
            <div className="finder-field">
              <label className="finder-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                className="finder-input"
                value={profile.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div className="finder-field">
              <label className="finder-label" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                className="finder-input"
                value={profile.age}
                onChange={handleChange}
                min={0}
                max={120}
                placeholder="e.g. 28"
              />
            </div>

            <div className="finder-field">
              <label className="finder-label" htmlFor="state">
                State
              </label>
              <input
                id="state"
                name="state"
                className="finder-input"
                value={profile.state}
                onChange={handleChange}
                placeholder="e.g. Tamil Nadu"
              />
            </div>

            <div className="finder-field">
              <label className="finder-label" htmlFor="incomeRange">
                Annual Income Range
              </label>
              <input
                id="incomeRange"
                name="incomeRange"
                className="finder-input"
                value={profile.incomeRange}
                onChange={handleChange}
                placeholder="e.g. 0–2.5L, 2.5–5L"
              />
            </div>

            <div className="finder-field">
              <label className="finder-label" htmlFor="occupation">
                Occupation
              </label>
              <input
                id="occupation"
                name="occupation"
                className="finder-input"
                value={profile.occupation}
                onChange={handleChange}
                placeholder="e.g. Farmer, Student"
              />
            </div>

            <div className="finder-field">
              <label className="finder-label" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="finder-select"
                value={profile.gender}
                onChange={handleChange}
              >
                <option value="">Prefer not to say</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>
          </div>

          <div className="finder-actions">
            <button type="submit" className="finder-submit">
              Save Profile
            </button>
            {saved && (
              <span style={{ fontSize: 13, color: '#16a34a' }}>
                Profile saved locally. We never store this on a server.
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

