import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const Admin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [uidToPromote, setUidToPromote] = useState('');
  const [admins, setAdmins] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      const u = data?.user ?? null;
      setUser(u);
      if (!u) {
        setLoading(false);
        return;
      }

      const { data: adminData } = await supabase.from('admins').select('user_id').eq('user_id', u.id).maybeSingle();
      setIsAdmin(Boolean(adminData?.user_id));

      const { data: allAdmins } = await supabase.from('admins').select('user_id, email');
      setAdmins(allAdmins ?? []);
      setLoading(false);
    };
    init();
  }, []);

  const makeAdmin = async () => {
    if (!uidToPromote) return alert('Enter a user id (uid)');
    const { data, error } = await supabase.from('admins').insert({ user_id: uidToPromote }).select().maybeSingle();
    if (error) return alert(error.message);
    alert('User promoted to admin');
    setAdmins((s) => [...s, data]);
    setUidToPromote('');
  };

  if (loading) return <div className="max-w-4xl mx-auto py-20">Loading...</div>;

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-20">
        <h2 className="font-serif text-2xl">Admin</h2>
        <p className="mt-4">You must be signed in to access this page.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto py-20">
        <h2 className="font-serif text-2xl">Admin</h2>
        <p className="mt-4">You are signed in as {user.email} but are not an admin.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-20 space-y-6">
      <h2 className="font-serif text-2xl">Admin Console</h2>

      <section className="p-6 border rounded">
        <h3 className="font-semibold">Create Admin</h3>
        <p className="text-sm text-gray-500">Promote a user by their `uid` (auth.users.id).</p>
        <div className="mt-4 flex space-x-2">
          <input value={uidToPromote} onChange={(e) => setUidToPromote(e.target.value)} placeholder="user uid" className="px-3 py-2 border rounded w-full" />
          <button onClick={makeAdmin} className="px-4 py-2 bg-neuro-gold text-white rounded">Make Admin</button>
        </div>
      </section>

      <section className="p-6 border rounded">
        <h3 className="font-semibold">Current Admins</h3>
        <ul className="mt-4 space-y-2">
          {admins.map((a) => (
            <li key={a.user_id} className="text-sm">{a.user_id} {a.email ? `— ${a.email}` : ''}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;
