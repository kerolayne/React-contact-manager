import React, { useState, useEffect } from 'react';
import ConfirmModal from './components/ConfirmModal'; // Certifique-se que o caminho está correto
import ContactForm from './components/ContactForm'; // Certifique-se que o caminho está correto
import ContactList from './components/ContactList'; // Certifique-se que o caminho está correto
import './index.css'; // Importa o nosso CSS completo

// Importações do Firebase
import { db, auth } from './firebaseConfig'; // Importa a configuração do Firebase
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

function App() {
  // --- ESTADOS DO COMPONENTE ---
  const [contacts, setContacts] = useState([]); // Guarda a lista de contactos vinda da base de dados
  const [activePage, setActivePage] = useState('search'); // Controla a página visível
  const [currentContact, setCurrentContact] = useState(null); // Guarda o contacto em edição
  const [user, setUser] = useState(null); // Guarda o utilizador autenticado
  const [loading, setLoading] = useState(true); // Estado para mostrar que os dados estão a carregar
  // --- ESTADOS PARA O MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  // --- AUTENTICAÇÃO ---
  // Efeito para autenticar o utilizador anonimamente.
  // Isto é necessário para ter permissões de leitura/escrita na base de dados.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Se não houver utilizador, faz login anónimo
        signInAnonymously(auth).catch(error => console.error("Anonymous sign-in failed:", error));
      }
    });
    return () => unsubscribe(); // Limpa a subscrição ao desmontar
  }, []);

  // --- LEITURA DE DADOS (EM TEMPO REAL) ---
  // Efeito para carregar os contactos da base de dados e ouvir por alterações
  useEffect(() => {
    // Só executa se houver um utilizador autenticado
    if (!user) return;

    // Define o caminho para a coleção de contactos deste utilizador
    const contactsCollectionRef = collection(db, 'users', user.uid, 'contacts');

    // onSnapshot cria um "ouvinte" em tempo real.
    // Sempre que os dados mudarem na base de dados, este código é executado.
    const unsubscribe = onSnapshot(contactsCollectionRef, (snapshot) => {
      const contactsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setContacts(contactsData);
      setLoading(false); // Dados carregados, podemos esconder o loading
    });

    // Limpa o "ouvinte" quando o componente é desmontado para evitar fugas de memória
    return () => unsubscribe();
  }, [user]); // Este efeito depende do estado 'user'

  // Efeito para renderizar os ícones da biblioteca Lucide
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activePage, contacts]);

  // --- FUNÇÕES DE ESCRITA (CRUD) ---
  // Função para guardar (adicionar ou atualizar) um contacto na base de dados
  const handleSave = async (contactData) => {
    const { id, ...dataToSave } = contactData; // Separa o ID do resto dos dados

    if (id) {
      // Atualizar um contacto existente
      const contactDoc = doc(db, 'users', user.uid, 'contacts', id);
      await updateDoc(contactDoc, dataToSave);
    } else {
      // Adicionar um novo contacto
      const contactsCollectionRef = collection(db, 'users', user.uid, 'contacts');
      await addDoc(contactsCollectionRef, dataToSave);
    }
    setCurrentContact(null);
    setActivePage('search');
  };

  // --- handleDelete MODIFICADO ---
  // Agora, esta função apenas abre o modal de confirmação.
  const handleDelete = (contactId) => {
    setContactToDelete(contactId); // Guarda o ID do contacto a apagar
    setIsModalOpen(true);       // Abre o modal
  };

  // --- FUNÇÃO para confirmar a exclusão ---
  const confirmDelete = async () => {
    if (contactToDelete) {
      const contactDoc = doc(db, 'users', user.uid, 'contacts', contactToDelete);
      await deleteDoc(contactDoc);
      // Fecha o modal e limpa o estado após apagar
      setIsModalOpen(false);
      setContactToDelete(null);
    }
  };

  // Função para preparar a edição de um contacto
  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setActivePage('new');
  };
  
  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setCurrentContact(null);
    setActivePage('search');
  };

  return (
    <>
      <div className="container">
        <header className="app-header">
          <div className="user-greeting">
            <p className="welcome-text">Olá,</p>
            <h1 className="user-name">Usuário</h1>
          </div>
        </header>

        <main>
          <section className="summary-card">
            <div className="details">
              <p className="value">{contacts.length}</p>
              <p className="label">Total de contactos</p>
            </div>
            <i data-lucide="users" className="icon"></i>
          </section>

          {loading ? (
            <p>A carregar contactos...</p>
          ) : (
            <>
              <section id="page-search" className={`page ${activePage !== 'search' ? 'hidden' : ''}`}>
                <h2>Meus contactos</h2>
                <ContactList 
                  contacts={contacts} 
                  onDelete={handleDelete} 
                  onEdit={handleEdit} 
                />
              </section>

              <section id="page-new" className={`page ${activePage !== 'new' ? 'hidden' : ''}`}>
                <h2>{currentContact ? 'Editar contacto' : 'Novo contacto'}</h2>
                <ContactForm 
                  currentContact={currentContact}
                  onSave={handleSave}
                  onCancelEdit={handleCancelEdit}
                />
              </section>
            </>
          )}
        </main>
      </div>

      <nav className="bottom-nav">
        <a 
          id="nav-search" 
          className={`nav-item ${activePage === 'search' ? 'active' : ''}`}
          onClick={() => setActivePage('search')}
        >
          <i data-lucide="search"></i>
          <span>Procurar</span>
        </a>
        <a 
          id="nav-new" 
          className={`nav-item ${activePage === 'new' ? 'active' : ''}`}
          onClick={() => {
            setCurrentContact(null);
            setActivePage('new');
          }}
        >
          <i data-lucide="user-plus"></i>
          <span>Novo contacto</span>
        </a>
      </nav>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Apagar contacto"
      >
        Tem a certeza que deseja apagar este contacto? Esta ação não pode ser desfeita.
      </ConfirmModal>
    </>
  );
}

export default App;
