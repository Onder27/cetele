// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const TYPES = [
  { value: "sale", label: "Satış / Gelir" },
  { value: "collection", label: "Tahsilat / Alacak" },
  { value: "purchase", label: "Alış / Borç" },
  { value: "expense", label: "Gider" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [type, setType] = useState("sale");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [records, setRecords] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      const { data: { user } = {} } = await supabase.auth.getUser();
      setUser(user || null);
      if (user) fetchRecords(user.id);
    };
    init();

    // Optional: realtime subscription (later)
  }, []);

  const fetchRecords = async (userId) => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) return console.error(error);
    setRecords(data || []);
    computeBalance(data || []);
  };

  const computeBalance = (rows) => {
    // simple logic: sale/collection add, purchase/expense subtract
    let b = 0;
    rows.forEach(r => {
      const val = parseFloat(r.amount) || 0;
      if (["sale","collection"].includes(r.type)) b += val;
      else b -= val;
    });
    setBalance(b);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Kullanıcı bulunamadı, lütfen tekrar giriş yap.");
    const { error } = await supabase
      .from("transactions")
      .insert([
        { user_id: user.id, type, amount: parseFloat(amount), description }
      ]);
    if (error) return alert("Kayıt hatası: " + error.message);
    setAmount(""); setDescription("");
    fetchRecords(user.id);
  };

  if (!user) {
    return <div style={{padding:20}}>Kullanıcı bulunamadı. Lütfen kayıt olup giriş yapın.</div>;
  }

  return (
    <div>
      <h2>Yeni İşlem</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
        <select value={type} onChange={e => setType(e.target.value)} style={{ width: "100%", padding: 8, marginBottom: 8 }}>
          {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>

        <input type="number" placeholder="Tutar" value={amount} onChange={e => setAmount(e.target.value)} style={{ width:"100%", padding:8, marginBottom:8 }} />

        <input type="text" placeholder="Açıklama" value={description} onChange={e=>setDescription(e.target.value)} style={{ width:"100%", padding:8, marginBottom:8 }} />

        <button type="submit" style={{ padding: "10px 18px", background: "#2e7d32", color:"#fff", border:"none", borderRadius:6 }}>Kaydet</button>
      </form>

      <h3 style={{ marginTop: 24 }}>Bakiye: {balance} TL</h3>

      <table border="1" cellPadding="6" style={{ width: "100%", marginTop: 12 }}>
        <thead>
          <tr><th>Tür</th><th>Tutar</th><th>Açıklama</th><th>Tarih</th></tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r.id}>
              <td>{r.type}</td>
              <td>{r.amount} TL</td>
              <td>{r.description}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
