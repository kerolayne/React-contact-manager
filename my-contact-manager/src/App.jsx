import React, {useState} from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Gerenciador de Contatos</h1>
      <ContactForm onAddContact={handleAddContact} />
      {/* Você pode exibir a lista de contatos aqui */}
      {/* <ContactList contacts={contacts} /> */}
      
      {contacts.length > 0 && (
        <>
          <h2>Meus Contatos</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {contacts.map(contact => (
              <li key={contact.id} style={{
                background: '#fff',
                border: '1px solid #eee',
                marginBottom: '10px',
                padding: '15px',
                borderRadius: '5px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <strong>{contact.name}</strong> - {contact.email} - {contact.phone}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
