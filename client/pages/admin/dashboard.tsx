import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  interface User {
    _id: string;
    displayName: string;
    email: string;
    isPremium: boolean;
  }

  const mockUsers: User[] = [
    { _id: "1", displayName: "John Doe", email: "john@example.com", isPremium: true },
    { _id: "2", displayName: "Jane Smith", email: "jane@example.com", isPremium: false },
    { _id: "3", displayName: "Alice Johnson", email: "alice@example.com", isPremium: true },
    { _id: "4", displayName: "Bob Brown", email: "bob@example.com", isPremium: false },
  ];

  const mockContractCount = 10;
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [contractCount, setContractCount] = useState(mockContractCount);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/api/auth/signin");
    } else {
      const checkAdmin = async () => {
        try {
          const response = await fetch("/api/check-admin");
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error("Error checking admin status", error);
        }
      };
      checkAdmin();
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!isAdmin) {
    return <div style={styles.noAccess}>You do not have access to this page.</div>;
  }

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.brand} onClick={() => router.push("/")}>Admin Dashboard</h2>
        <div style={styles.navLinks}>
          <button style={styles.navLink} onClick={() => router.push("/")}>Home</button>
          <button style={styles.navLink} onClick={() => setActiveTab("users")}>Users</button>
          <button style={styles.navLink} onClick={() => setActiveTab("premium")}>Premium Users</button>
          <button style={styles.navLink} onClick={() => setActiveTab("contracts")}>Total Contracts</button>
        </div>
      </nav>

      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome, Admin</h1>

        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.card}>
            <h2 style={styles.cardTitle}>All Users</h2>
            <ul style={styles.list}>
              {users.map((user) => (
                <li key={user._id} style={styles.listItem}>
                  <p style={styles.userName}>{user.displayName}</p>
                  <p style={styles.userEmail}>{user.email}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {activeTab === "premium" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.card}>
            <h2 style={styles.cardTitle}>Premium Users</h2>
            <ul style={styles.list}>
              {users.filter(user => user.isPremium).map((user) => (
                <li key={user._id} style={styles.listItem}>
                  <p style={styles.userName}>{user.displayName}</p>
                  <p style={styles.userEmail}>{user.email}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {activeTab === "contracts" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.contractBox as React.CSSProperties}>
            <h2 style={styles.contractTitle}>Total Contracts Scanned</h2>
            <p style={styles.contractCount}>{contractCount}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "0",
    margin: "0",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a202c",
    color: "white",
    padding: "1rem 2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  navLinks: {
    display: "flex",
    gap: "1rem",
  },
  navLink: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
  },
  content: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "0.5rem",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center" as "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  card: {
    padding: "1.5rem",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    backgroundColor: "#f7fafc",
    marginBottom: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#2d3748",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    padding: "1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "0.375rem",
    backgroundColor: "#fff",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  userName: {
    fontWeight: "600",
    color: "#2d3748",
  },
  userEmail: {
    fontSize: "0.875rem",
    color: "#718096",
  },
  contractBox: {
    textAlign: "center",
    backgroundColor: "#f7fafc",
    padding: "1rem",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  contractTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#2d3748",
  },
  contractCount: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#4a5568",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.25rem",
    fontWeight: "600",
  },
  noAccess: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "red",
    fontSize: "2rem",
    fontWeight: "bold",
  },
};

export default Dashboard;