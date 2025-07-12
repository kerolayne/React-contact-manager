import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactItem from './components/ContactItem'; 


function App() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  
  const handleDeleteContact = (idToDelete) => {
    setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== idToDelete));
  };
  
  const handleEditContact = (idToEdit) => {
    alert(`Editar contato com ID: ${idToEdit}`);
   
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '20px auto', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#007bff', marginBottom: '30px' }}>Gerenciador de Contatos</h1>
      
      <ContactForm onAddContact={handleAddContact} />
      
      <h2 style={{ color: '#333', marginTop: '40px', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Meus Contatos</h2>
      
      {contacts.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {contacts.map(contact => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onEdit={handleEditContact} // Passa a função de edição
              onDelete={handleDeleteContact} // Passa a função de exclusão
            />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1em' }}>Nenhum contato adicionado ainda.</p>
      )}
    </div>
  );
}

export default App;