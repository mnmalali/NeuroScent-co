import React, { useState } from 'react';
import supabase from '../lib/supabaseClient';

type Props = {
  open: boolean;
  mode: 'sign-in' | 'sign-up';
  onClose: () => void;
};

export const AuthModal: React.FC<Props> = ({ open, mode, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        else onClose();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
        else onClose();
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="relative bg-neuro-ivory max-w-md w-full p-6 rounded shadow-lg">
        <h3 className="font-serif text-xl mb-2">{mode === 'sign-in' ? 'Sign in' : 'Sign up'}</h3>
        <p className="text-sm text-gray-600 mb-4">Use your email and password to {mode === 'sign-in' ? 'sign in' : 'create an account'}.</p>

        <label className="block text-sm text-gray-700">Email</label>
        <input
          className="w-full px-3 py-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <label className="block text-sm text-gray-700">Password</label>
        <input
          className="w-full px-3 py-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-neuro-gold text-white rounded">
              {loading ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          </div>
          <div className="text-sm">
            {mode === 'sign-in' ? (
              <button type="button" className="underline" onClick={() => { /* switching handled by parent */ }}>Forgot?</button>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthModal;
