// src/components/ContactList.jsx
import React from 'react';
import ContactItem from './ContactItem'; // Importa o ContactItem que você acabou de criar

function ContactList({ contacts, onEditContact, onDeleteContact }) {
  // Se não houver contatos, mostra uma mensagem
  if (contacts.length === 0) {
    return (
      <p style={emptyListStyle}>Nenhum contato adicionado ainda. Adicione um novo contato acima!</p>
    );
  }

  return (
    <div style={listContainerStyle}>
      {/* Mapeia sobre a lista de contatos e renderiza um ContactItem para cada um */}
      {contacts.map(contact => (
        <ContactItem
          key={contact.id} // Chave única para cada item na lista (muito importante para o React)
          contact={contact} // Passa o objeto do contato para o ContactItem
          onEdit={onEditContact} // Passa a função de edição do App.jsx para o ContactItem
          onDelete={onDeleteContact} // Passa a função de exclusão do App.jsx para o ContactItem
        />
      ))}
    </div>
  );
}

// Estilos simples para o ContactList (pode ser movido para um arquivo CSS)
const listContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px', // Espaçamento entre os ContactItems
  padding: '10px',
  border: '1px solid #eee',
  borderRadius: '8px',
  backgroundColor: '#fdfdfd',
};

const emptyListStyle = {
  textAlign: 'center',
  color: '#888',
  fontSize: '1.1em',
  padding: '20px',
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
};

export default ContactList;