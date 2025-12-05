import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Dashboard() {
  const [cariIslem, setCariIslem] = useState("");
  const [miktar, setMiktar] = useState("");
  const [kayitlar, setKayitlar] = useState([]);

  const kullanici = supabase.auth.getUser();

  const kayitGetir = async () => {
    const user = (await kullanici).data.user;

    if (!user) return;
    
    const { data, error } = await supabase
      .from("kayitlar")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (!error) setKayitlar(data);
  };

  useEffect(() => {
    kayitGetir();
  }, []);

  const kaydet = async () => {
    const user = (await kullanici).data.user;
    if (!user) return alert("Kullanıcı bulunamadı!");

    const { error } = await supabase.from("kayitlar").insert([
      { aciklama: cariIslem, miktar: parseFloat(miktar), user_id: user.id },
    ]);

    if (!error) {
      setCariIslem("");
      setMiktar("");
      kayitGetir();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Açıklama"
          value={cariIslem}
          onChange={(e) => setCariIslem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Miktar"
          value={miktar}
          onChange={(e) => setMiktar(e.target.value)}
        />
        <button onClick={kaydet}>Kaydet</button>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Açıklama</th>
            <th>Miktar</th>
          </tr>
        </thead>
        <tbody>
          {kayitlar.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.aciklama}</td>
              <td>{row.miktar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
