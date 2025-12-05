import React from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function NavigationBar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // Çıkınca dashboard'a döner
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Çetele</div>
      <div style={styles.menu}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/raporlar" style={styles.link}>Raporlar</Link>
        <button onClick={handleLogout} style={styles.logoutBtn}>Çıkış</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#111",
  },
  menu: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  logoutBtn: {
    border: "none",
    backgroundColor: "#c62828",
    color: "#fff",
    fontWeight: "600",
    padding: "6px 14px",
    borderRadius: "4px",
    cursor: "pointer",
  }
};

export default NavigationBar;
