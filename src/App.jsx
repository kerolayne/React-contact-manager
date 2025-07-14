import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm'; // Certifique-se que o caminho está correto
import ContactList from './components/ContactList'; // Certifique-se que o caminho está correto
import './index.css'; // Importa o nosso CSS completo

// Função para gerar IDs únicos simples
const generateId = () => `id_${new Date().getTime()}`;

function App() {
  // Estado para a lista de contactos. Começa com um exemplo.
  const [contacts, setContacts] = useState([]);
  
  // Estado para controlar a página visível ('search' ou 'new')
  const [activePage, setActivePage] = useState('search');
  
  // Estado para guardar o contacto que está a ser editado
  const [currentContact, setCurrentContact] = useState(null);

  // Efeito para renderizar os ícones da biblioteca Lucide
  useEffect(() => {
    // Adicionamos um pequeno atraso para garantir que o React já renderizou o HTML
    const timer = setTimeout(() => {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }, 0);
    // Limpa o timer para evitar execuções desnecessárias
    return () => clearTimeout(timer);
  }, [activePage, contacts]); // Executa sempre que a página ou a lista de contactos muda

  // Função para guardar (adicionar ou atualizar) um contacto
  const handleSave = (contactData) => {
    if (contactData.id) {
      // Atualizar um contacto existente
      setContacts(contacts.map(c => c.id === contactData.id ? contactData : c));
    } else {
      // Adicionar um novo contacto com um novo ID
      setContacts([...contacts, { ...contactData, id: generateId() }]);
    }
    setCurrentContact(null); // Limpa a seleção de edição
    setActivePage('search'); // Volta para a lista de contactos após guardar
  };

  // Função para apagar um contacto
  const handleDelete = (contactId) => {
    setContacts(contacts.filter(c => c.id !== contactId));
  };

  // Função para preparar a edição de um contacto
  const handleEdit = (contact) => {
    setCurrentContact(contact);
    setActivePage('new'); // Muda para a página do formulário
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
              <p className="label">Total de Contatos</p>
            </div>
            <i data-lucide="users" className="icon"></i>
          </section>

          {/* Página de Procurar Contatos */}
          <section id="page-search" className={`page ${activePage !== 'search' ? 'hidden' : ''}`}>
            <h2>Meus Contatos</h2>
            <ContactList 
              contacts={contacts} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
            />
          </section>

          {/* Página de Novo/Editar Contato */}
          <section id="page-new" className={`page ${activePage !== 'new' ? 'hidden' : ''}`}>
            <h2>{currentContact ? 'Editar Contato' : 'Novo Contato'}</h2>
            <ContactForm 
              currentContact={currentContact}
              onSave={handleSave}
              onCancelEdit={handleCancelEdit}
            />
          </section>
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
            setCurrentContact(null); // Limpa qualquer edição pendente ao clicar em "Novo"
            setActivePage('new');
          }}
        >
          <i data-lucide="user-plus"></i>
          <span>Novo Contato</span>
        </a>
      </nav>
    </>
  );
}

export default App;
